"use client";

import { useState } from "react";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORIES, POSTS, categoryStyle, summary, type BlogCategory } from "@/data/blog";

type Filter = BlogCategory | "ALL";

const FILTERS: { f: Filter; label: string }[] = [
  { f: "ALL", label: "All" },
  ...CATEGORIES.map((c) => ({ f: c.key as Filter, label: c.plural })),
];

/** The lead piece, then the pieces under it. The full collection is at /thinking. */
const [LEAD, ...REST] = POSTS;
const SHELF = REST.slice(0, 6);

/** 07 · Thinking — a contents page for the writing, filterable by format. */
export function Thinking() {
  const [filter, setFilter] = useState<Filter>("ALL");
  if (!LEAD) return null;
  const leadFmt = categoryStyle(LEAD.category);
  const leadVisible = filter === "ALL" || filter === LEAD.category;

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
          data-fmt={leadFmt.fmt}
          d={1}
          style={leadVisible ? undefined : { display: "none" }}
        >
          <div>
            <div className="kick">
              <span className="mk" />
              <span className="label">{leadFmt.label} — the lead piece</span>
            </div>
            <h3>
              <a href={withBase(`/thinking/${LEAD.slug}/`)}>{LEAD.title}</a>
            </h3>
          </div>
          <div>
            <p className="blurb">{summary(LEAD)}</p>
            <a href={withBase(`/thinking/${LEAD.slug}/`)} className="mark">
              Read the argument &rarr;
            </a>
          </div>
        </Reveal>

        <ul className="pieces">
          {SHELF.map((p) => {
            const cat = categoryStyle(p.category);
            const hidden = filter !== "ALL" && p.category !== filter;
            return (
              <li className={`piece${hidden ? " hide" : ""}`} data-fmt={cat.fmt} key={p.slug}>
                <a href={withBase(`/thinking/${p.slug}/`)}>
                  <span className="fmt">
                    <span className="mk" />
                    {cat.label}
                  </span>
                  <span className="ttl">{p.title}</span>
                  <span className="rd">Read</span>
                </a>
              </li>
            );
          })}
        </ul>

        <Reveal as="div" className="think-all">
          <p className="lede lede-aside" style={{ maxWidth: "44ch" }}>
            Because better thinking leads to better decisions. Read it even if you never become a
            client. That&apos;s kind of the point.
          </p>
          <a href={withBase("/thinking/")} className="mark">
            All {POSTS.length} pieces &rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
