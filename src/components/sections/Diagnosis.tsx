import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { withBase } from "@/lib/withBase";

/** 09 · Growth diagnosis. The offer, its spec, and the way in. */
export function Diagnosis() {
  return (
    <section className="chapter ink-sage" id="diagnosis" data-chap="diagnosis">
      <div className="wrap">
        <Eyebrow shape="mk-tri" n="09" t="Growth diagnosis" />
        <div className="diag-top">
          <Reveal as="h2">
            Sometimes, the best thing you can do for your business is pause and take a closer look.
          </Reveal>
          <Reveal as="div" className="spec" d={1}>
            <div>
              <span>Format</span>
              <span>15 quick questions</span>
            </div>
            <div>
              <span>Time</span>
              <span>Under 5 minutes</span>
            </div>
            <div>
              <span>Cost</span>
              <span className="free">Free</span>
            </div>
            <div>
              <span>Full report</span>
              <span>Sent to your inbox</span>
            </div>
          </Reveal>
        </div>
        <div className="two">
          <Reveal as="div" className="stack">
            <p className="lede">
              Answer fifteen quick questions about your business — how it&apos;s growing, where it
              feels stuck, what you&apos;ve already tried. We&apos;ll generate an honest first read
              right there on the screen. Want the complete picture — the blind spots, the priorities,
              the specific next steps? Leave your email, and we&apos;ll send the full diagnosis to your
              inbox.
            </p>
          </Reveal>
          <Reveal as="div" className="stack" d={1}>
            <p className="lede">
              This costs nothing, and there&apos;s no catch. Answer it, read what comes back, and walk
              away if that&apos;s all you needed; no follow-up, no pressure, no hard feelings.
            </p>
            <p className="lede">
              Sometimes the value isn&apos;t even in our answer. It&apos;s in the questions themselves.
              A few honest minutes of reflection can bring more clarity than a quarter of guessing.
            </p>
          </Reveal>
        </div>
        <Reveal as="div" style={{ marginTop: 40, display: "grid", gap: 16, justifyItems: "start" }}>
          <a className="btn magnet" href={withBase("/diagnosis/")}>
            Diagnose My Business <span className="ar">→</span>
          </a>
          <p className="fine">
            Whether you work with us afterwards or not is entirely your choice. If it helps your
            business, that&apos;s enough for us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
