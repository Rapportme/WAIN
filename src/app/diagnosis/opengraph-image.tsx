import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

/* output: export needs this stated explicitly on a static image route. */
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Where does your business actually stand?";

export default function Image() {
  return ogCard({ label: "Growth diagnosis", title: "Where does your business actually stand?" });
}
