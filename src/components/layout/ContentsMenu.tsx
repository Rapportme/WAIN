"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";
import { useSectionHref } from "@/hooks/useSectionHref";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface MenuLink {
  /** Real route, with trailing slash. Home anchors are route "/" + hash. */
  route: string;
  hash?: string;
  title: string;
  note: string;
  /** Opens the 12-questions modal instead of navigating. */
  modal?: boolean;
}

interface MenuColumn {
  heading: string;
  ink: string;
  shape: string;
  /** The page the column stands for — the heading links here. */
  route: string;
  links: MenuLink[];
}

const COLUMNS: MenuColumn[] = [
  {
    heading: "Why we exist",
    ink: "ink-teal",
    shape: "mk-cir",
    route: "/why-we-exist/",
    links: [
      { route: "/why-we-exist/", hash: "#story", title: "Our story", note: "Why we stopped calling ourselves an agency." },
      {
        route: "/why-we-exist/",
        hash: "#people",
        title: "People behind the thinking",
        note: "Three people, and the question each one keeps asking.",
      },
    ],
  },
  {
    heading: "How we exist",
    ink: "ink-sage",
    shape: "mk-tri",
    route: "/how-we-exist/",
    links: [
      { route: "/how-we-exist/", hash: "#believe", title: "What we believe", note: "The positions we're willing to defend." },
      { route: "/how-we-exist/", hash: "#think", title: "How we think", note: "The questions we ask before anything else." },
      { route: "/", hash: "#method", title: "How we work", note: "Six movements. In order. No skipping." },
    ],
  },
  {
    heading: "Experience",
    ink: "ink-amber",
    shape: "mk-sq",
    route: "/experience/",
    links: [
      { route: "/experience/", title: "Intro", note: "Two kinds of experience, and why both of them count." },
      {
        route: "/experience/",
        hash: "#industries",
        title: "Experience across industries",
        note: "Where the depth is, and where we've simply been in the room.",
      },
      {
        route: "/experience/",
        hash: "#behind",
        title: "Experience behind We Are In",
        note: "Work our people led before the name existed.",
      },
    ],
  },
  {
    heading: "Our thinking",
    ink: "ink-lav",
    shape: "mk-wedge",
    route: "/thinking/",
    links: [
      { route: "/thinking/", title: "Everything we've published", note: "Twenty-two pieces, in the order they were written." },
      { route: "/thinking/", hash: "#observations", title: "Observations", note: "Short. Things we keep noticing." },
      { route: "/thinking/", hash: "#perspectives", title: "Perspectives", note: "Opinions we'll put our name on." },
      { route: "/thinking/", hash: "#case-studies", title: "Case studies", note: "What we did, including what didn't work." },
    ],
  },
  {
    heading: "Start here",
    ink: "ink-coral",
    shape: "mk-cir",
    route: "/",
    links: [
      { route: "/", hash: "#routes", title: "Three ways in", note: "Pick one, or read it straight through." },
      { route: "/contact/", title: "Let's talk over coffee", note: "A conversation, not a pitch." },
      { route: "/diagnosis/", title: "Growth diagnosis", note: "Fifteen questions. Free. Under five minutes." },
      { route: "/before-you-hire-an-agency/", title: "Before you hire an agency", note: "Twelve questions. Some are uncomfortable.", modal: true },
      { route: "/contact/", title: "Contact", note: "A human replies. Usually the same day." },
    ],
  },
];

const HOME_INDEX = COLUMNS.findIndex((c) => c.route === "/");

/** Normalise a pathname to the trailing-slash form the routes use. */
function norm(p: string): string {
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/** First segment of a route — "/thinking/some-slug/" belongs to the "/thinking/" column. */
function section(route: string): string {
  const seg = route.split("/").filter(Boolean)[0];
  return seg ? `/${seg}/` : "/";
}

export function ContentsMenu() {
  const { menuOpen, setMenuOpen, openModal } = useUI();
  const h = useSectionHref();
  const pathname = norm(usePathname() ?? "/");
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState<boolean[]>(() => COLUMNS.map((_, i) => i === HOME_INDEX));

  // "You're here": worked out each time the overlay opens, so the hash is current.
  useEffect(() => {
    if (!menuOpen) return;
    const hs = window.location.hash;
    setHash(hs);
    setOpen(COLUMNS.map((c, i) => isHere(c, i, pathname, hs) || (pathname === "/" && i === HOME_INDEX)));
    const el = document.getElementById("menu");
    if (el) el.scrollTop = 0;
  }, [menuOpen, pathname]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
  };

  const href = (l: MenuLink) =>
    l.route === "/" && l.hash ? h(l.hash) : withBase(`${l.route}${l.hash ?? ""}`);

  return (
    <div id={"menu"} className={menuOpen ? "open" : undefined} aria-label="Site contents" aria-hidden={!menuOpen}>
      <div className="top">
        <a className="logo" href={withBase("/")} aria-label="We Are In Collective">
          <Logo />
        </a>
        <span />
      </div>
      <div className="cols" onClick={onClick}>
        {COLUMNS.map((col, i) => {
          const here = isHere(col, i, pathname, hash);
          const isOpen = open[i] ?? false;
          return (
            <div className={`col ${col.ink}${here ? " here" : ""}${isOpen ? " open" : ""}`} key={col.heading}>
              <h3>
                <i className={`mk ${col.shape}`} />
                <a href={withBase(col.route)} aria-current={here ? "page" : undefined}>
                  {col.heading}
                </a>
                <span className="here">You&apos;re here</span>
                <button
                  className="tog"
                  type="button"
                  aria-label="Expand section"
                  aria-expanded={isOpen}
                  onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
                >
                  <svg viewBox="0 0 20 20">
                    <path d="M4 7l6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div className="items">
                <div>
                  {col.links.map((l) =>
                    l.modal ? (
                      <button
                        key={l.title}
                        className="it"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          openModal();
                        }}
                      >
                        <strong>{l.title}</strong>
                        <em>{l.note}</em>
                      </button>
                    ) : (
                      <a
                        key={l.title + (l.hash ?? "")}
                        className="it"
                        href={href(l)}
                        aria-current={
                          l.route === pathname && (l.hash ?? "") === hash ? "page" : undefined
                        }
                      >
                        <strong>{l.title}</strong>
                        <em>{l.note}</em>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="foot">
        <div className="quick">
          <a className="btn" href={withBase("/contact/")} onClick={() => setMenuOpen(false)}>
            Let&apos;s talk over coffee <span className="ar">→</span>
          </a>
          <a className="btn btn--ghost" href={withBase("/diagnosis/")} onClick={() => setMenuOpen(false)}>
            Growth diagnosis
          </a>
        </div>
        <div className="side">
          <a className="mail" href="mailto:hello@wearein.in">
            hello@wearein.in
          </a>
          <SocialLinks className="soc" />
        </div>
      </div>
    </div>
  );
}

function isHere(col: MenuColumn, i: number, pathname: string, hash: string): boolean {
  if (pathname === "/") return i === HOME_INDEX && !hash;
  return section(pathname) === col.route;
}
