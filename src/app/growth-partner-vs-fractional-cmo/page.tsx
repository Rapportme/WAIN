import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "Growth partner vs fractional CMO — We Are In Collective";
const DESCRIPTION =
  "A fractional CMO runs your marketing function part-time. A growth partner works on the business around it. Which one a company needs, and when it's neither.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/growth-partner-vs-fractional-cmo/" },
  openGraph: {
    type: "article",
    url: "/growth-partner-vs-fractional-cmo/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const INDEX: readonly PageIndexEntry[] = [
  {
    href: "#difference",
    title: "The difference in one line",
    note: "One runs a function. One works on the business the function sits inside.",
    shape: "mk-tri",
  },
  {
    href: "#table",
    title: "Side by side",
    note: "Where the two roles genuinely diverge.",
    shape: "mk-sq",
    ink: "ink-teal",
  },
  {
    href: "#cmo",
    title: "When the CMO is right",
    note: "Whenever there's a marketing team that needs running.",
    shape: "mk-cir",
    ink: "ink-coral",
  },
  {
    href: "#faq",
    title: "Questions people ask",
    note: "Cost, overlap, and whether you can have both.",
    shape: "mk-a",
    ink: "ink-amber",
  },
];

/* 56 words. */
const ANSWER =
  "A fractional CMO is a senior marketing leader working for you part-time: they own the marketing function, set its strategy and direct the people in it. A growth partner sits outside the org chart and works on the business around that function — positioning, offer, sales handoff, pricing, operations — and only then on the marketing. One leads a department. One questions the shape of the problem.";

const COLS = ["Growth partner", "Fractional CMO"];

const ROWS: { k: string; v: [string, string] }[] = [
  {
    k: "The job",
    v: [
      "Find the constraint on growth and do something about it, wherever it turns out to live.",
      "Lead the marketing function — strategy, team, budget, performance.",
    ],
  },
  {
    k: "Sits",
    v: [
      "Outside the org chart, deliberately. Easier to say the unpopular thing.",
      "Inside it. On the leadership team, often with a seat in board meetings.",
    ],
  },
  {
    k: "Needs you to have",
    v: [
      "A business. Nothing else — no marketing team, no budget, no plan.",
      "Something to lead. A team, or at least a budget and agencies to direct.",
    ],
  },
  {
    k: "Scope",
    v: [
      "Whatever the answer turns out to be, including the parts outside marketing.",
      "Marketing. Influence elsewhere, authority here.",
    ],
  },
  {
    k: "Bought as",
    v: [
      "A retainer or a project, priced on the problem.",
      "Days. Typically one to three a week, at a day rate.",
    ],
  },
  {
    k: "Time horizon",
    v: [
      "As long as the problem takes. Often short, and the good ending is not needing us.",
      "Usually 6–18 months, often bridging to a full-time hire.",
    ],
  },
  {
    k: "Risk if you pick wrong",
    v: [
      "You get a diagnosis and nobody inside to act on it day to day.",
      "You get excellent marketing leadership applied to a problem that wasn't marketing.",
    ],
  },
];

const CMO = [
  "You have a marketing team and nobody senior running it.",
  "You're spending enough that the budget itself needs governing.",
  "You need someone accountable inside the business, in the leadership meeting, every week.",
  "You're bridging to a full-time CMO hire and need the seat filled properly in the meantime.",
];

const PARTNER = [
  "There's no marketing function to run yet, and you're not sure there should be.",
  "The constraint might not be marketing at all, and you want that settled before you staff around it.",
  "You need a decision more than you need management.",
  "The business is small enough that a part-time department head is more structure than the problem deserves.",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What's the difference between a growth partner and a fractional CMO?",
    a: "A fractional CMO leads your marketing function part-time — team, strategy, budget, performance. A growth partner works on the business the function sits inside, and is free to conclude that the problem is pricing, positioning or sales follow-up rather than marketing. The CMO has authority inside one department. The partner has scope across several and authority in none, which is the trade.",
  },
  {
    q: "Which costs more?",
    a: "A fractional CMO is usually bought in days — one to three a week at a senior day rate — so the monthly number is predictable and tends to be the larger of the two in a mature business. A growth partner is priced against a problem rather than a calendar. In a small business the partner is often cheaper; where there's a real team and budget to govern, the CMO usually earns their number.",
  },
  {
    q: "Can a growth partner do the fractional CMO job?",
    a: "Not honestly, no. Running a function means being there for the weekly meeting, the hiring decision, the agency review and the budget argument. That's a management job and it needs someone inside. We work alongside a fractional CMO comfortably — the diagnosis gives them a sharper mandate — but we wouldn't claim to replace one.",
  },
  {
    q: "We're a small business. Do we need either?",
    a: "Probably not both, and possibly neither. Under a certain size the useful thing is a decision, not a hire: what you're for, who you're for, and what happens in the 48 hours after a lead arrives. That's a few weeks of work, not a permanent seat. Start with the diagnosis and see what it says.",
  },
  {
    q: "How do we tell which problem we have?",
    a: "One question usually separates them. If you know what your marketing should be saying and the problem is that nobody is running it, you need a CMO. If you're not certain what it should be saying — or you suspect the honest answer is something upstream of marketing — you need the other conversation first.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://wearein.in" },
        {
          "@type": "ListItem",
          position: 2,
          name: "What is a growth partner?",
          item: "https://wearein.in/growth-partner/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Growth partner vs fractional CMO",
          item: "https://wearein.in/growth-partner-vs-fractional-cmo/",
        },
      ],
    },
  ],
};

/** /growth-partner-vs-fractional-cmo — the closer of the two comparisons. */
export default function VsFractionalCmoPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHead
        ink="ink-lav"
        kicker="Growth partner vs fractional CMO"
        shape="mk-sq"
        title="Growth partner or fractional CMO?"
        intro="These two get confused more often than the agency comparison, because both are senior, both are part-time, and both cost about the same to be wrong about."
        index={INDEX}
      />

      <section className="sec ink-lav" id="difference" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal as="div" className="tl-dr" style={{ marginTop: 0 }}>
            <div className="k">The short version</div>
            <p>{ANSWER}</p>
          </Reveal>
          <div className="two" style={{ marginTop: "clamp(40px,6vh,70px)" }}>
            <Reveal as="h2" className="statement">
              One runs a function. <span className="soft">One questions the shape.</span>
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              <p className="lede">
                The fractional CMO is a genuinely good answer to a genuinely common problem: there
                is marketing happening and nobody senior is steering it.{" "}
                <strong>If that&apos;s your problem, hire one.</strong>
              </p>
              <p className="lede">
                The difficulty is that hiring a head of marketing is also a decision that the
                problem is marketing. Make that call before you&apos;ve checked, and you get very
                good leadership pointed at the wrong constraint — which is expensive and takes
                months to become obvious.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec ink-teal" id="table" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-sq" t="Side by side" />
          <Reveal as="h2" className="statement">
            Where the two <span className="soft">actually diverge.</span>
          </Reveal>
          <Reveal as="div" className="cmp-wrap" d={2} style={{ marginTop: "clamp(30px,4vh,50px)" }}>
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col" aria-label="What is compared" />
                  {COLS.map((c, i) => (
                    <th scope="col" key={c} className={i === 0 ? "hi" : undefined}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    {r.v.map((cell, i) => (
                      <td key={i} className={i === 0 ? "hi" : undefined}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal as="p" className="pg-sign">
            The row that decides it is the third one. A fractional CMO needs something to lead.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-coral" id="cmo" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="Which one you need" />
          <div className="two">
            <div>
              <Reveal as="h2" className="statement">
                Hire the CMO when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={1} style={{ marginTop: 30 }}>
                {CMO.map((t) => (
                  <li key={t}>
                    <i className="mk mk-cir" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <Reveal as="h2" className="statement" d={1}>
                Hire the partner when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={2} style={{ marginTop: 30 }}>
                {PARTNER.map((t) => (
                  <li key={t}>
                    <i className="mk mk-sq" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
          <Reveal as="p" className="pg-sign">
            And sometimes in sequence: settle what the business is for, then hire someone to run
            the marketing that follows from it.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-amber" id="faq" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-a" t="Questions people ask" />
          <Reveal as="h2" className="statement">
            Cost, overlap, and doing both.
          </Reveal>
          <Reveal as="div" className="faq" d={1}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
          <Reveal as="div" className="ctas" style={{ marginTop: 40 }}>
            <a className="btn" href={withBase("/diagnosis/")}>
              Find out which one you need <span className="ar">→</span>
            </a>
            <a className="mark" href={withBase("/growth-partner-vs-marketing-agency/")}>
              Or the agency comparison <span className="ar">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <PageNext
        ink="ink-sage"
        href="/growth-partner/"
        label="Start here instead"
        title="What is a growth partner?"
        note="The term, defined — and how it sits against a consultant as well."
        shape="mk-tri"
      />
    </main>
  );
}
