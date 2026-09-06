import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { BELIEFS } from "@/data/home";

/** 03 · Why partner with us. Four beliefs, each with a reference label. */
export function Why() {
  return (
    <section className="chapter ink-sage" id="why" data-chap="why">
      <div className="wrap">
        <Eyebrow shape="mk-tri" n="03" t="Why partner with us" />
        <Reveal as="h2" className="statement">
          We didn&apos;t build a marketing agency. We built a way of thinking.
        </Reveal>
        <div className="beliefs">
          {BELIEFS.map(([head, mk, ref, body], i) => (
            <Reveal as="div" className="belief" d={i} key={ref}>
              <h3>{head}</h3>
              <div>
                <div className="ref">
                  <i className={`mk ${mk}`} />
                  <span className="label">{ref}</span>
                </div>
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
