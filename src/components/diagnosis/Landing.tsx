"use client";

import { TOTAL } from "@/lib/diagnosis/questions";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface LandingProps {
  onStart: () => void;
  /** True when a saved draft exists, so the reader can pick it back up. */
  hasDraft: boolean;
  onResume: () => void;
  /** Which question the draft stopped on, 1-based. */
  draftAt: number;
}

/**
 * The diagnosis opens on a page, not on question one — the reader should know
 * what they're agreeing to before the first answer. The quiz used to start
 * cold, which gave the fifteen questions no frame.
 */
export function Landing({ onStart, hasDraft, onResume, draftAt }: LandingProps) {
  return (
    <div className="gd-land">
      <Eyebrow shape="mk-cir" t="Growth diagnosis" />

      <Reveal as="h1" className="gd-land-h">
        Where does your <span>business actually stand?</span>
      </Reveal>

      <Reveal as="p" className="lede" d={1}>
        <strong>Understand where your business stands today — in less than five minutes.</strong>
      </Reveal>

      <Reveal as="p" className="lede" d={2} style={{ marginTop: 16 }}>
        Answer {TOTAL} carefully designed questions and get an honest first read of your business
        maturity, operational health, and the areas most likely holding growth back. This
        isn&apos;t a strategy or a roadmap — it&apos;s a read of where things stand right now.
      </Reveal>

      <Reveal as="div" className="ctas" d={3} style={{ marginTop: 34 }}>
        {hasDraft ? (
          <>
            <button type="button" className="btn" onClick={onResume}>
              Pick up where I left off <span className="ar">→</span>
            </button>
            <button type="button" className="btn btn--ghost" onClick={onStart}>
              Start again from question 01
            </button>
          </>
        ) : (
          <button type="button" className="btn magnet" onClick={onStart}>
            Start the diagnosis <span className="ar">→</span>
          </button>
        )}
      </Reveal>

      <Reveal as="p" className="gd-meta" d={4}>
        {hasDraft
          ? `You stopped at question ${String(draftAt).padStart(2, "0")} of ${TOTAL} · about five minutes · no cost`
          : `${TOTAL} questions · about five minutes · no cost`}
      </Reveal>
    </div>
  );
}
