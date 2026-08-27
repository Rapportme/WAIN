"use client";

import { TOTAL } from "@/lib/diagnosis/questions";
import { ArrowRight } from "./Icons";

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
      <div className="gd-eye">
        <span className="mk mk-cir" />
        <span className="t">Growth diagnosis</span>
      </div>

      <h1 className="gd-land-h">
        Where does your
        <br />
        business actually stand?
      </h1>

      <p className="gd-land-lede">
        Understand where your business stands today — in less than five minutes.
      </p>

      <p className="gd-land-body">
        Answer {TOTAL} carefully designed questions and get an honest first read of your business
        maturity, operational health, and the areas most likely holding growth back. This
        isn&apos;t a strategy or a roadmap — it&apos;s a read of where things stand right now.
      </p>

      <div className="gd-land-cta">
        {hasDraft ? (
          <>
            <button type="button" className="btn" onClick={onResume}>
              Pick up where I left off
              <span className="arw" aria-hidden="true">
                &rarr;
              </span>
            </button>
            <button type="button" className="btn btn--ghost" onClick={onStart}>
              Start again from question 01
            </button>
          </>
        ) : (
          <button type="button" className="btn" onClick={onStart}>
            Start the diagnosis <ArrowRight size={15} />
          </button>
        )}
      </div>

      <p className="gd-land-meta">
        {hasDraft
          ? `You stopped at question ${String(draftAt).padStart(2, "0")} of ${TOTAL} · about five minutes · no cost`
          : `${TOTAL} questions · about five minutes · no cost`}
      </p>
    </div>
  );
}
