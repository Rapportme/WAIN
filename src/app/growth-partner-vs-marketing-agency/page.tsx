import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "Growth partner vs marketing agency — We Are In Collective";
const DESCRIPTION =
  "An agency is hired to make marketing. A growth partner is hired to find out whether marketing is the problem. How they differ, and when the agency wins.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/growth-partner-vs-marketing-agency/" },
  openGraph: {
    type: "article",
    url: "/growth-partner-vs-marketing-agency/",
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
    note: "One is hired to make marketing. The other, to check whether marketing is the problem.",
    shape: "mk-tri",
  },
  {
    href: "#table",
    title: "Side by side",
    note: "Eight things that actually differ, not the ones that sound different.",
    shape: "mk-sq",
    ink: "ink-teal",
  },
  {
    href: "#agency",
    title: "When the agency is right",
    note: "Often. We'd tell you so rather than take the work.",
    shape: "mk-cir",
    ink: "ink-coral",
  },
  {
    href: "#faq",
    title: "Questions people ask",
    note: "Including the one about whether this is just rebranding.",
    shape: "mk-a",
    ink: "ink-amber",
  },
];

/* 54 words, written to be quoted whole. */
const ANSWER =
  "A marketing agency is hired to produce marketing: campaigns, content, media, design. A growth partner is hired to work out what the business actually needs first — which is sometimes marketing and sometimes pricing, positioning, sales follow-up or nothing at all — and then to do that work with you. The agency starts at the brief. The partner starts before it.";

const COLS = ["Growth partner", "Marketing agency"];

const ROWS: { k: string; v: [string, string] }[] = [
  {
    k: "What you're buying",
    v: [
      "A judgement about what the business should do next, and the work that follows from it.",
      "Marketing output — campaigns, content, media, creative, hours.",
    ],
  },
  {
    k: "Where it starts",
    v: [
      "The business. Revenue, customers, constraints, what's already been tried.",
      "The brief, and the channels that will deliver against it.",
    ],
  },
  {
    k: "Who's in the room",
    v: [
      "The people who'll do the work. Usually two or three, all senior.",
      "A pitch team first, then an account team. Often not the same people.",
    ],
  },
  {
    k: "Scope",
    v: [
      "Whatever the constraint turns out to be — including the parts that aren't marketing.",
      "What the contract says. Anything outside it is a new conversation.",
    ],
  },
  {
    k: "Commercial model",
    v: [
      "A retainer or a defined project, priced on the thinking and the outcome.",
      "Retainer, project fee or a percentage of media. Priced on output.",
    ],
  },
  {
    k: "What happens when the answer is “don't spend”",
    v: [
      "You hear it. It costs us the project and saves you the budget.",
      "Rarely surfaces. A recommendation to spend less is a recommendation to bill less.",
    ],
  },
  {
    k: "Measured by",
    v: [
      "Whether the business moved — revenue, margin, close rate, the thing that was stuck.",
      "Reach, leads, engagement, delivery against the plan.",
    ],
  },
  {
    k: "Ends when",
    v: [
      "The problem is fixed, or you can run it yourselves. Both are good outcomes.",
      "The contract ends or isn't renewed.",
    ],
  },
];

const AGENCY = [
  "You already know what the problem is and what needs making. A good agency will make it better and faster than a generalist.",
  "The work is genuinely channel-deep — performance media at scale, a large content operation, a production-heavy brand campaign.",
  "You have someone in-house who owns strategy and needs execution capacity, not another opinion on direction.",
  "The volume is steady and predictable. Agencies are built for throughput; partners are not.",
];

const PARTNER = [
  "Growth has stalled and the honest answer to “why” is that nobody knows.",
  "Marketing is running and the numbers don't add up to the spend.",
  "You're about to commit serious budget and want someone to check the premise before you do.",
  "Leads arrive and quietly disappear somewhere between marketing and sales.",
  "You've been through two agencies already and the pattern is starting to look like it might not be them.",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is a growth partner just a marketing agency with a different name?",
    a: "It's a fair suspicion, and in some cases it's true — the term gets borrowed. The test is what happens in the first conversation. An agency asks what you want made. A growth partner asks what's actually wrong, and is willing to conclude that the answer isn't marketing. If the first meeting goes straight to deliverables and a monthly fee, you're talking to an agency whatever the website says.",
  },
  {
    q: "Which one is cheaper?",
    a: "An agency usually looks cheaper per month, because you're buying a defined quantity of output. A growth partner can be cheaper overall if the conclusion is that three of the five things you were about to pay for shouldn't happen. Neither is reliably cheaper than the other — they're priced against different things.",
  },
  {
    q: "Can we use both?",
    a: "Often that's the right shape. The partner works out what should be true and stays accountable for whether the business moves; the agency executes the channel work at a depth and volume a small senior team can't match. The failure mode is having both and giving neither the authority to say no.",
  },
  {
    q: "We already have an agency. What would change?",
    a: "Usually the brief they're working to, and sometimes the question of whether they should be working at all. We'd rather make your existing agency more effective by giving them a sharper brief than replace a relationship that's working. If the relationship isn't working, it's worth knowing whether that's them or the instruction they were given.",
  },
  {
    q: "What if we don't need either?",
    a: "That's a real outcome and you'll hear it from us. Plenty of businesses need a better offer, a faster follow-up, or a decision someone has been avoiding — none of which requires hiring anyone. The growth diagnosis will usually surface that in about five minutes.",
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
          name: "Growth partner vs marketing agency",
          item: "https://wearein.in/growth-partner-vs-marketing-agency/",
        },
      ],
    },
  ],
};

/** /growth-partner-vs-marketing-agency — the comparison, answered honestly. */
export default function VsAgencyPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHead
        ink="ink-teal"
        kicker="Growth partner vs agency"
        shape="mk-tri"
        title="Growth partner or marketing agency?"
        intro="We are one of these, so read this knowing that. We've still tried to write the version we'd want to read if we were choosing."
        index={INDEX}
      />

      <section className="sec ink-teal" id="difference" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal as="div" className="tl-dr" style={{ marginTop: 0 }}>
            <div className="k">The short version</div>
            <p>{ANSWER}</p>
          </Reveal>
          <div className="two" style={{ marginTop: "clamp(40px,6vh,70px)" }}>
            <Reveal as="h2" className="statement">
              One makes the marketing. <span className="soft">One checks the premise.</span>
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              <p className="lede">
                Most businesses that come to us have already decided the answer is marketing. Some
                are right. When they are, the fastest route is a good agency and a clear brief —{" "}
                <strong>and we'll say so.</strong>
              </p>
              <p className="lede">
                The rest have a business problem that shows up in the marketing. More campaigns
                against a weak position, an unclear offer or a broken follow-up will produce
                activity and not much else. That's the case a growth partner exists for.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec ink-sage" id="table" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-sq" t="Side by side" />
          <Reveal as="h2" className="statement">
            Eight differences <span className="soft">that actually matter.</span>
          </Reveal>
          <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
            Neither column is the good one. They describe two different jobs, and most of the pain
            we see comes from hiring one to do the other&apos;s.
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
        </div>
      </section>

      <section className="sec ink-coral" id="agency" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="When the agency is right" />
          <div className="two">
            <div>
              <Reveal as="h2" className="statement">
                Hire the agency when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={1} style={{ marginTop: 30 }}>
                {AGENCY.map((t) => (
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
                    <i className="mk mk-tri" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
          <Reveal as="p" className="pg-sign">
            If you&apos;re in the left-hand column, we&apos;d rather point you at a good agency than
            take the retainer. That isn&apos;t generosity — it&apos;s that the work would fail and
            the failure would be ours.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-amber" id="faq" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-a" t="Questions people ask" />
          <Reveal as="h2" className="statement">
            Including the awkward one.
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
            <a className="mark" href={withBase("/growth-partner/")}>
              Or read what a growth partner is <span className="ar">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <PageNext
        ink="ink-lav"
        href="/growth-partner-vs-fractional-cmo/"
        label="The other comparison"
        title="Growth partner vs fractional CMO"
        note="Closer than the agency comparison, and the difference is easier to get wrong."
        shape="mk-sq"
      />
    </main>
  );
}
