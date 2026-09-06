import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES_ALSO, INDUSTRIES_CORE } from "@/data/experience";

/** Experience · Across industries. The marquee, then two labelled tag sets. */
export function ExpIndustries() {
  const all = [...INDUSTRIES_CORE, ...INDUSTRIES_ALSO];
  return (
    <section className="sec ink-teal" id="industries">
      <div className="wrap">
        <Eyebrow shape="mk-cir" t="Experience across industries" />
        <Reveal as="h2" className="statement">
          Not industries we serve.{" "}
          <span className="soft">Industries we&apos;ve actually been inside.</span>
        </Reveal>

        <Reveal as="div" className="marquee">
          <div aria-hidden="true">
            {all.map((t) => (
              <span key={`a-${t}`}>{t}</span>
            ))}
            {all.map((t) => (
              <span key={`b-${t}`}>{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="label">
          Where the depth is
        </Reveal>
        <Reveal as="div" className="tags">
          {INDUSTRIES_CORE.map((t) => (
            <span className="tag core" key={t}>
              {t}
            </span>
          ))}
        </Reveal>

        <Reveal as="div" className="label">
          Also in the room
        </Reveal>
        <Reveal as="div" className="tags">
          {INDUSTRIES_ALSO.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </Reveal>

        <Reveal as="p" className="aside">
          Some of this is a client relationship. Some of it is a business one of us built, ran, or
          fixed from the inside. We&apos;ve marked which is which, when it matters.
        </Reveal>
      </div>
    </section>
  );
}
