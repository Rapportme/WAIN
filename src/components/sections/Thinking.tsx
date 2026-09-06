"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { withBase } from "@/lib/withBase";
import { POSTS, type BlogCategory, type BlogPost } from "@/data/blog";
import { FMT } from "@/data/home";

type Filter = "all" | BlogCategory;

const FILTERS: { f: Filter; label: string }[] = [
  { f: "all", label: "All" },
  { f: "PERSPECTIVE", label: FMT.PERSPECTIVE.pl },
  { f: "OBSERVATION", label: FMT.OBSERVATION.pl },
  { f: "CASE STUDY", label: FMT["CASE STUDY"].pl },
];

const sum = (p: BlogPost): string => p.excerpt || p.body[0] || "";
const url = (p: BlogPost): string => withBase(`/thinking/${p.slug}/`);

/** 07 · Our thinking. The lead piece, six more from the shelf, and a format filter. */
export function Thinking() {
  const [filter, setFilter] = useState<Filter>("all");
  const lead = POSTS[0];
  const shelf = POSTS.slice(1, 7);
  const show = (cat: BlogCategory) => filter === "all" || cat === filter;

  return (
    <section className="chapter ink-lav" id="thinking" data-chap="thinking">
      <div className="wrap">
        <Eyebrow shape="mk-a" n="07" t="Our thinking" />
        <Reveal as="div" className="think-head">
          <h2>We publish what we&apos;d tell you in a room, not what performs online.</h2>
          <div className="filters" role="group" aria-label="Filter writing" id="homeFilters">
            {FILTERS.map(({ f, label }) => (
              <button
                type="button"
                key={f}
                aria-pressed={filter === f}
                data-f={f}
                onClick={() => setFilter(f)}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>
        {lead ? (
          <Reveal
            as="div"
            className={`lead ${FMT[lead.category].cls}`}
            style={show(lead.category) ? undefined : { display: "none" }}
          >
            <div>
              <div className="kick label">
                <i className={`mk ${FMT[lead.category].mk}`} />
                {FMT[lead.category].l} — the lead piece
              </div>
              <h3>
                <a href={url(lead)}>{lead.title}</a>
              </h3>
            </div>
            <div>
              <p className="blurb">{sum(lead)}</p>
              <a className="mark" href={url(lead)}>
                Read the argument <span className="ar">→</span>
              </a>
            </div>
          </Reveal>
        ) : null}
        <Reveal as="div" className="pieces" d={1}>
          {shelf.map((p) => (
            <a
              className={`piece ${FMT[p.category].cls}`}
              data-cat={p.category}
              href={url(p)}
              key={p.slug}
              style={show(p.category) ? undefined : { display: "none" }}
            >
              <span className="fmt">
                <i className={`mk ${FMT[p.category].mk}`} />
                {FMT[p.category].l}
              </span>
              <span className="ttl">{p.title}</span>
              <span className="rd">
                Read <span className="ar">→</span>
              </span>
            </a>
          ))}
        </Reveal>
        <Reveal as="div" className="think-all">
          <p className="aside">
            Because better thinking leads to better decisions. Read it even if you never become a
            client. That&apos;s kind of the point.
          </p>
          <a className="mark" href={withBase("/thinking/")}>
            All {POSTS.length} pieces <span className="ar">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
