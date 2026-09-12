
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAV_ITEMS = [
  { num: "01", label: "Home" },
  { num: "02", label: "About" },
  { num: "03", label: "Works" },
  { num: "04", label: "Services" },
  { num: "05", label: "Experience" },
  { num: "06", label: "Contact" },
];

const WORK_PROJECTS = [
  {
    id: "evo-money",
    title: "EVO Money",
    category: "Product Design",
    live: false,
  },
  { id: "plant-tag", title: "Plant Tag", category: "App Design", live: true },
  { id: "swisshaus", title: "Swiss Haus", category: "Web Design", live: false },
  { id: "betahaus", title: "Betahaus", category: "Brand Design", live: false },
];

const SERVICES = [
  {
    number: "01",
    title: "Product Design",
    description:
      "Digital products designed with intuitive flow, structure, and usability in mind.",
  },
  {
    number: "02",
    title: "Digital Experiences",
    description:
      "Web experiences shaped through clarity, rhythm, and thoughtful interaction.",
  },
  {
    number: "03",
    title: "Art Direction",
    description:
      "Visual direction focused on mood, identity, and cohesive digital storytelling.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Built in Webflow or Framer, with custom development when the project calls for it.",
  },
];

const EXPERIENCE_LOGOS = [
  { name: "Trusting Social", initials: "TS" },
  { name: "Vietnamwork", initials: "VW" },
  { name: "Autonomous", initials: "AT" },
  { name: "VEN Agency", initials: "VEN" },
  { name: "Glass Egg", initials: "GE" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", url: "https://instagram.com" },
  { label: "Behance", url: "https://behance.net" },
  { label: "LinkedIn", url: "https://linkedin.com" },
];

function useHcmcClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const hcmc = new Date(utcMs + 7 * 3600000);
      const hh = String(hcmc.getHours()).padStart(2, "0");
      const mm = String(hcmc.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Home() {
  const rootRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const panelRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const time = useHcmcClock();

  useEffect(() => {
    const mm = window.matchMedia("(min-width: 900px)");

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean);

      if (mm.matches) {
        const track = trackRef.current;
        const getTotal = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getTotal(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: () => `+=${getTotal()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActiveIndex(Math.round(self.progress * (panels.length - 1)));
            },
          },
        });

        stRef.current = tween.scrollTrigger;

        panels.forEach((panel, i) => {
          if (i === 0) return;
          gsap.fromTo(
            panel.querySelectorAll(".reveal"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                containerAnimation: tween,
                trigger: panel,
                start: "left 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      } else {
        panels.forEach((panel, i) => {
          if (i === 0) return;
          gsap.fromTo(
            panel.querySelectorAll(".reveal"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: panel,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      gsap.from(".hero-title-word", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta-row > *", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const goToPanel = (index) => {
    setMenuOpen(false);
    const panel = panelRefs.current[index];
    const st = stRef.current;
    if (!panel) return;

    if (st) {
      const progress = index / (panelRefs.current.length - 1);
      const target = st.start + progress * (st.end - st.start);
      gsap.to(window, { duration: 1, ease: "power3.inOut", scrollTo: target });
    } else {
      gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: { y: panel, offsetY: 0 },
      });
    }
  };

  return (
    <div ref={rootRef} className="portfolio-root">
      <aside className="side-rail">
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="rail-marks">
          <span className="rail-text rail-text-small">Folio — Edition</span>
          <span className="rail-text rail-text-large">Khanh Nguyen</span>
        </div>
        <span className="rail-text rail-year">© 2026</span>
      </aside>

      <div
        className={`nav-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="nav-overlay-close"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <ul className="nav-overlay-list">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <button
                className={`nav-overlay-link ${activeIndex === i ? "is-active" : ""}`}
                onClick={() => goToPanel(i)}
              >
                <span className="nav-number">{item.num}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="progress-indicator">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="progress-divider">/</span>
        <span>{String(NAV_ITEMS.length).padStart(2, "0")}</span>
      </div>

      <div ref={wrapperRef} className="horizontal-wrapper">
        <div ref={trackRef} className="horizontal-track">
          <section
            ref={(el) => (panelRefs.current[0] = el)}
            className="h-panel panel-dark hero-panel"
          >
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="hero-title-word">Khanh</span>
                <span className="hero-title-word">Nguyen</span>
              </h1>
              <p className="hero-subtitle">
                Independent designer based in Vietnam — focused on thoughtful,
                considered digital work.
              </p>
            </div>
            <div className="hero-meta-row">
              <div className="hero-meta">
                <span className="meta-label">HCMC, Vietnam</span>
                <span className="meta-value">(GMT+7) {time}</span>
              </div>
              <div className="hero-meta">
                <span className="meta-label">Availability</span>
                <span className="meta-value">Open for collaborations</span>
              </div>
              <button className="scroll-hint" onClick={() => goToPanel(1)}>
                Scroll
              </button>
            </div>
          </section>

          <section
            ref={(el) => (panelRefs.current[1] = el)}
            className="h-panel panel-light about-panel"
          >
            <div className="panel-header reveal">
              <span className="chapter-number">Chapter I</span>
              <h2 className="chapter-title">Quick intro</h2>
            </div>
            <div className="about-body">
              <div className="about-text">
                <p className="reveal">
                  Hi, I&apos;m Khanh — a designer with 10+ years of experience
                  in digital products, websites, and visual systems, creating
                  clear and thoughtful experiences.
                </p>
                <p className="reveal about-quote">
                  Work for money. Design for love.
                </p>
                <p className="reveal about-secondary">
                  Beyond design: football, watches, aquariums, and martial arts.
                </p>
              </div>
              <div className="about-visual reveal">
                <div className="placeholder-image portrait" />
              </div>
            </div>
          </section>

          <section
            ref={(el) => (panelRefs.current[2] = el)}
            className="h-panel panel-light work-panel"
          >
            <span className="panel-label reveal">Related work</span>
            <h2 className="ghost-title reveal">The Work</h2>
            <ul className="work-list">
              {WORK_PROJECTS.map((project) => (
                <li key={project.id} className="work-row reveal">
                  <span className="work-title">{project.title}</span>
                  <span className="work-category">{project.category}</span>
                  {project.live ? (
                    <span className="work-arrow">↗</span>
                  ) : (
                    <span className="work-status">Case study soon</span>
                  )}
                </li>
              ))}
            </ul>
            <a href="#" className="view-all-link reveal">
              View all work
            </a>
          </section>

          <section
            ref={(el) => (panelRefs.current[3] = el)}
            className="h-panel panel-dark services-panel"
          >
            <div className="panel-header reveal">
              <span className="chapter-number">Chapter III</span>
              <h2 className="chapter-title">What I do</h2>
            </div>
            <div className="services-columns">
              {SERVICES.map((service) => (
                <div key={service.number} className="service-column reveal">
                  <span className="service-number">{service.number}</span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
            <p className="services-intro reveal">
              Designing digital experiences with clarity, structure, and
              intention.
            </p>
          </section>

          <section
            ref={(el) => (panelRefs.current[4] = el)}
            className="h-panel panel-light experience-panel"
          >
            <div className="experience-meta">
              <div className="panel-header reveal">
                <span className="chapter-number">Chapter IV</span>
                <span className="panel-label">Selected experiences</span>
              </div>
              <p className="experience-desc reveal">
                Work spanning brands, products, and digital teams.
              </p>
            </div>
            <ul className="experience-list">
              {EXPERIENCE_LOGOS.map((exp) => (
                <li key={exp.name} className="experience-row reveal">
                  <span className="experience-logo">{exp.initials}</span>
                  <span className="experience-name">{exp.name}</span>
                </li>
              ))}
              <li className="experience-row experience-more reveal">
                <span className="experience-name">And more</span>
              </li>
            </ul>
          </section>

          <section
            ref={(el) => (panelRefs.current[5] = el)}
            className="h-panel panel-dark contact-panel"
          >
            <h2 className="contact-title reveal">
              Next
              <br />
              Chapter
            </h2>
            <div className="contact-body">
              <div className="contact-cta reveal">
                <span className="panel-label">Contact to</span>
                <a
                  href="mailto:kennguyen02587@gmail.com"
                  className="contact-email"
                >
                  kennguyen02587@gmail.com
                </a>
              </div>
              <div className="contact-social reveal">
                <span className="panel-label">Social</span>
                <ul className="social-list">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="footer-text">© 2026 — Khanh Nguyen</p>
          </section>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap");

        :root {
          --bg-primary: #f5f1ea;
          --bg-dark: #141210;
          --text-primary: #1a1a1a;
          --text-secondary: #6b6b64;
          --text-tertiary: #a3a099;
          --text-on-dark: #f5f1ea;
          --text-on-dark-muted: rgba(245, 241, 234, 0.6);
          --border-light: #e2ddd2;
          --border-dark: rgba(245, 241, 234, 0.15);
          --accent-indigo: #3d3b63;
          --accent-indigo-light: #a6a3d6;
          --serif: "Fraunces", serif;
          --mono: "JetBrains Mono", monospace;
          --sans: "Inter", sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--sans);
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ul {
          list-style: none;
        }

        button {
          font-family: inherit;
        }

        .portfolio-root {
          position: relative;
          overflow-x: hidden;
        }

        .side-rail {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 64px;
          background: var(--bg-dark);
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
        }

        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
        }

        .hamburger span {
          width: 20px;
          height: 1px;
          background: var(--text-on-dark);
          display: block;
        }

        .rail-marks {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .rail-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          color: var(--text-on-dark-muted);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 1px;
        }

        .rail-text-large {
          font-family: var(--serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-on-dark);
          letter-spacing: 0.5px;
        }

        .rail-year {
          font-size: 10px;
          opacity: 0.6;
        }

        .nav-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-dark);
          z-index: 400;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .nav-overlay.is-open {
          transform: translateY(0);
        }

        .nav-overlay-close {
          position: absolute;
          top: 32px;
          right: 48px;
          background: none;
          border: none;
          color: var(--text-on-dark-muted);
          font-size: 14px;
          font-family: var(--mono);
          cursor: pointer;
        }

        .nav-overlay-close:hover {
          color: var(--text-on-dark);
        }

        .nav-overlay-list {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 140px;
          gap: 24px;
        }

        .nav-overlay-link {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 20px;
          font-family: var(--serif);
          font-size: 42px;
          font-weight: 500;
          color: rgba(245, 241, 234, 0.4);
          transition: color 0.3s ease;
          text-align: left;
        }

        .nav-overlay-link:hover,
        .nav-overlay-link.is-active {
          color: var(--text-on-dark);
        }

        .nav-number {
          font-family: var(--mono);
          font-size: 14px;
          opacity: 0.7;
        }

        .progress-indicator {
          position: fixed;
          bottom: 28px;
          right: 32px;
          z-index: 200;
          display: flex;
          gap: 6px;
          align-items: center;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-on-dark);
          background: rgba(20, 18, 16, 0.85);
          padding: 8px 14px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
        }

        .progress-divider {
          opacity: 0.5;
        }

        .horizontal-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .horizontal-track {
          display: flex;
          height: 100vh;
          will-change: transform;
        }

        .h-panel {
          flex: 0 0 100vw;
          width: 100vw;
          height: 100vh;
          padding: 0 80px 0 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .panel-dark {
          background: var(--bg-dark);
          color: var(--text-on-dark);
        }

        .panel-light {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .panel-header {
          margin-bottom: 56px;
        }

        .chapter-number {
          display: block;
          font-family: var(--serif);
          font-style: italic;
          font-size: 15px;
          color: var(--accent-indigo);
          margin-bottom: 12px;
        }

        .panel-dark .chapter-number {
          color: var(--accent-indigo-light);
        }

        .chapter-title {
          font-family: var(--serif);
          font-size: 44px;
          font-weight: 600;
        }

        .panel-label {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--text-tertiary);
        }

        .hero-panel {
          justify-content: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px;
          align-items: start;
        }

        .hero-title {
          font-family: var(--serif);
          font-size: clamp(3rem, 9vw, 7.5rem);
          font-weight: 600;
          line-height: 0.95;
          letter-spacing: -0.01em;
        }

        .hero-title-word {
          display: block;
        }

        .hero-subtitle {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text-on-dark-muted);
          padding-top: 14px;
          max-width: 320px;
        }

        .hero-meta-row {
          position: absolute;
          bottom: 56px;
          left: 140px;
          right: 80px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .hero-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .meta-label {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-on-dark-muted);
        }

        .meta-value {
          font-family: var(--serif);
          font-size: 15px;
          font-weight: 500;
        }

        .scroll-hint {
          background: none;
          border: none;
          color: var(--text-on-dark);
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .about-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 60px;
          align-items: center;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 480px;
        }

        .about-text p {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .about-quote {
          font-family: var(--serif);
          font-size: 20px;
          font-style: italic;
          color: var(--text-primary);
        }

        .about-secondary {
          color: var(--text-tertiary);
        }

        .placeholder-image {
          background: linear-gradient(135deg, #e2ddd2 0%, #d3ccbf 100%);
          border-radius: 8px;
        }

        .placeholder-image.portrait {
          width: 100%;
          aspect-ratio: 3 / 4;
        }

        .work-panel {
          justify-content: center;
        }

        .ghost-title {
          font-family: var(--serif);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--text-primary);
          margin: 12px 0 56px;
        }

        .work-list {
          display: flex;
          flex-direction: column;
          max-width: 640px;
        }

        .work-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-tertiary);
          transition: color 0.3s ease;
        }

        .work-row:hover {
          color: var(--text-primary);
        }

        .work-title {
          font-family: var(--serif);
          font-size: 26px;
          font-weight: 600;
        }

        .work-category {
          font-family: var(--mono);
          font-size: 12px;
          margin-left: auto;
        }

        .work-arrow {
          font-size: 18px;
        }

        .work-status {
          font-family: var(--mono);
          font-size: 11px;
        }

        .view-all-link {
          margin-top: 40px;
          display: inline-block;
          width: fit-content;
          font-family: var(--serif);
          font-size: 17px;
          font-weight: 600;
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 4px;
        }

        .services-panel {
          justify-content: center;
        }

        .services-columns {
          display: flex;
          gap: 56px;
        }

        .service-column {
          flex: 1;
          max-width: 260px;
        }

        .service-number {
          display: block;
          font-family: var(--serif);
          font-size: 40px;
          font-weight: 600;
          color: var(--text-on-dark-muted);
          margin-bottom: 20px;
        }

        .service-title {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .service-description {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-on-dark-muted);
        }

        .services-intro {
          position: absolute;
          bottom: 56px;
          left: 140px;
          max-width: 340px;
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-on-dark-muted);
        }

        .experience-panel {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          align-items: center;
        }

        .experience-meta {
          height: 60%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .experience-desc {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 260px;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
        }

        .experience-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-light);
        }

        .experience-logo {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .experience-row:hover .experience-logo {
          opacity: 1;
        }

        .experience-name {
          font-family: var(--serif);
          font-size: 30px;
          font-weight: 600;
          color: var(--text-tertiary);
          transition: color 0.3s ease;
        }

        .experience-row:hover .experience-name {
          color: var(--text-primary);
        }

        .contact-panel {
          justify-content: center;
        }

        .contact-title {
          font-family: var(--serif);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          line-height: 0.95;
          margin-bottom: 64px;
        }

        .contact-body {
          display: flex;
          gap: 120px;
        }

        .contact-cta {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-email {
          font-family: var(--mono);
          font-size: 17px;
          border-bottom: 2px solid var(--text-on-dark);
          padding-bottom: 6px;
          width: fit-content;
        }

        .contact-social {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .social-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .social-list a {
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
        }

        .social-list a:hover {
          border-bottom-color: var(--text-on-dark);
        }

        .footer-text {
          position: absolute;
          bottom: 32px;
          left: 140px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-on-dark-muted);
        }

        @media (max-width: 899px) {
          .horizontal-wrapper {
            height: auto;
            overflow: visible;
          }

          .horizontal-track {
            flex-direction: column;
            height: auto;
            transform: none !important;
          }

          .h-panel {
            width: 100vw;
            height: auto;
            min-height: 100vh;
            padding: 120px 24px 80px 88px;
          }

          .hero-content,
          .about-body,
          .experience-panel {
            grid-template-columns: 1fr;
          }

          .services-columns {
            flex-direction: column;
            gap: 40px;
          }

          .services-intro {
            position: static;
            margin-top: 48px;
          }

          .hero-meta-row {
            position: static;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-top: 60px;
          }

          .contact-body {
            flex-direction: column;
            gap: 40px;
          }

          .footer-text {
            position: static;
            margin-top: 60px;
            display: block;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
