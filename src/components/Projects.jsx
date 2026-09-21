import Section from "./Section.jsx";
import ExtLink from "./ExtLink.jsx";
import CollectionDemo from "./CollectionDemo.jsx";
import { LINKS } from "../data.js";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <article className="project">
        <h3 className="project-name">Collector’s Hub</h3>
        <p className="stack">React 19, TypeScript, Vite, React Router</p>
        <ul className="list">
          <li>A responsive platform for collectors with three modules: Marketplace, Community Feed, and My Collection.</li>
          <li>Built with 10+ reusable UI components, 5 Context providers, and 2 custom hooks for debounced search, theming, and local persistence.</li>
          <li>Includes infinite scrolling, filtering, sorting, optimistic updates, skeleton loaders, error and retry flows, toasts, dark mode, and lazy-loaded images.</li>
          <li>Collection management with three mutually exclusive states (Owned, Wishlist, Selling), duplicate protection, live counts, and saved local storage.</li>
        </ul>
        <div className="project-links">
          <ExtLink className="btn" href={LINKS.collectorsHubDemo}>Live demo</ExtLink>
        </div>
        <CollectionDemo />
      </article>

      <article className="project">
        <h3 className="project-name">AI-Driven Disease Prediction and Treatment System</h3>
        <p className="stack">Python, Scikit-learn, TensorFlow, Flask</p>
        <ul className="list">
          <li>A web app that predicts likely diseases from symptoms a user describes.</li>
          <li>Text preprocessing with NLP techniques, then Random Forest and MLP classifiers, with LIME to explain each prediction.</li>
          <li>Deployed with Flask for real-time predictions and treatment recommendations.</li>
        </ul>
        <div className="project-links">
          <ExtLink className="btn" href={LINKS.diseaseRepo}>View on GitHub</ExtLink>
        </div>
      </article>
    </Section>
  );
}
