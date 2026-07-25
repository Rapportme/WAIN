"use client";

import { useUI } from "@/components/providers/UIProvider";

const QUESTIONS = [
  "Can you say what my business does in one sentence a stranger would understand?",
  "Do you know who my best customers are, and why they actually buy?",
  "Is my problem really marketing — or is it clarity, sales, pricing or systems?",
  "What happens to a lead in the 48 hours after it arrives?",
  "What makes me genuinely different from the business next door?",
  "Which numbers will we judge this work by — and are they business numbers?",
  'What would you recommend if the honest answer is "spend nothing yet"?',
  "Who will actually do the work — and will I ever speak to them?",
  "Are we building a campaign that spikes, or a system that compounds?",
  "Where could AI save my team real hours — and where is it just hype?",
  "What are you choosing not to do, and why?",
  "Six months in, how will we both know this was worth it?",
];

export function Modal12() {
  const { modalOpen, closeModal } = useUI();

  return (
    <div
      className={`modal${modalOpen ? " open" : ""}`}
      id="modal12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="m12t"
    >
      <div className="modal-bg" onClick={closeModal} />
      <div className="modal-card">
        <button className="mx" onClick={closeModal} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#12263F" strokeWidth="1.8">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
        <span className="meye">
          <span className="mk" />
          Read this first
        </span>
        <h3 id="m12t">Before you hire a marketing agency, ask these 12 questions.</h3>
        <p className="msub">
          If an agency can&apos;t answer most of these clearly, more marketing won&apos;t fix what&apos;s
          actually wrong. Ask them. Ask us.
        </p>
        <ol className="qlist">
          {QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <a href="#close" className="btn mcta" onClick={closeModal}>
          Talk it through over coffee{" "}
          <span className="arw" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
