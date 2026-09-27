import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("marketing-agency-kottayam");

export const metadata = serviceMetadata(SERVICE);

export default function MarketingAgencyKottayamPage() {
  return <ServicePage service={SERVICE} />;
}
