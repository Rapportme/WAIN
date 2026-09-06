"use client";

import { useEffect, useState } from "react";
import { withBase } from "@/lib/withBase";
import type { InstantDiagnosis } from "@/lib/diagnosis/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Calendar, Download, Mail } from "./Icons";

/** Circumference of the r=52 arc — matches the dasharray baked into the CSS. */
const CIRC = 326.7;

/** The BHI dial. The arc starts empty and draws to the score after mount. */
function ScoreRing({ score }: { score: number }) {
  const [offset, setOffset] = useState(CIRC);
  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, score));
    // Two frames in, so the initial (empty) state has painted and the CSS
    // transition on stroke-dashoffset has something to run from.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setOffset(CIRC * (1 - clamped / 100)));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [score]);

  return (
    <div className="ring-w" role="img" aria-label={`Business Health Index ${score} out of 100`}>
      <svg viewBox="0 0 120 120">
        <circle className="tr" cx="60" cy="60" r="52" />
        <circle
          className="ar"
          cx="60"
          cy="60"
          r="52"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="c">
        <div>
          <b>{score}</b>
          <br />
          <span>BHI / 100</span>
        </div>
      </div>
    </div>
  );
}

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "watch";
}) {
  const list = items.length ? items : ["No structural weakness stands out at this stage"];
  return (
    <div className={tone}>
      <h3>{title}</h3>
      <ul>
        {list.map((s) => (
          <li key={s}>
            <i aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ResultsProps {
  diagnosis: InstantDiagnosis;
  onOpenForm: () => void;
  onRestart: () => void;
}

export function Results({ diagnosis, onOpenForm, onRestart }: ResultsProps) {
  return (
    <div className="gd-res">
      <Eyebrow shape="mk-cir" t="Your diagnosis" />
      <Reveal as="h2">{diagnosis.maturityLevel}</Reveal>

      <Reveal as="div" className="score-row" d={1}>
        <ScoreRing score={diagnosis.bhi} />
        <div className="grade">
          <div className="k">Business readiness rating</div>
          <div className="g">{diagnosis.brr}</div>
        </div>
      </Reveal>

      <Reveal as="div" className="gd-lists" d={2}>
        <ListBlock title="Top strengths" items={diagnosis.topStrengths} tone="good" />
        <ListBlock
          title="Areas requiring attention"
          items={diagnosis.topAttentionAreas}
          tone="watch"
        />
      </Reveal>

      <Reveal as="div" className="gd-focus" d={3}>
        <h3>Suggested focus areas</h3>
        <ol>
          {diagnosis.focusAreas.map((f) => (
            <li key={f.priority}>
              <b>{String(f.priority).padStart(2, "0")}</b>
              <span>{f.title}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="div" className="gd-prose">
        <p>{diagnosis.paragraphOne}</p>
        <p>{diagnosis.paragraphTwo}</p>
      </Reveal>

      <Reveal as="p" className="fine">
        This first read is generated from your responses using our own scoring model. It is an initial
        business assessment, not a definitive evaluation or professional consulting advice. Every
        business operates within unique market conditions and requires contextual understanding before
        making strategic decisions.
      </Reveal>

      <Reveal as="div" className="gd-actions no-print">
        <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
          <Download size={15} /> Download this summary
        </button>
        <button type="button" className="btn btn--ghost" onClick={onOpenForm}>
          <Mail size={15} /> Receive the detailed report
        </button>
        <a className="btn" href={withBase("/contact/")}>
          <Calendar size={15} /> Book a consultation <span className="ar">→</span>
        </a>
      </Reveal>

      <button type="button" className="txtbtn no-print" onClick={onRestart}>
        Start the diagnosis again
      </button>
    </div>
  );
}
