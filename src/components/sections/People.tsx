import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Person {
  name: string;
  /** The sentence up to the question. */
  lead: string;
  /** The question this person keeps asking. */
  q: string;
  /** What they do about it. */
  then: string;
  shape: string;
}

const PEOPLE: Person[] = [
  {
    name: "Divine",
    lead: "The person who sees the opportunity, asks,",
    q: "What can this become?",
    then: "Then figures out how to make it happen.",
    shape: "mk-cir",
  },
  {
    name: "Ananthu",
    lead: "The person who keeps asking,",
    q: "But why are we doing it this way?",
    then: "Then sees what others don't, and brings a different perspective to the room.",
    shape: "mk-tri",
  },
  {
    name: "Savio",
    lead: "The person who keeps asking,",
    q: "What else is there to know?",
    then: "Then goes deep until he masters it, and finds a way to make it work.",
    shape: "mk-sq",
  },
];

/** In progress — the two chapters of this section still being written. */
const SOON = [
  {
    title: "Failure resumes",
    note: "Everything we got wrong, and what it taught us. Being written — it's a longer list than the wins.",
    shape: "mk-bar",
  },
  {
    title: "Founder Q&A",
    note: "The questions we're asked most, answered plainly. Coming to this page.",
    shape: "mk-wedge",
  },
];

/**
 * Why we exist · 02 — The people behind the thinking. Three cards, three
 * inks, and the question each person keeps asking set in the voice: the
 * questions are the point, so they get the serif and the room.
 */
export function People() {
  return (
    <section className="chapter pg-sec s-people" id="people">
      <div className="wrap">
        <Eyebrow shape="mk-a" t="The people behind the thinking" />
        <div className="people-intro">
          <Reveal as="h2" className="statement">
            Different people. Different paths. One room.
          </Reveal>
          <Reveal as="div" d={1}>
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
            <Reveal as="div" className="person" key={p.name} d={i + 1}>
              <span className={`mk ${p.shape}`} aria-hidden="true" />
              <h3>{p.name}</h3>
              <p className="person-lead">{p.lead}</p>
              <p className="person-q">&ldquo;{p.q}&rdquo;</p>
              <p className="person-then">{p.then}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="people-together" d={1}>
          <p className="lede">
            Together, we bring strategy, creativity, business experience and a healthy amount of
            questioning into the same conversation.
          </p>
          <p className="pg-sign">You don&apos;t get a department. You get the room.</p>
        </Reveal>

        <div className="pg-soon">
          {SOON.map((s, i) => (
            <Reveal as="div" className="pg-soon-item" key={s.title} d={i + 1}>
              <article>
                <span className="label">In progress</span>
                <h4>
                  <span className={`mk ${s.shape}`} aria-hidden="true" /> {s.title}
                </h4>
                <p>{s.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
