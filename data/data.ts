export const NAV_ITEMS = [
  { num: "01", label: "Home" },
  { num: "02", label: "About" },
  { num: "03", label: "Skills" },
  { num: "04", label: "Works" },
  { num: "05", label: "Services" },
  { num: "06", label: "Experience" },
  { num: "07", label: "Contact" },
] as const;

export const WORK_PROJECTS = [
  {
    id: "casho-ai",
    title: "Casho.ai",
    category: "AI Product Engineering",
    live: true,
    link: "https://casho.ai/",
    image: "/images/projects/casho.png",
  },
  {
    id: "ferrari-amalfi",
    title: "Ferrari Amalfi",
    category: "3D Web Experience",
    live: true,
    link: "https://car-3d-web.vercel.app/",
    image: "/images/projects/ferrari.png",
  },
  {
    id: "avana-logistics",
    title: "Avana Logistics",
    category: "Threejs Web Experience",
    live: true,
    link: "https://avana-logistics.vercel.app/",
    image: "/images/projects/avana.png",
  },
  {
    id: "after-glow",
    title: "After Glow",
    category: "Threejs Web Experience",
    live: true,
    link: "https://afterglow-web-jet.vercel.app/",
    image: "/images/projects/afterglow.png",
  },
  {
    id: "archer",
    title: "Archer",
    category: "Interactive Landing Page",
    live: true,
    link: "https://archer-3d-web.vercel.app/",
    image: "/images/projects/archer.png",
  },
  {
    id: "ignis",
    title: "Ignis",
    category: "Interactive Landing Page",
    live: true,
    link: "https://ignis-3d-web.vercel.app/",
    image: "/images/projects/ignis.png",
  },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Scalable, high-performance interfaces built with React.js, Next.js, and TypeScript.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5leHRqcyUyMGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    number: "02",
    title: "Interactive Experiences",
    description:
      "Scroll-driven animations and 3D web experiences crafted with GSAP and Three.js.",
    image:
      "https://plus.unsplash.com/premium_photo-1661589354357-f56ddf86a0b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJhY3RpdmUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
  },
  {
    number: "03",
    title: "Full-Stack Development",
    description:
      "End-to-end products powered by Node.js, Express.js, Supabase, and Firebase.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "04",
    title: "Scalability",
    description:
      "Building scalable architecture, optimized database schemas, and modular codebases designed to scale seamlessly with user growth.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NhbGFiaWxpdHklMjBvZiUyMHdlYnxlbnwwfHwwfHx8MA%3D%3D",
  },
] as const;

export const EXPERIENCE = [
  {
    id: "getweys",
    name: "Getweys",
    initials: "GW",
    role: "Fullstack Developer",
    period: "August 2025 — Present",
    link: "https://getweys.com/",
    description:
      "Developed high-performance web applications using React.js, Next.js, and Node.js. Built dynamic UI components, integrated backend REST APIs, and optimized overall frontend performance while maintaining clean, reusable codebases across client products.",
  },
  {
    id: "fast-technology",
    name: "Fast Technology",
    initials: "FT",
    role: "Frontend Developer Intern",
    period: "June 2025 — July 2025",
    link: "https://fastechnology.net/",
    description:
      "Engineered pixel-perfect, fully responsive user interfaces using HTML, CSS, JavaScript, React.js, and Tailwind CSS. Collaborated with UI/UX designers and senior engineers to implement state management and modernize legacy client web applications.",
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/Ahnaf-Tariq", isDownload: false },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ahnaf-tariq-702054362/",
    isDownload: false,
  },
  {
    label: "Download Resume",
    url: "/images/resume/resume.pdf",
    isDownload: true,
  },
] as const;

export const SKILL_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
] as const;

export const SKILLS = [
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React.js", level: 95, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Three.js", level: 90, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "Nest.js", level: 80, category: "backend" },
  { name: "Supabase", level: 90, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "Firebase", level: 80, category: "backend" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "GSAP", level: 85, category: "tools" },
] as const;

export const PANEL_THEMES = [
  {
    bg: "var(--bg-dark)",
    border: "var(--border-dark)",
    text: "var(--text-on-dark)",
    textMuted: "var(--text-on-dark-muted)",
  },
  {
    bg: "var(--bg-primary)",
    border: "var(--border-light)",
    text: "var(--text-primary)",
    textMuted: "var(--text-tertiary)",
  },
  {
    bg: "var(--bg-dark)",
    border: "var(--border-dark)",
    text: "var(--text-on-dark)",
    textMuted: "var(--text-on-dark-muted)",
  },
  {
    bg: "var(--bg-primary)",
    border: "var(--border-light)",
    text: "var(--text-primary)",
    textMuted: "var(--text-tertiary)",
  },
  {
    bg: "#221D19",
    border: "rgba(245,241,234,0.15)",
    text: "#F5F1EA",
    textMuted: "rgba(245,241,234,0.6)",
  },
  {
    bg: "var(--bg-primary)",
    border: "var(--border-light)",
    text: "var(--text-primary)",
    textMuted: "var(--text-tertiary)",
  },
  {
    bg: "var(--bg-dark)",
    border: "var(--border-dark)",
    text: "var(--text-on-dark)",
    textMuted: "var(--text-on-dark-muted)",
  },
] as const;
