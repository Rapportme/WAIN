"use client";

import { useEffect, useRef } from "react";
import { useUI } from "@/components/providers/UIProvider";
import { withBase } from "@/lib/withBase";

const QUESTIONS = [
  "Can you say what my business does in one sentence a stranger would understand?",
  "Do you know who my best customers are, and why they actually buy?",
  "Is my problem really marketing, or is it clarity, sales, pricing or systems?",
  "What happens to a lead in the 48 hours after it arrives?",
  "What makes my business genuinely different from the alternatives my customers are considering?",
  "How will we know the marketing is actually moving the business forward?",
  'What would you recommend if the honest answer is "spend nothing yet"?',
  "Who will actually do the work, and will I get to speak to them?",
  "Are we building a campaign that spikes, or a system that compounds?",
  "Where could AI save my team real hours, and where is it just hype?",
  "What are you choosing not to do, and why?",
  "Six months in, how will we both know this was worth it?",
];

export function Modal12() {
  const { modalOpen, closeModal } = useUI();
  const xRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modalOpen) xRef.current?.focus();
  }, [modalOpen]);

  return (
    <div
      id="modal12"
      className={modalOpen ? "open" : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="m12h"
      aria-hidden={!modalOpen}
    >
      <div className="bd" onClick={closeModal} />
      <div className="card ink-teal">
        <button className="x" type="button" ref={xRef} onClick={closeModal} aria-label="Close">
          <svg viewBox="0 0 20 20">
            <path d="M3 3l14 14M17 3L3 17" />
          </svg>
        </button>
        <div className="label" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <i className="mk mk-cir" />
          Read this first
        </div>
        <h3 id="m12h">Before you hire a marketing agency, ask these 12 questions.</h3>
        <p className="sub">
          If an agency can&apos;t answer most of these clearly, more marketing won&apos;t fix what&apos;s
          actually wrong. Ask them. Ask us.
        </p>
        <ol className="qlist">
          {QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <a className="btn" href={withBase("/contact/")} onClick={closeModal}>
          Talk it through over coffee <span className="ar">→</span>
        </a>
        <a className="more" href={withBase("/before-you-hire-an-agency/")} onClick={closeModal}>
          Read these as a page →
        </a>
      </div>
    </div>
  );
}
