import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("branding");

export const metadata = serviceMetadata(SERVICE);

/** /branding/ — built from src/data/services.ts. */
export default function BrandingPage() {
  return <ServicePage service={SERVICE} />;
}
