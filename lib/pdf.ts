import { PDFDocument } from "pdf-lib";

export type PdfDetails = {
  name: string;
  pageCount: number;
  sizeLabel: string;
  version: string;
  modifiedLabel: string;
};

const pdfSignature = "%PDF-";

export async function inspectPdf(file: File): Promise<PdfDetails> {
  if (!isPdfFile(file)) {
    throw new Error("Choose a PDF file to inspect.");
  }

  const buffer = await file.arrayBuffer();
  const header = readHeader(buffer);

  if (!header.startsWith(pdfSignature)) {
    throw new Error("This file does not look like a valid PDF.");
  }

  const pdf = await PDFDocument.load(buffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  return {
    name: file.name,
    pageCount: pdf.getPageCount(),
    sizeLabel: formatBytes(file.size),
    version: header.slice(pdfSignature.length, pdfSignature.length + 3),
    modifiedLabel: formatDate(file.lastModified),
  };
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function readHeader(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer.slice(0, 12));
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function formatDate(timestamp: number) {
  if (!timestamp) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp));
}
