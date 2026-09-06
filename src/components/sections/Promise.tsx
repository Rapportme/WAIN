"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const LINE = "We'd rather lose the project than recommend the wrong thing";

/** 08 · Our promise. The line lights up word by word once it's in view. */
export function Promise() {
  const ref = useRef<HTMLQuoteElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="chapter dark ink-amber" id="promise" data-chap="promise" data-dark="">
      <i className="pplate p1" />
      <i className="pplate p2" />
      <i className="pplate p3" />
      <div className="wrap" style={{ position: "relative" }}>
        <Eyebrow shape="mk-sq" n="08" t="Our promise" />
        <blockquote className={`promise-q${inView ? " in" : ""}`} id="promiseQ" ref={ref}>
          {LINE.split(" ").map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              {i ? " " : null}
              <span className="w" style={{ ["--i" as string]: i } as React.CSSProperties}>
                {w}
              </span>
            </Fragment>
          ))}
        </blockquote>
        <Reveal as="ul" className="plist">
          <li>
            <i className="mk mk-cir" />
            If marketing isn&apos;t the answer, we&apos;ll say so.
          </li>
          <li>
            <i className="mk mk-tri" />
            If a proposal won&apos;t move your business forward, we won&apos;t send it.
          </li>
          <li>
            <i className="mk mk-sq" />
            If honesty costs us the work, that&apos;s a price we&apos;re willing to pay.
          </li>
        </Reveal>
        <Reveal as="p" className="psig">
          Because trust is harder to earn than business.
        </Reveal>
      </div>
    </section>
  );
}
