import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

/* output: export needs this stated explicitly on a static image route. */
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Growth partner or fractional CMO?";

export default function Image() {
  return ogCard({ label: "Comparison", title: "Growth partner or fractional CMO?" });
}
