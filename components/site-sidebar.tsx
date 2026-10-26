"use client";

import { CSSProperties, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { NAV_ITEMS } from "@/data/data";

type SidebarTheme = {
  bg: string;
  border: string;
  text: string;
  textMuted: string;
};

export default function SiteSidebar({
  theme,
  activeIndex,
  onNavigate,
}: {
  theme: SidebarTheme;
  activeIndex: number;
  onNavigate: (index: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (index: number) => {
    setMenuOpen(false);
    onNavigate(index);
  };

  return (
    <>
      <aside
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        className="fixed inset-y-0 left-0 z-[300] flex w-16 flex-col items-center justify-between border-r pb-6 pt-1 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] max-sm:w-12"
      >
        <button
          type="button"
          style={{ borderColor: theme.border }}
          className="flex w-full cursor-pointer flex-col items-center gap-1 border-b bg-transparent py-3.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {[0, 1, 2].map((line) => (
            <span
              key={line}
              style={{ backgroundColor: theme.text }}
              className="block h-px w-5 transition-colors duration-500"
            />
          ))}
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
            className="rail-text font-[family-name:var(--serif)] text-sm font-medium uppercase tracking-wide transition-colors duration-500"
          >
            Ahnaf Tariq<span className="font-light text-[7px]">™</span>
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
        className={`fixed inset-y-0 right-0 left-16 z-[250] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] max-sm:left-12 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          style={{ color: theme.textMuted }}
          className="absolute right-6 top-6 cursor-pointer border-none bg-transparent font-[family-name:var(--serif)] text-sm uppercase tracking-widest transition-colors hover:text-[var(--text-on-dark)] sm:right-12 sm:top-8"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <ul className="flex h-full flex-col justify-center gap-4 pl-6 md:gap-6 md:pl-12">
          {NAV_ITEMS.map((item, index) => (
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
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                className={`group nav-overlay-link flex cursor-pointer items-center gap-3 border-none bg-transparent text-left font-[family-name:var(--serif)] text-2xl font-medium uppercase transition-colors duration-300 hover:text-[var(--nav-active)] sm:gap-4 sm:text-3xl md:gap-5 md:text-4xl lg:text-[clamp(2rem,5vw,2.5rem)] ${activeIndex === index ? "text-[var(--nav-active)]" : "text-[var(--nav-muted)]"}`}
                onClick={() => navigate(index)}
              >
                <span className="font-[family-name:var(--mono)] text-sm opacity-70">
                  {item.num}.
                </span>
                <span className="relative inline-flex items-center gap-3">
                  <span>{item.label}</span>
                  <FaArrowRight className="-translate-x-2 -rotate-45 text-xl opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                  <span className="absolute bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--nav-active)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-7 right-8 z-[200] flex items-center gap-1.5 rounded-full bg-[rgba(20,18,16,0.85)] px-3.5 py-2 font-[family-name:var(--mono)] text-xs text-[var(--text-on-dark)] backdrop-blur-[6px] max-sm:right-4">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="opacity-50">/</span>
        <span>{String(NAV_ITEMS.length).padStart(2, "0")}</span>
      </div>
    </>
  );
}
