"use client";

import { useEffect, useState } from "react";

/**
 * Reports which chapter is centred in the viewport, mirroring the original
 * rail IntersectionObserver (`rootMargin: -45% 0 -45%`). Returns the active
 * index into the supplied id list.
 */
export function useActiveSection(ids: readonly string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
