// External link that renders nothing when href is empty
export default function ExtLink({ href, className, children }) {
  if (!href) return null;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
