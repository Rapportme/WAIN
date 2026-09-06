import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { withBase } from "@/lib/withBase";
import { OG_IMAGES } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS, categoryStyle, neighbours, postBySlug, summary, type BlogCategory } from "@/data/blog";

const SITE_URL = "https://wearein.in";

/* The ink follows chapter 07: perspectives coral, observations teal, case studies sage. */
const INK: Record<BlogCategory, string> = {
  PERSPECTIVE: "ink-coral",
  OBSERVATION: "ink-teal",
  "CASE STUDY": "ink-sage",
};

interface Params {
  params: Promise<{ slug: string }>;
}

/** "2026-08-27" → "27 August 2026". */
function longDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
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
  const description = summary(post);
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
      publishedTime: post.date,
      modifiedTime: post.date,
      images: OG_IMAGES,
    },
    twitter: { card: "summary_large_image", title, description, images: OG_IMAGES },
  };
}

/** /thinking/<slug> — one piece, set in a single measure. */
export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const cat = categoryStyle(post.category);
  const ink = INK[post.category];
  const near = neighbours(post.slug);
  const heads = new Set(post.heads ?? []);
  const url = `${SITE_URL}/thinking/${post.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: summary(post),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Ananthu Vasudev" },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "We Are In Collective" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: cat.label,
    inLanguage: "en",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={`art-head ${ink}`}>
        <div className="wrap">
          <a className="pg-back" href={withBase("/thinking/")}>
            ← All our thinking
          </a>
          <Eyebrow shape={cat.shape} n={post.n} t={cat.label} />
          <Reveal as="h1">{post.title}</Reveal>
          <Reveal as="div" className="tl-dr" d={1}>
            <div className="k">The short version</div>
            <p>{summary(post)}</p>
          </Reveal>
        </div>
      </section>

      <section className={ink}>
        <div className="wrap art-body">
          <Reveal as="aside" className="bl-rail">
            <div>
              <div className="k">Format</div>
              <div className="v" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <i className={`mk ${cat.shape}`} />
                {cat.label}
              </div>
            </div>
            <div>
              <div className="k">Written by</div>
              <div className="v">{post.author}</div>
            </div>
            <div>
              <div className="k">Published</div>
              <div className="v">
                <time dateTime={post.date}>{longDate(post.date)}</time>
              </div>
            </div>
            <div>
              <div className="k">Reading time</div>
              <div className="v">
                {post.minutes} minute{post.minutes > 1 ? "s" : ""}
              </div>
            </div>
            <a className="mark" href={withBase("/thinking/")}>
              All our thinking <span className="ar">→</span>
            </a>
          </Reveal>

          <Reveal as="article" className="art" d={1}>
            {post.body.map((para, i) =>
              heads.has(i) ? <h2 key={i}>{para}</h2> : <p key={i}>{para}</p>,
            )}
            <div className="end">
              <span>
                Written by <strong>{post.author}</strong>
              </span>
              <a className="mark" href={withBase("/#close")}>
                Talk to us about this <span className="ar">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="wrap">
          {near ? (
            <nav className="bl-pn" aria-label="More of our thinking">
              <a href={withBase(`/thinking/${near.prev.slug}/`)}>
                <span className="k">
                  <i className="mk mk-bar" />
                  Previous
                </span>
                <span className="t">{near.prev.title}</span>
              </a>
              <a href={withBase(`/thinking/${near.next.slug}/`)}>
                <span className="k">
                  Next
                  <i className="mk mk-bar" />
                </span>
                <span className="t">{near.next.title}</span>
              </a>
            </nav>
          ) : null}
          <div className="think-all" style={{ padding: "40px 0 clamp(60px,10vh,120px)" }}>
            <p className="aside">
              Every observation, perspective and case study we&apos;ve published, in one place.
            </p>
            <a className="mark" href={withBase("/thinking/")}>
              All our thinking <span className="ar">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
