"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** 01 · The problem. The heading edits itself — "marketing" → "clarity". */
export function Problem() {
  const [marked, setMarked] = useState(false);
  const reduce = useReducedMotion();

  const trigger = () => {
    // Original: strike-through + inserted word land ~450ms after the heading enters.
    window.setTimeout(() => setMarked(true), reduce ? 0 : 450);
  };

  return (
    <section className="chapter s-problem" id="problem">
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="01" t="The problem" />
        <Reveal
          as="h2"
          className={`problem-h${marked ? " marked" : ""}`}
          id="problemH"
          onEnter={trigger}
        >
          You have a{" "}
          <span className="edit">
            <del>marketing</del>
            <ins>clarity</ins>
          </span>{" "}
          problem.
        </Reveal>
        <div className="problem-grid">
          <Reveal as="div" className="col-l" d={1}>
            <p className="lede">
              That first sentence is what we&apos;re told, almost every time. It&apos;s almost never
              true. The ads were fine. The last agency was fine. What&apos;s missing isn&apos;t
              another campaign. It&apos;s a shared understanding of what success actually looks like:
            </p>
            <p className="win">
              &ldquo;We win when <span className="fill-line">&nbsp;</span>.&rdquo;
            </p>
          </Reveal>
          <Reveal as="div" d={2}>
            <p className="lede">
              Marketing doesn&apos;t create truth about a business. It amplifies whatever is already
              true. Spend more on an unclear company and you get unclear —{" "}
              <strong>faster, louder, and at a higher cost per unit of confusion.</strong>
            </p>
            <p className="lede" style={{ marginTop: "26px" }}>
              So we don&apos;t start with a campaign. We start by understanding your business, and
              finding out what&apos;s true.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
