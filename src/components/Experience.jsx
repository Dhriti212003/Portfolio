import Section from "./Section.jsx";
import { EXPERIENCE } from "../data.js";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <h3 className="role">{EXPERIENCE.role}</h3>
      <p className="meta">{EXPERIENCE.org}</p>
      <p className="meta">{EXPERIENCE.when}</p>
      <ul className="list">
        {EXPERIENCE.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </Section>
  );
}
