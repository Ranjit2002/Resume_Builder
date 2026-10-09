import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

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

    // Store original styles & scroll
    const originalScrollPos = window.scrollY;
    window.scrollTo(0, 0);

    onProgress?.("Rendering high-resolution vector canvas...");

    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp vector quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Ensure cloned element and all ancestors are visible and block-rendered
          let curr: HTMLElement | null = clonedElement;
          while (curr && curr !== clonedDoc.body) {
            curr.style.display = "block";
            curr.style.visibility = "visible";
            curr = curr.parentElement;
          }
          clonedElement.style.margin = "0";
          clonedElement.style.boxShadow = "none";
          clonedElement.style.border = "none";
          clonedElement.style.transform = "none";
        }
      },
    });

    window.scrollTo(0, originalScrollPos);

    if (!canvas || !canvas.width || !canvas.height) {
      throw new Error(`Failed to capture canvas. Width: ${canvas?.width}, Height: ${canvas?.height}`);
    }

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
    const imgHeight = Math.max(1, (canvas.height * pdfWidth) / canvas.width);

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // If multi-page content
    while (heightLeft > 5) {
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
    // Fallback: browser print dialog cleanly formatted
    triggerPrintDialog();
    return false;
  }
}

export function triggerPrintDialog() {
  window.print();
}
