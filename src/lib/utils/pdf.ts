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

    // Store original scroll position
    const originalScrollPos = window.scrollY;
    window.scrollTo(0, 0);

    onProgress?.("Rendering high-resolution vector canvas...");

    // Capture standard A4 width (794px at 96 DPI) with 2.5x Retina resolution
    const A4_WIDTH_PX = 794;
    const canvas = await html2canvas(element, {
      scale: 2.5, // 2.5x high resolution for razor-sharp typography and icons
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200, // Forces full desktop viewport evaluation in html2canvas iframe
      windowHeight: 1600,
      width: A4_WIDTH_PX,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Reset transform scale and remove UI shadows/borders for clean PDF print
          clonedElement.style.transform = "none";
          clonedElement.style.webkitTransform = "none";
          clonedElement.style.boxShadow = "none";
          clonedElement.style.border = "none";
          clonedElement.style.borderRadius = "0";
          clonedElement.style.margin = "0";
          clonedElement.style.padding = "0";
          clonedElement.style.width = `${A4_WIDTH_PX}px`;
          clonedElement.style.minWidth = `${A4_WIDTH_PX}px`;
          clonedElement.style.maxWidth = `${A4_WIDTH_PX}px`;

          // Ensure all ancestor elements in cloned doc allow full width and visibility
          let curr: HTMLElement | null = clonedElement.parentElement;
          while (curr && curr !== clonedDoc.body) {
            curr.style.display = "block";
            curr.style.visibility = "visible";
            curr.style.overflow = "visible";
            curr.style.width = `${A4_WIDTH_PX}px`;
            curr.style.minWidth = `${A4_WIDTH_PX}px`;
            curr.style.maxWidth = "none";
            curr.style.margin = "0";
            curr.style.padding = "0";
            curr.style.transform = "none";
            curr = curr.parentElement;
          }
        }
      },
    });

    window.scrollTo(0, originalScrollPos);

    if (!canvas || !canvas.width || !canvas.height) {
      throw new Error(`Failed to capture canvas. Width: ${canvas?.width}, Height: ${canvas?.height}`);
    }

    onProgress?.("Assembling PDF document...");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfPageWidthMm = 210;
    const pdfPageHeightMm = 297;

    // A4 pixel height corresponding to canvas width (aspect ratio 297 / 210 = ~1.4143)
    const pageHeightPx = Math.round(canvas.width * (pdfPageHeightMm / pdfPageWidthMm));

    // Tolerance of ~30px (1% height) to prevent creating an accidental second blank/sliver page
    if (canvas.height <= pageHeightPx + 30) {
      // Single Page Document: Draw directly onto exact A4 dimensions
      const singlePageCanvas = document.createElement("canvas");
      singlePageCanvas.width = canvas.width;
      singlePageCanvas.height = pageHeightPx;
      const ctx = singlePageCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, singlePageCanvas.width, singlePageCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        const pageImgData = singlePageCanvas.toDataURL("image/png");
        pdf.addImage(pageImgData, "PNG", 0, 0, pdfPageWidthMm, pdfPageHeightMm, undefined, "FAST");
      } else {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, pdfPageWidthMm, pdfPageHeightMm, undefined, "FAST");
      }
    } else {
      // Multi-Page Document: Slice each page cleanly
      const totalPages = Math.ceil(canvas.height / pageHeightPx);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeightPx;
        const ctx = pageCanvas.getContext("2d");

        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

          const sourceY = page * pageHeightPx;
          const sourceHeight = Math.min(pageHeightPx, canvas.height - sourceY);

          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );

          const pageImgData = pageCanvas.toDataURL("image/png");
          pdf.addImage(pageImgData, "PNG", 0, 0, pdfPageWidthMm, pdfPageHeightMm, undefined, "FAST");
        }
      }
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
