import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { withBase } from "@/lib/withBase";
import { STATS } from "@/data/home";

/** 04 · Experience. The agency is new; the experience isn't. Count-ups are driven globally by Effects. */
export function Experience() {
  return (
    <section className="chapter ink-amber" id="experience" data-chap="experience">
      <div className="wrap">
        <Eyebrow shape="mk-sq" n="04" t="Experience" />
        <Reveal as="h2" className="statement">
          The agency is new. <span className="soft">The experience isn&apos;t.</span>
        </Reveal>
        <div className="two exp-ledes">
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              Before this became a collective, it was individual careers — years of building brands
              and teams across Kerala and the Middle East. Some of that time went into founding
              companies from nothing, more than a decade ago now, and still running. Some went into
              scaling one from the inside. Somewhere in the mix, there&apos;s even a dentist
              moonlighting as a brand strategist — we&apos;re not sure root canals sharpen positioning
              instincts, but we&apos;re not arguing with the results.
            </p>
          </Reveal>
          <Reveal as="div" className="stack" d={2}>
            <p className="lede">
              The work itself has traveled further than we have. Clients across the UK, Australia,
              Sweden, Denmark and Africa, handled without ever opening an agency in any of them.
            </p>
            <p className="lede">
              <strong>None of it happened inside an agency.</strong>
            </p>
          </Reveal>
        </div>
        <Reveal as="blockquote" className="exp-quote">
          The work here wasn&apos;t all done under the We Are In name. Experience doesn&apos;t belong to
          a company registration. It belongs to the people who built it.
        </Reveal>
        <div className="stats">
          {STATS.map(([to, suffix, cap], i) => (
            <Reveal as="div" className="stat" d={i} key={cap}>
              <i className="mk mk-sq" />
              <div className="fig">
                <span className="count" data-to={to}>
                  0
                </span>
                {suffix}
              </div>
              <div className="cap">{cap}</div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="aside">
          None of it happened here. All of it happens to be useful now.
        </Reveal>
        <Reveal as="div" style={{ marginTop: 30 }}>
          <a className="btn" href={withBase("/experience/#work")}>
            Explore the work <span className="ar">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
