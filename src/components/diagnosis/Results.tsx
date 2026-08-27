"use client";

import { withBase } from "@/lib/withBase";
import type { InstantDiagnosis } from "@/lib/diagnosis/types";
import { Calendar, Download, Mail } from "./Icons";

/** The BHI dial. Stroke length is set from the score, so it draws on mount. */
function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.max(0, Math.min(100, score)) / 100) * circ;
  return (
    <svg
      width={132}
      height={132}
      viewBox="0 0 128 128"
      className="gd-ring"
      role="img"
      aria-label={`Business Health Index ${score} out of 100`}
    >
      <circle cx={64} cy={64} r={r} fill="none" stroke="var(--rule)" strokeWidth={9} />
      <circle
        cx={64}
        cy={64}
        r={r}
        fill="none"
        stroke="var(--signal)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 64 64)"
      />
      <text x="64" y="60" textAnchor="middle" className="gd-ring-n">
        {score}
      </text>
      <text x="64" y="78" textAnchor="middle" className="gd-ring-l">
        BHI / 100
      </text>
    </svg>
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
  return (
    <div className={`gd-list ${tone}`}>
      <h3 className="label">{title}</h3>
      <ul>
        {items.map((s) => (
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
    <article className="gd-res">
      <div className="gd-eye">
        <span className="mk mk-cir" />
        <span className="t">Your diagnosis</span>
      </div>

      <h2 className="gd-res-h">{diagnosis.maturityLevel}</h2>

      <div className="gd-scores">
        <ScoreRing score={diagnosis.bhi} />
        <div className="gd-brr">
          <h3 className="label">Business readiness rating</h3>
          <p className="gd-brr-v">{diagnosis.brr}</p>
        </div>
      </div>

      <div className="gd-cols">
        <ListBlock title="Top strengths" items={diagnosis.topStrengths} tone="good" />
        <ListBlock
          title="Areas requiring attention"
          items={diagnosis.topAttentionAreas}
          tone="watch"
        />
      </div>

      <section className="gd-focus">
        <h3 className="label">Suggested focus areas</h3>
        <ol>
          {diagnosis.focusAreas.map((f) => (
            <li key={f.priority}>
              <span className="gd-focus-n">{String(f.priority).padStart(2, "0")}</span>
              <span className="gd-focus-t">{f.title}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="gd-prose">
        <p>{diagnosis.paragraphOne}</p>
        <p>{diagnosis.paragraphTwo}</p>
      </div>

      <p className="gd-fine">
        This first read is generated from your responses using our own scoring model. It is an initial
        business assessment, not a definitive evaluation or professional consulting advice. Every
        business operates within unique market conditions and requires contextual understanding before
        making strategic decisions.
      </p>

      <div className="gd-actions no-print">
        <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
          <Download size={15} /> Download this summary
        </button>
        <button type="button" className="btn btn--ghost" onClick={onOpenForm}>
          <Mail size={15} /> Receive the detailed report
        </button>
        <a className="btn" href={withBase("/contact/")}>
          <Calendar size={15} /> Book a consultation
          <span className="arw" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>

      <button type="button" className="gd-restart no-print" onClick={onRestart}>
        Start the diagnosis again
      </button>
    </article>
  );
}
