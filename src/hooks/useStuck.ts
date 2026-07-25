"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a threshold — drives the
 * masthead's `.stuck` compaction. Passive listener, GPU-friendly.
 */
export function useStuck(threshold = 40): boolean {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return stuck;
}
