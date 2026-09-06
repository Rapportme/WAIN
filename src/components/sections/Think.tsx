import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Link {
  /** The problem as it arrives. */
  from: string;
  /** Where following it usually leads. */
  to: string;
}

const CHAIN: Link[] = [
  { from: "A marketing problem", to: "Sales" },
  { from: "A branding problem", to: "Positioning" },
  { from: "A growth problem", to: "Systems" },
];

/** How we exist · How we think. Each brief beside the place it actually leads. */
export function Think() {
  return (
    <section className="sec ink-lav" id="think" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="wrap">
        <Eyebrow shape="mk-bar" t="How we think" />
        <div className="two">
          <Reveal as="h2" className="statement">
            The answer is rarely where the question starts.
          </Reveal>
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              We don&apos;t take the brief at face value. We look at what the business is trying to
              achieve, what has already been tried, what&apos;s happening around it, and{" "}
              <strong>what might be getting in the way.</strong>
            </p>
            <p className="lede">
              We ask questions. We look for patterns. We challenge assumptions. We connect things
              that don&apos;t always sit in the same conversation.
            </p>
          </Reveal>
        </div>

        <div className="chain">
          {CHAIN.map((c, i) => (
            <Reveal as="div" className="cell" key={c.from} d={i}>
              <span className="from">{c.from}</span>
              <span className="arrow">↓</span>
              <span className="to">{c.to}</span>
            </Reveal>
          ))}
          <Reveal as="div" className="cell note" d={3}>
            <i className="mk mk-tri" style={{ background: "var(--signal-lift)" }} />
            Sometimes the best recommendation is to do less.
          </Reveal>
        </div>

        <Reveal as="p" className="lede">
          We don&apos;t believe in having the answer ready before we&apos;ve understood the
          question.
        </Reveal>

        <Reveal as="p" className="pg-sign">
          Look closer. The real problem usually leaves clues.
        </Reveal>
      </div>
    </section>
  );
}
