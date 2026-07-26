"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";

interface MenuLink {
  href?: string;
  title: string;
  note: string;
  /** Opens the 12-questions modal instead of navigating. */
  modal?: boolean;
}

interface MenuColumn {
  heading: string;
  shape: string;
  links: MenuLink[];
}

const COLUMNS: MenuColumn[] = [
  {
    heading: "Why we exist",
    shape: "mk-cir",
    links: [
      { href: "#", title: "Our story", note: "Why we stopped calling ourselves an agency." },
      { href: "#", title: "People behind the thinking", note: "Small team. No account managers." },
      { href: "#", title: "Failure resumes", note: "Everything we got wrong, and what it taught us." },
      { href: "#", title: "Founder Q&A", note: "The questions we're asked most, answered plainly." },
    ],
  },
  {
    heading: "How we exist",
    shape: "mk-tri",
    links: [
      { href: "#", title: "What we believe", note: "The positions we're willing to defend." },
      { href: "#", title: "How we think", note: "The questions we ask before anything else." },
      { href: "#method", title: "How we work", note: "Six movements. In order. No skipping." },
    ],
  },
  {
    heading: "Experience",
    shape: "mk-sq",
    links: [
      { href: "#experience", title: "Across industries", note: "Where we've spent our time." },
      { href: "#experience", title: "Patterns", note: "The same problem, wearing different clothes." },
      { href: "#experience", title: "Behind We Are In", note: "Work our people led before the name existed." },
    ],
  },
  {
    heading: "Our thinking",
    shape: "mk-wedge",
    links: [
      { href: "#thinking", title: "Observations", note: "Short. Things we keep noticing." },
      { href: "#thinking", title: "Perspectives", note: "Opinions we'll put our name on." },
      { href: "#thinking", title: "Case studies", note: "What we did, including what didn't work." },
      { href: "#thinking", title: "Field notes", note: "Written from inside the work, while it's messy." },
    ],
  },
  {
    heading: "Start here",
    shape: "mk-cir",
    links: [
      { href: "#routes", title: "How to read this", note: "Three ways in. Pick one." },
      { href: "#close", title: "Let's talk over coffee", note: "A conversation, not a pitch." },
      { href: "#diagnosis", title: "Growth diagnosis", note: "Free. Written. Yours either way." },
      { title: "Before you hire an agency", note: "Twelve questions. Some are uncomfortable.", modal: true },
      { href: "#close", title: "Contact", note: "A human replies. Usually the same day." },
    ],
  },
];

export function ContentsMenu() {
  const { menuOpen, setMenuOpen, openModal } = useUI();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus to the close button when the overlay opens.
  useEffect(() => {
    if (menuOpen) closeRef.current?.focus();
  }, [menuOpen]);

  const onGridClick = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (anchor) setMenuOpen(false);
  };

  return (
    <nav
      className={`menu${menuOpen ? " open" : ""}`}
      id="menu"
      aria-label="Site contents"
      aria-hidden={!menuOpen}
    >
      <div className="menu-top">
        <span className="logo">
          <Image src={withBase("/images/weareinwhite.png")} alt="We Are In Collective" width={1022} height={1077} />
        </span>
        <button className="menu-close" ref={closeRef} onClick={() => setMenuOpen(false)}>
          <b aria-hidden="true">&#10005;</b> Close
        </button>
      </div>
      <div className="menu-grid" onClick={onGridClick}>
        {COLUMNS.map((col) => (
          <div className="menu-col" key={col.heading}>
            <h4>
              <span className={`mk ${col.shape}`} />
              {col.heading}
            </h4>
            {col.links.map((link) =>
              link.modal ? (
                <a
                  key={link.title}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    openModal();
                  }}
                >
                  <strong>{link.title}</strong>
                  <em>{link.note}</em>
                </a>
              ) : (
                <a key={link.title} href={link.href}>
                  <strong>{link.title}</strong>
                  <em>{link.note}</em>
                </a>
              ),
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
