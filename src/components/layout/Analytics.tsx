"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureAttribution } from "@/lib/attribution";

/* GA4 is on (ID below). Plausible stays off until a domain is filled in (or passed as the build variable
   NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_PLAUSIBLE_DOMAIN):
     GA_ID            → Google Analytics 4, e.g. "G-XXXXXXXXXX"
     PLAUSIBLE_DOMAIN → Plausible, e.g. "wearein.in"
   With neither set, no third-party script loads; the first-visit note used for
   lead sources (lib/attribution) still works, because it never leaves the browser
   until someone sends a form. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-N9X12G8F5Q"; /* GA4: "We Are In Collective — wearein.in" property, Rapport Group account */
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";

export function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {PLAUSIBLE_DOMAIN ? (
        <>
          <Script src="https://plausible.io/js/script.tagged-events.js" data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
          <Script id="plausible-q" strategy="afterInteractive">
            {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
          </Script>
        </>
      ) : null}
    </>
  );
}
