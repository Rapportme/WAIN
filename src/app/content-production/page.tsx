import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("content-production");

export const metadata = serviceMetadata(SERVICE);

export default function ContentProductionPage() {
  return <ServicePage service={SERVICE} />;
}
