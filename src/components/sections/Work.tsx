"use client";

import { withBase } from "@/lib/withBase";
import { useSectionHref } from "@/hooks/useSectionHref";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** How we exist · How we work. The dark plate that closes the page. */
export function Work() {
  const h = useSectionHref();
  return (
    <section
      className="sec dark ink-lift"
      id="work"
      data-dark=""
      style={{ paddingBlock: "clamp(92px,13vh,160px)", overflow: "hidden" }}
    >
      <i className="wplate w1" />
      <i className="wplate w2" />
      <i className="wplate w3" />
      <div className="wrap" style={{ position: "relative" }}>
        <Eyebrow shape="mk-wedge" t="How we work" />
        <div className="two">
          <Reveal as="h2" className="statement">
            We believe good work starts before the work begins.
          </Reveal>
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              We don&apos;t jump straight into execution. We take the time to understand the
              business, the people, the context and <strong>what success actually means.</strong>{" "}
              Then we decide what needs to happen.
            </p>
            <ul className="plist">
              <li>
                <i className="mk mk-cir" />
                Sometimes that&apos;s a strategy.
              </li>
              <li>
                <i className="mk mk-tri" />
                Sometimes it&apos;s a campaign.
              </li>
              <li>
                <i className="mk mk-sq" />
                Sometimes it&apos;s a system that needs fixing.
              </li>
              <li>
                <i className="mk mk-wedge" />
                Sometimes it&apos;s simply knowing what not to do.
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="two" style={{ marginTop: "clamp(40px,6vh,70px)" }}>
          <Reveal as="p" className="lede">
            Once we&apos;re in, we stay close to the work. The people who think about the problem
            are involved in solving it. We measure what matters, learn from what happens, and
            improve as the business evolves.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Because being a partner isn&apos;t about having a process that looks good on paper.
            It&apos;s about{" "}
            <strong>taking responsibility for what happens after the paper is gone.</strong>
          </Reveal>
        </div>

        <Reveal as="p" className="pg-sign">
          Think properly. Do the work. Own the outcome.
        </Reveal>

        <Reveal as="div" className="ctas" style={{ marginTop: 34 }}>
          <a className="btn" href={withBase("/contact/")}>
            Let&apos;s talk over coffee <span className="ar">→</span>
          </a>
          <a className="mark" href={h("#method")}>
            See the six movements in full
          </a>
        </Reveal>
      </div>
    </section>
  );
}
