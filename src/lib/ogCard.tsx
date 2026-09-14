/* ============================================================================
   The share card, drawn at build time.

   Every page used to share one static /images/og-cover.png, which meant all
   twenty-two Thinking pieces looked identical anywhere a link was pasted —
   LinkedIn, WhatsApp, Slack. This renders a card per piece instead, from the
   title and format label, in the site's own type.

   It stays type-only on purpose: the site has no photography and shouldn't
   acquire any here. Newsreader and Manrope are read off disk rather than
   fetched, so the build needs no network for this.
   ========================================================================= */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const FONT_DIR = join(process.cwd(), "src/assets/fonts");
const newsreader = readFileSync(join(FONT_DIR, "Newsreader-Medium.woff"));
const manrope = readFileSync(join(FONT_DIR, "Manrope-Bold.woff"));

/** Chapter inks, matching the ones the category uses on the site. */
const INK: Record<string, string> = {
  PERSPECTIVE: "#f45d5d",
  OBSERVATION: "#4fd0d0",
  "CASE STUDY": "#92b67e",
  DEFAULT: "#4fd0d0",
};

const NAVY = "#12263f";

interface CardProps {
  /** The eyebrow: a format label, a section name, anything short. */
  label: string;
  title: string;
  /** Small line bottom-right — a date, a reading time, a category. */
  meta?: string;
}

/**
 * One card. Title set in Newsreader, everything else in Manrope, on the navy
 * ground with the marker bar in the category's ink.
 */
export function ogCard({ label, title, meta }: CardProps) {
  const ink = INK[label.toUpperCase()] ?? INK.DEFAULT;
  /* Long titles step down a size rather than overflowing the plate. */
  const size = title.length > 76 ? 60 : title.length > 48 ? 72 : 86;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: "72px 80px",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        {/* the ink bar, top-left, standing in for the chapter marker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 54, height: 8, background: ink }} />
            <div
              style={{
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.72)",
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: size,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#ffffff",
              maxWidth: 980,
              display: "block",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 38, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>
                WAIN
              </div>
              <div style={{ width: 13, height: 13, borderRadius: 13, background: "#92b67e" }} />
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.55)",
                fontWeight: 700,
              }}
            >
              We Are In Collective
            </div>
          </div>
          {meta ? (
            <div style={{ fontSize: 20, color: "rgba(255,255,255,.5)", fontWeight: 700 }}>{meta}</div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 500 },
        { name: "Manrope", data: manrope, style: "normal", weight: 700 },
      ],
    },
  );
}
