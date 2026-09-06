"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/components/providers/UIProvider";
import { Logo } from "@/components/ui/Logo";

/* Ported from the prototype's p6_app.js — the global chrome behaviours that
   aren't tied to one section: the intro loader, the custom cursor, the ink
   bleed, the masthead's `stuck` state, the rail's current tick, magnet
   buttons, count-ups and the page wipe between routes. */

const INKS: Record<string, string> = {
  "ink-teal": "#0e9aa7",
  "ink-sage": "#92b67e",
  "ink-coral": "#f45d5d",
  "ink-amber": "#f4b22d",
  "ink-lav": "#8e78c7",
  "ink-lift": "#4fd0d0",
  "ink-navy": "#12263f",
};

/** The wipe plate's centre square takes the destination's ink. */
const WIPE_INK: Record<string, string> = {
  home: "signal",
  "why-we-exist": "signal",
  "how-we-exist": "sage",
  experience: "amber",
  thinking: "lav",
  diagnosis: "sage",
  contact: "signal",
  "growth-partner": "sage",
  "before-you-hire-an-agency": "signal",
};

const INTRO_KEY = "wain-intro-seen";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** First path segment of an internal URL (base path stripped), or "home". */
function routeKey(pathname: string): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  return p.split("/").filter(Boolean)[0] ?? "home";
}

export function Effects() {
  const pathname = usePathname();
  const { openModal } = useUI();
  const [intro, setIntro] = useState<"on" | "gone" | "off">("on");
  const openModalRef = useRef(openModal);
  openModalRef.current = openModal;

  /* ---- boot: html.js + intro loader (once per session) ---- */
  useEffect(() => {
    document.documentElement.classList.add("js");
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable — play it */
    }
    const quick = seen || reduced();
    const t1 = setTimeout(() => setIntro("gone"), quick ? 0 : 2300);
    const t2 = setTimeout(() => setIntro("off"), quick ? 300 : 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ---- cursor ---- */
  useEffect(() => {
    const cur = document.getElementById("cur");
    if (!cur || window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const leave = () => { cur.style.opacity = "0"; };
    const enter = () => { cur.style.opacity = ""; };
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = (e.target as HTMLElement | null)?.closest?.("a,button,.gd-opt,.tag,.chip");
      cur.classList.toggle("hot", !!hot);
    };
    const loop = () => {
      cx += (tx - cx) * 0.35;
      cy += (ty - cy) * 0.35;
      cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ---- scroll: masthead stuck, ink bleed, on-dark, rail current ---- */
  useEffect(() => {
    const mast = document.getElementById("mast");
    const bleed = document.getElementById("bleed")?.children;
    let chapEls: HTMLElement[] = [];
    const collect = () => {
      chapEls = Array.from(document.querySelectorAll<HTMLElement>("[data-chap], .sec, .pg-head, .art-head, .gd"));
    };
    const setInk = (el: HTMLElement) => {
      const cls = Array.from(el.classList).find((c) => INKS[c]) ?? "ink-teal";
      const ink = INKS[cls] ?? INKS["ink-teal"] ?? "#0e9aa7";
      if (bleed) {
        const a = bleed[0] as HTMLElement | undefined;
        const b = bleed[1] as HTMLElement | undefined;
        if (a) a.style.background = ink;
        if (b) b.style.background = ink;
      }
      const dark = el.hasAttribute("data-dark");
      document.body.classList.toggle("on-dark", dark);
      document.body.classList.toggle("dark-cur", dark);
    };
    const onScroll = () => {
      const y = window.scrollY;
      mast?.classList.toggle("stuck", y > 40);
      const line = y + window.innerHeight * 0.45;
      let act: HTMLElement | null = null;
      for (const el of chapEls) if (el.offsetTop <= line) act = el;
      if (act) {
        setInk(act);
        const chap = act.dataset.chap;
        document.querySelectorAll<HTMLElement>("#rail button").forEach((b) => {
          b.setAttribute("aria-current", chap !== undefined && b.dataset.go === chap ? "true" : "false");
        });
      }
      if (bleed) {
        const a = bleed[0] as HTMLElement | undefined;
        const b = bleed[1] as HTMLElement | undefined;
        if (a) a.style.transform = `translateY(${y * 0.08}px)`;
        if (b) b.style.transform = `translateY(${-y * 0.05}px)`;
      }
    };
    collect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(onScroll, 80);
    // Sections can mount late (client components, data loads) — re-collect.
    const mo = new MutationObserver(() => { collect(); onScroll(); });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: false });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
      mo.disconnect();
      document.body.classList.remove("on-dark", "dark-cur");
    };
  }, [pathname]);

  /* ---- magnet buttons (delegated) ---- */
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches || reduced()) return;
    let last: HTMLElement | null = null;
    const move = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".magnet") ?? null;
      if (last && last !== el) last.style.transform = "";
      last = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    };
    document.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.removeEventListener("mousemove", move);
      if (last) last.style.transform = "";
    };
  }, []);

  /* ---- count-ups ---- */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = Number(el.dataset.to ?? "0");
          if (reduced()) { el.textContent = String(to); return; }
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 1400);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );
    const observe = () => document.querySelectorAll(".count").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);

  /* ---- page wipe on internal navigation + [data-modal] delegation ---- */
  useEffect(() => {
    let leaving = false;
    const onClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-modal]")) {
        e.preventDefault();
        openModalRef.current();
        return;
      }
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = target.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noWipe !== undefined) return;
      const href = a.getAttribute("href") ?? "";
      if (!href || href.startsWith("#") || /^(mailto|tel|sms):/i.test(href)) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same document, only the hash differs — let the browser scroll.
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      if (url.pathname === location.pathname && url.search === location.search && !url.hash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
        return;
      }
      e.preventDefault();
      if (leaving) return;
      leaving = true;
      const w = document.getElementById("wipe");
      if (!w || reduced()) { location.assign(url.href); return; }
      const sq = w.querySelector<HTMLElement>("i");
      if (sq) sq.style.background = `var(--${WIPE_INK[routeKey(url.pathname)] ?? "signal"})`;
      w.classList.remove("a");
      void w.offsetWidth;
      w.classList.add("a");
      setTimeout(() => location.assign(url.href), 450);
    };
    document.addEventListener("click", onClick);
    // Coming back via bfcache: make sure the plate isn't still covering the page.
    const onShow = () => { leaving = false; document.getElementById("wipe")?.classList.remove("a"); };
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  return (
    <>
      {intro !== "off" ? (
        <div id="intro" className={intro === "gone" ? "gone" : undefined} aria-hidden="true">
          <div className="shapes">
            <i /><i /><i /><i /><i /><i />
            <div className="word">
              <Logo />
            </div>
            <span className="line" />
            <span className="tag">Clarity is the product · Growth is the outcome</span>
          </div>
        </div>
      ) : null}
      <div id="cur" aria-hidden="true" />
      <div id="bleed" aria-hidden="true">
        <i />
        <i />
      </div>
      <div id="wipe" aria-hidden="true">
        <i />
      </div>
    </>
  );
}
