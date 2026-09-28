type ToolCardProps = {
  title: string;
  description: string;
  status: string;
};

export default function ToolCard({ title, description, status }: ToolCardProps) {
  return (
    <article className="toolCard">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="toolStatus">{status}</span>
    </article>
  );
}
