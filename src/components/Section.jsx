export default function Section({ id, title, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="section-title" id={`${id}-title`}>{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}
