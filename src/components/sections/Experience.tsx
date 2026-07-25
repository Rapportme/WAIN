import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface LedgerRow {
  industry: string;
  depth: string;
  pattern: string;
}

const ROWS: LedgerRow[] = [
  {
    industry: "Education",
    depth: "Deep",
    pattern:
      "Great outcomes, described as facilities. We repositioned around what students actually leave with.",
  },
  {
    industry: "Healthcare",
    depth: "Deep",
    pattern:
      "Trust decided before the first appointment, not during it. The brand had to carry the reassurance.",
  },
  {
    industry: "Startups",
    depth: "Lived",
    pattern:
      "Clarity mistaken for a later-stage luxury. It's the earliest and cheapest thing to get right.",
  },
  {
    industry: "SMEs",
    depth: "Ongoing",
    pattern:
      "A business running on memory and WhatsApp. Growth kept breaking the same undocumented seams.",
  },
  {
    industry: "Professional services",
    depth: "Broad",
    pattern:
      "Selling expertise while sounding like everyone else. The differentiator was there, just never said.",
  },
  {
    industry: "FMCG",
    depth: "Selective",
    pattern:
      "Distribution and story treated as separate problems. They're the same problem, wearing two coats.",
  },
];

/** 04 · Experience — a ledger. */
export function Experience() {
  return (
    <section className="chapter s-exp" id="experience">
      <div className="wrap">
        <Eyebrow shape="mk-sq" n="04" t="Experience" />
        <Reveal as="h2" className="statement">
          The agency is new. <span style={{ color: "var(--muted-2)" }}>The experience isn&apos;t.</span>
        </Reveal>
        <Reveal as="p" className="lede" style={{ marginTop: "26px" }}>
          Before this became a collective, it was individuals — building their own businesses across
          cities, industries and countries that had little in common. Here&apos;s where that time was
          spent, and the pattern we kept meeting.
        </Reveal>
        <Reveal as="div" className="ledger">
          <div className="ledger-hd">
            <span>Industry</span>
            <span>Depth</span>
            <span>The pattern underneath</span>
          </div>
          {ROWS.map((row) => (
            <div className="ledger-row" key={row.industry}>
              <span className="ind">{row.industry}</span>
              <span className="cnt">
                <span className="mk" />
                {row.depth}
              </span>
              <span className="pat">{row.pattern}</span>
            </div>
          ))}
        </Reveal>
        <Reveal as="p" className="ledger-foot">
          Businesses started. Brands repositioned. Campaigns launched. Products introduced. Teams
          mentored. Systems redesigned. Problems solved. Mistakes made — and carried forward. None of
          it began with a company registration.
        </Reveal>
      </div>
    </section>
  );
}
