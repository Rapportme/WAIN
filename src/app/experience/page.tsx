import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { ExpIndustries } from "@/components/sections/ExpIndustries";
import { ExpBehind } from "@/components/sections/ExpBehind";
import { ExpWork } from "@/components/sections/ExpWork";

const TITLE = "Experience — We Are In Collective";
const DESCRIPTION =
  "Two kinds of experience live here: the industries we've been inside as We Are In, and the work our people led long before the collective existed. Neither is more real than the other.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/experience/" },
  openGraph: {
    type: "article",
    url: "/experience/",
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
    href: "#industries",
    title: "Experience across industries",
    note: "Where the depth is, and where we've simply been in the room.",
    shape: "mk-cir",
    ink: "ink-teal",
  },
  {
    href: "#behind",
    title: "Experience behind We Are In",
    note: "The figures that can be checked, and what they taught us.",
    shape: "mk-sq",
    ink: "ink-amber",
  },
  {
    href: "#work",
    title: "The work",
    note: "Filed under the person who led it — none of it under this name.",
    shape: "mk-wedge",
    ink: "ink-lav",
  },
];

/** Experience — the industries, the figures, and the work that came before. */
export default function ExperiencePage() {
  return (
    <main>
      <PageHead
        ink="ink-amber"
        kicker="Experience"
        shape="mk-sq"
        title="Two kinds of experience live here."
        intro="One is what we've done as We Are In — the businesses we're currently working with, the industries we're learning in real time. The other is what we brought with us — years spent building, running and advising things long before this collective existed. Neither is more real than the other."
        index={INDEX}
      />
      <ExpIndustries />
      <ExpBehind />
      <ExpWork />
      <PageNext
        ink="ink-lav"
        href="/thinking/"
        label="Read next"
        title="Our thinking"
        note="Observations, perspectives and case studies from inside the work."
        shape="mk-a"
      />
    </main>
  );
}
