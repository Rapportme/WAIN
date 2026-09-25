import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { DIVINE as AUTHOR, SITE_URL } from "@/data/author";
import { POSTS as ALL_POSTS, categoryStyle } from "@/data/blog";

/** His pieces only. */
const POSTS = ALL_POSTS.filter((p) => p.author === AUTHOR.name);

const AUTHOR_ID = AUTHOR.id;
const TITLE = "Divine Abraham — We Are In Collective";
const DESCRIPTION =
  "Founder of We Are In Collective in Kottayam. He writes the practical guides on branding, social media and digital marketing for Kerala businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/people/divine-abraham/" },
  openGraph: {
    type: "profile",
    url: "/people/divine-abraham/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const INDEX: readonly PageIndexEntry[] = [
  {
    href: "#work",
    title: "Where the experience comes from",
    note: "The roles behind the writing, newest first.",
    shape: "mk-tri",
    ink: "ink-amber",
  },
  {
    href: "#writing",
    title: "Everything he's written here",
    note: `All ${POSTS.length} pieces, in the order they were written.`,
    shape: "mk-sq",
    ink: "ink-lav",
  },
];

/* The author entity. Declared here rather than in the root layout because this
   is the page it describes — mainEntityOfPage has to resolve to something.
   `sameAs` is omitted entirely while AUTHOR.sameAs is empty: an empty array in
   the graph is a claim that no profiles exist, which isn't what we mean. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": AUTHOR_ID,
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      description: AUTHOR.short,
      url: AUTHOR.url,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      knowsAbout: [
        "Branding",
        "Social media marketing",
        "Digital marketing",
        "Local SEO",
        "Small business growth",
      ],
      ...(AUTHOR.sameAs.length ? { sameAs: AUTHOR.sameAs } : {}),
    },
    {
      "@type": "ProfilePage",
      "@id": `${AUTHOR.url}#page`,
      url: AUTHOR.url,
      name: TITLE,
      mainEntity: { "@id": AUTHOR_ID },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: AUTHOR.name, item: AUTHOR.url },
      ],
    },
  ],
};

/** First confirmed profile, or undefined while we have none. */
const PROFILE = AUTHOR.sameAs[0];

/** /people/divine-abraham — founder, writes the practical guides. */
export default function AuthorPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <PageHead
        ink="ink-lav"
        kicker="The founder"
        shape="mk-sq"
        title={AUTHOR.name}
        intro={`${AUTHOR.role}. He writes the practical guides: what things cost, what to ask and what to set up first.`}
        index={INDEX}
      />

      <section className="sec ink-lav" id="about" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="two">
            <Reveal as="h2" className="statement">
              Written as an owner, <span className="soft">not an agency.</span>
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              {AUTHOR.bio.map((p) => (
                <p className="lede" key={p.slice(0, 28)}>
                  {p}
                </p>
              ))}
              {/* The visible half of the identity claim. `sameAs` in the graph
                  tells a machine these are the same person; this lets a reader
                  check. One without the other is half an answer. */}
              {PROFILE ? (
                <a
                  className="mark author-li"
                  href={PROFILE}
                  target="_blank"
                  rel="me noopener"
                  aria-label={`${AUTHOR.name} on LinkedIn`}
                >
                  {AUTHOR.name} on LinkedIn <span className="ar">→</span>
                </a>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec ink-amber" id="work" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-tri" t="Where the experience comes from" />
          <Reveal as="h2" className="statement">
            Roles, not a résumé.
          </Reveal>
          <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
            The businesses behind the guides.
          </Reveal>
          <div className="stack" style={{ marginTop: "clamp(34px,5vh,58px)", gap: 0 }}>
            {AUTHOR.credentials.map((c, i) => (
              <Reveal
                as="div"
                className="cred-row"
                d={i}
                key={c.what + c.where}
                style={{ borderTop: i ? "1px solid var(--rule)" : "0", padding: "24px 0" }}
              >
                <div className="cred-when">{c.when}</div>
                <div>
                  <h3 className="cred-what">{c.what}</h3>
                  <div className="cred-where">{c.where}</div>
                  <p className="cred-note">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ink-lav" id="writing" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-sq" t="Everything he's written here" />
          <Reveal as="h2" className="statement">
            {POSTS.length} pieces. <span className="soft">In the order they were written.</span>
          </Reveal>
          <Reveal as="ol" className="auth-list" d={1} style={{ marginTop: "clamp(30px,4vh,50px)" }}>
            {POSTS.map((p) => {
              const cat = categoryStyle(p.category);
              return (
                <li key={p.slug}>
                  <a href={withBase(`/thinking/${p.slug}/`)}>
                    <span className="auth-cat">
                      <i className={`mk ${cat.shape}`} />
                      {cat.label}
                    </span>
                    <strong>{p.title}</strong>
                    <em>{p.excerpt}</em>
                  </a>
                </li>
              );
            })}
          </Reveal>
          <Reveal as="p" className="pg-sign">
            <a href={withBase("/thinking/")}>All our thinking, filed by format →</a>
          </Reveal>
        </div>
      </section>

      <PageNext
        href="/thinking/"
        label="Our thinking"
        title="Everything we've published"
        note={`All ${ALL_POSTS.length} pieces, filed by format.`}
        shape="mk-sq"
        ink="ink-lav"
      />
    </main>
  );
}
