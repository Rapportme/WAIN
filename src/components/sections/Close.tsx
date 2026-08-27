import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** 10 · Close — the invitation. */
export function Close() {
  return (
    <section className="chapter s-close" id="close">
      <div className="close-spec" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <Eyebrow shape="mk-cir" n="10" t="Let's talk" hideRule />
        <Reveal as="h2" className="close-h" d={1}>
          We&apos;re in.
          <br />
          Are <b>you</b>?
        </Reveal>
        <Reveal as="p" className="close-sub" d={2}>
          Let&apos;s talk about your business before we talk about proposals, scope or fees.
        </Reveal>
        <Reveal as="p" className="close-sub close-sub-2" d={2}>
          No commitment, just coffee.
        </Reveal>
        <Reveal as="p" className="close-wager" d={3}>
          If we&apos;re in, you pay for the coffee.
          <br />
          If we&apos;re not, we will. <span aria-hidden="true">😉</span>
        </Reveal>
        <Reveal as="div" className="close-cta" d={3}>
          <Link href="/contact" className="btn">
            Let&apos;s talk over coffee{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <Link href="/diagnosis" className="btn btn--ghost">
            Get a free growth diagnosis
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
