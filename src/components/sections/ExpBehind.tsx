import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PROOF } from "@/data/experience";

/**
 * Experience · 02 — Behind We Are In. The figures first, because they're the
 * part that can be checked, then what the figures taught us. The stat band is
 * chapter 04's, reused: same grid, same hairlines, this section's ink.
 */
export function ExpBehind() {
  return (
    <section className="chapter pg-sec s-exp-behind" id="behind">
      <div className="wrap">
        <Eyebrow shape="mk-sq" t="Experience behind We Are In" />
        <Reveal as="h2" className="statement">
          We&apos;ve seen this enough times{" "}
          <span className="soft">to know what it usually means.</span>
        </Reveal>

        <Reveal as="p" className="exp-tag-label" d={1}>
          A few numbers worth mentioning
        </Reveal>
        <div className="exp-stats">
          {PROOF.map((s, i) => (
            <Reveal as="div" className="exp-stat" key={s.n + s.t} d={i}>
              <span className="mk mk-sq" />
              <b>{s.n}</b>
              <p>{s.t}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="exp-copy" d={1}>
          <p>
            Marketing, sales and customer experience aren&apos;t separate departments to us.
            They&apos;re one customer, seen from different rooms — and most businesses lose money in
            the gap between those rooms, not inside any one of them.
          </p>
          <p>
            We&apos;ve watched digital tools get credited for wins that were actually about
            positioning. We&apos;ve watched AI get blamed for problems that were actually about
            ownership. Tools don&apos;t replace understanding a customer. They just make
            whatever&apos;s already true move faster.
          </p>
          <p>
            Recent proof points: 42,000 organic followers before one launch even opened its doors.
            30-plus five-star reviews in a single day for one client. Patients traveling
            internationally for a wellness brand most people have never heard of.
          </p>
        </Reveal>

        <Reveal as="p" className="pg-sign" d={2}>
          None of this is theory. We&apos;ve had to live with the results.
        </Reveal>
      </div>
    </section>
  );
}
