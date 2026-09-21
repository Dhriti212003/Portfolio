import Section from "./Section.jsx";
import ExtLink from "./ExtLink.jsx";
import { LINKS } from "../data.js";

export default function Contact() {
  const tel = `tel:${LINKS.phone.replace(/[^+\d]/g, "")}`;
  return (
    <Section id="contact" title="Contact">
      <p className="contact-lead">
        I’m happy to talk about frontend and mobile work. Email is the quickest way to reach me.
      </p>
      <div className="hero-actions">
        {LINKS.email && <a className="btn btn-solid" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(LINKS.email)}`}>{LINKS.email}</a>}
        {LINKS.phone && <a className="btn" href={tel}>{LINKS.phone}</a>}
        <ExtLink className="btn" href={LINKS.github}>GitHub</ExtLink>
        <ExtLink className="btn" href={LINKS.linkedin}>LinkedIn</ExtLink>
      </div>
    </Section>
  );
}
