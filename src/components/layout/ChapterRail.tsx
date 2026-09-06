"use client";

import { usePathname } from "next/navigation";
import { RAIL_CHAPTERS } from "@/data/chapters";

/**
 * The chapter rail — a colour ladder pinned to the right edge, one tick per
 * home chapter. `aria-current` on the buttons is stamped by Effects from the
 * same scroll pass that drives the ink bleed (it reads `data-chap` on the
 * sections and matches it to `data-go` here). Hidden off the home page and
 * ≤ 1240px (CSS).
 */
export function ChapterRail() {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";

  const go = (id: string) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav id="rail" aria-label="Chapters" className={onHome ? undefined : "hide"}>
      {onHome
        ? RAIL_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              data-go={chapter.id}
              aria-label={`Go to ${chapter.label}`}
              style={{ "--c": chapter.ink } as React.CSSProperties}
              onClick={() => go(chapter.id)}
            >
              <span className="lbl">{chapter.label}</span>
              <span className="tk" />
            </button>
          ))
        : null}
    </nav>
  );
}
