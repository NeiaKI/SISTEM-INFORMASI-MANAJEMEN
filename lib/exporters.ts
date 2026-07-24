/**
 * lib/exporters.ts
 * Helper ekspor data ke berbagai format.
 *
 * - CSV: di-generate native (tanpa dependency) — langsung jalan.
 * - XLSX / PDF: menggunakan DYNAMIC IMPORT (`await import(...)`) sehingga
 *   library berat (exceljs / pdfkit) hanya dimuat saat tombol ekspor ditekan,
 *   tidak menambah initial bundle.
 */

export interface CsvColumn {
  key: string;
  header: string;
}

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes('"') || str.includes(",") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Generate CSV string dari array of objects. */
export function toCsv(rows: Record<string, unknown>[], columns?: CsvColumn[]): string {
  if (rows.length === 0) return "";

  const cols = columns ?? Object.keys(rows[0]).map((k) => ({ key: k, header: k }));
  const header = cols.map((c) => escapeCsv(c.header)).join(",");
  const body = rows.map((row) => cols.map((c) => escapeCsv(row[c.key])).join(",")).join("\n");

  return `${header}\n${body}`;
}

/**
 * Ekspor data ke format yang diminta.
 * - "csv"  → native (selalu tersedia)
 * - "xlsx" → Excel workbook melalui `exceljs` (dynamic import)
 * - "pdf"  → PDF melalui `pdfkit` (dynamic import)
 *
 * Mengembalikan { content, contentType, extension }.
 */
export async function exportData(
  format: string,
  rows: Record<string, unknown>[],
  columns?: CsvColumn[]
): Promise<{ content: Buffer | string; contentType: string; extension: string }> {
  const cols = columns ?? Object.keys(rows[0] ?? {}).map((k) => ({ key: k, header: k }));

  if (format === "xlsx") {
    const ExcelJS = (await import("exceljs")).default;
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Laporan");

    ws.columns = cols.map((c) => ({ header: c.header, key: c.key, width: 20 }));
    ws.addRows(rows);

    const buffer = await wb.xlsx.writeBuffer();
    return {
      content: Buffer.from(buffer),
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      extension: "xlsx",
    };
  }

  if (format === "pdf") {
    const PDFDocument = (await import("pdfkit")).default;
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        const chunks: Buffer[] = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
          resolve({
            content: Buffer.concat(chunks),
            contentType: "application/pdf",
            extension: "pdf",
          });
        });

        doc.fontSize(16).text("Laporan Data", { align: "center" }).moveDown();
        doc.fontSize(10);

        const columnWidth = 500 / cols.length;

        // Header
        let currentY = doc.y;
        cols.forEach((col, i) => {
          doc.text(col.header, 30 + i * columnWidth, currentY, {
            width: columnWidth,
            align: "left",
          });
        });
        doc.moveDown().moveTo(30, doc.y).lineTo(530, doc.y).stroke().moveDown();

        // Rows
        rows.forEach((row) => {
          currentY = doc.y;
          if (currentY > 750) {
            doc.addPage();
            currentY = doc.y;
          }
          cols.forEach((col, i) => {
            doc.text(String(row[col.key] ?? ""), 30 + i * columnWidth, currentY, {
              width: columnWidth,
              align: "left",
            });
          });
          doc.moveDown();
        });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Default: CSV (native, tanpa dependency).
  return {
    content: toCsv(rows, columns),
    contentType: "text/csv; charset=utf-8",
    extension: "csv",
  };
}
