"use client";

import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MOVES, pad2 } from "@/data/home";

const CONTOURS = [
  "M-50 120 C 250 60, 500 200, 780 120 S 1250 80, 1300 160",
  "M-50 220 C 250 160, 520 300, 800 220 S 1250 180, 1300 260",
  "M-50 320 C 260 260, 520 400, 800 320 S 1250 280, 1300 360",
  "M-50 420 C 250 360, 520 500, 800 420 S 1250 380, 1300 460",
  "M-50 520 C 250 460, 520 600, 800 520 S 1250 480, 1300 560",
];

const isMobile = () => window.innerWidth <= 760;

/**
 * 05 · How we work. A 420vh section with a sticky pin; the six movements ride a
 * horizontal track driven by scroll progress. Under 760px the track is a native
 * horizontal scroller and the section is its natural height.
 */
export function Method() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLElement>(null);
  const mProg = useRef(0);

  useEffect(() => {
    const s = sec.current;
    const t = track.current;
    const p = prog.current;
    if (!s || !t || !p) return;
    const tick = () => {
      if (isMobile()) {
        t.style.transform = "";
        p.style.width = "";
        return;
      }
      const r = s.getBoundingClientRect();
      const total = s.offsetHeight - window.innerHeight;
      const pr = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      mProg.current = pr;
      const pad = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad")) || 0;
      const max = t.scrollWidth - window.innerWidth + pad * 2;
      t.style.transform = `translateX(${-pr * max}px)`;
      p.style.width = `${16 + pr * 84}%`;
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  const jump = (dir: -1 | 1) => {
    const s = sec.current;
    const t = track.current;
    if (!s || !t) return;
    if (isMobile()) {
      t.scrollBy({ left: dir * 400, behavior: "smooth" });
      return;
    }
    const total = s.offsetHeight - window.innerHeight;
    const pr = Math.min(1, Math.max(0, mProg.current + dir / 6));
    window.scrollTo({ top: s.offsetTop + pr * total, behavior: "smooth" });
  };

  return (
    <section className="chapter dark ink-lift s-method" id="method" data-chap="method" data-dark="" ref={sec}>
      <div className="pin">
        <i className="mplate m1" />
        <i className="mplate m2" />
        <svg className="contours" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          {CONTOURS.map((d) => (
            <path d={d} key={d} />
          ))}
        </svg>
        <div className="wrap" style={{ width: "100%", position: "relative" }}>
          <Eyebrow shape="mk-wedge" n="05" t="How we work" />
          <Reveal as="div" className="m-head">
            <h2>
              Every business is different. <span className="soft">Our thinking process isn&apos;t.</span>
            </h2>
            <div className="m-nav">
              <button type="button" id="mPrev" aria-label="Previous movement" onClick={() => jump(-1)}>
                ←
              </button>
              <button type="button" id="mNext" aria-label="Next movement" onClick={() => jump(1)}>
                →
              </button>
            </div>
          </Reveal>
          <div className="track-prog">
            <i id="trackProg" ref={prog} />
          </div>
        </div>
        <div
          className="wrap"
          style={{
            width: "100%",
            maxWidth: "none",
            paddingLeft: "max(var(--pad),calc((100vw - var(--wrap))/2 + var(--pad)))",
          }}
        >
          <div className="track" id="track" ref={track}>
            {MOVES.map(([name, body], i) => (
              <article className="mv" key={name}>
                <span className="lab">Movement {pad2(i + 1)}</span>
                <h3>{name}</h3>
                <p>{body}</p>
                <span className="big">{pad2(i + 1)}</span>
              </article>
            ))}
            <article className="mv" style={{ border: 0, background: "none", justifyContent: "center" }}>
              <p className="method-tail" style={{ margin: 0, fontSize: "var(--t-xl)" }}>
                Six movements.
                <br />
                In order.
                <br />
                <b>No skipping.</b>
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
