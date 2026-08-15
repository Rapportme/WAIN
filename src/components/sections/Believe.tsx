import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

interface Belief {
  /** The anaphora, set once per row as a label. */
  pre: string;
  body: ReactNode;
}

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

/**
 * How we exist · 01 — What we believe. The creed is an anaphora, so it's set
 * as one: the repeated opening becomes a label in the left column and the
 * belief itself gets the measure, each row in its own ink.
 */
export function Believe() {
  return (
    <section className="chapter pg-sec s-believe" id="believe">
      <div className="wrap">
        <Eyebrow shape="mk-tri" t="What we believe" />
        <div className="pg-cols">
          <Reveal as="h2" className="statement">
            We believe good businesses deserve better questions.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Marketing is important. But it isn&apos;t <strong>the answer to everything.</strong>
          </Reveal>
        </div>

        <div className="creed">
          {CREED.map((c, i) => (
            <Reveal as="div" className="creed-row" key={i} d={i + 1}>
              <span className="creed-n">
                <span className="mk" aria-hidden="true" />
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>
                <span className="creed-pre">{c.pre}</span>
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="pg-sign" d={1}>
          Better businesses aren&apos;t built by having all the answers. They&apos;re built by
          asking better questions.
        </Reveal>
      </div>
    </section>
  );
}
