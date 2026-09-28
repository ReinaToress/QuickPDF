import type { PdfDetails } from "@/lib/pdf";

type PdfInfoProps = {
  details: PdfDetails;
};

export default function PdfInfo({ details }: PdfInfoProps) {
  return (
    <article className="infoPanel">
      <div className="infoHeader">
        <h3>{details.name}</h3>
        <span className="badge">Valid PDF</span>
      </div>
      <div className="metricGrid">
        <div className="metric">
          <span>Pages</span>
          <strong>{details.pageCount}</strong>
        </div>
        <div className="metric">
          <span>File size</span>
          <strong>{details.sizeLabel}</strong>
        </div>
        <div className="metric">
          <span>PDF version</span>
          <strong>{details.version}</strong>
        </div>
        <div className="metric">
          <span>Modified</span>
          <strong>{details.modifiedLabel}</strong>
        </div>
      </div>
    </article>
  );
}
