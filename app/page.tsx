"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import ahnafImg from "@/public/images/ahnaf.jpeg";
import { cn } from "@/lib/utils";
import SiteSidebar from "@/components/site-sidebar";
import {
  EXPERIENCE,
  PANEL_THEMES,
  SERVICES,
  SKILL_CATEGORIES,
  SKILLS,
  SOCIAL_LINKS,
  WORK_PROJECTS,
} from "@/data/data";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.config({ ignoreMobileResize: true });

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredExp, setHoveredExp] = useState<string>(EXPERIENCE[0].name);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const workIntroRef = useRef<HTMLDivElement>(null);
  const workStageRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const workWordLeftRef = useRef<HTMLSpanElement>(null);
  const workWordRightRef = useRef<HTMLSpanElement>(null);
  const workListRef = useRef<HTMLDivElement>(null);
  const panelLeftsRef = useRef<number[]>([]);

  const mosaicColumns = [0, 1, 2].map((c) =>
    Array.from(
      { length: 9 },
      (_, r) => WORK_PROJECTS[(c * 3 + r) % WORK_PROJECTS.length],
    ),
  );

  const measurePanels = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    panelLeftsRef.current = panelRefs.current.map((p) =>
      p ? p.getBoundingClientRect().left - trackLeft : 0,
    );
  };

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
            onRefresh: measurePanels,
            onUpdate: (self) => {
              // active panel = the last one whose left edge has passed screen centre
              const probe =
                self.scroll() - self.start + window.innerWidth * 0.5;
              let idx = 0;
              panelLeftsRef.current.forEach((left, i) => {
                if (left <= probe) idx = i;
              });
              setActiveIndex(idx);
            },
          },
        });

        stRef.current = tween.scrollTrigger ?? null;

        const intro = workIntroRef.current;
        const stage = workStageRef.current;
        const box = mosaicRef.current;
        const wordL = workWordLeftRef.current;
        const wordR = workWordRightRef.current;

        if (intro && stage && box && wordL && wordR) {
          const cols = box.querySelectorAll<HTMLElement>(".mosaic-col");
          const vw = () => window.innerWidth;
          const boxW = () => Math.max(vw() - 64, window.innerHeight * (16 / 9));

          gsap.set(box, { xPercent: -50, yPercent: -50 });

          const grow = { s: 0 };
          const applyGrow = () => {
            const s = grow.s;
            const half = (boxW() * s) / 2;
            const d = (wordL.offsetWidth - wordR.offsetWidth) / 2;
            gsap.set(box, { scale: s, x: d * (1 - s) });
            gsap.set(wordL, { x: -(d * s + half) });
            gsap.set(wordR, { x: -d * s + half });
          };
          applyGrow();

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: intro,
              containerAnimation: tween,
              start: "left left",
              end: "right right",
              scrub: true,
              invalidateOnRefresh: true,
              onRefresh: applyGrow,
            },
          });

          tl.fromTo(stage, { x: 0 }, { x: () => vw(), duration: 1 }, 0);

          tl.fromTo(
            grow,
            { s: 0 },
            { s: 1, ease: "power2.inOut", duration: 0.75, onUpdate: applyGrow },
            0.06,
          );

          tl.fromTo(
            cols[0],
            { yPercent: -10 },
            { yPercent: 10, duration: 1 },
            0,
          );
          tl.fromTo(
            cols[1],
            { yPercent: 12 },
            { yPercent: -12, duration: 1 },
            0,
          );
          tl.fromTo(
            cols[2],
            { yPercent: -10 },
            { yPercent: 10, duration: 1 },
            0,
          );
        }

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
        const intro = workIntroRef.current;
        const stage = workStageRef.current;
        const box = mosaicRef.current;
        const wordT = workWordLeftRef.current;
        const wordB = workWordRightRef.current;

        if (intro && stage && box && wordT && wordB) {
          const cols = box.querySelectorAll<HTMLElement>(".mosaic-col");

          const grow = { s: 0 };
          const applyGrow = () => {
            const half = (stage.offsetHeight * grow.s) / 2;
            gsap.set(box, { scale: grow.s });
            gsap.set(wordT, { y: -half });
            gsap.set(wordB, { y: half });
          };
          applyGrow();

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: intro,
              start: "top top",
              end: "bottom bottom",
              pin: stage,
              pinSpacing: false,
              anticipatePin: 1,
              scrub: 0.4,
              invalidateOnRefresh: true,
              onRefresh: applyGrow,
            },
          });

          tl.fromTo(
            grow,
            { s: 0 },
            { s: 1, ease: "power2.inOut", duration: 0.75, onUpdate: applyGrow },
            0.06,
          );
          tl.fromTo(
            cols[0],
            { yPercent: -10 },
            { yPercent: 10, duration: 1 },
            0,
          );
          tl.fromTo(
            cols[1],
            { yPercent: 12 },
            { yPercent: -12, duration: 1 },
            0,
          );
          tl.fromTo(
            cols[2],
            { yPercent: -10 },
            { yPercent: 10, duration: 1 },
            0,
          );
        }

        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
            onRefresh: (self) => {
              if (self.isActive) setActiveIndex(index);
            },
          });
        });

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
                // for the work panel, wait until the list itself (not the pinned intro) arrives
                trigger: i === 3 ? (workListRef.current ?? panel) : panel,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
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
    const st = stRef.current;

    if (st) {
      // desktop: horizontal track pinned to vertical scroll
      const left = panelLeftsRef.current[index];
      if (left === undefined) return;
      const total = st.end - st.start;
      gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: st.start + Math.min(left, total),
      });
    } else {
      // mobile: normal vertical flow
      const panel = panelRefs.current[index];
      if (!panel) return;
      gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: { y: panel, offsetY: 0 },
      });
    }
  };

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "section",
    );
    if (requested === null) return;

    const index = Number(requested);
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= panelRefs.current.length
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      goToPanel(index);
      window.history.replaceState(null, "", window.location.pathname);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-x-hidden font-[family-name:var(--sans)] bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased leading-relaxed"
    >
      <SiteSidebar
        theme={theme}
        activeIndex={activeIndex}
        onNavigate={goToPanel}
      />

      <div
        ref={wrapperRef}
        className="relative w-screen h-screen overflow-hidden max-lg:h-auto max-lg:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex h-screen w-max will-change-transform max-lg:w-full max-lg:flex-col max-lg:h-auto max-lg:!transform-none max-lg:!will-change-auto"
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
                MERN Stack Engineer based in Pakistan — building fast,
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
                    Hi, I&apos;m Ahnaf — a MERN Stack Engineer with 2+ years of
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
                      className="reveal group flex items-center gap-2.5 border-b border-[var(--border-dark)] py-2 transition-colors duration-300 hover:border-[var(--text-on-dark-muted)]"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--text-on-dark-muted)] transition-colors duration-300 group-hover:bg-[var(--text-on-dark)]" />
                      <span className="font-[family-name:var(--sans)] text-lg font-semibold text-[var(--text-on-dark)] transition-transform duration-300 group-hover:translate-x-1">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────────────── THE WORK + Chapter III ───────────────────────── */}
          <section
            ref={(el) => {
              panelRefs.current[3] = el;
            }}
            className="flex-none flex w-max h-screen relative bg-[var(--bg-primary)] text-[var(--text-primary)] max-lg:w-screen max-lg:h-auto max-lg:min-h-screen max-lg:flex-col"
          >
            {/* intro: desktop = 200vw wide (stage is held in place while the track slides),
                mobile = one pinned screen */}
            <div
              ref={workIntroRef}
              className="relative h-[260svh] w-full shrink-0 lg:h-screen lg:w-[200vw]"
            >
              <div
                ref={workStageRef}
                className="relative h-[100svh] w-full overflow-hidden bg-[var(--bg-primary)] will-change-transform lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-screen"
              >
                <div className="absolute inset-y-0 left-16 right-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-[1vh] whitespace-nowrap lg:flex-row lg:gap-[3vw]">
                    <span
                      ref={workWordLeftRef}
                      className="shrink-0 will-change-transform font-[family-name:var(--serif)] uppercase font-light leading-[0.9] tracking-tight text-[clamp(3.5rem,19vw,6rem)] lg:leading-none lg:text-[clamp(5rem,13vw,13rem)]"
                    >
                      The
                    </span>
                    <span
                      ref={workWordRightRef}
                      className="shrink-0 will-change-transform font-[family-name:var(--serif)] uppercase font-light leading-[0.9] tracking-tight text-[clamp(3.5rem,19vw,6rem)] lg:leading-none lg:text-[clamp(5rem,13vw,13rem)]"
                    >
                      Work
                    </span>
                  </div>

                  {/* the window — mobile: fills the whole area, desktop: 16:9, centred */}
                  <div
                    ref={mosaicRef}
                    className="absolute inset-0 overflow-hidden will-change-transform [container-type:inline-size] lg:inset-auto lg:left-1/2 lg:top-1/2 lg:aspect-video lg:w-[max(calc(100vw_-_4rem),177.78vh)]"
                  >
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-[4cqw]">
                      {mosaicColumns.map((col, c) => (
                        <div
                          key={c}
                          className="mosaic-col shrink-0 flex flex-col gap-[4cqw]"
                        >
                          {col.map((p, r) => (
                            <div
                              key={r}
                              className={cn(
                                "relative aspect-video w-[56cqw] overflow-hidden",
                                (r < 2 || r > 6) && "lg:hidden",
                              )}
                              style={{
                                filter: c !== 1 ? "blur(0.4cqw)" : undefined,
                              }}
                            >
                              <Image
                                src={p.image}
                                alt=""
                                fill
                                sizes="60vw"
                                loading="eager"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ───── Chapter III list ───── */}
            <div
              ref={workListRef}
              className="w-screen h-screen bg-[#ECE8E3] pl-[120px] pr-16 py-12 grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-8 max-lg:h-auto max-lg:min-h-screen max-lg:pt-[120px] max-lg:px-6 max-lg:pl-[88px] max-lg:pb-20"
            >
              {/* left: label + hover frame */}
              <div className="flex flex-col justify-between">
                <span className="reveal font-[family-name:var(--serif)] uppercase tracking-wide text-[22px]">
                  Chapter III
                </span>

                <div className="reveal relative aspect-video w-full max-w-[380px] border border-[#B9B4AC] max-lg:hidden">
                  <svg
                    className={cn(
                      "absolute inset-0 h-full w-full transition-opacity duration-300",
                      hoveredWork ? "opacity-0" : "opacity-100",
                    )}
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="100"
                      y2="100"
                      stroke="#B9B4AC"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {WORK_PROJECTS.slice(0, 4).map((p) => {
                    const active = hoveredWork === p.id;
                    return (
                      <div
                        key={p.id}
                        className={cn(
                          "absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]",
                          active
                            ? "z-10 [clip-path:inset(0_0_0_0)]"
                            : "z-0 [clip-path:inset(0_0_100%_0)]",
                        )}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="380px"
                          className={cn(
                            "object-cover transition-transform duration-700 ease-out",
                            active ? "scale-100" : "scale-110",
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* right: list */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="reveal block font-[family-name:var(--sans)] text-[11px] uppercase tracking-wide mb-6">
                    Related work
                  </span>

                  <ul
                    onMouseLeave={() => setHoveredWork(null)}
                    className="flex flex-col"
                  >
                    {WORK_PROJECTS.slice(0, 4).map((p) => {
                      const active = hoveredWork === p.id;
                      const dim = hoveredWork !== null && !active;
                      return (
                        <li
                          key={p.id}
                          onMouseEnter={() => setHoveredWork(p.id)}
                          className={cn(
                            "reveal border-b transition-colors duration-300",
                            active
                              ? "border-[var(--text-primary)]"
                              : "border-[#BDB8B0]",
                          )}
                        >
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              "flex items-center justify-between py-3 font-[family-name:var(--sans)] text-[clamp(1.5rem,7.5vw,2.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)] transition-colors duration-300 lg:text-[clamp(2.5rem,4.6vw,4.25rem)] lg:leading-[1.05]",
                              dim && "lg:text-[#BDB9B3]",
                            )}
                          >
                            {p.title}
                            <FaArrowRight
                              className={cn(
                                "text-3xl -rotate-45 transition-all duration-300 max-lg:hidden",
                                active
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-3",
                              )}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="reveal flex items-end justify-between gap-6 max-lg:flex-col-reverse max-lg:items-start max-lg:mt-10">
                  <a
                    href="/works"
                    className="group inline-flex items-center gap-2 font-[family-name:var(--sans)] text-lg sm:text-xl md:text-2xl"
                  >
                    View All Work
                    <FaArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
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
