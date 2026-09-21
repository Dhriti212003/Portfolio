import ExtLink from "./ExtLink.jsx";
import { LINKS } from "../data.js";

export default function Hero() {
  return (
    <div className="wrap">
      <div className="hero">
        <h1 className="hero-name">Dhriti R</h1>
        <p className="hero-lead">
          I build React and React Native interfaces, and I care about the details: fast search,
          clear loading states, and components other people can pick up.
        </p>
        <p className="hero-sub">
          B.Tech in Computer Science from Alliance University, based in Bangalore. Recently a React
          Native intern at AEPL.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#projects">See projects</a>
          <a className="btn" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(LINKS.email)}`}>Email me</a>
          <ExtLink className="btn" href={LINKS.github}>GitHub</ExtLink>
          <ExtLink className="btn" href={LINKS.linkedin}>LinkedIn</ExtLink>
        </div>
      </div>
    </div>
  );
}
