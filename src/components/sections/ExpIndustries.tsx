import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES_ALSO, INDUSTRIES_CORE } from "@/data/experience";

/**
 * Experience · 01 — Across industries. Two sets of tags: the ones with real
 * depth behind them, and the ones we've been in the room for. The distinction
 * is the whole section, so it's set as two labelled groups rather than one
 * undifferentiated cloud.
 */
export function ExpIndustries() {
  return (
    <section className="chapter pg-sec s-exp-ind" id="industries">
      <div className="wrap">
        <Eyebrow shape="mk-cir" t="Experience across industries" />
        <Reveal as="h2" className="statement">
          Not industries we serve. <span className="soft">Industries we&apos;ve actually been inside.</span>
        </Reveal>

        <Reveal as="div" d={1}>
          <p className="exp-tag-label">Where the depth is</p>
          <ul className="exp-tags">
            {INDUSTRIES_CORE.map((t) => (
              <li className="exp-tag is-core" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" d={2}>
          <p className="exp-tag-label">Also in the room</p>
          <ul className="exp-tags">
            {INDUSTRIES_ALSO.map((t) => (
              <li className="exp-tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="p" className="lede lede-aside exp-tag-note" d={2}>
          Some of this is a client relationship. Some of it is a business one of us built, ran, or
          fixed from the inside. We&apos;ve marked which is which, when it matters.
        </Reveal>
      </div>
    </section>
  );
}
