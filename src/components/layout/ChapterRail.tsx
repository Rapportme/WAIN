"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { RAIL_CHAPTERS } from "@/data/chapters";

const IDS = RAIL_CHAPTERS.map((c) => c.id);

/**
 * The chapter rail — a colour ladder pinned to the right edge, one tick per
 * chapter. Highlights the chapter centred in the viewport and flips to its
 * on-dark palette while a dark-plate chapter is active. Hidden ≤ 1240px.
 */
export function ChapterRail() {
  const active = useActiveSection(IDS);
  const onDark = RAIL_CHAPTERS[active]?.dark ?? false;

  const go = (id: string) => {
    const el = document.getElementById(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`rail${onDark ? " on-dark" : ""}`} id="rail">
      {RAIL_CHAPTERS.map((chapter, i) => (
        <button
          key={chapter.id}
          aria-label={`Go to ${chapter.label}`}
          aria-current={i === active ? "true" : undefined}
          style={{ "--tk": chapter.ink } as React.CSSProperties}
          onClick={() => go(chapter.id)}
        >
          <span className="lbl">{chapter.label}</span>
          <span className="tk" />
        </button>
      ))}
    </div>
  );
}
