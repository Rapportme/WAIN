"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INDUSTRIES, QUESTIONS, TOTAL } from "@/lib/diagnosis/questions";
import type { Answer, Answers, Ink, Question } from "@/lib/diagnosis/types";
import { ArrowLeft, ArrowRight, Check } from "./Icons";

/** Each question is printed in a chapter ink; the pair drives --sig / --sig-ink. */
const INK: Record<Ink, [fill: string, text: string]> = {
  signal: ["var(--signal)", "var(--signal-ink)"],
  sage: ["var(--sage)", "var(--sage-ink)"],
  amber: ["var(--amber)", "var(--amber-ink)"],
  coral: ["var(--coral)", "var(--coral-ink)"],
  lav: ["var(--lav)", "var(--lav-ink)"],
  ink: ["var(--ink)", "var(--ink)"],
};

/* ---- progress ----------------------------------------------------------- */

function Progress({ index }: { index: number }) {
  const pct = ((index + 1) / TOTAL) * 100;
  return (
    <div className="gd-prog">
      <div className="gd-prog-row">
        <span className="gd-prog-n">
          Question {String(index + 1).padStart(2, "0")} <i>/</i> {TOTAL}
        </span>
        <span className="gd-prog-pct">{Math.round(pct)}%</span>
      </div>
      <div className="gd-prog-track">
        <div className="gd-prog-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---- option row --------------------------------------------------------- */

interface OptionRowProps {
  label: string;
  selected: boolean;
  multi: boolean;
  onClick: () => void;
}

function OptionRow({ label, selected, multi, onClick }: OptionRowProps) {
  return (
    <button
      type="button"
      className={`gd-opt${selected ? " on" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="gd-opt-t">{label}</span>
      <span className={`gd-tick${multi ? " sq" : ""}`}>{selected ? <Check size={11} /> : null}</span>
    </button>
  );
}

/* ---- industry search ---------------------------------------------------- */

function IndustrySearch({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDUSTRIES;
    return INDUSTRIES.filter((i) => i.toLowerCase().includes(q));
  }, [query]);

  // Clicking away closes the list without clearing what was chosen.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (opt: string) => {
    onChange(opt);
    setQuery(opt);
    setOpen(false);
  };

  return (
    <div className="gd-search" ref={box}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Type to search your industry…"
        aria-label="Industry"
        autoComplete="off"
      />
      {open ? (
        <div className="gd-search-list" role="listbox">
          {filtered.length ? (
            filtered.map((opt) => (
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                key={opt}
                className={opt === value ? "on" : undefined}
                onClick={() => pick(opt)}
              >
                {opt}
              </button>
            ))
          ) : (
            <p className="gd-search-none">
              Nothing matches that. Choose <b>Other</b> and tell us on the call.
            </p>
          )}
        </div>
      ) : null}
      {value ? <span className="gd-search-ok">Selected: {value}</span> : null}
    </div>
  );
}

/* ---- one question ------------------------------------------------------- */

function QuestionBody({
  question,
  value,
  onAnswer,
}: {
  question: Question;
  value: Answer | undefined;
  onAnswer: (v: Answer) => void;
}) {
  if (question.type === "single") {
    return (
      <div className="gd-opts">
        {question.options?.map((opt) => (
          <OptionRow
            key={opt}
            label={opt}
            multi={false}
            selected={value === opt}
            onClick={() => onAnswer(opt)}
          />
        ))}
      </div>
    );
  }

  if (question.type === "multi") {
    const arr = Array.isArray(value) ? value : [];
    const toggle = (opt: string) =>
      onAnswer(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
    return (
      <div className="gd-opts">
        {question.options?.map((opt) => (
          <OptionRow
            key={opt}
            label={opt}
            multi
            selected={arr.includes(opt)}
            onClick={() => toggle(opt)}
          />
        ))}
      </div>
    );
  }

  if (question.type === "search") {
    return (
      <IndustrySearch value={typeof value === "string" ? value : undefined} onChange={onAnswer} />
    );
  }

  const text = typeof value === "string" ? value : "";
  return (
    <div className="gd-textarea">
      <textarea
        value={text}
        maxLength={question.maxLength}
        rows={4}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="In your own words. One sentence is enough."
        aria-label={question.q}
      />
      <span className="gd-count">
        {text.length} / {question.maxLength}
      </span>
    </div>
  );
}

/* ---- the quiz ----------------------------------------------------------- */

interface QuizProps {
  index: number;
  setIndex: (i: number) => void;
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onFinish: () => void;
}

export function Quiz({ index, setIndex, answers, setAnswers, onFinish }: QuizProps) {
  const question = QUESTIONS[index];
  if (!question) return null;

  const value = answers[question.id];

  const canAdvance =
    question.type === "text"
      ? true
      : question.type === "multi"
        ? Array.isArray(value) && value.length > 0
        : Boolean(value);

  const setValue = (v: Answer) => setAnswers((prev) => ({ ...prev, [question.id]: v }));

  const next = () => (index === TOTAL - 1 ? onFinish() : setIndex(index + 1));
  const back = () => index > 0 && setIndex(index - 1);

  const [fill, text] = INK[question.ink];

  return (
    <div className="gd-quiz" style={{ "--sig": fill, "--sig-ink": text } as React.CSSProperties}>
      <Progress index={index} />

      <h2 className="gd-q">{question.q}</h2>
      {question.sub ? <p className="gd-sub">{question.sub}</p> : null}

      <QuestionBody question={question} value={value} onAnswer={setValue} />

      <div className="gd-nav">
        <button type="button" className="gd-back" onClick={back} disabled={index === 0}>
          <ArrowLeft size={15} /> Back
        </button>
        <button type="button" className="btn" onClick={next} disabled={!canAdvance}>
          {index === TOTAL - 1 ? "Get my diagnosis" : "Next"}
          <span className="arw">
            <ArrowRight size={15} />
          </span>
        </button>
      </div>

      {!canAdvance && question.type !== "text" ? (
        <p className="gd-hint">
          {question.type === "multi" ? "Choose at least one." : "Choose the closest answer."}
        </p>
      ) : null}
    </div>
  );
}
