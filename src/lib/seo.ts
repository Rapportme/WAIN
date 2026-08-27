/* ============================================================================
   Share-card metadata.

   One image, declared once. Next.js merges metadata *shallowly*: a page that
   defines its own `openGraph` replaces the parent's object entirely rather than
   inheriting `images` from it. So every page's openGraph/twitter block has to
   name the image itself — hence this constant instead of relying on the root
   layout to cover them.

   The card is a real 1200×630 raster. WhatsApp, LinkedIn and Slack will not
   render an SVG, and WhatsApp in particular drops images that are large or
   slow, so this stays a small PNG.
   ========================================================================= */

import { withBase } from "./withBase";

export const OG_IMAGE = {
  url: withBase("/images/og-cover.png"),
  width: 1200,
  height: 630,
  alt: "We Are In Collective — clarity is the product, growth is the outcome.",
} as const;

/** Spread into a page's `openGraph`, and into `twitter` as `images: OG_IMAGES`. */
export const OG_IMAGES = [OG_IMAGE];
