import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "@/styles/globals.scss";

import { UIProvider } from "@/components/providers/UIProvider";
import { withBase } from "@/lib/withBase";
import { OG_IMAGES } from "@/lib/seo";
import { Masthead } from "@/components/layout/Masthead";
import { ContentsMenu } from "@/components/layout/ContentsMenu";
import { ChapterRail } from "@/components/layout/ChapterRail";
import { Footer } from "@/components/layout/Footer";
import { Modal12 } from "@/components/layout/Modal12";

/* Self-hosted variable fonts, no layout shift. Manrope carries wght; Newsreader
   adds the optical-size axis the type layer keys off (font-variation-settings). */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const SITE_URL = "https://wearein.in";
const TITLE = "We Are In Collective — Clarity is the product. Growth is the outcome.";
const DESCRIPTION =
  "We Are In is a growth partner, not a marketing agency. Marketing is one of the tools. Clarity is what we actually sell. We join your business — we don't work for it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "We Are In Collective",
  authors: [{ name: "We Are In Collective" }],
  keywords: [
    "growth partner",
    "marketing collective",
    "brand positioning",
    "business clarity",
    "growth diagnosis",
  ],
  icons: {
    icon: [{ url: withBase("/images/WAIN-favicon.svg"), type: "image/svg+xml" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12263F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <UIProvider>
          <Masthead />
          <ContentsMenu />
          <ChapterRail />
          {children}
          <Footer />
          <Modal12 />
        </UIProvider>
      </body>
    </html>
  );
}
