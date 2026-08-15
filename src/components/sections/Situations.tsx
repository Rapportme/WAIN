"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Situation {
  ix: string;
  question: string;
  answer: string;
}

const SITUATIONS: Situation[] = [
  {
    ix: "01",
    question: "We're getting traffic, but it's not converting.",
    answer:
      "A clarity problem, not a traffic problem. The people arriving can't quickly tell what you do, who it's for, or why it beats the alternative — so they leave to go and be sure somewhere else.",
  },
  {
    ix: "02",
    question: "We've tried marketing before, and it didn't work.",
    answer:
      "Often the strategy was fine. The foundation wasn't ready. Marketing amplified a business that hadn't yet decided what it was — so it amplified the confusion too.",
  },
  {
    ix: "03",
    question:
      "Uh no! I just have an idea. I'll reach out once I've figured more out.",
    answer:
      "That's usually the best time to start, not after. The earliest decisions are the cheapest to get right and the most expensive to unpick later.",
  },
  {
    ix: "04",
    question: "We don't know what makes us different anymore.",
    answer:
      "The problem isn't that you aren't different. Your business has simply evolved faster than your story. That's why it's hard to see. An outside perspective helps bring it back into focus.",
  },
  {
    ix: "05",
    question: "Our team is stretched thin, doing a bit of everything.",
    answer:
      "Growth without systems eventually breaks something. This is where mapping the repeated work — then removing, simplifying or automating it — buys back the hours you're currently spending on friction.",
  },
  {
    ix: "06",
    question: "We're growing, but it doesn't feel in control.",
    answer:
      "Fast growth without structure just means faster chaos. The fix isn't slowing down — it's putting a spine under the thing so it can carry more weight without cracking.",
  },
  {
    ix: "07",
    question: "We want to use AI, but don't know where to start.",
    answer:
      "Most businesses need a use case before they need a tool. We start from the hour your team keeps losing, not the software everyone's talking about this month.",
  },
];

/** 06 · Situations — an accordion. One open at a time (first open by default). */
export function Situations() {
  const [open, setOpen] = useState(0);

  return (
    <section className="chapter s-sit" id="situations">
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="06" t="Challenges we help solve" />
        <Reveal as="h2" className="statement">
          We don&apos;t sell services. We solve business problems.
        </Reveal>
        <Reveal as="p" className="lede" style={{ marginTop: "24px" }}>
          The problem you notice isn&apos;t always the one holding the business
          back. Here&apos;s what we usually hear — and what it usually means.
        </Reveal>
        <Reveal as="div" className="sits" d={1}>
          {SITUATIONS.map((s, i) => {
            const expanded = open === i;
            return (
              <div className="sit" key={s.ix}>
                <button
                  className="sit-q"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : i)}
                >
                  <span className="ix">{s.ix}</span>
                  <span className="txt">&ldquo;{s.question}&rdquo;</span>
                  <span className="pm" aria-hidden="true" />
                </button>
                <div className="sit-a">
                  <div>
                    <div className="inner">
                      <span className="lb">
                        <span className="mk" />
                        Usually
                      </span>
                      <p>{s.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
        <Reveal
          as="p"
          className="lede lede-aside"
          style={{ marginTop: "34px" }}
        >
          If your situation isn&apos;t listed here, tell us about it. Chances
          are we&apos;ve seen a version of it before.
        </Reveal>
      </div>
    </section>
  );
}
