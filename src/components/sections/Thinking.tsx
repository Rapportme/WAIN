"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Format = "all" | "observations" | "perspectives" | "case" | "field";

interface Piece {
  fmt: Exclude<Format, "all">;
  label: string;
  title: string;
}

const FILTERS: { f: Format; label: string }[] = [
  { f: "all", label: "All" },
  { f: "observations", label: "Observations" },
  { f: "perspectives", label: "Perspectives" },
  { f: "case", label: "Case studies" },
  { f: "field", label: "Field notes" },
];

const LEAD_FMT: Exclude<Format, "all"> = "perspectives";

const PIECES: Piece[] = [
  { fmt: "observations", label: "Observation", title: "Your leads are fine. Your follow-up isn't." },
  {
    fmt: "field",
    label: "Field note",
    title: "Before you buy an AI tool, map the hour it's meant to save.",
  },
  {
    fmt: "perspectives",
    label: "Perspective",
    title: '"More marketing" is the most expensive way to avoid a hard decision.',
  },
  {
    fmt: "case",
    label: "Case study",
    title: "A rebrand that started by deleting two of the three services.",
  },
  {
    fmt: "observations",
    label: "Observation",
    title: "Businesses don't compete on price. They compete on how fast they can be understood.",
  },
  {
    fmt: "field",
    label: "Field note",
    title: 'The meeting where "we\'re too busy to fix it" finally became the diagnosis.',
  },
];

/** 07 · Thinking — a contents page for the writing, filterable by format. */
export function Thinking() {
  const [filter, setFilter] = useState<Format>("all");
  const leadVisible = filter === "all" || filter === LEAD_FMT;

  return (
    <section className="chapter s-think" id="thinking">
      <div className="wrap">
        <Eyebrow shape="mk-a" n="07" t="Our thinking" />
        <Reveal as="div" className="think-head">
          <h2>We publish what we&apos;d tell you in a room, not what performs online.</h2>
          <div className="filters" role="group" aria-label="Filter writing">
            {FILTERS.map((f) => (
              <button key={f.f} aria-pressed={filter === f.f} onClick={() => setFilter(f.f)}>
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="div"
          className="lead"
          data-fmt={LEAD_FMT}
          d={1}
          style={leadVisible ? undefined : { display: "none" }}
        >
          <div>
            <div className="kick">
              <span className="mk" />
              <span className="label">Perspective — the lead piece</span>
            </div>
            <h3>
              <a href="#">Why we don&apos;t call ourselves an agency.</a>
            </h3>
          </div>
          <div>
            <p className="blurb">
              The word comes with expectations we don&apos;t want: retainers, decks, distance. We
              wanted to be in the business, not next to it — so we changed the noun, and then had to
              earn it.
            </p>
            <a href="#" className="mark">
              Read the argument &rarr;
            </a>
          </div>
        </Reveal>

        <ul className="pieces">
          {PIECES.map((p) => {
            const hidden = filter !== "all" && p.fmt !== filter;
            return (
              <li className={`piece${hidden ? " hide" : ""}`} data-fmt={p.fmt} key={p.title}>
                <a href="#">
                  <span className="fmt">
                    <span className="mk" />
                    {p.label}
                  </span>
                  <span className="ttl">{p.title}</span>
                  <span className="rd">Read</span>
                </a>
              </li>
            );
          })}
        </ul>

        <Reveal as="p" className="lede lede-aside" style={{ marginTop: "34px" }}>
          Because better thinking leads to better decisions. Read it even if you never become a
          client. That&apos;s kind of the point.
        </Reveal>
      </div>
    </section>
  );
}
