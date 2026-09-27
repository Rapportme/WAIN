import { ServicePage, serviceMetadata } from "@/components/services/ServicePage";
import { serviceBySlug } from "@/data/services";

const SERVICE = serviceBySlug("hotel-resort-marketing");

export const metadata = serviceMetadata(SERVICE);

export default function HotelResortMarketingPage() {
  return <ServicePage service={SERVICE} />;
}
