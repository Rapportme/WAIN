import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("social-media-marketing");

export const metadata = serviceMetadata(SERVICE);

/** /social-media-marketing/ — built from src/data/services.ts. */
export default function SocialMediaMarketingPage() {
  return <ServicePage service={SERVICE} />;
}
