"use client";

import { CONTACT, hasPhone, hasWhatsApp, telHref, whatsappHref } from "@/data/contact";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/ui/FloatingWhatsApp";

/** Call / WhatsApp lines — render nothing until a number is set in data/contact.ts. */
export function DirectLines({ place }: { place: string }) {
  if (!hasPhone && !hasWhatsApp) return null;
  return (
    <div className="direct-lines">
      {hasWhatsApp ? (
        <a
          className="dl-wa"
          href={whatsappHref()}
          target="_blank"
          rel="noopener"
          onClick={() => track("whatsapp_click", { place })}
        >
          <WhatsAppIcon /> WhatsApp us
        </a>
      ) : null}
      {hasPhone ? (
        <a className="dl-tel" href={telHref()} onClick={() => track("call_click", { place })}>
          Call {CONTACT.phoneDisplay || CONTACT.phone}
        </a>
      ) : null}
    </div>
  );
}
