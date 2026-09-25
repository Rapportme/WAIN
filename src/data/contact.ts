/**
 * How people reach the collective directly. One place, so the header, the
 * contact page, the end of every article, the floating WhatsApp button and the
 * structured data can never disagree.
 *
 * PHONE / WHATSAPP: fill the three values below (or pass them as the build
 * variables NEXT_PUBLIC_PHONE, NEXT_PUBLIC_PHONE_DISPLAY, NEXT_PUBLIC_WHATSAPP).
 *   phone          E.164, no spaces            e.g. "+919876543210"
 *   phoneDisplay   how it reads on the page    e.g. "+91 98765 43210"
 *   whatsapp       digits only, for wa.me      e.g. "919876543210" (same number is fine)
 * While they are empty, every call and WhatsApp button stays hidden and the
 * schema carries no telephone — nothing half-filled ever ships.
 */
export const CONTACT = {
  email: "hello@wearein.in",
  phone: (process.env.NEXT_PUBLIC_PHONE || "" /* ← number here */).replace(/\s+/g, ""),
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D+/g, ""),
  whatsappMessage: "Hi We Are In, I'd like to talk about my business.",
};

export const hasPhone = CONTACT.phone.length > 0;
export const hasWhatsApp = CONTACT.whatsapp.length > 0;

export function whatsappHref(message: string = CONTACT.whatsappMessage): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${CONTACT.phone}`;
}
