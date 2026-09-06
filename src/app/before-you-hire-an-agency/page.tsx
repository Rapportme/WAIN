import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { OG_IMAGES } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "Before you hire a marketing agency, ask these 12 questions — We Are In Collective";
const DESCRIPTION =
  "Twelve questions to ask any marketing agency before you sign — and why each one matters. If they can't answer most of them clearly, more marketing won't fix what's wrong.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/before-you-hire-an-agency/" },
  openGraph: {
    type: "article",
    url: "/before-you-hire-an-agency/",
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
    href: "#questions",
    title: "The twelve questions",
    note: "In the order we'd ask them. Some are uncomfortable.",
    shape: "mk-cir",
  },
  {
    href: "#after",
    title: "What to do with the answers",
    note: "How to read what you hear — including from us.",
    shape: "mk-tri",
    ink: "ink-sage",
  },
];

/* The questions, verbatim from Modal12, each with the reason it's on the list. */
const QUESTIONS: { q: string; why: string }[] = [
  {
    q: "Can you say what my business does in one sentence a stranger would understand?",
    why: "If they can't, everything that follows is built on a guess. Clarity comes before creative, and an agency that skips it will sell you the creative anyway.",
  },
  {
    q: "Do you know who my best customers are, and why they actually buy?",
    why: "Reach is cheap; the right reach isn't. An agency that hasn't asked who pays you, stays and refers will optimise for whoever is easiest to find.",
  },
  {
    q: "Is my problem really marketing, or is it clarity, sales, pricing or systems?",
    why: "Most growth problems arrive dressed as marketing problems. If the only tool on offer is more marketing, that's the diagnosis you'll get.",
  },
  {
    q: "What happens to a lead in the 48 hours after it arrives?",
    why: "This is where most of the money leaks. A campaign that doubles leads into a process that ignores half of them has doubled the waste, not the revenue.",
  },
  {
    q: "What makes my business genuinely different from the alternatives my customers are considering?",
    why: "If the answer is “quality” and “service”, you don't have one yet, and no amount of content will invent it. The difference has to be found before it can be said.",
  },
  {
    q: "How will we know the marketing is actually moving the business forward?",
    why: "Impressions, followers and engagement are activity, not outcomes. Agree on the business number that should move, and by when, before the first post goes out.",
  },
  {
    q: "What would you recommend if the honest answer is “spend nothing yet”?",
    why: "Sometimes the right move is to fix the offer, the pricing or the follow-up first. Listen for whether they've ever told a client that — and whether they still got the work afterwards.",
  },
  {
    q: "Who will actually do the work, and will I get to speak to them?",
    why: "The people in the pitch are rarely the people in the work. Ask, because the thinking gets thinner every time it's handed down a floor.",
  },
  {
    q: "Are we building a campaign that spikes, or a system that compounds?",
    why: "A spike looks great in the monthly report and leaves nothing behind. A system — a positioning, a pipeline, a referral loop — keeps working when the budget stops.",
  },
  {
    q: "Where could AI save my team real hours, and where is it just hype?",
    why: "The honest answer is specific: this task, this many hours, this risk. Anyone selling AI as a strategy rather than a tool hasn't looked closely at your work.",
  },
  {
    q: "What are you choosing not to do, and why?",
    why: "A plan that includes everything hasn't been thought through. The things left out tell you more about the thinking than the things kept in.",
  },
  {
    q: "Six months in, how will we both know this was worth it?",
    why: "If neither side can answer this now, you'll argue about it later. Decide what “worth it” means in numbers and in plain words, and write it down.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map((x) => ({
    "@type": "Question",
    name: x.q,
    acceptedAnswer: { "@type": "Answer", text: x.why },
  })),
};

/** /before-you-hire-an-agency — Modal12's twelve questions, as a page with a URL. */
export default function BeforeYouHireAnAgencyPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHead
        ink="ink-teal"
        kicker="Read this first"
        shape="mk-cir"
        title="Before you hire a marketing agency, ask these 12 questions."
        intro="If an agency can't answer most of these clearly, more marketing won't fix what's actually wrong. Ask them. Ask us."
        index={INDEX}
      />

      <section className="sec ink-teal" id="questions">
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="The twelve questions" />
          <div className="two">
            <Reveal as="h2" className="statement">
              The questions are simple. <span className="soft">The answers usually aren&apos;t.</span>
            </Reveal>
            <Reveal as="p" className="lede" d={1}>
              None of these need a marketing degree to ask. They just need someone willing to sit
              through the silence that follows a few of them. Under each one is why it&apos;s on the
              list.
            </Reveal>
          </div>
          <Reveal as="ol" className="qlist long" d={1} style={{ marginTop: "clamp(36px,6vh,64px)" }}>
            {QUESTIONS.map((x) => (
              <li key={x.q}>
                <div>
                  {x.q}
                  <p className="why">{x.why}</p>
                </div>
              </li>
            ))}
          </Reveal>
          <Reveal as="p" className="pg-sign">
            If most of these get a clear answer, hire them. If most of them get a pause, keep asking.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-sage" id="after" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-tri" t="What to do with the answers" />
          <div className="two">
            <Reveal as="h2" className="statement">
              Ask them. Then ask us.
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              <p className="lede">
                We put this list together because we&apos;d want to be asked these questions
                ourselves. We won&apos;t answer all twelve perfectly either — but you&apos;ll hear
                us say <strong>&ldquo;we don&apos;t know yet&rdquo;</strong> rather than fill the
                silence with a deck.
              </p>
              <p className="lede">
                If you&apos;d like a first read of where your business stands before any of these
                conversations, the growth diagnosis takes fifteen questions and under five minutes.
                It&apos;s free, and it doesn&apos;t put you on a list.
              </p>
            </Reveal>
          </div>
          <Reveal as="div" className="ctas" style={{ marginTop: 40 }}>
            <a className="btn" href={withBase("/contact/")}>
              Talk it through over coffee <span className="ar">→</span>
            </a>
            <a className="mark" href={withBase("/diagnosis/")}>
              Get a free growth diagnosis
            </a>
          </Reveal>
        </div>
      </section>

      <PageNext
        ink="ink-sage"
        href="/growth-partner/"
        label="Read next"
        title="What is a growth partner?"
        note="The term, defined — and how it differs from an agency, a consultant and a fractional CMO."
        shape="mk-tri"
      />
    </main>
  );
}
