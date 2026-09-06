"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INDUSTRIES, QUESTIONS, TOTAL } from "@/lib/diagnosis/questions";
import type { Answer, Answers, Question } from "@/lib/diagnosis/types";

/* ---- option row --------------------------------------------------------- */

interface OptionRowProps {
  label: string;
  selected: boolean;
  multi: boolean;
  onClick: () => void;
}

function OptionRow({ label, selected, multi, onClick }: OptionRowProps) {
  return (
    <button type="button" className="gd-opt" aria-pressed={selected} onClick={onClick}>
      <span>{label}</span>
      <span className={`tick${multi ? "" : " round"}`} aria-hidden="true">
        <svg viewBox="0 0 12 12">
          <path d="M2 6l3 3 5-6" />
        </svg>
      </span>
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
  const input = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    input.current?.focus();
  }, []);

  const pick = (opt: string) => {
    onChange(opt);
    setQuery(opt);
    setOpen(false);
  };

  return (
    <div style={{ margin: "26px 0 34px" }} ref={box}>
      <input
        ref={input}
        className="gd-in"
        id="indIn"
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
        <div className="gd-list" id="indList" role="listbox">
          {filtered.length ? (
            filtered.map((opt) => (
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                key={opt}
                onClick={() => pick(opt)}
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="empty">
              Nothing matches that. Choose <strong>Other</strong> and tell us on the call.
            </div>
          )}
        </div>
      ) : null}
      {value ? <div className="gd-sel">Selected: {value}</div> : null}
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
  const max = question.maxLength ?? 300;
  return (
    <div style={{ margin: "26px 0 34px" }}>
      <textarea
        className="gd-in"
        id="txtIn"
        value={text}
        maxLength={max}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="In your own words. One sentence is enough."
        aria-label={question.q}
      />
      <div className="gd-count">
        <span>{text.length}</span> / {max}
      </div>
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

const HINT: Record<Question["type"], string> = {
  single: "Choose the closest answer.",
  multi: "Choose at least one.",
  search: "Start typing, then pick from the list.",
  text: "Optional — you can skip this one.",
};

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

  const pct = ((index + 1) / TOTAL) * 100;

  return (
    // keyed on the question so the fade-in replays for each one
    <div className="gd-q" key={question.id}>
      <div className="gd-prog">
        <span>
          Question <b>{String(index + 1).padStart(2, "0")}</b> / {TOTAL}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="gd-bar">
        <i style={{ width: `${pct}%` }} />
      </div>

      <h2>{question.q}</h2>
      {question.sub ? <p className="gd-sub">{question.sub}</p> : null}

      <QuestionBody question={question} value={value} onAnswer={setValue} />

      <div className="gd-nav">
        <button type="button" className="back" onClick={back} disabled={index === 0}>
          ← Back
        </button>
        <button type="button" className="btn" onClick={next} disabled={!canAdvance}>
          {index === TOTAL - 1 ? "Get my diagnosis" : "Next"} <span className="ar">→</span>
        </button>
      </div>

      <p className="gd-hint">{HINT[question.type]}</p>
    </div>
  );
}
