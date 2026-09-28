"use client";

import { useCallback, useState } from "react";
import PdfInfo from "@/components/PdfInfo";
import { inspectPdf, type PdfDetails } from "@/lib/pdf";

export default function FileDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [details, setDetails] = useState<PdfDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file?: File) => {
    setError(null);
    setDetails(null);

    if (!file) {
      return;
    }

    try {
      const nextDetails = await inspectPdf(file);
      setDetails(nextDetails);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to inspect this PDF.",
      );
    }
  }, []);

  return (
    <div className="dropzone">
      <label
        className={`dropTarget${isDragging ? " isDragging" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          void handleFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          className="fileInput"
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
        <span className="dropContent">
          <span className="dropIcon">PDF</span>
          <strong>Drop a PDF here</strong>
          <span>or click to choose a local file</span>
        </span>
      </label>

      {error ? <p className="error">{error}</p> : null}
      {details ? <PdfInfo details={details} /> : null}
    </div>
  );
}
