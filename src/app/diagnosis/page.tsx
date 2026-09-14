import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GrowthDiagnosis } from "@/components/diagnosis/GrowthDiagnosis";
import { TOTAL } from "@/lib/diagnosis/questions";

const TITLE = "Growth Diagnosis — We Are In Collective";
const DESCRIPTION =
  "Fifteen questions about your business and an honest first read of where it stands: maturity, operational health, and what's most likely holding growth back.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/diagnosis/" },
  openGraph: {
    type: "website",
    url: "/diagnosis/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/* What the fifteen questions actually cover. The quiz itself is rendered on
   interaction, so none of its substance reaches a crawler or an AI system —
   this section is the page's readable content, and it is written to be read by
   someone deciding whether to spend five minutes, not to pad a word count. */
const COVERS = [
  {
    k: "Where the business is",
    t: "Stage, industry, size and revenue band — so the read is calibrated against businesses at the same point, not against an ideal.",
    shape: "mk-cir",
  },
  {
    k: "Strategy and customer",
    t: "Whether there's a strategy or a habit, and how precisely the ideal customer is actually defined.",
    shape: "mk-tri",
  },
  {
    k: "How customers arrive",
    t: "Where demand comes from today, what marketing is running, and what happens to a lead between arriving and closing.",
    shape: "mk-sq",
  },
  {
    k: "Operations and records",
    t: "How the day-to-day runs, how current the numbers are, and what would happen if you disappeared for two weeks.",
    shape: "mk-bar",
  },
  {
    k: "What you think is wrong",
    t: "Your own read on the constraint — in your words. It is often the most useful answer of the fifteen.",
    shape: "mk-a",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the growth diagnosis?",
    a: `A ${TOTAL}-question assessment of where a business stands right now — its maturity, how healthy its operations are, and which areas are most likely holding growth back. It takes about five minutes and costs nothing. You get the read back on screen, and a fuller written version by email if you want it.`,
  },
  {
    q: "Is it free, and what do you do with my answers?",
    a: "It's free, and there's no call attached to it. Your answers produce your report. We read what comes through because it tells us what businesses in Kerala are actually struggling with, and we'll only get in touch if you ask us to.",
  },
  {
    q: "Is this a strategy or a plan?",
    a: "No, and it would be dishonest to call it one. It's a first read — the same read we'd form in an opening conversation, arrived at from your answers rather than ours. A strategy takes longer and costs money. This tells you whether you need one yet.",
  },
  {
    q: "How long does it take?",
    a: `About five minutes. ${TOTAL} questions, most of them multiple choice, one of them a sentence in your own words. You can stop partway and pick it up later — your progress is kept in your browser.`,
  },
  {
    q: "Who is it for?",
    a: "Owners and founders of small and mid-sized businesses — starting, growing, stuck, scaling or reinventing. It's least useful if you already know exactly what's wrong and just need someone to build it.",
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
        { "@type": "ListItem", position: 2, name: "Growth Diagnosis", item: "https://wearein.in/diagnosis/" },
      ],
    },
  ],
};

export default function DiagnosisPage() {
  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <GrowthDiagnosis />

      <section className="sec ink-teal" id="about" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="What it covers" />
          <Reveal as="h2" className="statement">
            {TOTAL} questions. <span className="soft">Five areas.</span>
          </Reveal>
          <Reveal as="p" className="lede" d={1} style={{ marginTop: 22 }}>
            The questions move from what the business is, to how it sells, to how it runs — and
            finish by asking what you think is wrong. Nothing here needs preparation or a document
            in front of you.
          </Reveal>
          <Reveal as="ul" className="plist" d={2} style={{ marginTop: "clamp(30px,4vh,50px)" }}>
            {COVERS.map((c) => (
              <li key={c.k}>
                <i className={`mk ${c.shape}`} />
                <span>
                  <strong>{c.k}.</strong> {c.t}
                </span>
              </li>
            ))}
          </Reveal>
          <Reveal as="p" className="pg-sign">
            It reads where you are. It doesn&apos;t tell you what to do next — that conversation is
            free too, and it starts <a href={withBase("/contact/")}>here</a>.
          </Reveal>
        </div>
      </section>

      <section className="sec ink-amber" id="faq" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-a" t="Questions people ask" />
          <Reveal as="h2" className="statement">
            Before you start.
          </Reveal>
          <Reveal as="div" className="faq" d={1}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
