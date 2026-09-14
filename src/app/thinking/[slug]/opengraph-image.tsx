import { notFound } from "next/navigation";
import { POSTS, categoryStyle, postBySlug } from "@/data/blog";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "We Are In Collective";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return ogCard({
    label: categoryStyle(post.category).label,
    title: post.title,
    meta: `${post.minutes} min read`,
  });
}
