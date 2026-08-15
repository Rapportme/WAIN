/* ============================================================================
   Growth Diagnosis — the client.

   The diagnosis is written entirely in the browser by the deterministic scorer
   in ./localRead. Nothing about producing the read needs a network call.

   The one thing the browser cannot do is send email, so when the founder asks
   for the detailed report it also POSTs the answers to the mail endpoint, which
   recomputes the same report server-side and sends it. Configure with:

       NEXT_PUBLIC_DIAGNOSIS_API=https://…workers.dev

   With no endpoint configured, everything still works — the report opens on
   screen and the UI says plainly that no email was sent.
   ========================================================================= */

import { localDetailed, localInstant } from "./localRead";
import type { Answers, DetailedDiagnosis, InstantDiagnosis, LeadDetails } from "./types";

const ENDPOINT = process.env.NEXT_PUBLIC_DIAGNOSIS_API || "";

export interface Diagnosed<T> {
  data: T;
  /** True only when the endpoint confirmed the report was actually emailed. */
  emailed: boolean;
}

/** No network call — the read is produced locally, so this cannot fail. */
export async function runInstant(answers: Answers): Promise<Diagnosed<InstantDiagnosis>> {
  return { data: localInstant(answers), emailed: false };
}

export async function runDetailed(
  answers: Answers,
  lead: LeadDetails,
): Promise<Diagnosed<DetailedDiagnosis>> {
  // Computed first and independently of the send: the founder gets their report
  // on screen whether or not the email goes out.
  const data = localDetailed(answers);
  if (!ENDPOINT) return { data, emailed: false };

  try {
    const res = await fetch(`${ENDPOINT.replace(/\/$/, "")}/detailed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, lead }),
    });
    if (!res.ok) throw new Error(`mail endpoint returned ${res.status}`);
    const json = (await res.json()) as { emailed?: boolean };
    return { data, emailed: json.emailed === true };
  } catch (err) {
    // A delivery failure must never cost the founder their report.
    console.warn("[diagnosis] the report could not be emailed:", err);
    return { data, emailed: false };
  }
}

/** Whether an email endpoint is configured at all — drives the form's copy. */
export const hasEndpoint = Boolean(ENDPOINT);
