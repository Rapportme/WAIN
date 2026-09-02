"use client";

import { useEffect, useState } from "react";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  CATEGORIES,
  COLLECTION_SUBJECT,
  POSTS,
  categoryStyle,
  postsIn,
  summary,
  type BlogCategory,
} from "@/data/blog";

type Filter = BlogCategory | "ALL";

/** The format switch, in reading order, with "everything" first. */
const SWITCH: { key: Filter; label: string; fmt: string; shape: string; hash: string }[] = [
  { key: "ALL", label: "Everything", fmt: "all", shape: "mk-a", hash: "" },
  ...CATEGORIES.map((c) => ({
    key: c.key as Filter,
    label: c.plural,
    fmt: c.fmt,
    shape: c.shape,
    hash: c.plural.toLowerCase().replace(/\s+/g, "-"),
  })),
];

/** What each format is for — the notes the contents menu already uses. */
const NOTE: Record<Filter, string> = {
  ALL: "Every piece, in the order it was written.",
  PERSPECTIVE: "Opinions we'll put our name on.",
  OBSERVATION: "Short. Things we keep noticing.",
  "CASE STUDY": "What we did, including what didn't work.",
};

/**
 * /thinking — the collection index. The format switch is state rather than a
 * route because the whole collection is one page of writing, not four; the
 * hash is still honoured on arrival so the contents menu and footer can point
 * a reader straight at one format.
 */
export function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("ALL");

  // Arrive at /thinking/#case-studies and the switch is already set.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash) return;
    const hit = SWITCH.find((s) => s.hash && s.hash === hash);
    if (hit) setFilter(hit.key);
  }, []);

  const shown = postsIn(filter);
  const [lead, ...rest] = shown;

  return (
    <main>
      <header className="chapter pg-head s-blog" id="top">
        <div className="wrap">
          <a href={withBase("/")} className="pg-back">
            <span className="arw" aria-hidden="true">
              &larr;
            </span>{" "}
            Back to the book
          </a>
          <Eyebrow shape="mk-a" t="Our thinking" />
          <Reveal as="h1" className="pg-title" d={1}>
            We publish what we&apos;d tell you in a room.
          </Reveal>
          <Reveal as="p" className="lede" d={2}>
            Observations, perspectives and case studies on the parts of a business that marketing
            alone can&apos;t fix. Read them even if you never become a client. That&apos;s kind of
            the point.
          </Reveal>
          <Reveal as="div" className="bl-subject" d={2}>
            <span>{COLLECTION_SUBJECT}</span>
            <span className="r" aria-hidden="true" />
          </Reveal>

          <Reveal as="div" d={3}>
            <div className="bl-filters" role="group" aria-label="Filter the writing by format">
              {SWITCH.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  data-fmt={s.fmt}
                  aria-pressed={filter === s.key}
                  onClick={() => setFilter(s.key)}
                >
                  <span className="bl-f-n">
                    <span className={`mk ${s.shape}`} />
                    {s.label}
                  </span>
                  <span className="bl-f-c">
                    {String(postsIn(s.key === "ALL" ? "ALL" : s.key).length).padStart(2, "0")}
                  </span>
                  <span className="bl-f-w">{NOTE[s.key]}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <section className="chapter s-blog s-blog-list" id="pieces">
        <div className="wrap">
          {lead ? (
            <Reveal as="div" className="bl-lead" data-fmt={categoryStyle(lead.category).fmt}>
              <div>
                <div className="bl-kick">
                  <span className={`mk ${categoryStyle(lead.category).shape}`} />
                  <span>{categoryStyle(lead.category).label}</span>
                  <span className="sep" aria-hidden="true">
                    /
                  </span>
                  <span>The lead piece</span>
                </div>
                <h2>
                  <a href={withBase(`/thinking/${lead.slug}/`)}>{lead.title}</a>
                </h2>
              </div>
              <div>
                <p className="blurb">{summary(lead)}</p>
                <a href={withBase(`/thinking/${lead.slug}/`)} className="mark">
                  Read the piece &rarr;
                </a>
              </div>
            </Reveal>
          ) : null}

          <ul className="bl-grid">
            {rest.map((post, i) => {
              const cat = categoryStyle(post.category);
              return (
                <li className="bl-card" data-fmt={cat.fmt} key={post.slug}>
                  <Reveal as="div" className="bl-c-in" d={Math.min(i % 2, 1)}>
                    <a href={withBase(`/thinking/${post.slug}/`)}>
                      <span className="bl-c-top">
                        <span className={`mk ${cat.shape}`} />
                        {cat.label}
                        <span className="n">{post.n}</span>
                      </span>
                      <strong className="bl-c-t">{post.title}</strong>
                      <span className="bl-c-x">{summary(post)}</span>
                      <span className="bl-c-b">
                        <span>{post.minutes} min read</span>
                        <span className="rd">
                          Read
                          <span className="arw" aria-hidden="true">
                            &rarr;
                          </span>
                        </span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal as="p" className="lede lede-aside" style={{ marginTop: "34px" }}>
            {filter === "ALL"
              ? `All ${POSTS.length} pieces, in the order they were written.`
              : `${shown.length} of ${POSTS.length} pieces. ${SWITCH.find((s) => s.key === filter)?.label}.`}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
