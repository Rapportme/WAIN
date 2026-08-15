import type { Metadata } from "next";
import { GrowthDiagnosis } from "@/components/diagnosis/GrowthDiagnosis";

export const metadata: Metadata = {
  title: "Growth Diagnosis — We Are In Collective",
  description:
    "Fifteen questions about your business, and an honest first read of where it stands: maturity, operational health, and the areas most likely holding growth back.",
  alternates: { canonical: "/diagnosis/" },
  // A form, not a page to rank; the offer itself is indexed on the home page.
  robots: { index: false, follow: true },
};

export default function DiagnosisPage() {
  return (
    <main id="top">
      <GrowthDiagnosis />
    </main>
  );
}
