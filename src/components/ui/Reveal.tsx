"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, type ElementType, type ReactNode } from "react";

/** Original page easing — cubic-bezier(.2,.7,.2,1). */
const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
};

type RevealTag = "div" | "section" | "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "span";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step, mirroring the original `--d` custom property (× 80ms). */
  d?: number;
  /** Which element to render (defaults to a div). */
  as?: RevealTag;
  id?: string;
  style?: React.CSSProperties;
  /** Fires once when the element scrolls into view (e.g. to start a timed effect). */
  onEnter?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * The reveal primitive. Replaces the original IntersectionObserver + `.rise`
 * CSS with a GPU-accelerated Framer Motion entrance (opacity + translateY),
 * matching the original 0.9s / cubic-bezier(.2,.7,.2,1) / `--d` stagger.
 *
 * It also stamps an `in` class on entry so descendant rules that keyed off
 * `.rise.in` in the original stylesheet (the eyebrow marker, the diagnosis
 * score bar) still fire.
 */
export function Reveal({
  children,
  className = "",
  d = 0,
  as = "div",
  id,
  style,
  onEnter,
  onMouseEnter,
  onMouseLeave,
}: RevealProps) {
  const [entered, setEntered] = useState(false);
  const reduce = useReducedMotion();
  // motion is a proxy of intrinsic tags; index access is safe at runtime.
  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag
      id={id}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} rise${entered ? " in" : ""}`.trim()}
      variants={reduce ? undefined : variants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "shown"}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE, delay: (d * 80) / 1000 }}
      onViewportEnter={() => {
        setEntered(true);
        onEnter?.();
      }}
    >
      {children}
    </MotionTag>
  );
}
