import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("lead-generation");

export const metadata = serviceMetadata(SERVICE);

export default function LeadGenerationPage() {
  return <ServicePage service={SERVICE} />;
}
