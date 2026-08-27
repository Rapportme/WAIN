/* ============================================================================
   Contact form — the send.

   The site is a static export on GitHub Pages, so the browser cannot send mail
   and the page cannot hold a secret: every NEXT_PUBLIC_* value is inlined into
   the JS bundle. Sending therefore happens somewhere else. Two transports are
   supported, in this order:

   1. Web3Forms — the default. Set:

          NEXT_PUBLIC_WEB3FORMS_KEY=<access key>

      The key is public by design; Web3Forms filters spam on their side and mail
      lands in whichever inbox the key is registered to. No DNS, no server.

   2. The Cloudflare Worker in worker/ — its POST /contact route. Set either
      NEXT_PUBLIC_CONTACT_API or NEXT_PUBLIC_DIAGNOSIS_API. Higher limits and an
      origin allowlist, but it needs the sending domain verified in Resend.
      Configure this and it wins over Web3Forms.

   With neither configured the form does not pretend to have sent anything: it
   hands the reader a prefilled mailto: so the message still gets where it was
   going.
   ========================================================================= */

import type { ContactMessage } from "./types";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const WORKER_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API || process.env.NEXT_PUBLIC_DIAGNOSIS_API || "";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export const CONTACT_EMAIL = "hello@wearein.in";

/** Which transport this build will use, if any. */
export type Transport = "worker" | "web3forms" | "none";

export const transport: Transport = WORKER_ENDPOINT
  ? "worker"
  : WEB3FORMS_KEY
    ? "web3forms"
    : "none";

/** Whether a send path exists at all — drives the form's copy. */
export const hasEndpoint = transport !== "none";

export interface SendResult {
  sent: boolean;
  /** Set when the send failed, so the page can offer the mailto fallback. */
  error?: string;
}

/** A prefilled mail draft — the fallback, and the manual escape hatch. */
export function mailtoHref(msg: ContactMessage): string {
  const body = [
    msg.message,
    "",
    "—",
    `Name: ${msg.name}`,
    msg.company ? `Company: ${msg.company}` : "",
    `Email: ${msg.email}`,
    msg.phone ? `Phone: ${msg.phone}` : "",
    msg.stage ? `Where we are: ${msg.stage}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const subject = msg.company ? `Hello from ${msg.company}` : `Hello from ${msg.name}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function subjectFor(msg: ContactMessage): string {
  return `Contact form — ${msg.name}${msg.company ? `, ${msg.company}` : ""}`;
}

/**
 * Web3Forms emails every field it is given, so the keys are written the way
 * they should read in the inbox rather than the way they're named in code.
 * `replyto` is what makes a plain reply reach the sender.
 */
async function sendViaWeb3Forms(msg: ContactMessage, botcheck: string): Promise<SendResult> {
  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: subjectFor(msg),
      from_name: "wearein.in — contact form",
      replyto: msg.email,
      // The honeypot. Web3Forms drops the submission when this is filled.
      botcheck,
      Name: msg.name,
      Company: msg.company || "—",
      Email: msg.email,
      Phone: msg.phone || "—",
      "Where the business is": msg.stage || "—",
      Message: msg.message,
    }),
  });

  const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!res.ok || json?.success !== true) {
    throw new Error(`web3forms: ${json?.message ?? res.status}`);
  }
  return { sent: true };
}

async function sendViaWorker(msg: ContactMessage): Promise<SendResult> {
  const res = await fetch(`${WORKER_ENDPOINT.replace(/\/$/, "")}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg }),
  });
  if (!res.ok) throw new Error(`contact endpoint returned ${res.status}`);
  const json = (await res.json()) as { sent?: boolean };
  // The page says "we've got it" only when the send is confirmed.
  return { sent: json.sent === true, error: json.sent === true ? undefined : "not-sent" };
}

export async function sendContact(msg: ContactMessage, botcheck = ""): Promise<SendResult> {
  if (transport === "none") return { sent: false, error: "not-configured" };

  try {
    return transport === "worker"
      ? await sendViaWorker(msg)
      : await sendViaWeb3Forms(msg, botcheck);
  } catch (err) {
    console.warn("[contact] the message could not be sent:", err);
    return { sent: false, error: "failed" };
  }
}
