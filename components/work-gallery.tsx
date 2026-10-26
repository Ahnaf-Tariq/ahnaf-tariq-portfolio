"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SiteSidebar from "@/components/site-sidebar";
import { PANEL_THEMES } from "@/data/data";

type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  live: boolean;
  link: string;
  image: string;
};

const FILTERS = ["All work", "Product", "3D / WebGL", "Interactive"] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: Project, filter: Filter) {
  if (filter === "All work") return true;
  if (filter === "3D / WebGL") return /3d|three/i.test(project.category);
  if (filter === "Product") return /product|ai/i.test(project.category);
  return /interactive/i.test(project.category);
}

export default function WorkGallery({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All work");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const visibleProjects = projects.filter((p) =>
    matchesFilter(p, activeFilter),
  );

  const navigateFromSidebar = (index: number) => {
    if (index === 3) return;
    window.location.assign(`/?section=${index}`);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let target = el.scrollLeft;
    let animating = false;
    let raf = 0;

    const max = () => el.scrollWidth - el.clientWidth;

    const updateProgress = () => {
      const m = max();
      const p = m > 0 ? el.scrollLeft / m : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const tick = () => {
      const diff = target - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target;
        animating = false;
        return;
      }
      el.scrollLeft += diff * 0.12;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (!mq.matches) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      if (!animating) target = el.scrollLeft;
      target = Math.min(Math.max(target + delta, 0), max());
      if (!animating) {
        animating = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (!animating) target = el.scrollLeft;
      updateProgress();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <SiteSidebar
        theme={PANEL_THEMES[3]}
        activeIndex={3}
        onNavigate={navigateFromSidebar}
      />

      <div className="ml-16 flex min-w-0 flex-1 flex-col max-sm:ml-12 lg:min-h-0">
        <header className="flex shrink-0 items-end justify-between gap-8 px-[clamp(1.25rem,4vw,4rem)] pt-[clamp(2rem,6vh,4.5rem)] max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <h1 className="font-[family-name:var(--serif)] text-[clamp(3.75rem,11vw,10rem)] font-light uppercase leading-[0.85] tracking-[-0.04em] lg:text-[clamp(3rem,min(9vw,16vh),9rem)]">
            All Work
          </h1>
          <p
            className="font-[family-name:var(--serif)] text-[clamp(3rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.04em] lg:text-[clamp(2.5rem,min(7vw,14vh),7rem)]"
            aria-label={`${visibleProjects.length} projects`}
          >
            ({String(visibleProjects.length).padStart(2, "0")})
          </p>
        </header>

        <div
          role="group"
          aria-label="Filter projects"
          className="flex shrink-0 flex-wrap gap-2 px-[clamp(1.25rem,4vw,4rem)] pb-2 pt-6"
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full border px-4 py-1.5 font-[family-name:var(--mono)] text-[10px] uppercase tracking-wide transition-colors duration-300 ${
                  active
                    ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                    : "border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar px-[clamp(1.25rem,4vw,4rem)] pb-16 pt-8 max-lg:pb-24 lg:min-h-0 lg:flex-1 lg:overflow-x-auto lg:overflow-y-hidden lg:pb-0 lg:pt-6"
        >
          <section
            aria-label="Selected projects"
            className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-5 lg:flex lg:w-max lg:items-start lg:gap-x-6 lg:gap-y-0 lg:pr-[clamp(1.25rem,4vw,4rem)]"
          >
            {visibleProjects.map((project, index) => {
              const tall = index % 2 === 1;
              return (
                <article
                  key={project.id}
                  className="group lg:w-[clamp(240px,21vw,320px)] lg:shrink-0"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} project`}
                    className="block"
                  >
                    <div
                      className={`relative overflow-hidden bg-[#ded9d1] ${
                        tall ? "aspect-[7/8]" : "aspect-[5/4]"
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} project preview`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-primary)] text-lg opacity-0 transition-all duration-300 group-hover:opacity-100 max-lg:opacity-100">
                        ↗
                      </span>
                    </div>

                    <div className="mt-3 flex items-start gap-3">
                      <span className="font-[family-name:var(--serif)] text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-[0.9] tracking-[-0.04em]">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <p className="mb-1 font-[family-name:var(--sans)] text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">
                          {project.category}
                          {project.year ? ` — ${project.year}` : ""}
                        </p>
                        <h2 className="font-[family-name:var(--sans)] text-base font-medium leading-snug">
                          {project.title}
                        </h2>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </section>

          {visibleProjects.length === 0 && (
            <p className="font-[family-name:var(--mono)] text-xs text-[var(--text-secondary)]">
              No projects in this category yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
