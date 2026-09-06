import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

interface Belief {
  /** The anaphora, set once per row as a label. */
  pre: string;
  body: ReactNode;
}

const SHAPES = ["mk-cir", "mk-tri", "mk-sq", "mk-wedge", "mk-bar", "mk-a"];

/* Six statements that all open the same way. "We believe" is lifted out of the
   sentence and set as the label, so what's left is the belief itself. */
const CREED: Belief[] = [
  {
    pre: "We believe",
    body: (
      <>
        growth becomes easier to build when a business understands{" "}
        <strong>what is true about itself</strong> — what it does well, where it is getting in its
        own way, what its customers actually need, and what deserves attention next.
      </>
    ),
  },
  {
    pre: "We believe",
    body: (
      <>
        good work needs both <strong>freedom and accountability.</strong> Give people the space to
        think, then give them the responsibility to make it work.
      </>
    ),
  },
  {
    pre: "We believe",
    body: (
      <>
        technology should make people <strong>more capable</strong>, not make them less human.
      </>
    ),
  },
  {
    pre: "We believe",
    body: (
      <>
        relationships matter even when projects end. A client shouldn&apos;t become a stranger
        simply because <strong>the work is over.</strong>
      </>
    ),
  },
  {
    pre: "We believe",
    body: (
      <>
        saying &ldquo;not yet,&rdquo; &ldquo;not this,&rdquo; or even{" "}
        <strong>&ldquo;you don&apos;t need us&rdquo;</strong> can sometimes be more valuable than
        saying yes.
      </>
    ),
  },
  {
    pre: "And we believe",
    body: (
      <>
        the best partnerships are built when <strong>both sides</strong> are willing to think,
        question and take ownership.
      </>
    ),
  },
];

/** How we exist · What we believe. The creed, one row per belief. */
export function Believe() {
  return (
    <section className="sec ink-sage" id="believe">
      <div className="wrap">
        <Eyebrow shape="mk-tri" t="What we believe" />
        <div className="two">
          <Reveal as="h2" className="statement">
            We believe good businesses deserve better questions.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Marketing is important. But it isn&apos;t <strong>the answer to everything.</strong>
          </Reveal>
        </div>

        <div className="creed">
          {CREED.map((c, i) => (
            <Reveal as="div" className="row" key={i} d={i}>
              <div className="num">
                <i className={`mk ${SHAPES[i] ?? "mk-cir"}`} />
                {String(i + 1).padStart(2, "0")}
              </div>
              <p>
                <span className="pre">{c.pre}</span>
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="pg-sign">
          Better businesses aren&apos;t built by having all the answers. They&apos;re built by
          asking better questions.
        </Reveal>
      </div>
    </section>
  );
}
