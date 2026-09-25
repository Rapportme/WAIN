import { describeAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

/* ============================================================================
   Website → admin CRM.

   Both site forms (contact and Growth Diagnosis) post here so every enquiry
   lands as a lead in the WAIN admin (CRM & Pipeline), whether or not any email
   transport is configured.

   The call goes to one Supabase database function, submit_website_lead(). It is
   the only thing the public key can do on that database: it validates the
   fields, drops honeypot hits, rate-limits per email and overall, then creates
   (or reuses) the lead and logs the message against it. The key below is the
   project's publishable key — public by design, like every NEXT_PUBLIC_* value.
   ========================================================================= */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mbpilqthxuzmkjacofpk.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_S2LAz_vrBIgZW4w2ma5lqw_Ies8rGFb";

export type CrmForm = "contact" | "diagnosis";

/** True when the lead was stored. Never throws — a CRM hiccup must not cost the visitor their message. */
export async function submitToCrm(form: CrmForm, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/submit_website_lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
      body: JSON.stringify({ p_form: form, p_payload: { ...payload, came_from: describeAttribution() } }),
    });
    if (!res.ok) throw new Error(`crm returned ${res.status}: ${await res.text().catch(() => "")}`);
    track("generate_lead", { form });
    return true;
  } catch (err) {
    console.warn("[crm] the enquiry could not be saved:", err);
    return false;
  }
}
