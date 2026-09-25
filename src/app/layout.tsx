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
import { Effects } from "@/components/layout/Effects";
import { SOCIAL_LINKS } from "@/data/social";
import { CONTACT, hasPhone } from "@/data/contact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Analytics } from "@/components/layout/Analytics";

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
/* What search results show for the home page: the name, what we are, and where.
   The tagline stays on share cards, where there's room for it. */
const SEARCH_TITLE = "We Are In Collective — Growth Partner in Kottayam, Kerala";
const DESCRIPTION =
  "We Are In is a growth partner, not a marketing agency. Marketing is one of the tools; clarity is what we sell. We join your business — we don't work for it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEARCH_TITLE,
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

/* Structured data for the whole site: who the collective is, and that the
   site is a WebSite. Page-level Article / FAQPage graphs live on their pages. */
const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDERS = [
  { name: "Divine Abraham Chirayil", jobTitle: "Founder" },
  { name: "Ananthu Vasudev", jobTitle: "Brand & market strategist" },
  { name: "Savio", jobTitle: "Brand & narrative strategist" },
];
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      /* ProfessionalService as well as Organization: the collective works from a
         real address in Kottayam, and the local-business type is what carries the
         address, service area and contact point into local results and into AI
         answers about firms in Kerala. No `geo` — we don't have surveyed
         coordinates for the office and inventing them would be worse than the
         omission. No `openingHours` for the same reason. */
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: "We Are In Collective",
      alternateName: ["We Are In", "WAIN"],
      url: SITE_URL,
      logo: `${SITE_URL}/images/wain-logo-square.png`,
      image: `${SITE_URL}/images/og-cover.png`,
      email: CONTACT.email,
      ...(hasPhone ? { telephone: CONTACT.phone } : {}),
      description: DESCRIPTION,
      /* "We Are In" is also a homelessness charity in Seattle, a UK web studio
         and a group-headcount app. Saying which one we are, in words, is what
         lets search engines and AI answers keep us apart. */
      disambiguatingDescription:
        "We Are In Collective (wearein.in) is a growth partner for small and mid-sized businesses, based in Kottayam, Kerala, India.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "St. Mary's Arcade, Near Nalumanikkattu, Thiruvalla – Ettumanoor Bypass",
        addressLocality: "Kottayam",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Kerala" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Growth strategy",
        "Brand positioning",
        "Marketing strategy",
        "Business diagnosis",
        "Go-to-market strategy",
        "Brand identity",
        "Social media marketing",
        "Content production",
        "Sales process design",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "New business",
        email: CONTACT.email,
        ...(hasPhone ? { telephone: CONTACT.phone } : {}),
        areaServed: "IN",
        availableLanguage: ["en"],
      },
      sameAs: SOCIAL_LINKS.map((s) => s.href),
      founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "We Are In Collective",
      description: DESCRIPTION,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
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
        <script
          type="application/ld+json"
          // JSON-LD is the one sanctioned use of innerHTML on the site.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
        <UIProvider>
          <Effects />
          <Masthead />
          <ContentsMenu />
          <ChapterRail />
          {children}
          <Footer />
          <Modal12 />
          <FloatingWhatsApp />
        </UIProvider>
        <Analytics />
      </body>
    </html>
  );
}
