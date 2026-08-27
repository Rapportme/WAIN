import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "Our Thinking — We Are In Collective";
const DESCRIPTION =
  "Observations, perspectives and case studies on marketing, business, sales and growth — written the way we'd say it in a room, not the way it performs online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/thinking/" },
  openGraph: {
    type: "website",
    url: "/thinking/",
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

/** /thinking — the collection index. The writing, filterable by format. */
export default function ThinkingPage() {
  return (
    <>
      <BlogIndex />
      <PageNext
        href="/diagnosis/"
        label="Read next"
        title="Growth diagnosis"
        note="Fifteen questions about your business. Free, and under five minutes."
        shape="mk-cir"
      />
    </>
  );
}
