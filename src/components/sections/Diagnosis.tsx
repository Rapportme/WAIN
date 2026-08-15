import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const SPEC: { k: string; v: string; free?: boolean }[] = [
  { k: "Format", v: "15 quick questions" },
  { k: "Time", v: "Under 5 minutes" },
  { k: "Cost", v: "Free", free: true },
  { k: "Full report", v: "Sent to your inbox" },
];

/** 09 · Growth diagnosis — the offer: twelve questions, an honest first read. */
export function Diagnosis() {
  return (
    <section className="chapter s-diag" id="diagnosis">
      <div className="wrap">
        <Eyebrow shape="mk-tri" n="09" t="Growth diagnosis" />
        <Reveal as="div" className="diag-top">
          <h2>
            Sometimes, the best thing you can do for your business is pause and take a closer look.
          </h2>
          <ul className="spec">
            {SPEC.map((s) => (
              <li key={s.k}>
                <span className="k">{s.k}</span>
                <span className={`v${s.free ? " free" : ""}`}>{s.v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" className="diag-body" d={1}>
          <p className="lede">
            Answer fifteen quick questions about your business — how it&apos;s growing, where it feels
            stuck, what you&apos;ve already tried. We&apos;ll generate an honest first read right
            there on the screen. Want the complete picture — the blind spots, the priorities, the
            specific next steps? Leave your email, and we&apos;ll send the full diagnosis to your
            inbox.
          </p>
          <p className="lede">
            This costs nothing, and there&apos;s no catch. Answer it, read what comes back, and walk
            away if that&apos;s all you needed; no follow-up, no pressure, no hard feelings.
          </p>
          <p className="lede">
            Sometimes the value isn&apos;t even in our answer. It&apos;s in the questions themselves.
            A few honest minutes of reflection can bring more clarity than a quarter of guessing.
          </p>
        </Reveal>

        <Reveal as="div" className="diag-cta" d={2}>
          <Link href="/diagnosis" className="btn">
            Diagnose My Business{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <p className="fine">
            Whether you work with us afterwards or not is entirely your choice. If it helps your
            business, that&apos;s enough for us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
