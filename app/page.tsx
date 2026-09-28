import FileDropzone from "@/components/FileDropzone";
import ToolCard from "@/components/ToolCard";

const plannedTools = [
  {
    title: "Merge",
    description: "Combine multiple PDFs into a single export.",
    status: "Planned",
  },
  {
    title: "Split",
    description: "Extract ranges or individual pages from a document.",
    status: "Planned",
  },
  {
    title: "Rotate",
    description: "Fix sideways scans before sending them on.",
    status: "Planned",
  },
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">PDF • Productivity • Browser Tool</p>
          <h1>QuickPDF</h1>
          <p className="lede">Simple PDF utilities without the clutter.</p>
          <p className="sublede">
            Merge, split, rotate, reorder, and inspect PDF files from a
            lightweight web interface.
          </p>
          <a className="primaryAction" href="#inspect">
            Open QuickPDF <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        <div className="statusPanel" aria-label="Project status">
          <span className="statusLabel">Status</span>
          <strong>Prototype</strong>
          <p>Current build focuses on local file inspection.</p>
        </div>
      </section>

      <section className="workspace" id="inspect">
        <div className="workspaceHeader">
          <p className="eyebrow">Current tools</p>
          <h2>Inspect a PDF</h2>
          <p>
            Drop in a PDF to read page count, file size, document version, and
            basic validation details in your browser.
          </p>
        </div>
        <FileDropzone />
      </section>

      <section className="toolGrid" aria-label="Planned PDF tools">
        {plannedTools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </section>
    </main>
  );
}
