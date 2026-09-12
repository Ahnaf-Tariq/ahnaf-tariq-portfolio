"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import ahnafImg from "@/public/images/ahnaf.jpeg";
import { cn } from "@/lib/utils";
import {
  EXPERIENCE,
  NAV_ITEMS,
  PANEL_THEMES,
  SERVICES,
  SKILL_CATEGORIES,
  SKILLS,
  SOCIAL_LINKS,
  WORK_PROJECTS,
} from "@/data/data";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function usePktClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const pkt = new Date(utcMs + 5 * 3600000);
      const hh = String(pkt.getHours()).padStart(2, "0");
      const mm = String(pkt.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<string>(WORK_PROJECTS[0].id);
  const [hoveredExp, setHoveredExp] = useState<string>(EXPERIENCE[0].name);
  const [showAllWork, setShowAllWork] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");

  const visibleSkills =
    activeSkillCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeSkillCategory);

  const theme = PANEL_THEMES[activeIndex] ?? PANEL_THEMES[0];
  const time = usePktClock();

  useEffect(() => {
    const mm = window.matchMedia("(min-width: 1024px)");

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(
        (p): p is HTMLElement => p !== null,
      );

      if (mm.matches) {
        const track = trackRef.current;
        if (!track) return;

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

        stRef.current = tween.scrollTrigger ?? null;

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

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
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
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta-row > *", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.7,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const goToPanel = (index: number) => {
    setMenuOpen(false);
    const panel = panelRefs.current[index];
    const st = stRef.current;
    if (!panel) return;

    if (st) {
      const progress = index / (panelRefs.current.length - 1);
      const target = st.start + progress * (st.end - st.start);
      gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: target,
      });
    } else {
      gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: { y: panel, offsetY: 0 },
      });
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative overflow-x-hidden font-[family-name:var(--sans)] bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased leading-relaxed"
    >
      <aside
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        className="fixed top-0 left-0 bottom-0 w-16 border-r z-[300] flex flex-col items-center justify-between pb-6 pt-1 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
      >
        <button
          style={{ borderColor: theme.border }}
          className="w-full bg-transparent border-b cursor-pointer flex flex-col items-center gap-1 py-3.5"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            style={{ backgroundColor: theme.text }}
            className="block w-5 h-px transition-colors duration-500"
          />
          <span
            style={{ backgroundColor: theme.text }}
            className="block w-5 h-px transition-colors duration-500"
          />
          <span
            style={{ backgroundColor: theme.text }}
            className="block w-5 h-px transition-colors duration-500"
          />
        </button>

        <div className="flex flex-col items-center gap-10">
          <span
            style={{ color: theme.textMuted }}
            className="rail-text font-[family-name:var(--mono)] text-[11px] tracking-wide transition-colors duration-500"
          >
            Folio — Edition
          </span>
          <span
            style={{ color: theme.text }}
            className="rail-text font-[family-name:var(--serif)] text-sm font-medium tracking-wide uppercase transition-colors duration-500"
          >
            Ahnaf Tariq<span className="font-light text-[7px]">&trade;</span>
          </span>
        </div>

        <span
          style={{ color: theme.textMuted }}
          className="rail-text font-[family-name:var(--mono)] text-[10px] opacity-60 transition-colors duration-500"
        >
          © 2026
        </span>
      </aside>

      <div
        style={{ backgroundColor: theme.bg }}
        className={cn(
          "fixed top-0 right-0 bottom-0 left-16 z-[250] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
          menuOpen ? "translate-y-0" : "-translate-y-full",
        )}
        aria-hidden={!menuOpen}
      >
        <button
          className="absolute top-6 right-6 sm:top-8 sm:right-12 bg-transparent border-none text-[var(--text-on-dark-muted)] text-sm font-[family-name:var(--serif)] uppercase tracking-widest cursor-pointer hover:text-[var(--text-on-dark)]"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <ul className="h-full flex flex-col justify-center pl-6 md:pl-12 gap-4 md:gap-6">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.label}
              style={
                {
                  "--nav-active": theme.text,
                  "--nav-muted": theme.textMuted,
                } as CSSProperties
              }
            >
              <button
                className={cn(
                  "group nav-overlay-link bg-transparent border-none cursor-pointer flex items-center gap-3 sm:gap-4 md:gap-5 font-[family-name:var(--serif)] text-2xl sm:text-3xl md:text-4xl lg:text-[clamp(2rem,5vw,2.5rem)] uppercase font-medium text-left transition-colors duration-300 hover:text-[var(--nav-active)]",
                  activeIndex === i
                    ? "text-[var(--nav-active)]"
                    : "text-[var(--nav-muted)]",
                )}
                onClick={() => goToPanel(i)}
              >
                <span className="font-[family-name:var(--mono)] text-sm opacity-70">
                  {item.num}.
                </span>

                <span className="relative inline-flex items-center gap-3">
                  <span>{item.label}</span>
                  <FaArrowRight className="text-xl -rotate-45 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                  <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[var(--nav-active)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-7 right-8 z-[200] flex gap-1.5 items-center font-[family-name:var(--mono)] text-xs text-[var(--text-on-dark)] bg-[rgba(20,18,16,0.85)] px-3.5 py-2 rounded-full backdrop-blur-[6px]">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="opacity-50">/</span>
        <span>{String(NAV_ITEMS.length).padStart(2, "0")}</span>
      </div>

      <div
        ref={wrapperRef}
        className="relative w-screen h-screen overflow-hidden max-lg:h-auto max-lg:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex h-screen w-max will-change-transform max-lg:w-full max-lg:flex-col max-lg:h-auto max-lg:!transform-none"
        >
          <section
            ref={(el) => {
              panelRefs.current[0] = el;
            }}
            className="flex-none w-screen h-screen pl-28 pr-20 py-8 flex flex-col justify-between relative bg-[var(--bg-dark)] text-[var(--text-on-dark)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="grid grid-cols-[1fr_340px] gap-[60px] items-start max-lg:grid-cols-1">
              <h1 className="font-[family-name:var(--serif)] uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(6rem,13vw,11rem)] font-extralight leading-[0.9] tracking-tight">
                <span className="hero-title-word block">Ahnaf</span>
                <span className="hero-title-word block">Tariq</span>
              </h1>
              <p className="text-[15px] leading-[1.75] text-[var(--text-on-dark-muted)] pt-3.5 max-w-[320px]">
                Fullstack Engineer based in Pakistan — building fast,
                interactive, high-performance web experiences with Next.js,
                Threejs & Nest.js.
              </p>
            </div>
            <div className="hero-meta-row flex justify-between items-end max-lg:flex-col max-lg:items-start max-lg:gap-5">
              <div className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--mono)] text-[11px] text-[var(--text-on-dark-muted)]">
                  Karachi, Pakistan
                </span>
                <span className="font-[family-name:var(--serif)] text-[15px] font-medium">
                  (GMT+5) {time}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--mono)] text-[11px] text-[var(--text-on-dark-muted)]">
                  Availability
                </span>
                <span className="font-[family-name:var(--serif)] text-[15px] font-medium">
                  Open for freelance &amp; full-time roles
                </span>
              </div>
              <button
                className="hidden sm:block bg-transparent border-none text-[var(--text-on-dark)] font-[family-name:var(--serif)] text-2xl uppercase tracking-wide cursor-pointer"
                onClick={() => goToPanel(1)}
              >
                Scroll
              </button>
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[1] = el;
            }}
            className="flex-none w-screen h-screen pl-[120px] pr-16 flex items-center justify-center relative bg-[var(--bg-primary)] text-[var(--text-primary)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="w-full max-w-5xl flex flex-col justify-center">
              <div className="mb-10 reveal">
                <span className="block font-[family-name:var(--mono)] text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">
                  Chapter I
                </span>
                <h2 className="font-[family-name:var(--serif)] text-4xl sm:text-5xl font-semibold tracking-tight">
                  Quick intro
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 items-center">
                <div className="flex flex-col gap-6 max-w-xl">
                  <p className="reveal text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] font-light">
                    Hi, I&apos;m Ahnaf — a Fullstack Engineer with 2+ years of
                    hands-on experience building responsive, high-performance
                    web applications using Next.js, Three.js, and Nest.js.
                  </p>

                  <blockquote className="reveal pl-4 border-l-2 border-[var(--text-primary)] font-[family-name:var(--serif)] text-xl italic text-[var(--text-primary)] my-1">
                    &ldquo;Code with precision. Build with purpose.&rdquo;
                  </blockquote>

                  <p className="reveal text-base leading-relaxed text-[var(--text-tertiary)]">
                    Beyond code: exploring 3D web design, gaming aesthetics, and
                    emerging frontend tools.
                  </p>
                </div>

                <div className="reveal flex justify-start md:justify-end">
                  <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
                    <Image
                      src={ahnafImg}
                      alt="Ahnaf Tariq"
                      fill
                      sizes="(max-width: 1023px) 100vw, 320px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[2] = el;
            }}
            className="flex-none w-screen h-screen pl-[140px] pr-20 flex flex-col justify-center relative bg-[var(--bg-dark)] text-[var(--text-on-dark)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="grid grid-cols-[320px_1fr] gap-16 items-start max-lg:grid-cols-1">
              <div className="flex flex-col gap-10 reveal max-lg:gap-6">
                <span className="block font-[family-name:var(--serif)] uppercase tracking-wide text-[22px] text-[var(--text-on-dark)]">
                  Chapter II
                </span>

                <div className="flex flex-col gap-4">
                  <span className="block font-[family-name:var(--mono)] text-xs tracking-[2px] uppercase text-[var(--text-on-dark-muted)]">
                    Toolkit
                  </span>
                  <h2 className="font-[family-name:var(--serif)] text-4xl font-semibold tracking-tight text-[var(--text-on-dark)]">
                    My Skills
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[var(--text-on-dark-muted)] max-w-[280px]">
                    A snapshot of the languages, frameworks, and tools I reach
                    for when building products end to end.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 max-lg:hidden">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSkillCategory(cat.id)}
                      className={cn(
                        "px-4 py-1.5 rounded-full border text-xs font-[family-name:var(--mono)] uppercase tracking-wide transition-colors duration-300",
                        activeSkillCategory === cat.id
                          ? "bg-[var(--text-on-dark)] text-[var(--bg-dark)] border-[var(--text-on-dark)]"
                          : "border-[var(--border-dark)] text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] hover:border-[var(--text-on-dark-muted)]",
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar max-lg:max-h-none">
                <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSkillCategory(cat.id)}
                      className={cn(
                        "cursor-pointer px-4 py-1.5 rounded-full border text-xs font-[family-name:var(--mono)] uppercase tracking-wide transition-colors duration-300",
                        activeSkillCategory === cat.id
                          ? "bg-[var(--text-on-dark)] text-[var(--bg-dark)] border-[var(--text-on-dark)]"
                          : "border-[var(--border-dark)] text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] hover:border-[var(--text-on-dark-muted)]",
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-x-14 gap-y-8 max-lg:grid-cols-1">
                  {visibleSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="reveal flex flex-col gap-2.5"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="font-[family-name:var(--sans)] font-semibold text-lg text-[var(--text-on-dark)]">
                          {skill.name}
                        </span>
                        <span className="font-[family-name:var(--mono)] text-xs text-[var(--text-on-dark-muted)]">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-[3px] w-full rounded-full bg-[var(--border-dark)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--text-on-dark)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[3] = el;
            }}
            className="flex-none w-screen h-screen pl-[140px] pr-20 flex flex-col justify-center relative bg-[var(--bg-primary)] text-[var(--text-primary)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="grid grid-cols-[300px_1fr] gap-16 items-start max-lg:grid-cols-1">
              <div className="flex flex-col gap-10 reveal">
                <span className="block font-[family-name:var(--serif)] uppercase tracking-wide text-[22px] text-[var(--text-primary)]">
                  Chapter III
                </span>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[var(--bg-secondary)] shadow-sm max-lg:hidden">
                  {WORK_PROJECTS.map((project) => {
                    const isSelected =
                      (hoveredWork || WORK_PROJECTS[0].id) === project.id;
                    return (
                      <Image
                        key={project.id}
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="300px"
                        className={cn(
                          "object-cover transition-opacity duration-300 ease-in-out",
                          isSelected
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105 pointer-events-none",
                        )}
                        priority={project.id === WORK_PROJECTS[0].id}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="reveal block font-[family-name:var(--mono)] text-xs tracking-[2px] uppercase text-[var(--accent-indigo)] mb-6">
                  Related work
                </span>

                <div className="max-w-[640px] max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="flex flex-col">
                    {(showAllWork
                      ? WORK_PROJECTS
                      : WORK_PROJECTS.slice(0, 4)
                    ).map((project) => (
                      <li
                        key={project.id}
                        onMouseEnter={() => setHoveredWork(project.id)}
                        className="reveal border-b border-[var(--border-light)] transition-all duration-300"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "work-row flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-3 sm:py-[18px] font-[family-name:var(--sans)] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] transition-colors duration-300",
                            hoveredWork === project.id
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                          )}
                        >
                          <span>{project.title}</span>
                          <span className="font-[family-name:var(--mono)] text-xs sm:ml-auto font-normal">
                            {project.category}
                          </span>
                          <span className="text-lg">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowAllWork((prev) => !prev)}
                  className="reveal mt-8 inline-block bg-transparent border-none cursor-pointer font-[family-name:var(--serif)] text-[17px] font-semibold border-b-2 border-[var(--text-primary)] pb-1 text-[var(--text-primary)] transition-opacity hover:opacity-75"
                >
                  {showAllWork ? "Show Less" : "View More"}
                </button>
              </div>
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[4] = el;
            }}
            className="flex-none min-w-fit h-screen pl-[88px] flex relative bg-[#221D19] text-[#F5F1EA] overflow-x-hidden max-lg:w-screen max-lg:min-w-0 max-lg:h-auto max-lg:min-h-screen max-lg:flex-col max-lg:pl-12"
          >
            <div className="w-[360px] min-w-[360px] h-full flex flex-col justify-between px-12 py-8 border-r border-[#F5F1EA]/10 relative z-10 max-lg:w-full max-lg:min-w-0 max-lg:h-auto max-lg:p-8 max-lg:border-b max-lg:border-r-0">
              <div className="reveal">
                <span className="block font-[family-name:var(--serif)] uppercase tracking-wider text-[22px] text-[#F5F1EA]">
                  Chapter IV
                </span>
              </div>

              <div className="reveal max-lg:mt-12">
                <span className="block font-[family-name:var(--mono)] text-xs tracking-[2px] uppercase text-[#A6A3D6] mb-4">
                  WHAT I DO?
                </span>
                <p className="font-[family-name:var(--serif)] text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-[1.3] font-medium text-[#F5F1EA]">
                  Engineering fast, accessible, and visually rich web
                  experiences.
                </p>
              </div>
            </div>

            <div className="flex h-full max-lg:flex-col max-lg:w-full max-lg:h-auto">
              {SERVICES.map((service) => (
                <div
                  key={service.number}
                  className="group relative w-[320px] min-w-[320px] h-full border-r border-[#F5F1EA]/10 px-10 py-8 flex flex-col justify-between transition-colors duration-500 overflow-hidden max-lg:w-full max-lg:min-w-0 max-lg:h-auto max-lg:border-b max-lg:border-r-0 max-lg:min-h-[380px] max-lg:p-8"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 640px"
                      quality={90}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#221D19]/60 mix-blend-multiply" />
                  </div>

                  <span className="relative z-10 block font-[family-name:var(--serif)] text-5xl sm:text-6xl lg:text-[64px] font-light leading-none text-[#F5F1EA] transition-transform duration-500 group-hover:-translate-y-1">
                    {service.number}
                  </span>

                  <div className="relative z-10 flex flex-col gap-6">
                    <h3 className="font-[family-name:var(--serif)] uppercase text-xl sm:text-2xl md:text-3xl lg:text-[26px] leading-[1.2] font-semibold tracking-wide text-[#F5F1EA]">
                      {service.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-[#F5F1EA]/70 transition-colors duration-300 group-hover:text-[#F5F1EA]/90 max-w-none sm:max-w-[240px]">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[5] = el;
            }}
            className="flex-none w-screen h-screen pl-[140px] pr-20 grid grid-cols-[420px_1fr] gap-[40px] items-center relative bg-[var(--bg-primary)] text-[var(--text-primary)] max-lg:grid-cols-1 max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="h-[70%] flex flex-col justify-between">
              <span className="reveal block font-[family-name:var(--serif)] uppercase tracking-wide text-[22px] text-[var(--text-primary)]">
                Chapter V
              </span>
              <p className="reveal text-xs uppercase tracking-wider text-[var(--text-secondary)] leading-relaxed max-w-[280px]">
                Professional journey across software agencies, engineering
                teams, and client projects.{" "}
              </p>
            </div>

            <div>
              <span className="reveal block font-[family-name:var(--mono)] text-[11px] tracking-[2px] uppercase text-[var(--text-tertiary)] mb-8">
                My experience
              </span>

              <ul className="flex flex-col">
                {EXPERIENCE.map((exp) => {
                  const isHovered = hoveredExp === exp.name;
                  return (
                    <li
                      key={exp.id}
                      onMouseEnter={() => setHoveredExp(exp.name)}
                      className="reveal border-b border-[var(--border-light)] py-4 transition-all duration-300"
                    >
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col gap-1 cursor-pointer block"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "font-[family-name:var(--sans)] font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight transition-colors duration-300",
                              isHovered
                                ? "text-[var(--text-primary)]"
                                : "text-[var(--text-tertiary)]",
                            )}
                          >
                            {exp.name}
                          </span>
                          <FaArrowRight
                            className={cn(
                              "text-2xl -rotate-45 transition-all duration-300 ease-out",
                              isHovered
                                ? "opacity-100 translate-x-0 -translate-y-0 text-[var(--text-primary)]"
                                : "opacity-0 -translate-x-3 translate-y-3 text-[var(--text-tertiary)]",
                            )}
                          />
                        </div>

                        <div
                          className={cn(
                            "grid transition-all duration-300 ease-in-out",
                            isHovered
                              ? "grid-rows-[1fr] opacity-100 mt-2"
                              : "grid-rows-[0fr] opacity-0 mt-0",
                          )}
                        >
                          <div className="overflow-hidden flex flex-col gap-1">
                            <div className="flex items-center gap-3 text-xs font-[family-name:var(--mono)] text-[var(--accent-indigo)] font-medium">
                              <span>{exp.role}</span>
                              <span>•</span>
                              <span>{exp.period}</span>
                            </div>
                            <p className="text-[14px] text-[var(--text-secondary)] font-normal max-w-[520px] leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section
            ref={(el) => {
              panelRefs.current[6] = el;
            }}
            className="flex-none w-screen h-screen pl-28 pr-20 py-8 flex flex-col justify-between relative bg-[var(--bg-dark)] text-[var(--text-on-dark)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pb-20 max-lg:pl-[88px]"
          >
            <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-8">
              <h2 className="font-[family-name:var(--serif)] uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,10vw,8.5rem)] font-extralight leading-[0.88] tracking-tight">
                Next
                <br />
                Chapter
              </h2>

              <div className="reveal flex flex-wrap gap-4 sm:gap-8 pt-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    download={
                      link.isDownload
                        ? "Muhammad_Ahnaf_Tariq_CV.pdf"
                        : undefined
                    }
                    className="relative text-sm sm:text-base font-medium text-[var(--text-on-dark)] py-px group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--text-on-dark)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between w-full my-auto max-lg:flex-col max-lg:items-start max-lg:gap-6">
              <div className="reveal flex flex-col gap-4">
                <span className="font-[family-name:var(--mono)] text-xs tracking-wide text-[var(--text-tertiary)] uppercase">
                  Contact to
                </span>
                <a
                  href="mailto:ahnafhamid7@gmail.com"
                  className="font-[family-name:var(--sans)] text-lg sm:text-xl md:text-2xl lg:text-[28px] border-b-2 border-[var(--text-on-dark)] pb-px w-fit break-all"
                >
                  ahnafhamid7@gmail.com
                </a>
              </div>

              <span className="reveal font-[family-name:var(--mono)] text-xs tracking-[2px] uppercase text-[var(--accent-indigo-light)] max-lg:hidden">
                Where code meets craft
              </span>
            </div>

            <p className="font-[family-name:var(--mono)] text-xs text-[var(--text-on-dark-muted)] max-lg:mt-10 max-lg:block">
              © 2026 — Ahnaf Tariq
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
