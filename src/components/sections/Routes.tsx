"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useUI } from "@/components/providers/UIProvider";
import { CH, STAGES, STAGE_CHIPS, type StageKey } from "@/data/chapters";

/** 00b · Three ways in — three routes through the book, plus a guided path builder. */
export function Routes() {
  const { setPositionTab } = useUI();
  const [guideOpen, setGuideOpen] = useState(false);
  const [stage, setStage] = useState<StageKey | null>(null);

  const pickStage = (k: StageKey) => {
    setStage(k);
    setPositionTab(STAGES[k].i); // chapter 02 now matches the stage
  };

  const selected = stage ? STAGES[stage] : null;
  const startKey = selected?.path[0];
  const startHref = startKey && CH[startKey] ? `#${CH[startKey].id}` : "#problem";

  return (
    <section className="chapter s-routes" id="routes">
      <div className="wrap">
        <Eyebrow shape="mk-tri" t="Three ways in" />
        <Reveal as="div" className="routes-head">
          <h2>Ten chapters. You don&apos;t have to read them in order.</h2>
          <p className="lede">
            This isn&apos;t meant to be read like a website. Read it like a book. Start anywhere. Or
            let us point you to the chapters that matter most.
          </p>
        </Reveal>

        <Reveal as="div" className="routes" d={1}>
          <button
            className="route r-guide"
            aria-expanded={guideOpen}
            aria-controls="guide"
            onClick={() => setGuideOpen((o) => !o)}
          >
            <span className="rt-shape" aria-hidden="true" />
            <span className="rt-n">Route A</span>
            <h3>Help me find my way.</h3>
            <p>
              Answer one question about your business. We&apos;ll mark the chapters worth your time
              and skip the rest.
            </p>
            <span className="rt-go">
              Mark up my path <b aria-hidden="true">&rarr;</b>
            </span>
          </button>

          <a className="route r-read" href="#problem">
            <span className="rt-shape" aria-hidden="true" />
            <span className="rt-n">Route B</span>
            <h3>Show me who you are.</h3>
            <p>Read it in order — the full story, the way we&apos;d tell it in a room with the door shut.</p>
            <span className="rt-go">
              Start at chapter 01 <b aria-hidden="true">&rarr;</b>
            </span>
          </a>

          <a className="route r-jump" href="#diagnosis">
            <span className="rt-shape" aria-hidden="true" />
            <span className="rt-n">Route C</span>
            <h3>I already know what I need.</h3>
            <p>
              Skip ahead. Explore the diagnosis first. If it makes sense, let&apos;s have a
              conversation.
            </p>
            <span className="rt-go">
              Go to chapter 09 <b aria-hidden="true">&rarr;</b>
            </span>
          </a>
        </Reveal>

        <div className={`guide${guideOpen ? " open" : ""}`} id="guide">
          <p className="gq">Which of these sounds most like your business right now?</p>
          <div className="chips" role="group" aria-label="Pick the stage your business is at">
            {STAGE_CHIPS.map((chip) => (
              <button
                key={chip.k}
                aria-pressed={stage === chip.k}
                onClick={() => pickStage(chip.k)}
              >
                <span className={`mk ${chip.shape}`} />
                {chip.label}
              </button>
            ))}
          </div>
          <div className={`guide-out${selected ? " show" : ""}`} aria-live="polite">
            <p className="guide-say">{selected?.say}</p>
            <p className="plabel">Your path — read top to bottom</p>
            <ul className="path">
              {selected?.path.map((key) => {
                const c = CH[key];
                if (!c) return null;
                return (
                  <li key={key}>
                    <a href={`#${c.id}`} style={{ "--pc": c.c } as React.CSSProperties}>
                      <b>{c.n}</b>
                      {c.t}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="guide-go">
              <a href={startHref} className="btn">
                Begin the walk-through{" "}
                <span className="arw" aria-hidden="true">
                  &rarr;
                </span>
              </a>
              <span className="fine">Chapter 02 is already set to your stage.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
