import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FOUNDERS } from "@/data/experience";

/** `**…**` in the copy becomes <strong>, which `.proj .bd strong` inks. */
function Bold({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i): ReactNode => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

/** Experience · The work. Filed under the person who led it. */
export function ExpWork() {
  return (
    <section className="sec tint ink-lav" id="work">
      <div className="wrap">
        <Eyebrow shape="mk-wedge" t="The work" />
        <Reveal as="h2" className="statement">
          Before We Are In, <span className="soft">this is what we were building.</span>
        </Reveal>
        <Reveal as="p" className="lede" style={{ marginTop: 22 }}>
          Organized by who did it, and where it happened — none of it under the We Are In name, all
          of it part of why We Are In exists.
        </Reveal>

        {FOUNDERS.map((f) => (
          <Reveal as="div" className={`fgroup f-${f.name.toLowerCase()}`} key={f.name}>
            <div className="fh">
              <h3>{f.name}</h3>
              <i />
              <span>{String(f.projects.length).padStart(2, "0")} PROJECTS</span>
            </div>
            {f.projects.map((p) => (
              <div className="proj" key={f.name + p.name}>
                <div>
                  <div className="nm">{p.name}</div>
                  <div className="tg">{p.tag}</div>
                  {p.ctx ? <div className="cx">{p.ctx}</div> : null}
                </div>
                <p className="bd">
                  <Bold text={p.body} />
                </p>
              </div>
            ))}
          </Reveal>
        ))}

        <Reveal as="p" className="pg-sign">
          None of it happened under one name. All of it is why this one exists.
        </Reveal>
      </div>
    </section>
  );
}
