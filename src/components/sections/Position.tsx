"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useUI } from "@/components/providers/UIProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Position {
  num: string;
  name: string;
  quote: string;
  trueText: string;
  startText: string;
}

const POSITIONS: Position[] = [
  {
    num: "01",
    name: "Starting",
    quote: "We have an idea, maybe a product. We just need people to see it.",
    trueText:
      "You have a product and an audience, but no proof yet. Attention bought before proof is attention wasted — the most expensive way to learn the promise isn't landing.",
    startText:
      "One offer. One audience. One promise you can defend under pressure. Most of the first month is spent deleting things — which feels like nothing and is worth everything.",
  },
  {
    num: "02",
    name: "Growing",
    quote: "It's working. We just don't fully know why.",
    trueText:
      "Something is working, and it usually isn't the thing you're crediting. Growth you can't explain is growth you can't repeat — and it will stop without telling you why.",
    startText:
      "Trace your last twenty customers backwards, by hand. Find the channel quietly doing the work. Then stop starving it to feed the one that photographs better.",
  },
  {
    num: "03",
    name: "Stuck",
    quote: "The team's putting in effort. Nothing's moving the way it used to.",
    trueText:
      "You aren't short of effort. You're short of direction. Activity is currently making the problem harder to see, because everyone's too tired to ask whether any of it is working.",
    startText:
      "Stop three things. Not one — three. Then we watch what the business does when it isn't distracted. That's usually where the real constraint finally shows itself.",
  },
  {
    num: "04",
    name: "Scaling",
    quote: "Demand is real. Can we carry the weight of it?",
    trueText:
      "The question isn't demand — it's whether your systems, team and brand can hold it. Fast growth without structure just means faster chaos, and something quietly breaks first.",
    startText:
      "Map what your team repeats every week, then remove, simplify or automate it. This is where systems and AI earn their keep — making growth repeatable instead of heroic.",
  },
  {
    num: "05",
    name: "Reinventing",
    quote: "The market shifted, or we did. Time to rebuild the story.",
    trueText:
      "Positioning that made sense five years ago rarely still fits. This isn't a refresh — it's a rebuild of the story, starting from what's true now rather than what used to work.",
    startText:
      "Build from where the market is today, not from where the brand used to be. Everything else follows.",
  },
];

const LAST = POSITIONS.length - 1;

/** 02 · Position — a signature "you are here" line, synced with the guided path. */
export function Position() {
  const { positionTab: cur, setPositionTab, positionAuto, stopPositionAuto } = useUI();
  const upright = useMediaQuery("(max-width:860px)");
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const lineRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-advance through the stages until a visitor takes over (or hovers).
  useEffect(() => {
    if (reduce || !positionAuto || hovered) return;
    const id = window.setInterval(() => {
      setPositionTab((cur + 1) % POSITIONS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduce, positionAuto, hovered, cur, setPositionTab]);

  const selectTab = (i: number) => {
    stopPositionAuto();
    setPositionTab(i);
  };

  // Port of the original place(): draw the fill + drop the marker on the active tick.
  const place = useCallback(() => {
    const line = lineRef.current;
    const tab = tabRefs.current[cur];
    const marker = markerRef.current;
    const fill = fillRef.current;
    if (!line || !tab || !marker || !fill) return;

    const lb = line.getBoundingClientRect();
    const tb = tab.getBoundingClientRect();

    if (upright) {
      fill.style.height = `${tb.top - lb.top + tb.height / 2}px`;
      fill.style.width = "";
      return;
    }
    const x = cur === LAST ? tb.right - lb.left : tb.left - lb.left;
    marker.style.left = `${x}px`;
    fill.style.width = `${x}px`;
    fill.style.height = "";
    marker.style.setProperty("--tx", cur === 0 ? "0%" : cur === LAST ? "-100%" : "-50%");
  }, [cur, upright]);

  useLayoutEffect(() => {
    place();
  }, [place]);

  useEffect(() => {
    window.addEventListener("resize", place);
    // Recompute once web fonts have settled (widths shift under Newsreader/Manrope).
    if (document.fonts?.ready) void document.fonts.ready.then(place);
    const t = window.setTimeout(place, 60);
    return () => {
      window.removeEventListener("resize", place);
      window.clearTimeout(t);
    };
  }, [place]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let n: number | null = null;
    if (e.key === "ArrowRight") n = (i + 1) % POSITIONS.length;
    if (e.key === "ArrowLeft") n = (i - 1 + POSITIONS.length) % POSITIONS.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = LAST;
    if (n !== null) {
      e.preventDefault();
      selectTab(n);
      tabRefs.current[n]?.focus();
    }
  };

  const active = POSITIONS[cur]!;

  return (
    <section className="chapter s-position" id="position">
      <div className="wrap">
        <Eyebrow shape="mk-bar" n="02" t="Where are you right now" />
        <Reveal as="div" className="pos-head">
          <h2>Every business is at a different stage.</h2>
          <div className="pos-read">
            <span className="big">
              <i>Stage</i> <b>{active.num}</b> / 05
            </span>
            <span className="label">{active.name}</span>
          </div>
        </Reveal>

        <Reveal
          as="div"
          className="posline"
          d={1}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="posline-rule" aria-hidden="true">
            <span className="posline-fill" ref={fillRef} />
          </div>
          <span className="posline-marker" ref={markerRef} aria-hidden="true" />
          <div className="posline-ticks" role="tablist" aria-label="Your growth stage">
            {POSITIONS.map((p, i) => (
              <button
                key={p.num}
                className="pos-tab"
                role="tab"
                id={`t${i}`}
                aria-controls={`p${i}`}
                aria-selected={i === cur}
                tabIndex={i === cur ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => selectTab(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <span className="num">{p.num}</span>
                <span className="nm">{p.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="pos-panels">
          {POSITIONS.map((p, i) => (
            <div
              key={p.num}
              className={`pos-panel${i === cur ? " active" : ""}`}
              role="tabpanel"
              id={`p${i}`}
              aria-labelledby={`t${i}`}
              tabIndex={0}
            >
              <p className="pos-quote">
                <span className="qm">&ldquo;</span>
                {p.quote}
                <span className="qm">&rdquo;</span>
              </p>
              <div className="pos-cols">
                <div>
                  <h4 className="label">
                    <span className="mk mk-cir" />
                    What&apos;s usually true
                  </h4>
                  <p>{p.trueText}</p>
                </div>
                <div>
                  <h4 className="label">
                    <span className="mk mk-tri" />
                    Where we&apos;d start
                  </h4>
                  <p>{p.startText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal as="p" className="lede lede-aside" style={{ marginTop: "clamp(40px,6vh,64px)" }}>
          Wherever you are, that&apos;s where we start too.
        </Reveal>
      </div>
    </section>
  );
}
