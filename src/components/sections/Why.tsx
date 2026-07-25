import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface Belief {
  claim: string;
  refShape: string;
  refLabel: string;
  note: string;
}

const BELIEFS: Belief[] = [
  {
    claim: "We tell you the truth. Even when it's not what you want to hear — especially then.",
    refShape: "mk-cir",
    refLabel: "Partnership",
    note: "If you don't need what we sell, you'll hear it from us, not from your bank statement six months later. Honesty is the whole product; everything else is delivery.",
  },
  {
    claim: "We think beyond marketing. If the real problem is sales, systems or clarity, that's where we begin.",
    refShape: "mk-tri",
    refLabel: "Growth",
    note: "Marketing sits next to pricing, operations, product and sales. Growth comes from the whole business, not the one corner everyone can see. We look at all of it.",
  },
  {
    claim: "We become part of your team. Not a vendor you manage — a partner you think out loud with.",
    refShape: "mk-sq",
    refLabel: "Action",
    note: "You get the people who did the thinking, in the room. No account manager relaying messages between you and someone you've never actually met.",
  },
  {
    claim: "We build for long-term growth. Not campaigns that spike and fade — growth that compounds.",
    refShape: "mk-cir",
    refLabel: "Impact",
    note: "A campaign is a spike; a system is a slope. We'll help you win this quarter, but we're building the thing that still works in three years.",
  },
];

/** 03 · Why — a manifesto with marginalia. */
export function Why() {
  return (
    <section className="chapter s-why" id="why">
      <div className="wrap">
        <Eyebrow shape="mk-tri" n="03" t="Why partner with us" />
        <Reveal as="h2" className="statement">
          We didn&apos;t build a marketing agency. We built a way of thinking.
        </Reveal>
        <div style={{ marginTop: "clamp(48px,7vh,80px)" }}>
          {BELIEFS.map((b) => (
            <Reveal as="div" className="belief" key={b.refLabel}>
              <h3>{b.claim}</h3>
              <div className="belief-note">
                <span className="ref">
                  <span className={`mk ${b.refShape}`} />
                  {b.refLabel}
                </span>
                <p>{b.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
