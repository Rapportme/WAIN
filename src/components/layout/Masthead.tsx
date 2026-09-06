"use client";

import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";
import { Logo } from "@/components/ui/Logo";

/**
 * The masthead. `.stuck` is stamped by Effects on scroll, and `body.menu-open`
 * (set by UIProvider) morphs the Contents button into Close via CSS.
 */
export function Masthead() {
  const { menuOpen, toggleMenu } = useUI();

  return (
    <header className="mast" id="mast">
      <a className="logo" href={withBase("/")} aria-label="We Are In Collective — back to the cover">
        <Logo />
      </a>
      <div className="right">
        <button
          className="menu-btn"
          id="menuBtn"
          aria-controls="menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <i />
          <span className="lab">Contents</span>
        </button>
        <a className="btn" href={withBase("/contact/")}>
          <span className="txt">Let&apos;s talk over coffee</span>
          <span className="sm" aria-hidden="true">
            ☕
          </span>{" "}
          <span className="ar">→</span>
        </a>
      </div>
    </header>
  );
}
