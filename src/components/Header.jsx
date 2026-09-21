export default function Header({ theme, onToggle }) {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <nav className="nav" aria-label="Sections">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        <button type="button" className="theme-btn" onClick={onToggle}>
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </button>
      </div>
    </header>
  );
}
