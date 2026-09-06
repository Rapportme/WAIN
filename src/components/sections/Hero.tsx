"use client";

import { useEffect, useRef } from "react";
import { withBase } from "@/lib/withBase";
import { useSectionHref } from "@/hooks/useSectionHref";
import { useUI } from "@/components/providers/UIProvider";

const SHAPES = ["o-sq", "o-cir", "o-tri", "o-bar", "o-wedge"] as const;

/** 00 · Cover. Content left, the orbital shape field right (mouse parallax). */
export function Hero() {
  const { openModal } = useUI();
  const h = useSectionHref();
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hf = field.current;
    if (!hf) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      // The field's entrance animation (`fadeup … forwards`) owns `transform`,
      // so the parallax rides the independent `translate` property instead.
      hf.style.translate = `${x * 24}px ${y * 24}px`;
    };
    window.addEventListener("mousemove", mm);
    return () => window.removeEventListener("mousemove", mm);
  }, []);

  return (
    <section className="chapter ink-teal s-hero hero" id="cover" data-chap="cover">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-meta a a1">
            <span className="label">We Are In Collective — Growth partner</span>
            <span className="label">Clarity is the product · Growth is the outcome</span>
          </div>
          <div className="hero-rule" />
          <h1 className="hero-h a a2">
            We are <em>in</em>
            <span className="dot" />
          </h1>
          <p className="hero-sub a a3">
            In the room. In the numbers. <span>In the question nobody wants to ask first.</span>
          </p>
          <p className="lede a a4">
            Most businesses don&apos;t need another agency. They need someone willing to look beyond
            marketing. That&apos;s where we begin. Not with campaigns. With conversations. Questions.
            Decisions. Everything else comes later.
          </p>
          <div className="ctas a a5">
            <a className="btn magnet" href={withBase("/contact/")}>
              Let&apos;s talk over coffee <span className="ar">→</span>
            </a>
            <a className="btn btn--ghost magnet" href={h("#diagnosis")}>
              Get a free growth diagnosis
            </a>
          </div>
          <button type="button" className="mark hero-third a a6" onClick={openModal}>
            Before you hire a marketing agency, read this first <span className="ar">→</span>
          </button>
        </div>
        <div className="hero-field" aria-hidden="true" id="heroField" ref={field}>
          <div className="ring" />
          <div className="ring ring-inner" />
          <div className="orbit">
            {SHAPES.map((c, i) => (
              <i className="arm" key={c} style={{ transform: `rotate(${i * 72}deg)` }}>
                <s style={{ transform: `rotate(${-i * 72}deg)` }}>
                  <b className={c} />
                </s>
              </i>
            ))}
          </div>
          <div className="orbit orbit-in">
            {SHAPES.map((c, i) => (
              <i className="arm" key={c} style={{ transform: `rotate(${i * 72 + 36}deg)` }}>
                <s style={{ transform: `rotate(${-(i * 72 + 36)}deg)` }}>
                  <b className={c} />
                </s>
              </i>
            ))}
          </div>
          <div className="orbit-A" />
        </div>
      </div>
    </section>
  );
}
