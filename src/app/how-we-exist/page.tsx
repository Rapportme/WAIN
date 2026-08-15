import type { Metadata } from "next";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { Believe } from "@/components/sections/Believe";
import { Think } from "@/components/sections/Think";
import { Work } from "@/components/sections/Work";

const TITLE = "How We Exist — We Are In Collective";
const DESCRIPTION =
  "What we believe, how we think, and how we work. Good businesses deserve better questions — and the answer is rarely where the question starts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-we-exist/" },
  openGraph: {
    type: "article",
    url: "/how-we-exist/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const INDEX: readonly PageIndexEntry[] = [
  {
    href: "#believe",
    title: "What we believe",
    note: "Six positions we're willing to defend, including the ones that cost us work.",
    shape: "mk-tri",
  },
  {
    href: "#think",
    title: "How we think",
    note: "Why the brief is rarely where the problem actually lives.",
    shape: "mk-bar",
  },
  {
    href: "#work",
    title: "How we work",
    note: "What happens once we're in — and why it starts before the work does.",
    shape: "mk-wedge",
  },
];

/** How we exist — the creed, the thinking behind it, and the working method. */
export default function HowWeExistPage() {
  return (
    <main>
      <PageHead
        kicker="How we exist"
        shape="mk-tri"
        title="Good businesses deserve better questions."
        intro="Marketing is important, but it isn't the answer to everything. What we believe, how we think, and what actually happens once we're in the room with you."
        index={INDEX}
      />
      <Believe />
      <Think />
      <Work />
      <PageNext
        href="/diagnosis/"
        label="Start here"
        title="Get a growth diagnosis"
        note="Fifteen questions about your business, and an honest first read of where it stands. Free, and under five minutes."
        shape="mk-cir"
      />
    </main>
  );
}
