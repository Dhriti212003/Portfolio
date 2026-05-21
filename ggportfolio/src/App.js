import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "Work", "Team", "Process", "Pricing", "Contact"];

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
  { name: "Aarav Sharma", role: "Frontend Lead & Product Designer", bio: "Crafts the pixel-perfect side of Vexora. 7+ years building React apps used by millions.", emoji: "👨‍💻" },
  { name: "Maya Patel", role: "Backend Engineer & Cloud Architect", bio: "Lives in distributed systems. Ships APIs that scale to millions of requests without breaking a sweat.", emoji: "👩‍💻" },
];

const PROCESS = [
  { icon: "🔍", title: "Discovery & Planning", desc: "We deep-dive into your goals, users, and constraints to scope the right thing." },
  { icon: "🎨", title: "Design & Prototype", desc: "High-fidelity prototypes in Figma, validated before a single line of code." },
  { icon: "⚡", title: "Build & Test", desc: "Weekly demos, automated tests, and code reviews on every PR." },
  { icon: "🚀", title: "Deploy & Support", desc: "CI/CD to production, monitoring, and 30 days of post-launch support." },
];

const TESTIMONIALS = [
  { quote: "Vexora shipped our MVP in 6 weeks and it converted 3x better than our previous version. The polish is unreal.", name: "Sarah Chen", role: "CEO, Northwind Labs" },
  { quote: "Working with Vexora felt like having a senior CTO and design team in our corner from day one. Absolute game-changers.", name: "James Okafor", role: "Founder, Stackbloom" },
  { quote: "The codebase they delivered is so clean, our in-house team loves maintaining it. Zero technical debt.", name: "Priya Nair", role: "CTO, Finloom" },
];

const PRICING = [
  { name: "Starter", price: "$4,999", period: "/project", desc: "Perfect for MVPs and proof-of-concepts.", features: ["Up to 4 screens", "REST API", "1 revision round", "2-week delivery", "30-day support"], highlight: false },
  { name: "Growth", price: "$12,999", period: "/project", desc: "Full-featured SaaS products built to scale.", features: ["Unlimited screens", "Auth + Billing", "Database architecture", "Weekly demos", "60-day support", "DevOps setup"], highlight: true },
  { name: "Scale", price: "Custom", period: "", desc: "Enterprise-grade systems and long-term partnerships.", features: ["Dedicated team", "Full-stack ownership", "SLA guarantees", "Architecture review", "Ongoing retainer"], highlight: false },
];

const FILTER_TABS = ["All", "Web App", "SaaS", "API", "Mobile"];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const words = ["SaaS Products", "Web Apps", "APIs", "MVPs"];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = words[wordRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === word.length) { deletingRef.current = true; }
      } else {
        charRef.current--;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          wordRef.current = (wordRef.current + 1) % words.length;
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === activeFilter);

  const bg = darkMode ? "#0a0a0f" : "#f5f5f7";
  const fg = darkMode ? "#ffffff" : "#0a0a0f";
  const cardBg = darkMode ? "#111118" : "#ffffff";
  const border = darkMode ? "#1e1e2e" : "#e5e5ea";
  const muted = darkMode ? "#888899" : "#666677";
  const accent = "#7c5cfc";
  const accentBlue = "#4fa3e0";

  const styles = {
    root: { fontFamily: "'Syne', 'DM Sans', sans-serif", background: bg, color: fg, minHeight: "100vh", transition: "background 0.3s, color 0.3s", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: 64, background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(245,245,247,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}` },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, color: fg },
    logoBox: { width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14 },
    navLinks: { display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 },
    navLink: { color: muted, fontSize: 14, cursor: "pointer", transition: "color 0.2s", fontWeight: 500 },
    navRight: { display: "flex", alignItems: "center", gap: 12 },
    themeBtn: { background: "none", border: `1px solid ${border}`, borderRadius: 20, width: 36, height: 36, cursor: "pointer", color: fg, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" },
    talkBtn: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
    hero: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 5% 40px", position: "relative" },
    badge: { display: "inline-flex", alignItems: "center", gap: 8, background: darkMode ? "#1a1a2e" : "#ebebf5", border: `1px solid ${border}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: muted, marginBottom: 32, fontWeight: 500 },
    heroBadgeDot: { width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee" },
    heroH1: { fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, maxWidth: 900 },
    heroTyped: { background: "linear-gradient(90deg, #7c5cfc, #4fa3e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroCursor: { display: "inline-block", width: 3, height: "0.9em", background: accent, verticalAlign: "middle", marginLeft: 3, animation: "blink 1s step-end infinite" },
    heroSub: { fontSize: "clamp(1rem, 2vw, 1.2rem)", color: muted, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 },
    heroButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 },
    btnPrimary: { background: "linear-gradient(135deg, #7c5cfc, #5e8ef7)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 8 },
    btnOutline: { background: "none", color: fg, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 },
    heroStats: { display: "flex", gap: 32, alignItems: "center", color: muted, fontSize: 13, flexWrap: "wrap", justifyContent: "center" },
    statDot: { width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", marginRight: 6 },
    section: { padding: "100px 5%", maxWidth: 1200, margin: "0 auto" },
    sectionTag: { fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 12 },
    sectionH2: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 },
    sectionSub: { color: muted, fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 60 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
    card: { background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: 28, transition: "border-color 0.2s, transform 0.2s" },
    cardIcon: { width: 44, height: 44, borderRadius: 12, background: darkMode ? "#1a1a30" : "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, border: `1px solid ${border}` },
    cardTitle: { fontWeight: 700, fontSize: 16, marginBottom: 8 },
    cardDesc: { color: muted, fontSize: 14, lineHeight: 1.65 },
    techSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "60px 5%", textAlign: "center" },
    techTags: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 32 },
    techTag: { background: darkMode ? "#111118" : "#fff", border: `1px solid ${border}`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: muted },
    filterRow: { display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" },
    filterBtn: (active) => ({ background: active ? accent : (darkMode ? "#111118" : "#fff"), color: active ? "#fff" : muted, border: `1px solid ${active ? accent : border}`, borderRadius: 20, padding: "7px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }),
    projCard: (color) => ({ background: darkMode ? color : "#fafafa", border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", transition: "transform 0.2s" }),
    projImg: (color) => ({ height: 180, background: `linear-gradient(135deg, ${color}, ${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }),
    projTag: { position: "absolute", top: 12, left: 12, background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#fff", backdropFilter: "blur(4px)" },
    projBody: { padding: 20 },
    projTitle: { fontWeight: 800, fontSize: 16, marginBottom: 6 },
    projDesc: { color: muted, fontSize: 13, lineHeight: 1.6, marginBottom: 14 },
    tags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
    tag: { background: darkMode ? "#1a1a2e" : "#f0f0fa", color: accent, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px" },
    caseLink: { color: accent, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 },
    teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
    teamCard: { background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: 28, display: "flex", gap: 16, alignItems: "flex-start" },
    teamEmoji: { width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #7c5cfc22, #4fa3e022)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 },
    teamName: { fontWeight: 800, fontSize: 16, marginBottom: 2 },
    teamRole: { color: accent, fontSize: 12, fontWeight: 600, marginBottom: 8 },
    teamBio: { color: muted, fontSize: 13, lineHeight: 1.6 },
    processLine: { display: "flex", gap: 0, alignItems: "flex-start", position: "relative", marginTop: 60, overflowX: "auto", paddingBottom: 20 },
    processStep: { flex: 1, minWidth: 180, textAlign: "center", position: "relative", padding: "0 16px" },
    processIconWrap: { width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, position: "relative", zIndex: 2 },
    processTitle: { fontWeight: 800, fontSize: 14, marginBottom: 8 },
    processDesc: { color: muted, fontSize: 13, lineHeight: 1.6 },
    processConnector: { position: "absolute", top: 28, left: "calc(50% + 28px)", right: "calc(-50% + 28px)", height: 2, background: `linear-gradient(90deg, ${accent}, #4fa3e0)`, zIndex: 1 },
    testimonialBox: { background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: "48px 56px", textAlign: "center", maxWidth: 680, margin: "40px auto 0" },
    quoteIcon: { fontSize: 48, color: accent, lineHeight: 1, marginBottom: 16, display: "block" },
    quoteText: { fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontStyle: "italic", color: fg, lineHeight: 1.75, marginBottom: 28 },
    quoteAuthor: { fontWeight: 800, fontSize: 15, marginBottom: 2 },
    quoteRole: { color: muted, fontSize: 13 },
    dotRow: { display: "flex", gap: 8, justifyContent: "center", marginTop: 28 },
    dot: (active) => ({ width: active ? 24 : 8, height: 8, borderRadius: 4, background: active ? accent : border, transition: "width 0.3s, background 0.3s", cursor: "pointer" }),
    pricingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 48 },
    pricingCard: (h) => ({ background: h ? `linear-gradient(135deg, #7c5cfc11, #4fa3e011)` : cardBg, border: `1.5px solid ${h ? accent : border}`, borderRadius: 20, padding: 32, position: "relative", overflow: "hidden" }),
    pricingBadge: { position: "absolute", top: 16, right: 16, background: accent, color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 6 },
    pricingName: { fontWeight: 800, fontSize: 14, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 },
    pricingPrice: { fontSize: "2.5rem", fontWeight: 900, marginBottom: 2 },
    pricingPeriod: { color: muted, fontSize: 14 },
    pricingDesc: { color: muted, fontSize: 14, margin: "12px 0 20px", lineHeight: 1.6 },
    pricingFeatures: { listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 },
    pricingFeature: { fontSize: 14, color: fg, display: "flex", gap: 8, alignItems: "flex-start" },
    featureCheck: { color: accent, fontWeight: 700, flexShrink: 0 },
    pricingBtn: (h) => ({ width: "100%", background: h ? "linear-gradient(135deg, #7c5cfc, #4fa3e0)" : "none", color: h ? "#fff" : fg, border: `1.5px solid ${h ? "transparent" : border}`, borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontSize: 15 }),
    contactSection: { background: darkMode ? "#080810" : "#f0f0f5", borderTop: `1px solid ${border}` },
    contactInner: { maxWidth: 1100, margin: "0 auto", padding: "100px 5%", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "start" },
    contactInfo: { display: "flex", flexDirection: "column", gap: 24 },
    contactItem: { display: "flex", gap: 14, alignItems: "flex-start" },
    contactIconBox: { width: 40, height: 40, borderRadius: 10, background: darkMode ? "#1a1a30" : "#ebebff", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
    contactLabel: { fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 },
    contactVal: { fontWeight: 600, fontSize: 15 },
    formCard: { background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: 32 },
    formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
    formGroup: { marginBottom: 16 },
    label: { display: "block", fontSize: 12, fontWeight: 700, color: muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" },
    input: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
    select: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", appearance: "none" },
    textarea: { width: "100%", background: darkMode ? "#0d0d18" : "#f8f8fc", border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", color: fg, fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 120 },
    sendBtn: { width: "100%", background: "linear-gradient(135deg, #7c5cfc, #4fa3e0)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
    footer: { background: darkMode ? "#050508" : "#e8e8f0", borderTop: `1px solid ${border}`, padding: "48px 5% 32px" },
    footerInner: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 40 },
    footerDesc: { color: muted, fontSize: 14, lineHeight: 1.7, marginTop: 12, maxWidth: 260 },
    footerCol: {},
    footerColTitle: { fontWeight: 800, fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: muted },
    footerLinks: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
    footerLink: { color: muted, fontSize: 14, cursor: "pointer" },
    footerBottom: { borderTop: `1px solid ${border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", color: muted, fontSize: 13, flexWrap: "wrap", gap: 12 },
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-animate { animation: fadeUp 0.8s ease both; }
        .hero-animate-2 { animation: fadeUp 0.8s 0.15s ease both; }
        .hero-animate-3 { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-animate-4 { animation: fadeUp 0.8s 0.45s ease both; }
        .card-hover:hover { border-color: #7c5cfc !important; transform: translateY(-3px); }
        .proj-hover:hover { transform: translateY(-4px); }
        .nav-link:hover { color: #fff !important; }
        .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; animation: float 8s ease-in-out infinite; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoBox}>V</div>
          Vexora
        </div>
        <ul style={styles.navLinks}>
          {NAV_LINKS.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} style={styles.navLink} className="nav-link" onClick={e => { e.preventDefault(); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }} >{l}</a></li>
          ))}
        </ul>
        <div style={styles.navRight}>
          <button style={styles.themeBtn} onClick={() => setDarkMode(d => !d)}>{darkMode ? "☀" : "🌙"}</button>
          <button style={styles.talkBtn}>Let's Talk</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={styles.hero}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,92,252,0.12)", top: "10%", left: "5%", animationDelay: "0s" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(79,163,224,0.1)", top: "20%", right: "5%", animationDelay: "3s" }} />
        <div className="hero-animate" style={styles.badge}>
          <span style={styles.heroBadgeDot} />
          Now booking Q3 — 2 slots open
        </div>
        <h1 className="hero-animate-2" style={styles.heroH1}>
          We build <span style={styles.heroTyped}>{typedText}</span><span style={styles.heroCursor} /><br />that scale.
        </h1>
        <p className="hero-animate-3" style={styles.heroSub}>
          Vexora is a tight-knit duo of full-stack engineers shipping premium products for founders who care about craft. From zero to launched in weeks — not quarters.
        </p>
        <div className="hero-animate-4" style={styles.heroButtons}>
          <button style={styles.btnPrimary}>View Our Work →</button>
          <button style={styles.btnOutline}>Let's Talk</button>
        </div>
        <div className="hero-animate-4" style={styles.heroStats}>
          <span><span style={styles.statDot} />Currently available</span>
          <span style={{ color: border }}>•</span>
          <span>40+ projects shipped</span>
          <span style={{ color: border }}>•</span>
          <span>★ 5.0 client rating</span>
        </div>
      </section>

      {/* SERVICES */}
      <div id="services" style={{ background: darkMode ? "#060609" : "#f8f8fc", borderTop: `1px solid ${border}` }}>
        <div style={styles.section}>
          <div style={styles.sectionTag}>What We Do</div>
          <h2 style={styles.sectionH2}>Services built for<br />ambitious teams</h2>
          <p style={styles.sectionSub}>A focused offering. No fluff. Just the things that move the needle for product-led companies.</p>
          <div style={styles.grid3}>
            {SERVICES.map(s => (
              <div key={s.title} style={styles.card} className="card-hover">
                <div style={styles.cardIcon}>{s.icon}</div>
                <div style={styles.cardTitle}>{s.title}</div>
                <div style={styles.cardDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TECH */}
      <div style={styles.techSection}>
        <div style={styles.sectionTag}>Our Tech</div>
        <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>The stack we love</h2>
        <p style={{ ...styles.sectionSub, margin: "0 auto", textAlign: "center" }}>Battle-tested tools chosen for scale, DX, and longevity.</p>
        <div style={styles.techTags}>
          {TECH.map(t => <span key={t} style={styles.techTag}>{t}</span>)}
        </div>
      </div>

      {/* WORK */}
      <div id="work" style={{ background: bg }}>
        <div style={styles.section}>
          <div style={styles.sectionTag}>Selected Work</div>
          <h2 style={styles.sectionH2}>Products we've shipped</h2>
          <p style={styles.sectionSub}>A few of the launches we're proud of. Every one of these is live and revenue-generating.</p>
          <div style={styles.filterRow}>
            {FILTER_TABS.map(f => (
              <button key={f} style={styles.filterBtn(activeFilter === f)} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div style={styles.grid3}>
            {filteredProjects.map(p => (
              <div key={p.title} style={styles.projCard(p.color)} className="proj-hover card-hover">
                <div style={styles.projImg(p.color)}>
                  <span style={styles.projTag}>{p.tag}</span>
                  <span style={{ fontSize: 48, opacity: 0.4 }}>⬡</span>
                </div>
                <div style={styles.projBody}>
                  <div style={styles.projTitle}>{p.title}</div>
                  <div style={styles.projDesc}>{p.desc}</div>
                  <div style={styles.tags}>{p.techs.map(t => <span key={t} style={styles.tag}>{t}</span>)}</div>
                  <div style={styles.caseLink}>View Case Study →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div id="team" style={{ background: darkMode ? "#060609" : "#f0f0f5", borderTop: `1px solid ${border}` }}>
        <div style={styles.section}>
          <div style={{ ...styles.sectionTag, textAlign: "center" }}>The Team</div>
          <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>Two engineers. One mission.</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto 60px", textAlign: "center" }}>No agency middlemen. You work directly with the people writing your code.</p>
          <div style={styles.teamGrid}>
            {TEAM.map(t => (
              <div key={t.name} style={styles.teamCard} className="card-hover">
                <div style={styles.teamEmoji}>{t.emoji}</div>
                <div>
                  <div style={styles.teamName}>{t.name}</div>
                  <div style={styles.teamRole}>{t.role}</div>
                  <div style={styles.teamBio}>{t.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div id="process" style={{ background: bg, borderTop: `1px solid ${border}` }}>
        <div style={styles.section}>
          <div style={{ ...styles.sectionTag, textAlign: "center" }}>How We Work</div>
          <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>A predictable, calm process</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto", textAlign: "center" }}>Same playbook every time. You'll never wonder what we're doing or when you'll see progress.</p>
          <div style={styles.processLine}>
            {PROCESS.map((step, i) => (
              <div key={step.title} style={styles.processStep}>
                {i < PROCESS.length - 1 && <div style={styles.processConnector} />}
                <div style={styles.processIconWrap}>{step.icon}</div>
                <div style={styles.processTitle}>{step.title}</div>
                <div style={styles.processDesc}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: darkMode ? "#060609" : "#f8f8fc", borderTop: `1px solid ${border}` }}>
        <div style={{ ...styles.section, textAlign: "center" }}>
          <div style={styles.sectionTag}>Kind Words</div>
          <h2 style={styles.sectionH2}>What our clients say</h2>
          <div style={styles.testimonialBox}>
            <span style={styles.quoteIcon}>"</span>
            <p style={styles.quoteText}>{TESTIMONIALS[testimonialIdx].quote}</p>
            <div style={styles.quoteAuthor}>{TESTIMONIALS[testimonialIdx].name}</div>
            <div style={styles.quoteRole}>{TESTIMONIALS[testimonialIdx].role}</div>
            <div style={styles.dotRow}>
              {TESTIMONIALS.map((_, i) => <div key={i} style={styles.dot(i === testimonialIdx)} onClick={() => setTestimonialIdx(i)} />)}
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={{ background: bg, borderTop: `1px solid ${border}` }}>
        <div style={styles.section}>
          <div style={{ ...styles.sectionTag, textAlign: "center" }}>Pricing</div>
          <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>Simple, transparent pricing</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto", textAlign: "center" }}>No hidden fees, no surprises. Pay for what you need.</p>
          <div style={styles.pricingGrid}>
            {PRICING.map(p => (
              <div key={p.name} style={styles.pricingCard(p.highlight)} className="card-hover">
                {p.highlight && <div style={styles.pricingBadge}>MOST POPULAR</div>}
                <div style={styles.pricingName}>{p.name}</div>
                <div style={styles.pricingPrice}>{p.price}<span style={{ ...styles.pricingPeriod, fontSize: "1rem" }}>{p.period}</span></div>
                <div style={styles.pricingDesc}>{p.desc}</div>
                <ul style={styles.pricingFeatures}>
                  {p.features.map(f => <li key={f} style={styles.pricingFeature}><span style={styles.featureCheck}>✓</span>{f}</li>)}
                </ul>
                <button style={styles.pricingBtn(p.highlight)}>Get Started →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={styles.contactSection}>
        <div style={styles.contactInner}>
          <div>
            <div style={styles.sectionTag}>Get In Touch</div>
            <h2 style={styles.sectionH2}>Let's build something great</h2>
            <p style={{ ...styles.sectionSub, marginBottom: 40 }}>Tell us about your project. We reply to every email within 24 hours.</p>
            <div style={styles.contactInfo}>
              {[
                { icon: "✉", label: "Email", val: "hello@vexora.dev" },
                { icon: "📍", label: "Location", val: "Remote · GMT +5:30 / GMT -5" },
                { icon: "⏱", label: "Response Time", val: "Within 24 hours" },
              ].map(item => (
                <div key={item.label} style={styles.contactItem}>
                  <div style={styles.contactIconBox}>{item.icon}</div>
                  <div>
                    <div style={styles.contactLabel}>{item.label}</div>
                    <div style={styles.contactVal}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.formCard}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}><label style={styles.label}>Your name</label><input style={styles.input} placeholder="Jane Doe" /></div>
              <div style={styles.formGroup}><label style={styles.label}>Email</label><input style={styles.input} placeholder="jane@company.com" /></div>
            </div>
            <div style={styles.formGroup}><label style={styles.label}>Budget range</label>
              <select style={styles.select}>
                <option value="">Select a budget</option>
                <option>Under $5k</option><option>$5k–$15k</option><option>$15k–$50k</option><option>$50k+</option>
              </select>
            </div>
            <div style={styles.formGroup}><label style={styles.label}>Project description</label><textarea style={styles.textarea} placeholder="Tell us about your project, goals, and timeline..." /></div>
            <button style={styles.sendBtn}>Send message →</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <div style={styles.logo}><div style={styles.logoBox}>V</div>Vexora</div>
            <div style={styles.footerDesc}>We build products that scale. A boutique full-stack development studio.</div>
          </div>
          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>Quick Links</div>
            <ul style={styles.footerLinks}>
              {NAV_LINKS.map(l => <li key={l}><span style={styles.footerLink}>{l}</span></li>)}
            </ul>
          </div>
          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>Social</div>
            <ul style={styles.footerLinks}>
              {["GitHub", "LinkedIn", "Twitter"].map(s => <li key={s}><span style={styles.footerLink}>{s}</span></li>)}
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2025 Vexora. All rights reserved.</span>
          <span>Built with ♥ and a lot of caffeine</span>
        </div>
      </footer>
    </div>
  );
}