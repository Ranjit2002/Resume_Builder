import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

// Standard A4 dimensions
const A4_WIDTH_PX = 794; // Standard A4 width at 96 DPI
const A4_HEIGHT_PX = 1123; // Standard A4 height at 96 DPI (794 * 297 / 210 = ~1122.94)
const PDF_PAGE_WIDTH_MM = 210;
const PDF_PAGE_HEIGHT_MM = 297;
const RENDER_SCALE = 2.5; // High resolution Retina scale for ultra-crisp fonts and graphics
const CONTENT_TOLERANCE_PX = 32; // Tolerance to absorb trailing container margins/subpixel line height

/**
 * Checks if a rendered canvas page slice contains meaningful resume content,
 * or is merely blank white / uniform container background tint.
 */
function isCanvasBlank(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  try {
    const imgData = ctx.getImageData(0, 0, width, height).data;
    const step = 16 * 4; // Sample every 16th pixel for high efficiency (~80k samples per page)
    let contentPixelCount = 0;

    // Corner background color sample (e.g., sidebar tint or page background)
    const bgR = imgData[0];
    const bgG = imgData[1];
    const bgB = imgData[2];

    for (let i = 0; i < imgData.length; i += step) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      const a = imgData[i + 3];

      if (a < 20) continue; // Transparent

      // Check if pixel is standard white
      const isWhite = r > 246 && g > 246 && b > 246;
      // Check if pixel matches corner background color
      const isCornerBg =
        Math.abs(r - bgR) < 14 && Math.abs(g - bgG) < 14 && Math.abs(b - bgB) < 14;

      if (!isWhite && !isCornerBg) {
        contentPixelCount++;
        // If we find more than 40 sampled content pixels, page has real content
        if (contentPixelCount > 40) {
          return false;
        }
      }
    }
    return true; // Blank or purely background page
  } catch {
    return false;
  }
}

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
    onProgress?.("Analyzing resume content and structure...");

    // Store original scroll position
    const originalScrollPos = window.scrollY;
    window.scrollTo(0, 0);

    // Initial estimation of pages needed from live DOM (compensating for zoom transform scale)
    const liveRect = element.getBoundingClientRect();
    const liveScale = (liveRect.width / (element.offsetWidth || A4_WIDTH_PX)) || 1;
    const liveContentElements = element.querySelectorAll(
      "p, span, h1, h2, h3, h4, h5, h6, li, img, svg, a, [data-badge], header, section > div"
    );

    let liveMaxBottom = 0;
    liveContentElements.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.width > 0) {
        const bottom = (r.bottom - liveRect.top) / liveScale;
        if (bottom > liveMaxBottom) {
          liveMaxBottom = bottom;
        }
      }
    });

    const liveEffectiveHeight = liveMaxBottom > 0 ? liveMaxBottom + 20 : (element.scrollHeight / liveScale);
    let estimatedPages = 1;
    if (liveEffectiveHeight > A4_HEIGHT_PX + CONTENT_TOLERANCE_PX) {
      estimatedPages = Math.ceil((liveEffectiveHeight - CONTENT_TOLERANCE_PX) / A4_HEIGHT_PX);
    }

    onProgress?.("Rendering high-resolution vector canvas...");

    let finalPageCount = estimatedPages;

    const canvas = await html2canvas(element, {
      scale: RENDER_SCALE,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
      windowHeight: Math.max(1600, estimatedPages * A4_HEIGHT_PX + 200),
      x: 0,
      y: 0,
      width: A4_WIDTH_PX,
      height: estimatedPages * A4_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
      onclone: async (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (!clonedElement) return;

        // 1. Inline external images to base64 via proxy to prevent any CORS issues
        const images = Array.from(clonedElement.querySelectorAll<HTMLImageElement>("img"));
        await Promise.all(
          images.map(async (img) => {
            try {
              if (img.src && !img.src.startsWith("data:") && !img.src.startsWith("blob:")) {
                const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(img.src)}`;
                const res = await fetch(proxyUrl);
                if (res.ok) {
                  const blob = await res.blob();
                  const dataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                  });
                  img.src = dataUrl;
                }
              }
            } catch (e) {
              console.warn("Could not inline image for PDF export:", e);
            }
          })
        );

        // 2. Isolate cloned element cleanly in cloned document body
        clonedDoc.body.innerHTML = "";
        clonedDoc.body.style.margin = "0";
        clonedDoc.body.style.padding = "0";
        clonedDoc.body.style.backgroundColor = "#ffffff";
        clonedDoc.body.appendChild(clonedElement);

        // 3. Reset preview transforms, shadows, borders, and margins
        clonedElement.style.position = "static";
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
        clonedElement.style.boxSizing = "border-box";

        // 4. Measure accurate content boundaries in the cloned document
        const containerRect = clonedElement.getBoundingClientRect();
        const contentNodes = clonedElement.querySelectorAll(
          "p, span, h1, h2, h3, h4, h5, h6, li, img, svg, a, [data-badge], header, section > div"
        );

        let maxBottom = 0;
        contentNodes.forEach((node) => {
          const r = node.getBoundingClientRect();
          if (r.height > 0 && r.width > 0) {
            const b = r.bottom - containerRect.top;
            if (b > maxBottom) {
              maxBottom = b;
            }
          }
        });

        const effectiveHeight = maxBottom > 0 ? maxBottom + 20 : clonedElement.scrollHeight;
        let determinedPages = 1;
        if (effectiveHeight > A4_HEIGHT_PX + CONTENT_TOLERANCE_PX) {
          determinedPages = Math.ceil((effectiveHeight - CONTENT_TOLERANCE_PX) / A4_HEIGHT_PX);
        }

        // 5. Intelligent page break handling for multi-page resumes
        // If content exceeds 1 page, ensure blocks (sections, cards, entries) are not sliced midway
        if (determinedPages > 1) {
          for (let p = 1; p < determinedPages; p++) {
            const boundaryY = p * A4_HEIGHT_PX;
            const blockNodes = clonedElement.querySelectorAll<HTMLElement>(
              "section, header, .experience-item, .project-card, .education-item, ul > li, .grid > div"
            );

            blockNodes.forEach((block) => {
              const bRect = block.getBoundingClientRect();
              const top = bRect.top - containerRect.top;
              const bottom = bRect.bottom - containerRect.top;
              const height = bRect.height;

              // If element crosses the page split boundary
              if (top < boundaryY && bottom > boundaryY && height < A4_HEIGHT_PX - 80) {
                const shiftDown = boundaryY - top;
                block.style.marginTop = `${Math.round(shiftDown + 14)}px`;
              }
            });
          }

          // Re-measure after applying page-break shifts
          let postShiftMaxBottom = 0;
          contentNodes.forEach((node) => {
            const r = node.getBoundingClientRect();
            if (r.height > 0 && r.width > 0) {
              const b = r.bottom - containerRect.top;
              if (b > postShiftMaxBottom) {
                postShiftMaxBottom = b;
              }
            }
          });

          const postShiftHeight = postShiftMaxBottom > 0 ? postShiftMaxBottom + 20 : effectiveHeight;
          if (postShiftHeight > A4_HEIGHT_PX + CONTENT_TOLERANCE_PX) {
            determinedPages = Math.ceil((postShiftHeight - CONTENT_TOLERANCE_PX) / A4_HEIGHT_PX);
          } else {
            determinedPages = 1;
          }
        }

        finalPageCount = determinedPages;

        // 6. Explicitly set cloned element height to exactly match required pages
        const exactDocHeightPx = determinedPages * A4_HEIGHT_PX;
        clonedElement.style.height = `${exactDocHeightPx}px`;
        clonedElement.style.minHeight = `${exactDocHeightPx}px`;
        clonedElement.style.maxHeight = `${exactDocHeightPx}px`;
        clonedElement.style.overflow = "hidden";

        // Also normalize the child template container
        const templateChild = clonedElement.firstElementChild as HTMLElement;
        if (templateChild) {
          templateChild.style.minHeight = `${exactDocHeightPx}px`;
          templateChild.style.height = `${exactDocHeightPx}px`;
          templateChild.style.boxSizing = "border-box";
          templateChild.style.border = "none";
          templateChild.style.boxShadow = "none";
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

    // Exact A4 pixel height corresponding to canvas width
    const pageHeightPx = Math.round(canvas.width * (PDF_PAGE_HEIGHT_MM / PDF_PAGE_WIDTH_MM));
    const totalPagesToSlice = Math.max(1, finalPageCount);

    let renderedPagesCount = 0;

    for (let page = 0; page < totalPagesToSlice; page++) {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightPx;
      const ctx = pageCanvas.getContext("2d");

      if (!ctx) continue;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      const sourceY = page * pageHeightPx;
      const sourceHeight = Math.min(pageHeightPx, canvas.height - sourceY);

      if (sourceHeight <= 0) break;

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

      // Blank page check: if not page 0 and slice contains no real content, omit it
      if (page > 0 && isCanvasBlank(ctx, pageCanvas.width, pageCanvas.height)) {
        continue;
      }

      if (renderedPagesCount > 0) {
        pdf.addPage();
      }

      const pageImgData = pageCanvas.toDataURL("image/png");
      pdf.addImage(
        pageImgData,
        "PNG",
        0,
        0,
        PDF_PAGE_WIDTH_MM,
        PDF_PAGE_HEIGHT_MM,
        undefined,
        "FAST"
      );

      renderedPagesCount++;
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
