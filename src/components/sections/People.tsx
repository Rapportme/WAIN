import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export interface Person {
  name: string;
  /** One line of credentials, set under the name. */
  cred: string;
  /** The sentence up to the question. */
  lead: string;
  /** The question this person keeps asking. */
  q: string;
  /** What they do about it. */
  then: string;
  ink: string;
  shape: string;
  /** Inline style for the big shape in the card's corner. */
  bigshape: React.CSSProperties;
}

export const PEOPLE: readonly Person[] = [
  {
    name: "Divine Abraham Chirayil",
    cred: "Founder, Rapport Group (Doha) and Refillr (Kottayam)",
    lead: "The person who sees the opportunity, asks,",
    q: "What can this become?",
    then: "Then figures out how to make it happen.",
    ink: "ink-teal",
    shape: "mk-cir",
    bigshape: { borderRadius: "50%" },
  },
  {
    name: "Ananthu Vasudev",
    cred: "Brand & market strategist; writes the Thinking pieces",
    lead: "The person who keeps asking,",
    q: "But why are we doing it this way?",
    then: "Then sees what others don't, and brings a different perspective to the room.",
    ink: "ink-coral",
    shape: "mk-tri",
    bigshape: { clipPath: "polygon(50% 0,100% 100%,0 100%)" },
  },
  {
    name: "Savio",
    cred: "Brand & narrative strategist",
    lead: "The person who keeps asking,",
    q: "What else is there to know?",
    then: "Then goes deep until he masters it, and finds a way to make it work.",
    ink: "ink-lav",
    shape: "mk-sq",
    bigshape: {},
  },
];

/** Why we exist · The people behind the thinking. Three cards, three inks. */
export function People() {
  return (
    <section className="sec ink-amber" id="people" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="wrap">
        <Eyebrow shape="mk-a" t="The people behind the thinking" />
        <div className="two">
          <Reveal as="h2" className="statement">
            Different people. Different paths. One room.
          </Reveal>
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              WAIN is built around <strong>people, not designations.</strong>
            </p>
            <p className="lede">
              We come from different backgrounds, have built different things, and bring different
              ways of looking at a problem. What connects us isn&apos;t a job title. It&apos;s the
              willingness to think, contribute, challenge and take ownership.
            </p>
          </Reveal>
        </div>

        <div className="people-grid">
          {PEOPLE.map((p, i) => (
            <Reveal as="div" className={`person ${p.ink}`} key={p.name} d={i}>
              <i className="bigshape" style={p.bigshape} />
              <i className={`mk ${p.shape}`} />
              <h3>{p.name}</h3>
              <p className="cred">{p.cred}</p>
              <p>{p.lead}</p>
              <p className="q">&ldquo;{p.q}&rdquo;</p>
              <p>{p.then}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="stack">
          <p className="lede">
            Together, we bring strategy, creativity, business experience and a healthy amount of
            questioning into the same conversation.
          </p>
        </Reveal>
        <Reveal as="p" className="pg-sign">
          Work with WAIN, and you don&apos;t get one way of thinking. You get three: a go-getter, a
          deep-diver, and a quick-study. Most days, that&apos;s actually the whole meeting.
        </Reveal>
      </div>
    </section>
  );
}
