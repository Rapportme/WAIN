import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Stat {
  /** The figure itself. */
  n: string;
  /** What it counts. */
  t: string;
}

const STATS: Stat[] = [
  { n: "23+", t: "years of combined entrepreneurial experience" },
  { n: "5", t: "businesses founded or co-founded — active across Kerala and the Middle East" },
  { n: "6+", t: "countries served, from the UK to Australia" },
  { n: "1", t: "brand doctor with an actual dental degree" },
];

/** 04 · Experience — careers before the collective, counted. */
export function Experience() {
  return (
    <section className="chapter s-exp" id="experience">
      <div className="wrap">
        <Eyebrow shape="mk-sq" n="04" t="Experience" />
        <Reveal as="h2" className="statement">
          The agency is new. <span className="soft">The experience isn&apos;t.</span>
        </Reveal>

        <Reveal as="p" className="lede" style={{ marginTop: "26px" }}>
          Before this became a collective, it was individual careers — years of building brands and
          teams across Kerala and the Middle East. Some of that time went into founding companies
          from nothing, more than a decade ago now, and still running. Some went into scaling one
          from the inside. Somewhere in the mix, there&apos;s even a dentist moonlighting as a brand
          strategist — we&apos;re not sure root canals sharpen positioning instincts, but we&apos;re
          not arguing with the results.
        </Reveal>
        <Reveal as="p" className="lede" style={{ marginTop: "22px" }}>
          The work itself has traveled further than we have. Clients across the UK, Australia,
          Sweden, Denmark and Africa, handled without ever opening an agency in any of them.
        </Reveal>
        <Reveal as="p" className="lede" style={{ marginTop: "22px" }}>
          None of it happened inside an agency.
        </Reveal>

        <Reveal as="blockquote" className="exp-quote">
          The work here wasn&apos;t all done under the We Are In name. Experience doesn&apos;t belong
          to a company registration. It belongs to the people who built it.
        </Reveal>

        <div className="exp-stats">
          {STATS.map((s, i) => (
            <Reveal as="div" className="exp-stat" key={s.n + s.t} d={i}>
              <span className="mk mk-sq" />
              <b>{s.n}</b>
              <p>{s.t}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="lede lede-aside exp-aside">
          None of it happened here. All of it happens to be useful now.
        </Reveal>

        <Reveal as="div" className="exp-cta">
          <a href={withBase("/experience/#work")} className="btn">
            Explore the work{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
