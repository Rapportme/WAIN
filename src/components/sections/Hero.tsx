"use client";

import { useUI } from "@/components/providers/UIProvider";

/** 00 · Cover. Two-column grid: content left, the orbital shape system right. */
export function Hero() {
  const { openModal } = useUI();

  return (
    <section className="chapter s-hero" id="cover">
      <div className="wrap">
        <div className="hero-content">
          <div className="hero-rule" />
          <div className="hero-meta a1">
            <span className="label">We Are In Collective — Growth partner</span>
            <span className="label">Clarity is the product · Growth is the outcome</span>
          </div>
          <h1 className="hero-h a2">
            We are <em>in</em>
            <span className="dot" />
          </h1>
          <p className="hero-sub a3">
            In the room. In the numbers. <span>In the question nobody wants to ask first.</span>
          </p>
          <p className="lede hero-body a4">
            Most businesses don&apos;t need another agency. They need someone willing to look beyond
            marketing. That&apos;s where we begin. Not with campaigns. With conversations. Questions.
            Decisions. Everything else comes later.
          </p>
          <div className="hero-cta a5">
            <a href="#close" className="btn">
              Let&apos;s talk over coffee{" "}
              <span className="arw" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#diagnosis" className="btn btn--ghost">
              Get a free growth diagnosis
            </a>
          </div>
          <p className="hero-third a5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              Before you hire a marketing agency, read this first &rarr;
            </a>
          </p>
        </div>

        <div className="hero-field" aria-hidden="true">
          <div className="hero-orbit">
            <span className="orbit-ring ring-outer" />
            <span className="orbit-ring ring-inner" />
            <span className="orbit-A" />
            <div className="spin spin-outer">
              <span className="orb o-sq">
                <i />
              </span>
              <span className="orb o-circle">
                <i />
              </span>
              <span className="orb o-tri">
                <i />
              </span>
              <span className="orb o-bar">
                <i />
              </span>
              <span className="orb o-wedge">
                <i />
              </span>
            </div>
            <div className="spin spin-inner">
              <span className="orb i-sq">
                <i />
              </span>
              <span className="orb i-circle">
                <i />
              </span>
              <span className="orb i-tri">
                <i />
              </span>
              <span className="orb i-bar">
                <i />
              </span>
              <span className="orb i-wedge">
                <i />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
