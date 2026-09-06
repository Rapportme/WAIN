"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SITS, pad2 } from "@/data/home";

/** 06 · Challenges we help solve. An accordion — one open at a time, the first by default. */
export function Situations() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="chapter ink-coral" id="situations" data-chap="situations">
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="06" t="Challenges we help solve" />
        <Reveal as="h2" className="statement">
          We don&apos;t sell services. We solve business problems.
        </Reveal>
        <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
          The problem you notice isn&apos;t always the one holding the business back. Here&apos;s what
          we usually hear — and what it usually means.
        </Reveal>
        <Reveal as="div" className="sits" id="sits">
          {SITS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`sit${isOpen ? " open" : ""}`} key={q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="ix">{pad2(i + 1)}</span>
                  <span className="txt">{q}</span>
                  <span className="pm" />
                </button>
                <div className="panel">
                  <div>
                    <div className="ans">
                      <div className="label">
                        <i className="mk mk-tri" />
                        Usually
                      </div>
                      <p>{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
        <Reveal as="p" className="aside" style={{ marginTop: 40 }}>
          If your situation isn&apos;t listed here, tell us about it. Chances are we&apos;ve seen a
          version of it before.
        </Reveal>
      </div>
    </section>
  );
}
