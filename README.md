# We Are In Collective

The editorial growth-partner site, rebuilt on a production stack from the original
single-file `wain.html`. The design is preserved 1:1 — numbered chapters, per-chapter
inks, the brand shape set, hairline rules, and the serif voice.

## Stack

- **Next.js 15** (App Router) — Static Site Generation, `output: 'export'`.
- **TypeScript** (strict, `noUncheckedIndexedAccess`) — typed props/state throughout.
- **SCSS** design system — CSS custom properties for every design token.
- **Framer Motion** — GPU-accelerated reveals, viewport triggers, reduced-motion aware.
- **next/font** — self-hosted Manrope + Newsreader (with the `opsz` optical-size axis).

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → static export in ./out
```

The build emits a fully static site to `out/` (deployable to any static host / CDN).

## Architecture

```
src/
  app/
    layout.tsx        # fonts, metadata (SEO/OG/Twitter), global chrome, providers
    page.tsx          # the book — chapters 00–10 in reading order
  components/
    ui/               # atoms: BrandSprite, Logo, Eyebrow, Reveal (Framer primitive)
    layout/           # chrome: Masthead, ContentsMenu, ChapterRail, Footer, Modal12
    sections/         # the 12 chapters
    providers/        # UIProvider — menu / modal / shared Position-tab state
  hooks/              # useStuck, useActiveSection, useMediaQuery
  data/               # chapters.ts — rail order + guided-path (CH / STAGES)
  styles/             # SCSS partials, assembled by globals.scss in original order
public/
  images/  elements/  # brand assets (favicon, logos, shape slices)
```

### Why the stylesheet is global (not CSS Modules)

The visual system leans on **descendant selectors** (`.dark .eyebrow .n`),
**per-chapter custom properties** (`--sig`, `--rc`, `--bc` …) and structural
`:nth-child` colour rules. Hashing class names through CSS Modules would sever those
relationships and change the design. So the system lives in ordered SCSS partials
(`@use`d by `globals.scss`), and the **modular seam is CSS custom properties** — the
right abstraction for a brand whose whole identity is "each chapter, its own ink."

### Interactivity (ported from the original vanilla JS)

- Reveal-on-scroll → `Reveal` (Framer Motion `whileInView`, matching the original
  0.9s / `cubic-bezier(.2,.7,.2,1)` / `--d` stagger). It also stamps an `.in` class so
  descendant rules (the eyebrow marker, the diagnosis score bar) still fire.
- Chapter 00b guided path sets chapter 02's Position tab via shared context.
- Chapter 01 heading edits itself (`marketing` → `clarity`) on entry.
- Chapter 02 "you are here" marker math is a faithful port with `ResizeObserver`-style
  recompute on resize + font-load.
- Chapter 05 horizontal movement track, 06 accordion, 07 format filters, the contents
  overlay, the chapter rail, and the 12-question modal are all React state.

Accessibility (roles, `aria-*`, keyboard tab navigation, focus management, Escape to
close, `prefers-reduced-motion`) is carried over from the original.
