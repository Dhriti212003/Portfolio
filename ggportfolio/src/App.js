
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiPenTool, FiZap, FiSend } from "react-icons/fi";

const NAV_LINKS = ["Services", "Work", "Team", "Process", "Contact"];

const SERVICES = [
  { icon: "</>", title: "Full-Stack Web Development", desc: "Modern, scalable web apps built end-to-end with React, Next.js, and Node — pixel-perfect and production-ready." },
  { icon: "⬡", title: "SaaS Product Development", desc: "From idea to revenue. We design and ship SaaS products with auth, billing, analytics, and infra baked in." },
  { icon: "⇌", title: "REST API & Backend Systems", desc: "High-performance REST & GraphQL APIs, microservices, and event-driven backends that just scale." },
  { icon: "◈", title: "UI/UX Design & Prototyping", desc: "Beautiful, accessible interfaces. Figma to code with a strong opinionated design system." },
  { icon: "▤", title: "Database Architecture", desc: "PostgreSQL, MongoDB, Redis — modeled, indexed, and tuned for the queries your product actually runs." },
  { icon: "☁", title: "DevOps & Cloud Deployment", desc: "CI/CD, Docker, AWS & Vercel. Zero-downtime deploys with observability you can trust at 3 AM." },
];

const TECH = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Prisma", "TailwindCSS", "Docker", "AWS", "Vercel", "Figma", "GraphQL", "Redis"];

const PROJECTS = [
  { tag: "SaaS", title: "Lumen Analytics", desc: "Real-time SaaS analytics platform processing 50M+ events per day with custom dashboards.", techs: ["Next.js", "PostgreSQL", "Redis", "AWS"], color: "#0f2027" },
  { tag: "SaaS", title: "Nimbus Cloud Console", desc: "Multi-tenant cloud management dashboard with team workspaces and role-based access.", techs: ["React", "Node.js", "Docker"], color: "#0a1628" },
  { tag: "Web App", title: "Orbit Commerce", desc: "Headless e-commerce platform with Stripe Connect and personalized recommendations.", techs: ["Next.js", "Prisma", "Stripe"], color: "#0d1f0d" },
  { tag: "API", title: "Pulse API Gateway", desc: "High-throughput REST gateway handling 10k req/s with rate limiting and observability.", techs: ["Node.js", "GraphQL", "Redis"], color: "#1a0a0a" },
  { tag: "Mobile", title: "Mira Fitness", desc: "Cross-platform mobile fitness coach with AI workout planning and wearable sync.", techs: ["React Native", "Node.js", "MongoDB"], color: "#0d0d1a" },
  { tag: "Mobile", title: "Echo Messenger", desc: "End-to-end encrypted team chat with voice rooms and message search at scale.", techs: ["React Native", "WebRTC", "PostgreSQL"], color: "#0a0a1a" },
];

const TEAM = [
  { name: "Dhriti R", role: "Frontend Lead & Product Designer", bio: "Crafts the pixel-perfect side of Vexora.", image: "/images/Dhriti_image.png" },
  { name: "Pasupuleti Pavan", role: "Software Developer", bio: "Lives in distributed systems. Ships APIs that scale to thousands of requests without breaking a sweat.", image: "/images/Pavan_image.jpeg" },
];

const PROCESS = [
  { icon: FiSearch, title: "Discovery & Planning", desc: "We deep-dive into your goals, users, and constraints to scope the right thing." },
  { icon: FiPenTool, title: "Design & Prototype", desc: "High-fidelity prototypes in Figma, validated before a single line of code." },
  { icon: FiZap, title: "Build & Test", desc: "Weekly demos, automated tests, and code reviews on every PR." },
  { icon: FiSend, title: "Deploy & Support", desc: "CI/CD to production, monitoring, and 30 days of post-launch support." },
];

const FILTER_TABS = ["All", "Web App", "SaaS", "API", "Mobile"];

const EMAILJS_SERVICE_ID  = "service_491rw2e";
const EMAILJS_TEMPLATE_ID = "template_ng8svy8";
const EMAILJS_PUBLIC_KEY  = "K_PZM9TajVUWCXJNT";

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

// ── FIXED: ref goes on the grid itself, so cards are direct children of .reveal-group
function RevealGrid({ children, style, className = "" }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={style} className={`reveal-group ${inView ? "revealed" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");

  const words = ["SaaS Products", "Web Apps", "APIs", "MVPs"];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

 useEffect(() => {
  let timeout;

  const type = () => {
    const word = words[wordRef.current];

    if (!deletingRef.current) {
      charRef.current++;
      setTypedText(word.slice(0, charRef.current));

      if (charRef.current === word.length) {
        deletingRef.current = true;
        timeout = setTimeout(type, 1000); // pause after typing
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
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
  }, []);

  const handleSend = async () => {
    const { name, email, budget, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in your name, email, and project description.");
      return;
    }
    setFormStatus("sending");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        
        message: message,
        to_email: "dhritidh947@gmail.com",
      });
      setFormStatus("success");
      setFormData({ name: "", email: "",  message: "" });
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === activeFilter);

  const bg      = darkMode ? "#0a0a0f" : "#f5f5f7";
  const fg      = darkMode ? "#ffffff" : "#0a0a0f";
  const cardBg  = darkMode ? "#111118" : "#ffffff";
  const border  = darkMode ? "#1e1e2e" : "#e5e5ea";
  const muted   = darkMode ? "#888899" : "#666677";
  const accent  = "#7c5cfc";

  const s = {
    root: { fontFamily: "'Syne', 'DM Sans', sans-serif", background: bg, color: fg, minHeight: "100vh", transition: "background 0.3s, color 0.3s", overflowX: "clip" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3%", height: 64, background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(245,245,247,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}` },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, color: fg, textDecoration: "none" },
    logoBox: { width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14, flexShrink: 0 },
    navLinks: { display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 },
    navLink: { color: muted, fontSize: 14, cursor: "pointer", transition: "color 0.2s", fontWeight: 500, textDecoration: "none" },
    navRight: { display: "flex", alignItems: "center", gap: 12 },
    themeBtn: { background: "none", border: `1px solid ${border}`, borderRadius: 20, width: 36, height: 36, cursor: "pointer", color: fg, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" },
    talkBtn: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
    hero: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 3% 40px", position: "relative" },
    badge: { display: "inline-flex", alignItems: "center", gap: 8, background: darkMode ? "#1a1a2e" : "#ebebf5", border: `1px solid ${border}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: muted, marginBottom: 32, fontWeight: 500 },
    heroBadgeDot: { width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee", flexShrink: 0 },
    heroH1: { fontSize: "clamp(2.6rem, 7vw, 5.2rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: 24, maxWidth: 900 },
    heroTyped: { background: "linear-gradient(90deg, #7c5cfc, #4fa3e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroCursor: { display: "inline-block", width: 3, height: "0.85em", background: accent, verticalAlign: "middle", marginLeft: 3, animation: "blink 1s step-end infinite" },
    heroSub: { fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: muted, maxWidth: 540, lineHeight: 1.75, marginBottom: 40 },
    heroButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 },
    btnPrimary: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 8 },
    btnOutline: { background: "none", color: fg, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 },
    heroStats: { display: "flex", gap: 28, alignItems: "center", color: muted, fontSize: 13, flexWrap: "wrap", justifyContent: "center" },
    statDot: { width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", marginRight: 6 },
    section: { padding: "100px 3%", maxWidth: 1200, margin: "0 auto" },
    sectionTag: { fontSize:22, fontWeight: 720,  textTransform: "uppercase", color: accent, marginBottom: 12 },
    sectionH2: { fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 },
    sectionSub: { color: muted, fontSize: 15, lineHeight: 1.75, maxWidth: 520, marginBottom: 56 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" },
    card: { background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 0, transition: "border-color 0.2s, transform 0.2s", height: "100%", boxSizing: "border-box" },
    cardIconWrap: { width: 44, height: 44, borderRadius: 12, background: darkMode ? "#1a1a30" : "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, border: `1px solid ${border}`, flexShrink: 0 },
    cardTitle: { fontWeight: 700, fontSize: 16, marginBottom: 10, lineHeight: 1.3, color: fg },
    cardDesc: { color: muted, fontSize: 14, lineHeight: 1.7, flexGrow: 1 },
    techSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "60px 3%", textAlign: "center" },
    techTags: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32 },
    techTag: { background: darkMode ? "#111118" : "#fff", border: `1px solid ${border}`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: muted },
    filterRow: { display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" },
    filterBtn: (active) => ({ background: active ? accent : (darkMode ? "#111118" : "#fff"), color: active ? "#fff" : muted, border: `1px solid ${active ? accent : border}`, borderRadius: 20, padding: "7px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }),
    projCard: (color) => ({ background: darkMode ? color : "#fafafa", border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", transition: "transform 0.2s, border-color 0.2s", display: "flex", flexDirection: "column" }),
    projImg: (color) => ({ height: 170, background: `linear-gradient(135deg, ${color}, ${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative", flexShrink: 0 }),
    projTag: { position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.12)", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#fff", backdropFilter: "blur(4px)" },
    projBody: { padding: "20px 20px 24px", display: "flex", flexDirection: "column", flex: 1 },
    projTitle: { fontWeight: 800, fontSize: 16, marginBottom: 8, color: fg, lineHeight: 1.3 },
    projDesc: { color: muted, fontSize: 13, lineHeight: 1.65, marginBottom: 14, flexGrow: 1 },
    tags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
    tag: { background: darkMode ? "#1a1a2e" : "#f0f0fa", color: accent, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px" },
    caseLink: { color: accent, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 },
    teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, justifyItems: "center" },
    teamCard: { background: darkMode ? "linear-gradient(135deg, rgba(20,20,35,0.9), rgba(15,15,25,0.7))" : "#ffffff", border: `1px solid ${border}`, borderRadius: 20, padding: "24px 28px", display: "flex", gap: 22, alignItems: "center", width: "100%", maxWidth: 420, boxSizing: "border-box", backdropFilter: "blur(12px)", transition: "all 0.3s ease" },
    teamImage: { width: 100, height: 130, borderRadius: 14, objectFit: "cover", border: `2px solid ${border}`, boxShadow: "0 8px 20px rgba(0,0,0,0.25)", flexShrink: 0 },
    teamInfo: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
    teamName: { fontWeight: 800, fontSize: 17, color: fg, lineHeight: 1.2 },
    teamRole: { color: accent, fontSize: 12, fontWeight: 600, marginBottom: 6 },
    teamBio: { color: muted, fontSize: 13, lineHeight: 1.65 },
    processLine: { display: "flex", gap: 0, alignItems: "flex-start", position: "relative", marginTop: 60, overflowX: "auto", paddingBottom: 20 },
    processStep: { flex: 1, minWidth: 160, textAlign: "center", position: "relative", padding: "0 16px" },
    processIconWrap: { width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, position: "relative", zIndex: 2 },
    processTitle: { fontWeight: 800, fontSize: 14, marginBottom: 8, color: fg },
    processDesc: { color: muted, fontSize: 13, lineHeight: 1.65 },
    processConnector: { position: "absolute", top: 28, left: "calc(50% + 28px)", right: "calc(-50% + 28px)", height: 2, background: `linear-gradient(90deg, ${accent}, #4fa3e0)`, zIndex: 1 },
    contactSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}` },
    contactInner: { maxWidth: 1100, margin: "0 auto", padding: "100px 3%", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" },
    contactInfo: { display: "flex", flexDirection: "column", gap: 24 },
    contactItem: { display: "flex", gap: 14, alignItems: "flex-start" },
    contactIconBox: { width: 40, height: 40, borderRadius: 10, background: darkMode ? "#1a1a30" : "#ebebff", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
    contactLabel: { fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 },
    contactVal: { fontWeight: 600, fontSize: 15, color: fg },
    formCard: { background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: 32, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 },
    formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 0 },
    formGroup: { marginBottom: 16, display: "flex", flexDirection: "column" },
    label: { display: "block", fontSize: 12, fontWeight: 700, color: muted, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.08em" },
    input: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
    select: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", appearance: "none" },
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
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .hero-a1 { animation: fadeUp 0.8s ease both; }
        .hero-a2 { animation: fadeUp 0.8s 0.15s ease both; }
        .hero-a3 { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-a4 { animation: fadeUp 0.8s 0.45s ease both; }
        .card-hover:hover { border-color: #7c5cfc !important; transform: translateY(-3px); }
        .proj-hover:hover { transform: translateY(-4px); border-color: #7c5cfc !important; }
        .nav-link:hover { color: #fff !important; }
        .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; animation: float 8s ease-in-out infinite; }
        .service-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
        .proj-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; align-items:start; }
        input::placeholder, textarea::placeholder { color: #555566; }
        input:focus, textarea:focus, select:focus { border-color: #7c5cfc !important; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 70%{transform:scale(1.5);opacity:0} 100%{transform:scale(1.5);opacity:0} }
        @keyframes ticker     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pop-in     { 0%{opacity:0;transform:scale(0.85) translateY(16px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

        /* ── Scroll-reveal: children start hidden ── */
        .reveal-group > * {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        /* ── When revealed, each direct child staggers in ── */
        .reveal-group.revealed > *:nth-child(1) { opacity:1; transform:none; transition-delay:0s }
        .reveal-group.revealed > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.1s }
        .reveal-group.revealed > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.2s }
        .reveal-group.revealed > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.3s }
        .reveal-group.revealed > *:nth-child(5) { opacity:1; transform:none; transition-delay:0.4s }
        .reveal-group.revealed > *:nth-child(6) { opacity:1; transform:none; transition-delay:0.5s }

        .reveal-heading { opacity:0; transform:translateY(24px); transition:opacity 0.6s ease, transform 0.6s ease; }
        .reveal-heading.in { opacity:1; transform:none; }
        .shimmer-text { background:linear-gradient(90deg,#7c5cfc,#4fa3e0,#7c5cfc,#4fa3e0); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }
        .pulse-wrap { position:relative; display:inline-flex; align-items:center; padding-left:14px; }
        .pulse-wrap::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:7px; height:7px; border-radius:50%; background:#22c55e; animation:pulse-ring 2s ease-out infinite; }
        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#7c5cfc; border-radius:2px; transition:width 0.25s ease; }
        .nav-link:hover::after { width:100%; }
        .card-hover:hover { border-color:#7c5cfc !important; transform:translateY(-6px) !important; box-shadow:0 16px 40px rgba(124,92,252,0.18) !important; }
        .card-hover:hover .card-icon-inner { transform:scale(1.15) rotate(-6deg); }
        .card-icon-inner { transition:transform 0.3s; }
        .proj-hover:hover { transform:translateY(-6px) !important; border-color:#7c5cfc !important; box-shadow:0 20px 48px rgba(0,0,0,0.35) !important; }
        .proj-hover:hover .proj-hex { transform:scale(1.12) rotate(12deg); opacity:0.5; }
        .proj-hex { transition:transform 0.4s ease, opacity 0.4s ease; }
        .team-card-hover:hover { border-color:#7c5cfc !important; transform:translateY(-4px); box-shadow:0 16px 40px rgba(124,92,252,0.15) !important; }
        .team-card-hover:hover .team-photo { transform:scale(1.05); }
        .team-photo { transition:transform 0.4s ease; }
        .process-step-hover:hover .process-icon { transform:scale(1.12) rotate(-8deg); box-shadow:0 8px 24px rgba(124,92,252,0.35); }
        .process-icon { transition:transform 0.35s ease, box-shadow 0.35s ease; }
        .tech-tag-hover:hover { border-color:#7c5cfc !important; color:#7c5cfc !important; transform:translateY(-2px); }
        .btn-press:active { transform:scale(0.96) !important; }
        .send-btn-hover:hover:not(:disabled) { opacity:0.88; transform:translateY(-1px); }
        .footer-link-hover:hover { color:#7c5cfc !important; }
        .ticker-outer { overflow:hidden; border-top:1px solid #1e1e2e; border-bottom:1px solid #1e1e2e; padding:14px 0; }
        .ticker-track { display:flex; width:max-content; animation:ticker 28s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }
        .pop-in { animation:pop-in 0.4s ease both; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <div style={s.logoBox}>V</div>
          Vexora
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
          <button style={s.talkBtn} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Let's Talk</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={s.hero}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,92,252,0.12)", top: "10%", left: "5%", animationDelay: "0s" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(79,163,224,0.1)", top: "20%", right: "5%", animationDelay: "3s" }} />
        <div className="hero-a1" style={s.badge}>
          <span style={s.heroBadgeDot} />
          Now booking Q3 — 2 slots open
        </div>
        <h1 className="hero-a2" style={s.heroH1}>
          We build <span className="shimmer-text">{typedText}</span><span style={s.heroCursor} /><br />that scale.
        </h1>
        <p className="hero-a3" style={s.heroSub}>
          Vexora is a tight-knit duo of full-stack engineers shipping premium products for founders who care about craft. From zero to launched in weeks — not quarters.
        </p>
        <div className="hero-a4" style={s.heroButtons}>
          <button style={s.btnPrimary} onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>View Our Work →</button>
          <button style={s.btnOutline} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Let's Talk</button>
        </div>
        <div className="hero-a4" style={s.heroStats}>
          <span className="pulse-wrap">Currently available</span>
          <span style={{ color: "#2a2a3e" }}>•</span>
          <span>40+ projects shipped</span>
          <span style={{ color: "#2a2a3e" }}>•</span>
          <span>★ 5.0 client rating</span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <div id="services" style={{ background: darkMode ? "#060609" : "#f8f8fc", borderTop: `1px solid ${border}` }}>
        <div style={s.section}>
          <div style={s.sectionTag}>What We Do</div>
          <h2 style={s.sectionH2}>Services built for<br />ambitious teams</h2>
          <p style={s.sectionSub}>A focused offering. No fluff. Just the things that move the needle for product-led companies.</p>
          {/* ── FIX: RevealGrid IS the grid — cards are direct children ── */}
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
        <h2 style={{ ...s.sectionH2, textAlign: "center" }}>The stack we love</h2>
        <p style={{ ...s.sectionSub, margin: "0 auto", textAlign: "center" }}>Battle-tested tools chosen for scale, DX, and longevity.</p>
        <div style={s.techTags}>
          {TECH.map(t => <span key={t} style={s.techTag} className="tech-tag-hover">{t}</span>)}
        </div>
      </div>

      {/* ── WORK ── */}
      <div id="work" style={{ background: bg }}>
        <div style={s.section}>
          <div style={s.sectionTag}>Selected Work</div>
          <h2 style={s.sectionH2}>Products we've shipped</h2>
          <p style={s.sectionSub}>A few of the launches we're proud of. Every one of these is live and revenue-generating.</p>
          <div style={s.filterRow}>
            {FILTER_TABS.map(f => (
              <button key={f} style={s.filterBtn(activeFilter === f)} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          {/* ── FIX: RevealGrid IS the grid — project cards are direct children ── */}
          <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, alignItems: "start" }}>
            {filteredProjects.map(p => (
              <div key={p.title} style={s.projCard(p.color)} className="proj-hover">
                <div style={s.projImg(p.color)}>
                  <span style={s.projTag}>{p.tag}</span>
                  <span className="proj-hex" style={{ fontSize: 48, opacity: 0.35 }}>⬡</span>
                </div>
                <div style={s.projBody}>
                  <div style={s.projTitle}>{p.title}</div>
                  <div style={s.projDesc}>{p.desc}</div>
                  <div style={s.tags}>{p.techs.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
                  <div style={s.caseLink}>View Case Study →</div>
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div id="team" style={{ background: darkMode ? "#060609" : "#f0f0f5", borderTop: `1px solid ${border}` }}>
        <div style={s.section}>
          <div style={{ ...s.sectionTag, textAlign: "center" }}>The Team</div>
          <h2 style={{ ...s.sectionH2, textAlign: "center" }}>Two engineers. One mission.</h2>
          <p style={{ ...s.sectionSub, margin: "0 auto 60px", textAlign: "center" }}>No agency middlemen. You work directly with the people writing your code.</p>
          <div style={s.teamGrid}>
            {TEAM.map(t => (
              <div key={t.name} style={s.teamCard} className="team-card-hover">
                <img src={t.image} alt={t.name} style={s.teamImage} className="team-photo" />
                <div style={s.teamInfo}>
                  <div style={s.teamName}>{t.name}</div>
                  <div style={s.teamRole}>{t.role}</div>
                  <div style={s.teamBio}>{t.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div id="process" style={{ background: bg, borderTop: `1px solid ${border}` }}>
        <div style={s.section}>
          <div style={{ ...s.sectionTag, textAlign: "center" }}>How We Work</div>
          <h2 style={{ ...s.sectionH2, textAlign: "center" }}>A predictable, calm process</h2>
          <p style={{ ...s.sectionSub, margin: "0 auto", textAlign: "center" }}>Same playbook every time. You'll never wonder what we're doing or when you'll see progress.</p>
          <div style={s.processLine}>
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} style={s.processStep} className="process-step-hover">
                  {i < PROCESS.length - 1 && <div style={s.processConnector} />}
                  <div style={s.processIconWrap} className="process-icon"><Icon size={24} color="#fff" /></div>
                  <div style={s.processTitle}>{step.title}</div>
                  <div style={s.processDesc}>{step.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" style={s.contactSection}>
        <div style={s.contactInner}>
          <div>
            <div style={s.sectionTag}>Get In Touch</div>
            <h2 style={s.sectionH2}>Let's build something great</h2>
            <p style={{ ...s.sectionSub, marginBottom: 40 }}>Tell us about your project. We reply to every email within 24 hours.</p>
            <div style={s.contactInfo}>
              {[
                { icon: "✉", label: "Email", val: "dhritidh947@gmail.com" },
                { icon: "⚲", label: "Location", val: "Remote · GMT +5:30 / GMT -5" },
                { icon: "⏱", label: "Response Time", val: "Within 24 hours" },
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
          <div style={s.formCard}>
            <div style={s.formRow}>
              <div style={s.formGroup}>
                <label style={s.label}>Your name</label>
                <input style={s.input} placeholder="Jane Doe" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Email</label>
                <input style={s.input} placeholder="jane@company.com" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Project description</label>
              <textarea style={s.textarea} placeholder="Tell us about your project, goals, and timeline..." value={formData.message} onChange={e => setFormData(f => ({ ...f, message: e.target.value }))} />
            </div>
            {formStatus === "success" && (
              <div className="pop-in" style={{ background: "#0d2a1a", border: "1px solid #22c55e", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#22c55e", marginBottom: 12, textAlign: "center" }}>
                 Message sent! We'll get back to you within 24 hours.
              </div>
            )}
            {formStatus === "error" && (
              <div className="pop-in" style={{ background: "#2a0d0d", border: "1px solid #ef4444", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#ef4444", marginBottom: 12, textAlign: "center" }}>
                Something went wrong. Please email us directly at dhritidh947@gmail.com
              </div>
            )}
            <button style={s.sendBtn} onClick={handleSend} disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Sending…" : "Send message →"}
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div>
            <div style={s.logo}><div style={s.logoBox}>V</div>Vexora</div>
            <div style={s.footerDesc}>We build products that scale. A boutique full-stack development studio.</div>
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
              {["GitHub", "LinkedIn", "Twitter"].map(soc => (
                <li key={soc}><span style={s.footerLink}>{soc}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={s.footerBottom}>
          <span>© 2025 Vexora. All rights reserved.</span>
          <span>Built with ♥ and a lot of caffeine</span>
        </div>
      </footer>
    </div>
  );
}
