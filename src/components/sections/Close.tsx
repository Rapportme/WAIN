import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { withBase } from "@/lib/withBase";

/** 10 · Let's talk. The close, with the coffee wager. */
export function Close() {
  return (
    <section className="chapter ink-teal s-close" id="close" data-chap="close">
      <div className="close-spec" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="10" t="Let's talk" hideRule />
        <Reveal as="h2" className="close-h">
          We&apos;re in.
          <br />
          Are <b>you</b>?
        </Reveal>
        <Reveal as="p" className="close-sub" d={1}>
          Let&apos;s talk about your business before we talk about proposals, scope or fees.
        </Reveal>
        <Reveal as="p" className="close-sub" d={2}>
          No commitment, just coffee.
        </Reveal>
        <Reveal as="p" className="close-wager" d={3}>
          If we&apos;re in, you pay for the coffee.
          <br />
          If we&apos;re not, we will. 😉
        </Reveal>
        <Reveal as="div" className="ctas" d={4}>
          <a className="btn magnet" href={withBase("/contact/")}>
            Let&apos;s talk over coffee <span className="ar">→</span>
          </a>
          <a className="btn btn--ghost magnet" href={withBase("/diagnosis/")}>
            Get a free growth diagnosis
          </a>
        </Reveal>
      </div>
    </section>
  );
}
