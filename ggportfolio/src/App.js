import { useState, useEffect, useRef } from "react";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";

const NAV_LINKS = ["Services", "Work", "Team", "Contact"];

const FILTER_TABS = ["All", "Web App", "AI/ML", "SaaS"];

const SERVICES = [
  { icon: "</>", title: "Full-Stack Web Development", desc: "Scalable web applications built end-to-end with React, Node.js, and the MERN stack — modern and production-ready." },
  { icon: "🀆", title: "Mobile App Development", desc: "Cross-platform mobile applications using React Native with clean architecture and optimized performance." },
  { icon: "⇌", title: "REST API Development", desc: "High-performance RESTful APIs with secure authentication, authorization, and efficient data management." },
  { icon: "◈", title: "AI/ML Solutions", desc: "Machine learning models and AI-powered features integrated into web applications for intelligent automation." },
  { icon: "▤", title: "Database Design & Management", desc: "MongoDB, PostgreSQL, and SQL database architecture optimized for performance and scalability." },
  { icon: "☁", title: "End-to-End Product Development", desc: "From concept to deployment — building complete, production-ready applications with modern tech stacks." },
];

const TECH = ["React.js", "React Native", "Node.js", "Express.js", "MongoDB", "Python", "JavaScript", "TypeScript", "Django", "TensorFlow", "Tailwind CSS", "Git", "GitHub", "REST APIs", "JWT", "Socket.io", "PostgreSQL", "Spring Boot"];

const PROJECTS = [
  {
    tag: "SaaS", title: "DayFlow - Daily Habit Tracker", desc: "Premium daily activity tracking SaaS built with Next.js, TypeScript, and AI-powered insights.",
    longDesc: "A premium daily activity tracking SaaS built with Next.js 14, TypeScript, Tailwind CSS, and AI-powered insights via OpenRouter. Features daily task tracking, smart scheduling with an intuitive timeline, beautiful analytics with detailed reports and streaks, AI-powered personalized recommendations, achievement badges, full dark mode, and responsive design across desktop and mobile.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "NextAuth.js"], color: "#1a0d1a",
    github: "https://github.com/Pavan0-18", live: "https://example.com/",
    highlights: ["Daily task tracking", "Smart scheduling", "AI-powered insights", "Beautiful analytics", "Achievement badges", "Dark mode"],
  },
  {
    tag: "AI/ML", title: "AI-Powered Resume Analyzer", desc: "Intelligent web app for automated resume analysis using NLP and ML.",
    longDesc: "Developed an intelligent web application for automated resume analysis with PDF parsing and NLP-based skill extraction. Integrated machine learning models through backend APIs and designed dynamic dashboards for visualization of insights and recommendations.",
    techs: ["React.js", "Node.js", "Python", "NLP", "MongoDB"], color: "#0a1628",
    github: "https://github.com/Pavan0-18",
    highlights: ["NLP-based extraction", "PDF parsing", "ML model integration", "Insights dashboard"],
  },
  {
    tag: "AI/ML", title: "Fruit Quality Checker", desc: "CNN-based fruit image classification for fresh vs rotten detection.",
    longDesc: "Built a fruit image classification model using CNN with TensorFlow and Keras. Implemented image loading, preprocessing, and augmentation for robust training. Achieved reliable fresh-vs-rotten prediction with optimized architecture and regularization techniques.",
    techs: ["Python", "TensorFlow", "Keras", "CNN"], color: "#0d0d1a",
    github: "https://github.com/Pavan0-18",
    highlights: ["CNN architecture", "Image augmentation", "Fresh vs rotten", "Model optimization"],
  },
  {
    tag: "Web App", title: "LocalFeed", desc: "Hyperlocal community feed with location-based posts and user authentication.",
    longDesc: "A hyperlocal community feed web app where users can register, log in, and share posts based on their location. Built the backend using Django with user authentication and SQLite database for location-based content delivery.",
    techs: ["Python", "Django", "HTML", "SQLite"], color: "#0a0a1a",
    github: "https://github.com/Pavan0-18",
    highlights: ["Location-based posts", "User auth", "Django backend", "Community feed"],
  },
  {
    tag: "AI/ML", title: "Fruit Disease Classifier", desc: "Deep learning-based disease classification with pesticide recommendations.",
    longDesc: "Complete fruit disease classification system using EfficientNet-B4 with ONNX runtime inference. Features real-time image upload and analysis, confidence scoring, Grad-CAM visualizations, region and season-aware treatment recommendations via AI, and PDF report generation. Achieves 98.5% top-1 accuracy across 38 disease classes.",
    techs: ["Python", "TensorFlow", "Next.js", "ONNX", "TypeScript", "Tailwind CSS"], color: "#0a1a0a",
    github: "https://github.com/Pavan0-18",
    highlights: ["38 disease classes", "98.5% accuracy", "AI recommendations", "Grad-CAM visualization", "PDF reports"],
  },
  {
    tag: "Web App", title: "DevConnect", desc: "A developer networking platform for collaboration and project discovery.",
    longDesc: "A developer networking platform built to help developers connect, collaborate on open-source projects, and showcase their work. Features profile management, project discovery, and real-time messaging.",
    techs: ["React.js", "Node.js", "MongoDB", "Socket.io"], color: "#1a1a2e",
    github: "https://github.com/Pavan0-18",
    highlights: ["Profile management", "Project discovery", "Real-time messaging", "Developer networking"],
  },
];

const TEAM = [
  { name: "Dhriti R", role: "Full-Stack Developer", bio: "Full-stack developer specializing in the MERN stack with hands-on experience in React Native. Passionate about building scalable web and mobile applications with clean architecture.", image: "/images/Dhriti_image.png", email: "dhritidh947@gmail.com", phone: "+91-9035445488", linkedin: "https://www.linkedin.com/in/dhriti21" },
  { name: "Pasupuleti Pavan", role: "Full-Stack Developer", bio: "Software developer with expertise in full-stack development, AI/ML, and database technologies. Experienced in building enterprise applications and delivering user-centric solutions.", image: "/images/Pavan_image.jpeg", email: "ppasupuletibtech22@ced.alliance.edu.in", phone: "+91 9550904872", linkedin: "https://www.linkedin.com/in/pasupuleti-pavan/" },
];




const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function RevealGrid({ children, style, className = "" }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={style} className={`reveal-group ${inView ? "revealed" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectModal({ project, onClose, darkMode, border, muted, fg, cardBg, accent }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-slide-in"
        style={{
          background: cardBg, border: `1px solid ${border}`,
          borderRadius: 20, maxWidth: 640, width: "100%",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header image strip */}
        <div style={{
          height: 160,
          background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
          borderRadius: "20px 20px 0 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", position: "relative", flexShrink: 0,
        }}>
          <span style={{
            background: "rgba(255,255,255,0.12)", borderRadius: 8,
            padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "#fff",
            backdropFilter: "blur(4px)",
          }}>{project.tag}</span>
          <span style={{ fontSize: 64, opacity: 0.25 }}>⬡</span>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.12)", border: "none",
            borderRadius: "50%", width: 36, height: 36, cursor: "pointer",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}><FiX size={18} /></button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 900, color: fg, lineHeight: 1.2 }}>{project.title}</h2>
          <p style={{ color: muted, fontSize: 14, lineHeight: 1.8 }}>{project.longDesc}</p>

          {/* Highlights */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Highlights</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {project.highlights.map(h => (
                <div key={h} style={{
                  background: darkMode ? "#111120" : "#f5f5ff",
                  border: `1px solid ${border}`, borderRadius: 10,
                  padding: "10px 14px", fontSize: 13, fontWeight: 600, color: fg,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ color: accent, fontSize: 16 }}>›</span> {h}
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Tech Stack</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.techs.map(t => (
                <span key={t} style={{
                  background: darkMode ? "#1a1a2e" : "#f0f0fa",
                  color: accent, fontSize: 12, fontWeight: 700,
                  borderRadius: 8, padding: "5px 12px",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "12px 0", borderRadius: 10,
                background: darkMode ? "#111120" : "#f0f0f5",
                border: `1px solid ${border}`, color: fg,
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              className="modal-link-hover"
            >
              <FiGithub size={16} /> GitHub
            </a>
            {project.live && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "12px 0", borderRadius: 10,
                  background: `linear-gradient(135deg, #7c5cfc, #4fa3e0)`,
                  border: "none", color: "#fff",
                  fontWeight: 700, fontSize: 14, textDecoration: "none",
                }}
              >
                <FiExternalLink size={16} /> Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [selectedProject, setSelectedProject] = useState(null);

  const words = ["Web Apps", "Mobile Apps", "APIs", "Full-Stack Solutions"];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  
  const [formError, setFormError] = useState("");
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let timeout;
    const type = () => {
      const word = words[wordRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === word.length) {
          deletingRef.current = true;
          timeout = setTimeout(type, 1000);
          return;
        }
      } else {
        charRef.current--;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          wordRef.current = (wordRef.current + 1) % words.length;
        }
      }
      timeout = setTimeout(type, deletingRef.current ? 60 : 140);
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs?.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
  }, []);

  const handleSend = async () => {
  const { name, email, message } = formData;

  if (!name.trim() || !email.trim() || !message.trim()) {
    setFormError("Please fill all fields before submitting.");
    
    // auto-hide after 3 sec
    setTimeout(() => setFormError(""), 4000);
    return;
  }

  setFormError("");
  setFormStatus("sending");

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message,
      to_email: "lioris.officialdev@gmail.com",
    });

    setFormStatus("success");
    setFormData({ name: "", email: "", message: "" });

  } catch (err) {
    console.error(err);
    setFormStatus("error");
  }
};

  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === activeFilter);

  const bg     = darkMode ? "#0a0a0f" : "#f5f5f7";
  const fg     = darkMode ? "#ffffff" : "#0a0a0f";
  const cardBg = darkMode ? "#111118" : "#ffffff";
  const border = darkMode ? "#1e1e2e" : "#e5e5ea";
  const muted  = darkMode ? "#888899" : "#666677";
  const accent = "#7c5cfc";

  const s = {
    root: { fontFamily: "'Syne', 'DM Sans', sans-serif", background: bg, color: fg, minHeight: "100vh", transition: "background 0.3s, color 0.3s", overflowX: "clip" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3%", height: 64, background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(245,245,247,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}` },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, color: fg, textDecoration: "none" },
    // Logo box: replace the "L" text with an <img> once you have the asset
    logoBox: { width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14, flexShrink: 0, overflow: "hidden" },
    navLinks: { display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 },
    navLink: { color: muted, fontSize: 14, cursor: "pointer", transition: "color 0.2s", fontWeight: 500, textDecoration: "none" },
    navRight: { display: "flex", alignItems: "center", gap: 12 },
    themeBtn: { background: "none", border: `1px solid ${border}`, borderRadius: 20, width: 36, height: 36, cursor: "pointer", color: fg, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" },
    talkBtn: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
    hero: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 3% 40px", position: "relative" },
    badge: { display: "inline-flex", alignItems: "center", gap: 8, background: darkMode ? "#1a1a2e" : "#ebebf5", border: `1px solid ${border}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: muted, marginBottom: 32, fontWeight: 500 },
    heroBadgeDot: { width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee", flexShrink: 0 },
    // Heading: wide, compressed height — large font, tight line-height, generous maxWidth
    heroH1: { fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, maxWidth: 1100, letterSpacing: "-0.02em" },
    heroTyped: { background: "linear-gradient(90deg, #7c5cfc, #4fa3e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroCursor: { display: "inline-block", width: 3, height: "0.85em", background: accent, verticalAlign: "middle", marginLeft: 3, animation: "blink 1s step-end infinite" },
    heroSub: { fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: muted, maxWidth: 540, lineHeight: 1.75, marginBottom: 40 },
    heroButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 },
    btnPrimary: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 8 },
    btnOutline: { background: "none", color: fg, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 },
    // Stats: only "Currently available"
    heroStats: { display: "flex", gap: 28, alignItems: "center", color: muted, fontSize: 13, flexWrap: "wrap", justifyContent: "center" },
    section: { padding: "100px 3%", maxWidth: 1200, margin: "0 auto" },
    sectionTag: { fontSize: 22, fontWeight: 720, textTransform: "uppercase", color: accent, marginBottom: 12 },
    // Section headings: wider, less tall
    sectionH2: { fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.1, letterSpacing: "-0.02em" },
    sectionSub: { color: muted, fontSize: 15, lineHeight: 1.75, maxWidth: 520, marginBottom: 56 },
    card: { background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 0, transition: "border-color 0.2s, transform 0.2s", height: "100%", boxSizing: "border-box" },
    cardIconWrap: { width: 44, height: 44, borderRadius: 12, background: darkMode ? "#1a1a30" : "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, border: `1px solid ${border}`, flexShrink: 0 },
    cardTitle: { fontWeight: 700, fontSize: 16, marginBottom: 10, lineHeight: 1.3, color: fg },
    cardDesc: { color: muted, fontSize: 14, lineHeight: 1.7, flexGrow: 1 },
    techSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "60px 3%", textAlign: "center" },
    techTags: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32 },
    techTag: { background: darkMode ? "#111118" : "#fff", border: `1px solid ${border}`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: muted },
    filterRow: { display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" },
    filterBtn: (active) => ({ background: active ? accent : (darkMode ? "#111118" : "#fff"), color: active ? "#fff" : muted, border: `1px solid ${active ? accent : border}`, borderRadius: 20, padding: "7px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }),
    projCard: (color) => ({ background: darkMode ? color : "#fafafa", border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", transition: "transform 0.2s, border-color 0.2s", display: "flex", flexDirection: "column", position: "relative",height: "100%",}),
    projImg: (color) => ({ height: 170, background: `linear-gradient(135deg, ${color}, ${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative", flexShrink: 0 }),
    projTag: { position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.12)", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#fff", backdropFilter: "blur(4px)" },
    projBody: { padding: "20px 20px 48px", display: "flex", flexDirection: "column", flex: 1 },
    projTitle: { fontWeight: 800, fontSize: 16, marginBottom: 8, color: fg, lineHeight: 1.3 },
    projDesc: { color: muted, fontSize: 13, lineHeight: 1.65, marginBottom: 14, flexGrow: 1 },
    tags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
    tag: { background: darkMode ? "#1a1a2e" : "#f0f0fa", color: accent, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px", marginBottom: 10, },
    viewBtnContainer: {
  position: "absolute",
  bottom: 16,
  right: 16,
  
},
viewBtn: {
  color: "#A78BFA",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "transparent", 
  border: "none",           
  padding: "4px 6px",
  borderRadius: "6px",
  opacity: 0.8,
  transition: "all 0.2s ease",
},
viewBtnHover: {
  opacity: 1,
  transform: "translateY(-1px)",
},
    teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, justifyItems: "center" },
    teamCard: { background: darkMode ? "linear-gradient(135deg, rgba(20,20,35,0.9), rgba(15,15,25,0.7))" : "#ffffff", border: `1px solid ${border}`, borderRadius: 20, padding: "24px 28px", display: "flex", gap: 22, alignItems: "center", width: "100%", maxWidth: 420, boxSizing: "border-box", backdropFilter: "blur(12px)", transition: "all 0.3s ease" },
    teamImage: { width: 140, height: 220, borderRadius: 14, objectFit: "cover", border: `2px solid ${border}`, boxShadow: "0 8px 20px rgba(0,0,0,0.25)", flexShrink: 0 },
    teamInfo: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
    teamName: { fontWeight: 800, fontSize: 17, color: fg, lineHeight: 1.2 },
    teamRole: { color: accent, fontSize: 12, fontWeight: 600, marginBottom: 6 },
    teamBio: { color: muted, fontSize: 13, lineHeight: 1.65 },
    contactSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}` },
    contactInner: { maxWidth: 1100, margin: "0 auto", padding: "100px 3%", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" },
    contactInfo: { display: "flex", flexDirection: "column", gap: 24 },
    contactItem: { display: "flex", gap: 14, alignItems: "flex-start" },
    contactIconBox: { width: 40, height: 40, borderRadius: 10, background: darkMode ? "#1a1a30" : "#ebebff", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
    contactLabel: { fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 },
    contactVal: { fontWeight: 600, fontSize: 15, color: fg },
    formCard: { background: cardBg,border: `1px solid ${border}`, borderRadius: 20, padding: 32, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 18 ,height:"100%",width:"90%",minWidth: 320,alignSelf: "center"},
    formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    formGroup: { display: "flex", flexDirection: "column" },
    label: { display: "block", fontSize: 12, fontWeight: 700, color: muted, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.08em" },
    input: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
    textarea: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 200 },
    sendBtn: { width: "100%", background: formStatus === "sending" ? "#555" : "linear-gradient(135deg, #7c5cfc, #4fa3e0)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, cursor: formStatus === "sending" ? "not-allowed" : "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
    footer: { background: darkMode ? "#050508" : "#e8e8f0", borderTop: `1px solid ${border}`, padding: "48px 3% 32px" },
    footerInner: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 40 },
    footerDesc: { color: muted, fontSize: 14, lineHeight: 1.75, marginTop: 12, maxWidth: 260 },
    footerColTitle: { fontWeight: 800, fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: muted },
    footerLinks: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
    footerLink: { color: muted, fontSize: 14, cursor: "pointer" },
    footerBottom: { borderTop: `1px solid ${border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", color: muted, fontSize: 13, flexWrap: "wrap", gap: 12 },
  };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 70%{transform:scale(1.5);opacity:0} 100%{transform:scale(1.5);opacity:0} }
        @keyframes pop-in     { 0%{opacity:0;transform:scale(0.85) translateY(16px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes modal-in   { from{opacity:0;transform:scale(0.94) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }

        .hero-a1 { animation: fadeUp 0.8s ease both; }
        .hero-a2 { animation: fadeUp 0.8s 0.15s ease both; }
        .hero-a3 { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-a4 { animation: fadeUp 0.8s 0.45s ease both; }

        .reveal-group > * { opacity:0; transform:translateY(32px); transition:opacity 0.55s ease,transform 0.55s ease; }
        .reveal-group.revealed > *:nth-child(1){opacity:1;transform:none;transition-delay:0s}
        .reveal-group.revealed > *:nth-child(2){opacity:1;transform:none;transition-delay:0.1s}
        .reveal-group.revealed > *:nth-child(3){opacity:1;transform:none;transition-delay:0.2s}
        .reveal-group.revealed > *:nth-child(4){opacity:1;transform:none;transition-delay:0.3s}
        .reveal-group.revealed > *:nth-child(5){opacity:1;transform:none;transition-delay:0.4s}
        .reveal-group.revealed > *:nth-child(6){opacity:1;transform:none;transition-delay:0.5s}

        .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; animation:float 8s ease-in-out infinite; }
        .shimmer-text { background:linear-gradient(90deg,#7c5cfc,#4fa3e0,#7c5cfc,#4fa3e0); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }
        .pulse-wrap { position:relative; display:inline-flex; align-items:center; padding-left:14px; }
        .pulse-wrap::before { content:''; position:absolute; left:0; top:30%; transform:translateY(-50%); width:7px; height:7px; border-radius:50%; background:#22c55e; animation:pulse-ring 2s ease-out infinite; }

        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#7c5cfc; border-radius:2px; transition:width 0.25s ease; }
        .nav-link:hover { color:#fff !important; }
        .nav-link:hover::after { width:100%; }

        .card-hover:hover { border-color:#7c5cfc !important; transform:translateY(-6px) !important; box-shadow:0 16px 40px rgba(124,92,252,0.18) !important; }
        .card-hover:hover .card-icon-inner { transform:scale(1.15) rotate(-6deg); }
        .card-icon-inner { transition:transform 0.3s; }

        .proj-hover:hover { transform:translateY(-6px) !important; border-color:#7c5cfc !important; box-shadow:0 20px 48px rgba(0,0,0,0.35) !important; }
        .proj-hover:hover .proj-hex { transform:scale(1.12) rotate(12deg); opacity:0.5; }
        .proj-hex { transition:transform 0.4s ease,opacity 0.4s ease; }

        .team-card-hover:hover { border-color:#7c5cfc !important; transform:translateY(-4px); box-shadow:0 16px 40px rgba(124,92,252,0.15) !important; }
        .team-card-hover:hover .team-photo { transform:scale(1.05); }
        .team-photo { transition:transform 0.4s ease; }

        .tech-tag-hover:hover { border-color:#7c5cfc !important; color:#7c5cfc !important; transform:translateY(-2px); }

        .modal-slide-in { animation:modal-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .modal-link-hover:hover { border-color:#7c5cfc !important; }

        .pop-in { animation:pop-in 0.4s ease both; }

        input::placeholder, textarea::placeholder { color:#555566; }
        input:focus, textarea:focus { border-color:#7c5cfc !important; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
      `}</style>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          darkMode={darkMode} border={border} muted={muted} fg={fg} cardBg={cardBg} accent={accent}
        />
      )}

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <img src="./Lioris (2).png" alt="Lioris Logo" style={s.logoBox} />
          Lioris
        </div>
        <ul style={s.navLinks}>
          {NAV_LINKS.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={s.navLink}
                className="nav-link"
                onClick={e => { e.preventDefault(); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
              >{l}</a>
            </li>
          ))}
        </ul>
        <div style={s.navRight}>
          <button style={s.themeBtn} onClick={() => setDarkMode(d => !d)}>{darkMode ? "☀" : "⏾"}</button>
          <button style={s.talkBtn} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "slow" })}>Contact Us</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={s.hero}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,92,252,0.12)", top: "10%", left: "5%", animationDelay: "0s" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(79,163,224,0.1)", top: "20%", right: "5%", animationDelay: "3s" }} />
        <div className="hero-a1" style={s.badge}>
          <span style={s.heroBadgeDot} />
          Open for opportunities
        </div>
        <h1 className="hero-a2" style={s.heroH1}>
          We build <span className="shimmer-text">{typedText}</span><span style={s.heroCursor} /><br />that deliver.
        </h1>
        <p className="hero-a3" style={s.heroSub}>
We are a team of full-stack developers focused on building scalable, high-performance applications. From web and mobile platforms to intelligent, data-driven solutions, we turn ideas into seamless digital experiences that deliver real impact.        </p>
        <div className="hero-a4" style={s.heroButtons}>
          <button style={s.btnPrimary} onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>View Our Work →</button>
          <button style={s.btnOutline} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Get in Touch</button>
        </div>
        <div className="hero-a4" style={s.heroStats}>
          <span className="pulse-wrap">Available for opportunities</span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <div id="services" style={{ background: darkMode ? "#060609" : "#f8f8fc", borderTop: `1px solid ${border}` }}>
        <div style={s.section}>
          <div style={s.sectionTag}>What We Do</div>
          <h2 style={s.sectionH2}>Our expertise & capabilities</h2>
          <p style={s.sectionSub}>From frontend to backend, AI to mobile — we cover the full stack to bring your ideas to life.</p>
          <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {SERVICES.map(svc => (
              <div key={svc.title} style={s.card} className="card-hover">
                <div style={s.cardIconWrap} className="card-icon-inner">{svc.icon}</div>
                <div style={s.cardTitle}>{svc.title}</div>
                <div style={s.cardDesc}>{svc.desc}</div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </div>

      {/* ── TECH ── */}
      <div style={s.techSection}>
        <div style={s.sectionTag}>Our Tech</div>
        <h2 style={{ ...s.sectionH2, textAlign: "center" }}>Technologies we work with</h2>
        <p style={{ ...s.sectionSub, margin: "0 auto", textAlign: "center" }}>Modern tools and frameworks we use to build production-ready applications.</p>
        <div style={s.techTags}>
          {TECH.map(t => <span key={t} style={s.techTag} className="tech-tag-hover">{t}</span>)}
        </div>
      </div>

      {/* ── WORK ── */}
      <div id="work" style={{ background: bg }}>
        <div style={s.section}>
          <div style={s.sectionTag}>Our Projects</div>
          <h2 style={s.sectionH2}>What we've built</h2>
          <p style={s.sectionSub}>A selection of projects showcasing our skills across web, mobile, AI/ML, and full-stack development.</p>
          <div style={s.filterRow}>
            {FILTER_TABS.map(f => (
              <button key={f} style={s.filterBtn(activeFilter === f)} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, alignItems: "stretch" }}>
  {filteredProjects.map(p => (
    <div key={p.title} style={s.projCard(p.color)} className="proj-hover">

      <div style={s.projImg(p.color)}>
        <span style={s.projTag}>{p.tag}</span>
        <span className="proj-hex" style={{ fontSize: 48, opacity: 0.35 }}>⬡</span>
      </div>

      <div style={s.projBody}>
        <div style={s.projTitle}>{p.title}</div>
        <div style={s.projDesc}>{p.desc}</div>
        <div style={s.tags}>
          {p.techs.map(t => <span key={t} style={s.tag}>{t}</span>)}
        </div>
      </div>

   
      <div style={s.viewBtnContainer}>
        <button className="view-btn" style={s.viewBtn} onClick={() => setSelectedProject(p)}>
          View ➔
        </button>
      </div>

    </div>
  ))}
</RevealGrid>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div id="team" style={{ background: darkMode ? "#060609" : "#f0f0f5", borderTop: `1px solid ${border}` }}>
        <div style={s.section}>
          <div style={{ ...s.sectionTag, textAlign: "center" }}>About Us</div>
          <h2 style={{ ...s.sectionH2, textAlign: "center" }}>Meet the developers</h2>
          <p style={{ ...s.sectionSub, margin: "0 auto 60px", textAlign: "center" }}>Two passionate engineers building the future, one project at a time.</p>
          <div style={s.teamGrid}>
            {TEAM.map(t => (
              <div key={t.name} style={s.teamCard} className="team-card-hover">
                <img src={t.image} alt={t.name} style={s.teamImage} className="team-photo" />
                <div style={s.teamInfo}>
                  <div style={s.teamName}>{t.name}</div>
                  <div style={s.teamRole}>{t.role}</div>
                  <div style={s.teamBio}>{t.bio}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <a href={`mailto:${t.email}`} style={{ color: accent, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Email</a>
                    <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: accent, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>LinkedIn</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



     {/* ── CONTACT ── */}
<div id="contact" style={s.contactSection}>
  <div style={s.contactInner}>
    
    {/* LEFT SIDE */}
    <div>
      <div style={s.sectionTag}>Get In Touch</div>
      <h2 style={s.sectionH2}>Let's work together</h2>
      <p style={{ ...s.sectionSub, marginBottom: 40 }}>
        Have a project in mind? Reach out to either of us and we'll get back to you.
      </p>

      <div style={s.contactInfo}>
        {[
          { icon: "✉", label: "Email", val: "lioris.officialdev@gmail.com" },
          { icon: "📞", label: "Contact number 1", val: "+91 9035445488" },
          { icon: "📞", label: "Contact number 2", val: "+91 9550904872" },
          { icon: "⚲", label: "Location", val: "Karnataka, India" },
        ].map(item => (
          <div key={item.label} style={s.contactItem}>
            <div style={s.contactIconBox}>{item.icon}</div>
            <div>
              <div style={s.contactLabel}>{item.label}</div>
              <div style={s.contactVal}>{item.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <div>
    <div style={s.formCard}>

      <div style={s.formRow}>
        <div style={s.formGroup}>
          <label style={s.label}>Your name</label>
          <input
            style={{
              ...s.input,
              border: formError && !formData.name ? "1px solid #ef4444" : s.input.border,
            }}
            placeholder="Jane Doe"
            value={formData.name}
            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>Email</label>
          <input
            style={{
              ...s.input,
              border: formError && !formData.email ? "1px solid #ef4444" : s.input.border,
            }}
            placeholder="jane@company.com"
            value={formData.email}
            onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Project description</label>
        <textarea
          style={{
            ...s.textarea,
            border: formError && !formData.message ? "1px solid #ef4444" : s.textarea.border,
          }}
          placeholder="Tell us about your project, goals, and timeline..."
          value={formData.message}
          onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
        />
      </div>
      

      {/* 🔴 VALIDATION ERROR */}
      {formError && (
        <div
          className="pop-in"
          style={{
            background: "#2a0d0d",
            border: "1px solid #ef4444",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            color: "#ef4444",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {formError}
        </div>
      )}

      {/* 🟢 SUCCESS */}
      {formStatus === "success" && (
        <div
          className="pop-in"
          style={{
            background: "#0d2a1a",
            border: "1px solid #22c55e",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            color: "#22c55e",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Message sent! We'll get back to you shortly.
        </div>
      )}

      {/* 🔴 SEND ERROR */}
      {formStatus === "error" && (
        <div
          className="pop-in"
          style={{
            background: "#2a0d0d",
            border: "1px solid #ef4444",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            color: "#ef4444",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Something went wrong. Please email us directly.
        </div>
      )}

      {/* BUTTON */}
      <button
        style={s.sendBtn}
        onClick={handleSend}
        disabled={formStatus === "sending"}
      >
        {formStatus === "sending" ? "Sending…" : "Send message →"}
      </button>
      </div>
    </div>
  </div>
</div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={{ marginLeft: 100 }}>
            <div style={s.logo}>
              <img src="./Lioris (2).png" alt="Lioris Logo" style={s.logoBox} />{" "}
              <span>Lioris</span>
            </div>
            <div style={s.footerDesc}>Full-stack developers building modern web and mobile applications. Based in Karnataka, India.</div>
          </div>
          <div>
            <div style={s.footerColTitle}>Quick Links</div>
            <ul style={s.footerLinks}>
              {NAV_LINKS.map(l => (
                <li key={l}>
                  <span style={s.footerLink} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={s.footerColTitle}>Social</div>
            <ul style={s.footerLinks}>
              <li><a href="https://github.com/Pavan0-18" target="_blank" rel="noopener noreferrer" style={s.footerLink}>Pavan's GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/pasupuleti-pavan/" target="_blank" rel="noopener noreferrer" style={s.footerLink}>Pavan's LinkedIn</a></li>
              <li><a href="https://www.linkedin.com/in/dhriti21" target="_blank" rel="noopener noreferrer" style={s.footerLink}>Dhriti's LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div style={s.footerBottom}>
          <span>© 2026 Lioris. All rights reserved.</span>
          <span>Built with ♥ and a lot of caffeine</span>
        </div>
      </footer>
    </div>
  );
}