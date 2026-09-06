"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** 01 · The problem. "marketing" gets struck through and "clarity" written in, 450ms after entering. */
export function Problem() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [marked, setMarked] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: number | undefined;
    // The reveal (same contract as <Reveal>) …
    const rv = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setEntered(true);
          rv.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    // … and the strike-through, once 30% is in view.
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          t = window.setTimeout(() => setMarked(true), 450);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    rv.observe(el);
    io.observe(el);
    return () => {
      rv.disconnect();
      io.disconnect();
      if (t) window.clearTimeout(t);
    };
  }, []);

  return (
    <section className="chapter ink-coral" id="problem" data-chap="problem">
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="01" t="The problem" />
        <h2
          ref={ref}
          id="problemH"
          className={`problem-h rv${entered ? " in" : ""}${marked ? " marked" : ""}`}
        >
          You have a <del>marketing</del>
          <ins>&nbsp;clarity</ins> problem.
        </h2>
        <div className="two">
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              That first sentence is what we&apos;re told, almost every time. It&apos;s almost never
              true. The ads were fine. The last agency was fine. What&apos;s missing isn&apos;t another
              campaign. It&apos;s a shared understanding of what success actually looks like:
            </p>
            <p className="win">
              “We win when <span className="fill-line" />.”
            </p>
          </Reveal>
          <Reveal as="div" className="stack" d={2}>
            <p className="lede">
              Marketing doesn&apos;t create truth about a business. It amplifies whatever is already
              true. Spend more on an unclear company and you get unclear —{" "}
              <strong>faster, louder, and at a higher cost per unit of confusion.</strong>
            </p>
            <p className="lede">
              So we don&apos;t start with a campaign. We start by understanding your business, and
              finding out what&apos;s true.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
