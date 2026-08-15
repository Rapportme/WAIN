"use client";

import Image from "next/image";
import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";
import { useStuck } from "@/hooks/useStuck";
import { useSectionHref } from "@/hooks/useSectionHref";

export function Masthead() {
  const stuck = useStuck();
  const { menuOpen, toggleMenu } = useUI();
  const h = useSectionHref();

  return (
    <header className={`masthead${stuck ? " stuck" : ""}`} id="masthead">
      <a href={h("#top")} className="logo" aria-label="We Are In Collective — back to the cover">
        <Image
          src={withBase("/images/weareinblack.png")}
          alt=""
          width={1022}
          height={1077}
          priority
        />
      </a>
      <div className="masthead-r">
        <button
          className="menu-btn"
          id="menuBtn"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={toggleMenu}
        >
          <i aria-hidden="true" /> Contents
        </button>
        <a href={h("#close")} className="btn">
          Let&apos;s talk over coffee{" "}
          <span className="arw" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </header>
  );
}
