export default function DocView({ html, format }) {
  return (
    <article className="doc-view">
      <div className="doc-view__meta">Формат: {format}</div>
      <div
        className="doc-view__body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}