"use client";

import { useCallback, useEffect, useState } from "react";
import { withBase } from "@/lib/withBase";
import { hasEndpoint, runDetailed, runInstant } from "@/lib/diagnosis/client";
import { TOTAL } from "@/lib/diagnosis/questions";
import type {
  Answers,
  DetailedDiagnosis,
  InstantDiagnosis,
  LeadDetails,
} from "@/lib/diagnosis/types";
import { ArrowLeft, Spinner } from "./Icons";
import { FullReport } from "./FullReport";
import { Landing } from "./Landing";
import { LeadForm } from "./LeadForm";
import { Quiz } from "./Quiz";
import { Results } from "./Results";

type Screen = "landing" | "quiz" | "loading" | "results" | "form" | "report" | "error";

/** Reading lines, so a ten-second wait doesn't feel like a stalled page. */
const WAITING = [
  "Reading your responses…",
  "Looking for patterns across your answers…",
  "Separating symptoms from causes…",
  "Setting this against businesses at your stage…",
  "Writing your first read…",
];

function Waiting({ lines }: { lines: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 1900);
    return () => clearInterval(t);
  }, [lines.length]);
  return (
    <div className="gd-wait">
      <Spinner size={26} />
      <p aria-live="polite">{lines[i]}</p>
    </div>
  );
}

export function GrowthDiagnosis() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [index, setIndex] = useState(0);
  /** Where a restored draft stopped, so the landing can offer to resume it. */
  const [draftAt, setDraftAt] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [diagnosis, setDiagnosis] = useState<InstantDiagnosis | null>(null);
  const [report, setReport] = useState<DetailedDiagnosis | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [lead, setLead] = useState<LeadDetails | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Each screen change starts a new read; put the reader back at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen, index]);

  // Fifteen answered questions are worth not losing to a refresh.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("wain.diagnosis");
      if (saved) {
        const { answers: a, index: i } = JSON.parse(saved) as { answers: Answers; index: number };
        if (a && typeof i === "number") {
          const at = Math.min(Math.max(i, 0), TOTAL - 1);
          setAnswers(a);
          setIndex(at);
          // Only worth offering to resume if they actually answered something.
          if (Object.keys(a).length > 0) setDraftAt(at + 1);
        }
      }
    } catch {
      /* a corrupt draft is not worth surfacing — start clean */
    }
  }, []);

  useEffect(() => {
    if (screen === "landing") return;
    try {
      sessionStorage.setItem("wain.diagnosis", JSON.stringify({ answers, index }));
    } catch {
      /* private-mode storage failures are not the founder's problem */
    }
  }, [answers, index, screen]);

  const runFirstRead = useCallback(async () => {
    setScreen("loading");
    setError("");
    try {
      const { data } = await runInstant(answers);
      setDiagnosis(data);
      setScreen("results");
    } catch {
      setError("We couldn't generate your diagnosis just now. Your answers are still here.");
      setScreen("error");
    }
  }, [answers]);

  const runFullReport = useCallback(
    async (details: LeadDetails) => {
      setSubmitting(true);
      try {
        const { data, emailed: sent } = await runDetailed(answers, details);
        setReport(data);
        setEmailed(sent);
        setLead(details);
        setScreen("report");
      } catch {
        setError("We couldn't prepare the detailed report just now. Please try again.");
        setScreen("error");
      } finally {
        setSubmitting(false);
      }
    },
    [answers],
  );

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setDiagnosis(null);
    setReport(null);
    setLead(null);
    try {
      sessionStorage.removeItem("wain.diagnosis");
    } catch {
      /* nothing to clear */
    }
    setDraftAt(0);
    setScreen("quiz");
  };

  return (
    <section className="chapter s-gd" id="growth-diagnosis">
      <div className="wrap gd-wrap">
        <a className="gd-exit no-print" href={withBase("/#diagnosis")}>
          <ArrowLeft size={14} /> Back to the site
        </a>

        {screen === "landing" ? (
          <Landing
            onStart={restart}
            onResume={() => setScreen("quiz")}
            hasDraft={draftAt > 0}
            draftAt={draftAt}
          />
        ) : null}

        {screen === "quiz" ? (
          <Quiz
            index={index}
            setIndex={setIndex}
            answers={answers}
            setAnswers={setAnswers}
            onFinish={runFirstRead}
          />
        ) : null}

        {screen === "loading" ? <Waiting lines={WAITING} /> : null}

        {screen === "error" ? (
          <div className="gd-error">
            <p className="lede">{error}</p>
            <button type="button" className="btn" onClick={runFirstRead}>
              Try again
            </button>
          </div>
        ) : null}

        {screen === "results" && diagnosis ? (
          <Results
            diagnosis={diagnosis}
            onOpenForm={() => setScreen("form")}
            onRestart={restart}
          />
        ) : null}

        {screen === "form" ? (
          <LeadForm
            onSubmit={runFullReport}
            onCancel={() => setScreen("results")}
            submitting={submitting}
            willEmail={hasEndpoint}
          />
        ) : null}

        {screen === "report" && report ? (
          <FullReport report={report} name={lead?.name ?? ""} emailed={emailed} />
        ) : null}
      </div>
    </section>
  );
}
