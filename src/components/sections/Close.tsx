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
          Tell us where the business is right now. We&apos;ll come back with what we&apos;d look at
          first — before anyone talks about scope or fees. Coffee&apos;s on us.
        </Reveal>
        <Reveal as="div" className="close-cta" d={3}>
          <a href="mailto:hello@wearein.in" className="btn">
            Let&apos;s talk over coffee{" "}
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a href="#diagnosis" className="btn btn--ghost">
            Get a free growth diagnosis
          </a>
        </Reveal>
        <Reveal as="div" className="close-contact" d={4}>
          <a href="mailto:hello@wearein.in" className="cc-mail">
            hello@wearein.in
          </a>
          <p className="cc-addr">
            St. Mary&apos;s Arcade, Near Nalumanikkattu,
            <br />
            Thiruvalla &ndash; Ettumanoor Bypass, Kottayam
          </p>
        </Reveal>
      </div>
    </section>
  );
}
