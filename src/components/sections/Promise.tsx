import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 08 · Promise — the one chapter that gets shouted, so it gets a dark plate.
 * Style and words carried over from the collective's main page.
 */
export function Promise() {
  return (
    <section className="chapter dark s-promise" id="promise">
      <span className="pplate p1" aria-hidden="true" />
      <span className="pplate p2" aria-hidden="true" />
      <span className="pplate p3" aria-hidden="true" />
      <div className="wrap">
        <Eyebrow shape="mk-sq" n="08" t="Our promise" />
        <Reveal as="blockquote" d={1}>
          We&apos;d rather lose the project than recommend you the wrong solution
          <i aria-hidden="true" />
        </Reveal>
        <Reveal as="div" className="plist" d={2}>
          <div>
            <span className="mk" />
            If marketing isn&apos;t the answer, we&apos;ll say so.
          </div>
          <div>
            <span className="mk" />
            If a proposal won&apos;t move your business forward, we won&apos;t send it.
          </div>
          <div>
            <span className="mk" />
            If honesty costs us the work, that&apos;s a price we&apos;re willing to pay.
          </div>
        </Reveal>
        <Reveal as="p" className="psig" d={3}>
          Because trust is harder to earn than business.
        </Reveal>
      </div>
    </section>
  );
}
