import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { Story } from "@/components/sections/Story";
import { People, PEOPLE } from "@/components/sections/People";

const SITE_URL = "https://wearein.in";
const TITLE = "Why We Exist — We Are In Collective";
const DESCRIPTION =
  "We didn't set out to build another agency. We set out to bring good people into one room — how the collective started, and the people behind the thinking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/why-we-exist/" },
  openGraph: {
    type: "article",
    url: "/why-we-exist/",
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
};

const INDEX: readonly PageIndexEntry[] = [
  {
    href: "#story",
    title: "Our story",
    note: "Different paths that kept crossing, until they became one room.",
    shape: "mk-cir",
  },
  {
    href: "#people",
    title: "The people behind the thinking",
    note: "Three people, three questions they can't stop asking.",
    shape: "mk-a",
    ink: "ink-amber",
  },
];

/* The three people, as structured data, tied back to the Organization in the layout. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": PEOPLE.map((p) => ({
    "@type": "Person",
    name: p.name,
    description: p.cred,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/why-we-exist/#people`,
  })),
};

/** Why we exist — the story, and the people it's made of. */
export default function WhyWeExistPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHead
        ink="ink-teal"
        kicker="Why we exist"
        shape="mk-cir"
        title="We didn't set out to build another agency."
        intro="We set out to bring good people into one room — and to give them the freedom to think beyond a job description. This is how that happened, and who it happened with."
        index={INDEX}
      />
      <Story />
      <People />
      <PageNext
        ink="ink-sage"
        href="/how-we-exist/"
        label="Read next"
        title="How we exist"
        note="What we believe, how we think, and how we actually work once we're in."
        shape="mk-tri"
      />
    </main>
  );
}
