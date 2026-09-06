import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Why we exist · Our story. Running text broken by its two turns. */
export function Story() {
  return (
    <section className="sec ink-teal" id="story">
      <div className="wrap">
        <Eyebrow shape="mk-cir" t="Our story" />
        <div className="two">
          <Reveal as="h2" className="statement">
            We didn&apos;t set out to build another agency. We set out to bring good people into one
            room.
          </Reveal>
          <Reveal as="div" className="stack" d={1}>
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

        <Reveal as="p" className="turn">
          <i className="mk mk-cir" />
          Over time, our paths kept crossing.
        </Reveal>

        <div className="two">
          <Reveal as="p" className="lede">
            Conversations became collaborations. Ideas became projects. Projects became a shared
            belief that bringing different experiences into the same room could create better work.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Not as a traditional agency with a fixed set of services, but as a collective built
            around people, experience and the freedom to think beyond a job description.
          </Reveal>
        </div>

        <Reveal as="p" className="turn">
          <i className="mk mk-tri" />
          WAIN grew from there.
        </Reveal>

        <Reveal as="p" className="lede">
          Today, we bring that experience together to help businesses understand where they are,
          what they actually need, and what could move them forward.
        </Reveal>

        <Reveal as="div" className="story-alt">
          <span>
            <i className="mk mk-cir" />
            Sometimes that&apos;s marketing.
          </span>
          <span>
            <i className="mk mk-tri" />
            Sometimes it&apos;s something else.
          </span>
        </Reveal>

        <Reveal as="p" className="pg-sign">
          Different experiences. One way of thinking.
        </Reveal>
      </div>
    </section>
  );
}
