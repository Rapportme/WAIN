import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { OG_IMAGES } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "What is a growth partner? — We Are In Collective";
const DESCRIPTION =
  "A growth partner works on the business, not just its marketing. How it differs from an agency, a consultant and a fractional CMO — and when you need one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/growth-partner/" },
  openGraph: {
    type: "article",
    url: "/growth-partner/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
};

const INDEX: readonly PageIndexEntry[] = [
  {
    href: "#differs",
    title: "How it differs",
    note: "Growth partner, agency, consultant, fractional CMO — side by side.",
    shape: "mk-tri",
  },
  {
    href: "#when",
    title: "When you need one",
    note: "And, just as usefully, when you don't.",
    shape: "mk-cir",
    ink: "ink-teal",
  },
  {
    href: "#faq",
    title: "Questions people ask",
    note: "The five we hear most, answered the way we'd answer them in a room.",
    shape: "mk-a",
    ink: "ink-amber",
  },
];

/* The definition — 52 words, written to be quoted. */
const DEFINITION =
  "A growth partner is a small, senior team that works on the business rather than just on its marketing. It starts with what's actually true — customers, sales, positioning, systems — decides what deserves attention, does the work alongside you, and stays accountable for what happens afterwards. Sometimes that's marketing. Sometimes it's something else.";

const COLS = ["Growth partner", "Marketing agency", "Consultant", "Fractional CMO"];

const ROWS: { k: string; v: [string, string, string, string] }[] = [
  {
    k: "Starts with",
    v: [
      "The business — what's actually true about it, before any brief.",
      "The brief, and the channels that will fill it.",
      "A question, or a scope someone has already written.",
      "The marketing function, and the team running it.",
    ],
  },
  {
    k: "Paid for",
    v: [
      "The thinking and the ownership — a retainer or a defined project.",
      "Deliverables: campaigns, content, media, hours.",
      "Advice: a report, a plan, a workshop.",
      "Time: a fixed number of days a month.",
    ],
  },
  {
    k: "Who does the work",
    v: [
      "The people who thought about the problem.",
      "An account team, with the work handed down a floor.",
      "Usually you, once the recommendation lands.",
      "Your team, with them directing it.",
    ],
  },
  {
    k: "When they say no",
    v: [
      "Before the work starts, if the honest answer is “not yet.”",
      "Rarely — a no is lost revenue.",
      "Sometimes, if it sits inside the scope.",
      "When the plan doesn't fit the team.",
    ],
  },
  {
    k: "Measured by",
    v: [
      "Whether the business actually moved.",
      "Reach, leads, engagement, output.",
      "Whether the plan was delivered.",
      "Whether marketing is running well.",
    ],
  },
];

const NEED = [
  "Growth has stalled and nobody can say exactly why.",
  "Marketing is running, but the results don't add up to the spend.",
  "You're about to spend serious money and want someone to check the premise first.",
  "You're scaling, and the systems that got you here are starting to creak.",
  "Leads arrive and then quietly disappear somewhere between marketing and sales.",
];

const DONT = [
  "You already know exactly what you need and just want it executed — hire a specialist.",
  "You want a supplier, not someone who'll question the brief.",
  "The business isn't ready to change how it works, only how it looks.",
  "The problem is one channel, and a good freelancer can fix it in a month.",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is a growth partner just a marketing agency with a different name?",
    a: "No. An agency is set up to deliver marketing; a growth partner is set up to find out whether marketing is the problem. Often it is. Just as often it's sales, pricing, positioning, or the 48 hours after a lead arrives. The work follows the answer, not the brief.",
  },
  {
    q: "What does a growth partner actually do, day to day?",
    a: "It starts with a diagnosis: where the business is, what's been tried, what's in the way. Then it decides what deserves attention — a strategy, a campaign, a system that needs fixing, or simply knowing what not to do — and does that work alongside your team, measuring what matters and adjusting as the business changes.",
  },
  {
    q: "How is a growth partner paid?",
    a: "Usually a monthly retainer, sometimes a defined project. What you're paying for is the thinking and the ownership, not a number of posts or ad hours. If the honest recommendation is to spend nothing yet, that's what you'll hear — and it costs you a conversation, not a contract.",
  },
  {
    q: "When does a business need a growth partner?",
    a: "When growth has stalled and nobody can say why. When marketing is running but the numbers don't add up. When you're about to spend serious money and want the premise checked first. When you're scaling and the systems that got you here are starting to creak.",
  },
  {
    q: "When is a growth partner the wrong choice?",
    a: "When you already know exactly what you need and just want it executed — hire a specialist. When you want a supplier rather than someone who'll question the brief. When the business isn't ready to change how it works. We'd rather say that in the first conversation than six months in.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** /growth-partner — the term, defined the way we'd define it in a room. */
export default function GrowthPartnerPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHead
        ink="ink-sage"
        kicker="Growth partner"
        shape="mk-tri"
        title="What is a growth partner?"
        intro="A term that gets used loosely, so here is what we mean by it — and how it differs from the other people you could hire."
        index={INDEX}
      />

      <section className="sec ink-sage" id="definition" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal as="div" className="tl-dr" style={{ marginTop: 0 }}>
            <div className="k">The short version</div>
            <p>{DEFINITION}</p>
          </Reveal>
          <div className="two" style={{ marginTop: "clamp(40px,6vh,70px)" }}>
            <Reveal as="h2" className="statement">
              Not a service. A way of being in the room.
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              <p className="lede">
                Most businesses don&apos;t have a marketing problem. They have a business problem
                that shows up in the marketing. A growth partner is the person you bring in to find
                out which one you actually have — <strong>before anyone spends anything.</strong>
              </p>
              <p className="lede">
                That means starting with the business, not the brief. It means being paid for the
                thinking and the outcome, not the output. And it means staying close enough to the
                work to be responsible for what happens after the plan is written.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec ink-sage" id="differs" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-tri" t="How it differs" />
          <Reveal as="h2" className="statement">
            Four people you could hire. <span className="soft">Four different jobs.</span>
          </Reveal>
          <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
            None of these is wrong. They&apos;re just built for different problems, and the mistake
            is hiring one to do another&apos;s job.
          </Reveal>
          <Reveal as="div" className="cmp-wrap" d={2}>
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
            Hire the agency when you know what to make. Hire the partner when you don&apos;t yet.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-teal" id="when" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="When you need one" />
          <div className="two">
            <div>
              <Reveal as="h2" className="statement">
                You probably need one when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={1} style={{ marginTop: 30 }}>
                {NEED.map((t) => (
                  <li key={t}>
                    <i className="mk mk-cir" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <Reveal as="h2" className="statement" d={1}>
                And you probably don&apos;t when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={2} style={{ marginTop: 30 }}>
                {DONT.map((t) => (
                  <li key={t}>
                    <i className="mk mk-tri" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
          <Reveal as="p" className="pg-sign">
            We&apos;d rather lose the project than recommend the wrong thing.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-amber" id="faq" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-a" t="Questions people ask" />
          <Reveal as="h2" className="statement">
            The five we hear most.
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
              Get a free growth diagnosis <span className="ar">→</span>
            </a>
            <a className="mark" href={withBase("/contact/")}>
              Or just tell us what&apos;s going on
            </a>
          </Reveal>
        </div>
      </section>

      <PageNext
        ink="ink-teal"
        href="/before-you-hire-an-agency/"
        label="Read next"
        title="Before you hire an agency"
        note="Twelve questions to ask any agency — or us. Some are uncomfortable."
        shape="mk-cir"
      />
    </main>
  );
}
