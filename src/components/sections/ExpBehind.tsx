import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PROOF } from "@/data/experience";

/** "40%" → { to: "40", suffix: "%" } so the figure can count up. */
function splitFigure(n: string): { to: string; suffix: string } {
  const m = /^(\d+)(.*)$/.exec(n);
  return m ? { to: m[1] ?? "0", suffix: m[2] ?? "" } : { to: n, suffix: "" };
}

/** Experience · Behind We Are In. The figures first, then what they taught us. */
export function ExpBehind() {
  return (
    <section className="sec ink-amber" id="behind" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="wrap">
        <Eyebrow shape="mk-sq" t="Experience behind We Are In" />
        <Reveal as="h2" className="statement">
          We&apos;ve seen this enough times{" "}
          <span className="soft">to know what it usually means.</span>
        </Reveal>

        <Reveal as="div" className="label" style={{ marginTop: 40 }}>
          A few numbers worth mentioning
        </Reveal>
        <div className="stats">
          {PROOF.map((s, i) => {
            const f = splitFigure(s.n);
            return (
              <Reveal as="div" className="stat" key={s.n + s.t} d={i}>
                <i className="mk mk-sq" />
                <div className="fig">
                  <span className="count" data-to={f.to}>
                    0
                  </span>
                  {f.suffix}
                </div>
                <div className="cap">{s.t}</div>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="div" className="proof">
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

        <Reveal as="p" className="pg-sign">
          None of this is theory. We&apos;ve had to live with the results.
        </Reveal>
      </div>
    </section>
  );
}
