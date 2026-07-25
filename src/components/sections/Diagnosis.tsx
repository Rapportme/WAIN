import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const SPEC: { k: string; v: string; free?: boolean }[] = [
  { k: "Format", v: "Written document" },
  { k: "Time", v: "About a week" },
  { k: "Cost", v: "Free", free: true },
  { k: "Yours to keep", v: "Either way" },
];

const BLIND_SPOTS = [
  "Offer explained four different ways",
  "No owner for the first 48 hours of a lead",
  "Best channel is under-funded",
  "Pricing hasn't moved in three years",
];

const NEXT_STEPS = [
  "Rewrite the one-line offer",
  "Assign lead follow-up, today",
  "Shift spend to the working channel",
  "Re-test price on new deals",
];

/**
 * 09 · Growth diagnosis — the artifact. The score bar animates on scroll:
 * <Reveal> stamps `.in` on the sheet, which the `.in .scorebar` rules pick up.
 */
export function Diagnosis() {
  return (
    <section className="chapter s-diag" id="diagnosis">
      <div className="wrap">
        <Eyebrow shape="mk-tri" n="09" t="Growth diagnosis" />
        <Reveal as="div" className="diag-top">
          <h2>Sometimes the best move is to pause and look closer.</h2>
          <ul className="spec">
            {SPEC.map((s) => (
              <li key={s.k}>
                <span className="k">{s.k}</span>
                <span className={`v${s.free ? " free" : ""}`}>{s.v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" className="sheet" d={1}>
          <div className="sheet-hd">
            <span className="label">Sample — Growth Diagnosis</span>
            <span className="label">Confidential draft</span>
          </div>
          <div className="sheet-body">
            <div className="sheet-cell">
              <span className="no">A — Growth score</span>
              <div className="score">
                <b>62</b>
                <span>/ 100</span>
              </div>
              <div className="scorebar" aria-hidden="true">
                <i />
                <u />
              </div>
              <p>
                A single read on how ready the business is to grow right now — across clarity,
                demand, conversion and systems.
              </p>
            </div>
            <div className="sheet-cell">
              <span className="no">B — Blind spots</span>
              <ul className="blind">
                {BLIND_SPOTS.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="sheet-cell">
              <span className="no">C — Next steps</span>
              <ol className="dsteps">
                {NEXT_STEPS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="diag-cta">
          <a href="#close" className="btn">
            Diagnose my business{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <p className="fine">
            Whether you work with us afterwards or not is entirely your choice. If it helps your
            business, that&apos;s enough for us.
          </p>
        </Reveal>

        <Reveal as="p" className="lede" style={{ marginTop: "clamp(40px,6vh,60px)" }}>
          Inside: Business Review · Marketing Review · Sales Review · Brand Review · AI Readiness ·
          Priority Recommendations.
        </Reveal>
      </div>
    </section>
  );
}
