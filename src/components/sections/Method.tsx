"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Movement {
  no: string;
  title: string;
  body: string;
}

const MOVEMENTS: Movement[] = [
  {
    no: "Movement 01",
    title: "Observe",
    body: "We watch before we advise. Revenue, customers, constraints — the real shape of the business, not the Instagram version of it.",
  },
  {
    no: "Movement 02",
    title: "Understand",
    body: "We ask until the real problem shows itself. It's usually not the one you named when you first got in touch.",
  },
  {
    no: "Movement 03",
    title: "Challenge",
    body: 'We say what needs to be said, not what\'s easy to hear — including "do nothing yet," when that\'s the honest answer.',
  },
  {
    no: "Movement 04",
    title: "Execute",
    body: "We move with intent, not urgency. Built by the same people who did the diagnosing, so nothing gets lost in translation.",
  },
  {
    no: "Movement 05",
    title: "Measure",
    body: "We track what actually moves the business — leads, conversion, revenue, hours saved. Not impressions.",
  },
  {
    no: "Movement 06",
    title: "Improve",
    body: "Businesses evolve, so the work should too. Keep what works, kill what doesn't, and say plainly which is which.",
  },
];

/** 05 · Method — six movements on a dark plate, scrolled horizontally. */
export function Method() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(16);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const syncTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const p = max > 0 ? track.scrollLeft / max : 0;
    const vis = track.clientWidth / track.scrollWidth;
    setProgress(Math.min(100, (vis + p * (1 - vis)) * 100));
    setAtStart(track.scrollLeft < 6);
    setAtEnd(track.scrollLeft > max - 6);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncTrack();
    track.addEventListener("scroll", syncTrack, { passive: true });
    window.addEventListener("resize", syncTrack);
    return () => {
      track.removeEventListener("scroll", syncTrack);
      window.removeEventListener("resize", syncTrack);
    };
  }, [syncTrack]);

  const stepWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const mv = track.querySelector<HTMLElement>(".movement");
    const gap = parseFloat(getComputedStyle(track).columnGap || "40") || 40;
    return (mv?.getBoundingClientRect().width ?? 0) + gap;
  };

  const scrollByStep = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: dir * stepWidth(),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Auto-slide through the movements, looping back to the first. Pauses on hover.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft > max - 6) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: stepWidth(), behavior: "smooth" });
      }
    }, 3500);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <section className="chapter dark s-method" id="method">
      <span className="mplate m1" aria-hidden="true" />
      <span className="mplate m2" aria-hidden="true" />
      <svg className="contours" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#4FD0D0" strokeWidth="1">
          <path d="M-50 120 C 250 60, 500 200, 780 120 S 1250 80, 1300 160" />
          <path d="M-50 220 C 250 160, 520 300, 800 220 S 1250 180, 1300 260" />
          <path d="M-50 320 C 260 260, 520 400, 800 320 S 1250 280, 1300 360" />
          <path d="M-50 420 C 250 360, 520 500, 800 420 S 1250 380, 1300 460" />
          <path d="M-50 520 C 250 460, 520 600, 800 520 S 1250 480, 1300 560" />
        </g>
      </svg>
      <div className="wrap">
        <Eyebrow shape="mk-wedge" n="05" t="How we work" />
        <Reveal as="div" className="method-head">
          <h2>A partnership starts with understanding, not assumptions.</h2>
          <div className="method-nav">
            <button aria-label="Previous movement" disabled={atStart} onClick={() => scrollByStep(-1)}>
              &larr;
            </button>
            <button aria-label="Next movement" disabled={atEnd} onClick={() => scrollByStep(1)}>
              &rarr;
            </button>
          </div>
        </Reveal>
        <Reveal
          as="div"
          className="track-shell"
          d={1}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="track-prog" aria-hidden="true">
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="track" ref={trackRef}>
            {MOVEMENTS.map((m) => (
              <div className="movement" key={m.no}>
                <span className="mv">{m.no}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal as="p" className="method-tail">
          Six movements. In order. <b>No skipping.</b>
        </Reveal>
      </div>
    </section>
  );
}
