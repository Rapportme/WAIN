import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("healthcare-marketing");

export const metadata = serviceMetadata(SERVICE);

export default function HealthcareMarketingPage() {
  return <ServicePage service={SERVICE} />;
}
