import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportResumeToPdf(
  elementId: string,
  fileName: string = "resume.pdf",
  onProgress?: (status: string) => void
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  try {
    onProgress?.("Preparing document snapshot...");

    // Store original styles if necessary
    const originalScrollPos = window.scrollY;
    window.scrollTo(0, 0);

    onProgress?.("Rendering high-resolution vector canvas...");

    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp text
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.margin = "0";
          clonedElement.style.boxShadow = "none";
          clonedElement.style.transform = "none";
        }
      },
    });

    window.scrollTo(0, originalScrollPos);

    onProgress?.("Assembling PDF document...");

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // If multi-page content
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    onProgress?.("Downloading PDF...");
    pdf.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    // Fallback: browser print dialog
    triggerPrintDialog();
    return false;
  }
}

export function triggerPrintDialog() {
  window.print();
}
