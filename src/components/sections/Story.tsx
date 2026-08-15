import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Why we exist · 01 — Our story. Running text broken by its two turns: the
 * sentences the story actually pivots on are lifted out of the measure and
 * set in the display cut, so the page reads the way the story is told.
 */
export function Story() {
  return (
    <section className="chapter pg-sec s-story" id="story">
      <div className="wrap">
        <Eyebrow shape="mk-cir" t="Our story" />
        <div className="story-open">
          <Reveal as="h2" className="statement">
            We didn&apos;t set out to build another agency. We set out to bring good people into one
            room.
          </Reveal>
          <Reveal as="div" d={1}>
            <p className="lede">
              Before WAIN became a collective, we were building different things, in different
              places, and in very different ways.
            </p>
            <p className="lede">
              Some of us had started businesses. Some had built inside them. Some had worked across
              markets and industries. Some had spent years creating brands, campaigns and ideas. And
              all of us had learned something from being responsible for{" "}
              <strong>the outcome, not just the work.</strong>
            </p>
          </Reveal>
        </div>

        <Reveal as="p" className="story-turn" d={1}>
          <span className="mk mk-cir" aria-hidden="true" />
          Over time, our paths kept crossing.
        </Reveal>

        <Reveal as="div" className="pg-cols" d={1}>
          <p className="lede">
            Conversations became collaborations. Ideas became projects. Projects became a shared
            belief that bringing different experiences into the same room could create better work.
          </p>
          <p className="lede">
            Not as a traditional agency with a fixed set of services, but as a collective built
            around people, experience and the freedom to think beyond a job description.
          </p>
        </Reveal>

        <Reveal as="p" className="story-turn story-turn--b" d={1}>
          <span className="mk mk-tri" aria-hidden="true" />
          WAIN grew from there.
        </Reveal>

        <Reveal as="p" className="lede" d={1}>
          Today, we bring that experience together to help businesses understand where they are,
          what they actually need, and what could move them forward.
        </Reveal>

        <Reveal as="div" className="story-alt" d={2}>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes that&apos;s marketing.
          </div>
          <div>
            <span className="mk" aria-hidden="true" />
            Sometimes it&apos;s something else.
          </div>
        </Reveal>

        <Reveal as="p" className="pg-sign" d={2}>
          Different experiences. One way of thinking.
        </Reveal>
      </div>
    </section>
  );
}
