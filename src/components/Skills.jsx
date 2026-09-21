import Section from "./Section.jsx";
import { SKILLS } from "../data.js";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills">
        {SKILLS.map(([label, items]) => (
          <div className="skill-row" key={label}>
            <dt>{label}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
