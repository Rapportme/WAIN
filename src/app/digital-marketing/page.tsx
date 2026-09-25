import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("digital-marketing");

export const metadata = serviceMetadata(SERVICE);

/** /digital-marketing/ — built from src/data/services.ts. */
export default function DigitalMarketingPage() {
  return <ServicePage service={SERVICE} />;
}
