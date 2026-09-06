"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealTag =
  | "div" | "section" | "aside" | "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "span" | "article" | "figure";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step — × 80ms via the `--d` custom property. */
  d?: number;
  as?: RevealTag;
  id?: string;
  style?: React.CSSProperties;
  /** Fires once when the element scrolls into view. */
  onEnter?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * The reveal primitive. Renders `.rv` and stamps `.in` when 12% of the element
 * is in view (once). CSS does the motion, gated on `html.js`, so the page is
 * fully readable without JavaScript and in the first painted frame.
 */
export function Reveal({
  children, className = "", d = 0, as = "div", id, style, onEnter, onMouseEnter, onMouseLeave,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setEntered(true);
          onEnter?.();
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      style={{ ...(style ?? {}), ["--d" as string]: d } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} rv${entered ? " in" : ""}`.trim()}
    >
      {children}
    </Tag>
  );
}
