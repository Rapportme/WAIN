"use client";

import { useEffect, useState } from "react";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  COLLECTION_SUBJECT,
  POSTS,
  categoryStyle,
  postsIn,
  summary,
  type BlogCategory,
} from "@/data/blog";

type Filter = BlogCategory | "ALL";

/** The prototype's `.f-*` ink class for each format. */
export const FORMAT_CLASS: Record<BlogCategory, string> = {
  PERSPECTIVE: "f-persp",
  OBSERVATION: "f-obs",
  "CASE STUDY": "f-case",
};

/** The format switch, in reading order, with "everything" first. */
const SWITCH: { key: Filter; bf: string; label: string; shape: string; note: string }[] = [
  { key: "ALL", bf: "all", label: "Everything", shape: "mk-a", note: "Every piece, in the order it was written." },
  { key: "PERSPECTIVE", bf: "perspectives", label: "Perspectives", shape: "mk-cir", note: "Opinions we'll put our name on." },
  { key: "OBSERVATION", bf: "observations", label: "Observations", shape: "mk-cir", note: "Short. Things we keep noticing." },
  { key: "CASE STUDY", bf: "case-studies", label: "Case studies", shape: "mk-tri", note: "What we did, including what didn't work." },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * /thinking — the collection index. The format switch is state rather than a
 * route; the hash is honoured on arrival so the contents menu and footer can
 * point a reader straight at one format.
 */
export function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("ALL");

  // Arrive at /thinking/#case-studies and the switch is already set.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash) return;
    const hit = SWITCH.find((s) => s.bf !== "all" && s.bf === hash);
    if (hit) setFilter(hit.key);
  }, []);

  const shown = postsIn(filter);
  const [lead, ...rest] = shown;
  const current = SWITCH.find((s) => s.key === filter);

  return (
    <>
      <section className="pg-head ink-lav" id="top">
        <div className="wrap">
          <a className="pg-back" href={withBase("/")}>
            ← Back to the book
          </a>
          <Eyebrow shape="mk-a" t="Our thinking" />
          <Reveal as="h1" className="pg-title">
            We publish what we&apos;d tell you in a room.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Observations, perspectives and case studies on the parts of a business that marketing
            alone can&apos;t fix. Read them even if you never become a client. That&apos;s kind of
            the point.
          </Reveal>
          <Reveal as="div" className="bl-subject" d={2}>
            {COLLECTION_SUBJECT}
            <i />
          </Reveal>
          <Reveal as="div" className="bl-filters" d={3} id="blFilters">
            <div role="group" aria-label="Filter the writing by format" style={{ display: "contents" }}>
              {SWITCH.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  data-bf={s.bf}
                  aria-pressed={filter === s.key}
                  onClick={() => setFilter(s.key)}
                >
                  <span className="l">
                    <i className={`mk ${s.shape}`} />
                    {s.label}
                  </span>
                  <span className="c">{pad2(postsIn(s.key).length)}</span>
                  <span className="n">{s.note}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec ink-lav" id="pieces" style={{ paddingTop: 20 }}>
        <div className="wrap">
          {lead ? (
            <Reveal as="div" className={`lead ${FORMAT_CLASS[lead.category]}`} key={lead.slug}>
              <div>
                <div className="kick label">
                  <i className={`mk ${categoryStyle(lead.category).shape}`} />
                  {categoryStyle(lead.category).label} / The lead piece
                </div>
                <h3>
                  <a href={withBase(`/thinking/${lead.slug}/`)}>{lead.title}</a>
                </h3>
              </div>
              <div>
                <p className="blurb">{summary(lead)}</p>
                <a className="mark" href={withBase(`/thinking/${lead.slug}/`)}>
                  Read the piece <span className="ar">→</span>
                </a>
              </div>
            </Reveal>
          ) : null}

          <div className="bl-grid">
            {rest.map((post, i) => {
              const cat = categoryStyle(post.category);
              return (
                /* Reveal can't render an <a>, so the grid cell is a one-child
                   grid that stretches the card to fill it. */
                <Reveal as="div" key={post.slug} d={i % 3} style={{ display: "grid" }}>
                  <a className={`bcard ${FORMAT_CLASS[post.category]}`} href={withBase(`/thinking/${post.slug}/`)}>
                    <span className="top">
                      <span className="fmt">
                        <i className={`mk ${cat.shape}`} />
                        {cat.label}
                      </span>
                      <span className="nn">{post.n}</span>
                    </span>
                    <strong>{post.title}</strong>
                    <span className="sum">{summary(post)}</span>
                    <span className="bot">
                      <span>{post.minutes} min read</span>
                      <span>Read →</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal as="p" className="aside bl-foot">
            {filter === "ALL"
              ? `All ${POSTS.length} pieces, in the order they were written.`
              : `${shown.length} of ${POSTS.length} pieces. ${current?.label ?? ""}.`}
          </Reveal>
        </div>
      </section>
    </>
  );
}
