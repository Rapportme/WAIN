import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS, categoryStyle, neighbours, postBySlug } from "@/data/blog";

interface Params {
  params: Promise<{ slug: string }>;
}

/** Every piece is pre-rendered — the site is a static export. */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  const title = `${post.title} — We Are In Collective`;
  // The opening paragraph is the author's own summary of the piece; nothing is
  // rewritten for search, it's only trimmed to a description length.
  const opener = post.body[0] ?? "";
  const description = opener.length > 190 ? `${opener.slice(0, 187).trimEnd()}…` : opener;
  const url = `/thinking/${post.slug}/`;

  return {
    title,
    description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "We Are In Collective",
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** /thinking/<slug> — one piece, set in a single measure. */
export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const cat = categoryStyle(post.category);
  const near = neighbours(post.slug);

  return (
    <main data-fmt={cat.fmt}>
      <header className="chapter pg-head bl-art-head s-article" id="top">
        <div className="wrap">
          <a href={withBase("/thinking/")} className="pg-back">
            <span className="arw" aria-hidden="true">
              &larr;
            </span>{" "}
            All our thinking
          </a>
          <Eyebrow shape={cat.shape} n={post.n} t={cat.label} />
          <Reveal as="h1" className="pg-title" d={1}>
            {post.title}
          </Reveal>
        </div>
      </header>

      <article className="chapter s-article s-article-body">
        <div className="wrap bl-art-grid">
          {/* Deliberately not a Reveal: the inner block is sticky, and a motion
              wrapper's transform would become its containing block. */}
          <aside className="bl-rail">
            <div className="bl-rail-in">
              <span className="bl-rail-fmt">
                <span className={`mk ${cat.shape}`} />
                {cat.label}
              </span>
              <span className="bl-rail-pair">
                <span className="bl-rail-k">Written by</span>
                <span className="bl-rail-v">{post.author}</span>
              </span>
              <span className="bl-rail-pair">
                <span className="bl-rail-k">Reading time</span>
                <span className="bl-rail-v">{post.minutes} minutes</span>
              </span>
              <a href={withBase("/thinking/")} className="mark bl-rail-a">
                All our thinking &rarr;
              </a>
            </div>
          </aside>
          <div className="bl-body">
            {post.body.map((para, i) => (
              <Reveal as="p" key={i} d={i < 3 ? i : 0}>
                {para}
              </Reveal>
            ))}
            <div className="bl-end">
              <span className="who">
                Written by <b>{post.author}</b>
              </span>
              <a href={withBase("/#close")} className="mark">
                Talk to us about this &rarr;
              </a>
            </div>
          </div>
        </div>
      </article>

      {near ? (
        <nav className="wrap bl-pn" data-fmt={cat.fmt} aria-label="More of our thinking">
          <a href={withBase(`/thinking/${near.prev.slug}/`)}>
            <span className="lbl">
              <span className="mk mk-bar" />
              Previous
            </span>
            <strong className="ttl">{near.prev.title}</strong>
          </a>
          <a href={withBase(`/thinking/${near.next.slug}/`)}>
            <span className="lbl">
              <span className="mk mk-bar" />
              Next
            </span>
            <strong className="ttl">{near.next.title}</strong>
          </a>
        </nav>
      ) : null}

      <div className="wrap bl-all">
        <p className="lede lede-aside" style={{ maxWidth: "42ch" }}>
          Every observation, perspective and case study we&apos;ve published, in one place.
        </p>
        <a href={withBase("/thinking/")} className="mark">
          All our thinking &rarr;
        </a>
      </div>
    </main>
  );
}
