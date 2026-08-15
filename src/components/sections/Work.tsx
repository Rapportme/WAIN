import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * How we exist · 03 — How we work. The chapter that ends the page, so it gets
 * the dark plate the book reserves for the things it says out loud. The four
 * "sometimes" lines are the argument: what happens next isn't decided in
 * advance, so they're set as a list of equals rather than a process.
 */
export function Work() {
  return (
    <section className="chapter dark pg-sec s-work" id="work">
      <span className="wplate w1" aria-hidden="true" />
      <span className="wplate w2" aria-hidden="true" />
      <span className="wplate w3" aria-hidden="true" />
      <div className="wrap">
        <Eyebrow shape="mk-wedge" t="How we work" />
        <Reveal as="h2" className="statement" d={1}>
          We believe good work starts before the work begins.
        </Reveal>
        <Reveal as="p" className="lede work-lede" d={2}>
          We don&apos;t jump straight into execution. We take the time to understand the business,
          the people, the context and <strong>what success actually means.</strong> Then we decide
          what needs to happen.
        </Reveal>

        <Reveal as="div" className="plist" d={2}>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes that&apos;s a strategy.
          </div>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes it&apos;s a campaign.
          </div>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes it&apos;s a system that needs fixing.
          </div>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes it&apos;s simply knowing what not to do.
          </div>
        </Reveal>

        <Reveal as="div" className="work-after" d={3}>
          <p className="lede">
            Once we&apos;re in, we stay close to the work. The people who think about the problem
            are involved in solving it. We measure what matters, learn from what happens, and
            improve as the business evolves.
          </p>
          <p className="lede">
            Because being a partner isn&apos;t about having a process that looks good on paper.
            It&apos;s about <strong>taking responsibility for what happens after the paper is
            gone.</strong>
          </p>
        </Reveal>

        <Reveal as="p" className="pg-sign" d={3}>
          Think properly. Do the work. Own the outcome.
        </Reveal>

        <Reveal as="div" className="work-cta" d={3}>
          <a href="mailto:hello@wearein.in" className="btn">
            Let&apos;s talk over coffee{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a href={withBase("/#method")} className="mark">
            See the six movements in full
          </a>
        </Reveal>
      </div>
    </section>
  );
}
