import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { Story } from "@/components/sections/Story";
import { People } from "@/components/sections/People";

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
  },
];

/** Why we exist — the story, and the people it's made of. */
export default function WhyWeExistPage() {
  return (
    <main>
      <PageHead
        kicker="Why we exist"
        shape="mk-cir"
        title="We didn't set out to build another agency."
        intro="We set out to bring good people into one room — and to give them the freedom to think beyond a job description. This is how that happened, and who it happened with."
        index={INDEX}
      />
      <Story />
      <People />
      <PageNext
        href="/how-we-exist/"
        label="Read next"
        title="How we exist"
        note="What we believe, how we think, and how we actually work once we're in."
        shape="mk-tri"
      />
    </main>
  );
}
