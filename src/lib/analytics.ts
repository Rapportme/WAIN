/* Analytics events — a no-op until an analytics tool is switched on.
   The tools are loaded by components/layout/Analytics.tsx only when their
   repository variable is set (GA_ID and/or PLAUSIBLE_DOMAIN). */

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

/** e.g. track("generate_lead", { form: "contact" }) or track("whatsapp_click", { place: "floating" }). */
export function track(event: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, props);
    window.plausible?.(event, { props });
  } catch {
    /* analytics must never break the page */
  }
}
