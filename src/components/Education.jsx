import Section from "./Section.jsx";
import { EDUCATION, ACHIEVEMENTS, CERTIFICATIONS } from "../data.js";

function Rows({ rows }) {
  return (
    <ul className="rows">
      {rows.map(([when, main, sub]) => (
        <li className="row" key={main}>
          <span className="row-when">{when}</span>
          <div>
            <p className="row-main">{main}</p>
            <p className="row-sub">{sub}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Education() {
  return (
    <Section id="education" title="Education">
      <Rows rows={EDUCATION} />

      <h3 className="subhead">Achievements</h3>
      <ul className="list" style={{ marginTop: 0 }}>
        {ACHIEVEMENTS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h3 className="subhead">Certifications</h3>
      <Rows rows={CERTIFICATIONS} />
    </Section>
  );
}
