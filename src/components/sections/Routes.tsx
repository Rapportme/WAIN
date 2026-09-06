"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useSectionHref } from "@/hooks/useSectionHref";
import { useUI } from "@/components/providers/UIProvider";
import { HOME_STAGES, chapterByNum } from "@/data/home";

/** `.rv` → `.in` once, for elements Reveal can't render (button / anchor cards). */
function useRv<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: inView ? "rv in" : "rv" };
}

/** 00b · Three ways in. Route A opens the guide; a chip marks up a reading path. */
export function Routes() {
  const h = useSectionHref();
  const { setPositionTab, stopPositionAuto } = useUI();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<number | null>(null);

  const pick = (i: number) => {
    setStage(i);
    setPositionTab(i);
    stopPositionAuto();
  };

  const rA = useRv<HTMLButtonElement>();
  const rB = useRv<HTMLAnchorElement>();
  const rC = useRv<HTMLAnchorElement>();

  const s = stage === null ? null : HOME_STAGES[stage] ?? null;
  const first = s ? chapterByNum(s.path[0] ?? "01") : null;

  return (
    <section className="chapter ink-sage" id="routes" data-chap="routes">
      <div className="wrap">
        <Eyebrow shape="mk-tri" t="Three ways in" />
        <Reveal as="h2" className="statement">
          Ten chapters. You don&apos;t have to read them in order.
        </Reveal>
        <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
          This isn&apos;t meant to be read like a website. Read it like a book. Start anywhere. Or let
          us point you to the chapters that matter most.
        </Reveal>
        <div className="routes">
          <button
            type="button"
            ref={rA.ref}
            className={`rt ${rA.cls}`}
            style={{ ["--d" as string]: 2 } as React.CSSProperties}
            id="routeA"
            aria-controls="guide"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <i className="shape" style={{ borderRadius: "50%" }} />
            <span className="lab">
              <i className="mk mk-cir" />
              Route A
            </span>
            <h3>Help me find my way.</h3>
            <p>
              Answer one question about your business. We&apos;ll mark the chapters worth your time
              and skip the rest.
            </p>
            <span className="go">
              Mark up my path <span className="ar">→</span>
            </span>
          </button>
          <a
            ref={rB.ref}
            className={`rt ink-coral ${rB.cls}`}
            style={{ ["--d" as string]: 3 } as React.CSSProperties}
            href={h("#problem")}
          >
            <i className="shape" style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }} />
            <span className="lab">
              <i className="mk mk-tri" />
              Route B
            </span>
            <h3>Show me who you are.</h3>
            <p>Read it in order — the full story, the way we&apos;d tell it in a room with the door shut.</p>
            <span className="go">
              Start at chapter 01 <span className="ar">→</span>
            </span>
          </a>
          <a
            ref={rC.ref}
            className={`rt ink-amber ${rC.cls}`}
            style={{ ["--d" as string]: 4 } as React.CSSProperties}
            href={h("#diagnosis")}
          >
            <i className="shape" />
            <span className="lab">
              <i className="mk mk-sq" />
              Route C
            </span>
            <h3>I already know what I need.</h3>
            <p>Skip ahead. Explore the diagnosis first. If it makes sense, let&apos;s have a conversation.</p>
            <span className="go">
              Go to chapter 09 <span className="ar">→</span>
            </span>
          </a>
        </div>
        <div className={`guide${open ? " open" : ""}`} id="guide">
          <div>
            <div className="guide-in">
              <p className="gq">Which of these sounds most like your business right now?</p>
              <div className="chips" role="group" aria-label="Pick the stage your business is at">
                {HOME_STAGES.map((st, i) => (
                  <button
                    type="button"
                    className="chip"
                    key={st.k}
                    data-stage={i}
                    aria-pressed={stage === i}
                    onClick={() => pick(i)}
                  >
                    <i className={`mk ${st.mk}`} />
                    {st.k}
                  </button>
                ))}
              </div>
              <div className={`guide-out${s ? " show" : ""}`} id="guideOut" aria-live="polite">
                {s ? (
                  <>
                    <p className="guide-say">{s.say}</p>
                    <div>
                      <div className="label" style={{ marginBottom: 12 }}>
                        Your path — read top to bottom
                      </div>
                      <div className="path">
                        {s.path.map((n, i) => {
                          const ch = chapterByNum(n);
                          if (!ch) return null;
                          return (
                            <Fragment key={n}>
                              {i ? <span className="ar">→</span> : null}
                              <a href={h(`#${ch.a}`)} style={{ ["--c" as string]: ch.c } as React.CSSProperties}>
                                <b>{ch.n}</b>
                                {ch.t}
                              </a>
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <a className="btn" href={h(`#${first?.a ?? "problem"}`)}>
                        Begin the walk-through <span className="ar">→</span>
                      </a>
                    </div>
                    <p className="fine">Chapter 02 is already set to your stage.</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
