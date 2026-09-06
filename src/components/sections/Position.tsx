"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useUI } from "@/components/providers/UIProvider";
import { POS } from "@/data/home";

const N = POS.length;

/** 02 · Where you are. A "you are here" line that auto-advances until someone takes over. */
export function Position() {
  const { positionTab, setPositionTab, positionAuto, stopPositionAuto } = useUI();
  const cur = Math.min(Math.max(positionTab, 0), N - 1);
  const pos = POS[cur] ?? POS[2];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pct, setPct] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const wantFocus = useRef(false);

  const pick = useCallback(
    (i: number) => {
      stopPositionAuto();
      setPositionTab(((i % N) + N) % N);
    },
    [setPositionTab, stopPositionAuto],
  );

  // Fill / marker position from the active tab's offset — recomputed on resize.
  // `.pos-tabs` is absolutely positioned across the full `.posline`, so its
  // width is the line's width.
  const measure = useCallback(() => {
    const t = tabRefs.current[cur];
    const line = t?.offsetParent as HTMLElement | null;
    if (!t || !line || !line.offsetWidth) return;
    setPct(((t.offsetLeft + 8) / line.offsetWidth) * 100);
  }, [cur]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Keyboard navigation moves focus to the newly selected tab.
  useEffect(() => {
    if (wantFocus.current) {
      wantFocus.current = false;
      tabRefs.current[cur]?.focus();
    }
  }, [cur]);

  // Auto-advance every 4s until a real interaction (or while hovered).
  useEffect(() => {
    if (!positionAuto || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setPositionTab((positionTab + 1) % N), 4000);
    return () => window.clearInterval(t);
  }, [positionAuto, paused, positionTab, setPositionTab]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (cur + 1) % N;
    else if (e.key === "ArrowLeft") next = (cur + N - 1) % N;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = N - 1;
    if (next === null) return;
    e.preventDefault();
    wantFocus.current = true;
    pick(next);
  };

  return (
    <section className="chapter ink-teal" id="position" data-chap="position">
      <div className="wrap">
        <Eyebrow shape="mk-bar" n="02" t="Where are you right now" />
        <Reveal as="div" className="pos-head">
          <h2 className="statement">Every business is at a different stage.</h2>
          <div className="pos-read">
            <div className="big">
              <em>Stage</em> <b id="posNum">{pos?.n}</b>
              <span> / {String(N).padStart(2, "0")}</span>
            </div>
            <div className="label" id="posName">
              {pos?.k}
            </div>
          </div>
        </Reveal>
        <Reveal
          as="div"
          className="posline"
          id="posline"
          d={1}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="posline-fill" id="posFill" style={pct === null ? undefined : { width: `${pct}%` }} />
          <div className="posline-marker" id="posMarker" style={pct === null ? undefined : { left: `${pct}%` }} />
          <div className="pos-tabs" role="tablist" aria-label="Your growth stage" onKeyDown={onKey}>
            {POS.map((p, i) => (
              <button
                type="button"
                role="tab"
                key={p.n}
                data-pos={i}
                aria-selected={i === cur}
                tabIndex={i === cur ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => pick(i)}
              >
                <span className="num">{p.n}</span>
                <span className="nm">{p.k}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <div id="posPanels">
          {POS.map((p, i) => (
            <div className={`pos-panel${i === cur ? " on" : ""}`} role="tabpanel" key={p.n}>
              <p className="pos-q">{p.q}</p>
              <div className="pos-cols">
                <div>
                  <div className="label">
                    <i className="mk mk-cir" />
                    What&apos;s usually true
                  </div>
                  <p>{p.t}</p>
                </div>
                <div>
                  <div className="label">
                    <i className="mk mk-tri" />
                    Where we&apos;d start
                  </div>
                  <p>{p.s}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Reveal as="p" className="aside" style={{ marginTop: "clamp(40px,6vh,64px)" }}>
          Wherever you are, that&apos;s where we start too.
        </Reveal>
      </div>
    </section>
  );
}
