import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Emphasis } from "@/components/ui/Emphasis";
import { FOUNDERS } from "@/data/experience";

/**
 * Experience · 03 — The Work. Filed under the person who led it rather than
 * under a client list, because none of it happened under the We Are In name and
 * that's the point the section is making. Each person keeps the ink they have
 * in the People section on /why-we-exist.
 */
export function ExpWork() {
  return (
    <section className="chapter pg-sec s-exp-work" id="work">
      <div className="wrap">
        <Eyebrow shape="mk-wedge" t="The work" />
        <Reveal as="h2" className="statement">
          Before We Are In, <span className="soft">this is what we were building.</span>
        </Reveal>
        <Reveal as="p" className="lede" d={1} style={{ marginTop: "24px" }}>
          Organized by who did it, and where it happened — none of it under the We Are In name, all
          of it part of why We Are In exists.
        </Reveal>

        {FOUNDERS.map((f) => (
          <div className="exp-founder" key={f.name} style={{ "--fi": f.ink } as React.CSSProperties}>
            <Reveal as="div" className="exp-founder-head">
              <h3>{f.name}</h3>
              <span className="line" aria-hidden="true" />
              <span className="n">
                {String(f.projects.length).padStart(2, "0")}
                <em>projects</em>
              </span>
            </Reveal>

            <ul className="exp-projects">
              {f.projects.map((p) => (
                <li className="exp-proj" key={f.name + p.name}>
                  <div className="exp-proj-meta">
                    <strong className="pname">{p.name}</strong>
                    <span className="ptag">{p.tag}</span>
                    {p.ctx ? <span className="pctx">{p.ctx}</span> : null}
                  </div>
                  <p className="exp-proj-body">
                    <Emphasis text={p.body} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Reveal as="p" className="exp-work-close" d={1}>
          None of it happened under one name. All of it is why this one exists.
        </Reveal>
      </div>
    </section>
  );
}
