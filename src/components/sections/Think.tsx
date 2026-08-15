import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Link {
  /** The problem as it arrives. */
  from: string;
  /** Where following it usually leads. */
  to: string;
}

/* The brief is rarely where the answer is. Each of these is a problem as it
   was handed to us, and the place it actually turned out to live. */
const CHAIN: Link[] = [
  { from: "A marketing problem", to: "Sales" },
  { from: "A branding problem", to: "Positioning" },
  { from: "A growth problem", to: "Systems" },
];

/**
 * How we exist · 02 — How we think. The section's argument is that problems
 * move, so the page moves them: each brief is set beside the place following
 * it actually leads, and the row underneath holds the answer nobody asks for.
 */
export function Think() {
  return (
    <section className="chapter pg-sec s-howthink" id="think">
      <div className="wrap">
        <Eyebrow shape="mk-bar" t="How we think" />
        <div className="pg-cols">
          <Reveal as="h2" className="statement">
            The answer is rarely where the question starts.
          </Reveal>
          <Reveal as="div" d={1}>
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
            <Reveal as="div" className="chain-cell" key={c.from} d={i + 1}>
              <span className="chain-from">{c.from}</span>
              <span className="chain-arw" aria-hidden="true">
                &darr;
              </span>
              <span className="chain-to">{c.to}</span>
            </Reveal>
          ))}
          <Reveal as="div" className="chain-note" d={1}>
            <span className="mk mk-tri" aria-hidden="true" />
            Sometimes the best recommendation is to do less.
          </Reveal>
        </div>

        <Reveal as="p" className="lede think-after" d={1}>
          We don&apos;t believe in having the answer ready before we&apos;ve understood the
          question.
        </Reveal>

        <Reveal as="p" className="pg-sign" d={2}>
          Look closer. The real problem usually leaves clues.
        </Reveal>
      </div>
    </section>
  );
}
