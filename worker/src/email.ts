/* ============================================================================
   Report delivery via Resend.

   Two emails go out per detailed report: the report itself to the founder, and
   a lead notification to the collective. Email clients are a decade behind
   browsers, so the markup here is deliberately old-fashioned: tables, inline
   styles, no flex, no grid, 600px wide, web fonts degrading to Georgia and a
   system sans.
   ========================================================================= */

import type { DetailedDiagnosis, LeadDetails } from "../../src/lib/diagnosis/types";
import { buildAnswerSummary } from "../../src/lib/diagnosis/prompts";
import type { Answers } from "../../src/lib/diagnosis/types";
import type { ContactMessage } from "../../src/lib/contact/types";

const NAVY = "#12263f";
const MUTED = "#5b6b7f";
const RULE = "#e2e8ef";
const TEAL = "#0e9aa7";

const DEPTS: { key: keyof DetailedDiagnosis["departments"]; label: string; ink: string }[] = [
  { key: "strategy", label: "Strategy", ink: "#f4b22d" },
  { key: "customers", label: "Customers", ink: TEAL },
  { key: "marketing", label: "Marketing", ink: "#f45d5d" },
  { key: "sales", label: "Sales", ink: "#f45d5d" },
  { key: "operations", label: "Operations", ink: "#92b67e" },
  { key: "finance", label: "Finance", ink: "#92b67e" },
  { key: "leadership", label: "Leadership &amp; founder dependency", ink: "#8e78c7" },
];

/** Everything in this email is model output or founder input — escape all of it. */
function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const label = (t: string) =>
  `<p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;` +
  `letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};">${t}</p>`;

const para = (t: string, color = NAVY) =>
  `<p style="margin:0 0 14px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.62;color:${color};">${esc(t)}</p>`;

function bullets(items: string[], dot: string): string {
  return items
    .map(
      (s) =>
        `<tr><td width="14" valign="top" style="padding:0 0 8px;"><span style="display:inline-block;width:6px;height:6px;` +
        `background:${dot};border-radius:50%;"></span></td>` +
        `<td valign="top" style="padding:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:${NAVY};">${esc(s)}</td></tr>`,
    )
    .join("");
}

/** The report's content rows — shared by the founder's copy and the internal one. */
function reportRows(report: DetailedDiagnosis): string {
  const depts = DEPTS.map(({ key, label: name, ink }) => {
    const d = report.departments?.[key];
    if (!d) return "";
    return `
      <tr><td style="padding:0 0 26px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="3" bgcolor="${ink}" style="font-size:0;line-height:0;">&nbsp;</td>
            <td style="padding-left:16px;">
              <p style="margin:0 0 10px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:${NAVY};">${name}</p>
              ${label("Current observation")}${para(d.currentObservation)}
              ${label("Why it matters")}${para(d.whyItMatters, MUTED)}
              ${label("If left unaddressed")}${para(d.ifLeftUnaddressed, MUTED)}
            </td>
          </tr>
        </table>
      </td></tr>`;
  }).join("");

  return `
        <tr><td style="border-top:1px solid ${RULE};padding-top:24px;">
          ${label("Executive summary")}${para(report.executiveSummary)}
        </td></tr>
        <tr><td style="border-top:1px solid ${RULE};padding:24px 0 18px;">
          ${label("Department-wise observations")}
        </td></tr>
        ${depts}
        <tr><td style="border-top:1px solid ${RULE};padding-top:24px;">
          ${label("Key strengths")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
            ${bullets(report.keyStrengths ?? [], "#92b67e")}
          </table>
          ${label("Areas requiring attention")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
            ${bullets(report.areasRequiringAttention ?? [], "#f45d5d")}
          </table>
        </td></tr>
        <tr><td style="border-top:1px solid ${RULE};padding-top:24px;">
          ${label("Closing summary")}${para(report.closingSummary)}
        </td></tr>`;
}

export function reportHtml(report: DetailedDiagnosis, lead: LeadDetails): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Growth Diagnosis</title></head>
<body style="margin:0;padding:0;background:#f8fafc;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;">
    <tr><td bgcolor="${TEAL}" height="4" style="font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 0;">
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">We Are In Collective</p>
      <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:normal;line-height:1.15;color:${NAVY};">Your detailed diagnosis</h1>
      <p style="margin:0 0 28px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${MUTED};">Prepared for ${esc(lead.name)}${lead.company ? ` &middot; ${esc(lead.company)}` : ""}</p>
    </td></tr>

    <tr><td style="padding:0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${reportRows(report)}
        <tr><td style="padding:8px 0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr><td bgcolor="${TEAL}" style="padding:14px 26px;">
              <a href="https://wearein.in/#close" style="font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Talk it through over coffee &rarr;</a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <tr><td bgcolor="${NAVY}" style="padding:26px 36px;">
      <p style="margin:0 0 10px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.62);">
        This report was generated using artificial intelligence from the responses you submitted. It is designed to
        support reflection and discussion, and should not replace professional business, legal, financial or
        industry-specific advice.
      </p>
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.62);">
        We Are In Collective &middot; <a href="mailto:hello@wearein.in" style="color:#4fd0d0;text-decoration:none;">hello@wearein.in</a>
      </p>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

/** The internal copy — the lead, their raw answers, and the report they were sent. */
function leadHtml(
  lead: LeadDetails,
  answers: Answers,
  report: DetailedDiagnosis,
  bhi?: number,
): string {
  return `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:${NAVY};">
<h2 style="font-size:18px;">New growth diagnosis lead</h2>
<p><b>${esc(lead.name)}</b> &middot; ${esc(lead.company)}<br>
<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>${lead.phone ? ` &middot; ${esc(lead.phone)}` : ""}
${bhi != null ? `<br>Health index: <b>${bhi}</b>` : ""}</p>
<h3 style="font-size:14px;">Their answers</h3>
<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.55;background:#f8fafc;padding:14px;">${esc(
    buildAnswerSummary(answers),
  )}</pre>
<h3 style="font-size:14px;margin:26px 0 0;">The report they were sent</h3>
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;">
  ${reportRows(report)}
</table>
</body></html>`;
}

interface SendEnv {
  RESEND_API_KEY: string;
  MAIL_FROM: string;
  MAIL_NOTIFY?: string;
}

async function send(env: SendEnv, to: string, subject: string, html: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend returned ${res.status}: ${await res.text()}`);
}

/**
 * Sends the report and the internal notification. Returns whether the founder's
 * copy actually went out — the UI says "a copy is on its way" only on true, so
 * this must never report success it isn't sure of.
 */
export async function deliverReport(
  env: SendEnv,
  lead: LeadDetails,
  report: DetailedDiagnosis,
  answers: Answers,
): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return false;

  let delivered = false;
  try {
    await send(env, lead.email, "Your Growth Diagnosis — We Are In Collective", reportHtml(report, lead), "hello@wearein.in");
    delivered = true;
  } catch (err) {
    console.error("[diagnosis] report delivery failed:", err);
  }

  // The lead notification must not be able to fail the founder's copy, and a
  // failure here is still worth logging — it's a lost lead, not a lost report.
  if (env.MAIL_NOTIFY) {
    try {
      await send(
        env,
        env.MAIL_NOTIFY,
        `Diagnosis lead — ${lead.name}, ${lead.company}`,
        leadHtml(lead, answers, report),
        lead.email,
      );
    } catch (err) {
      console.error("[diagnosis] lead notification failed:", err);
    }
  }

  return delivered;
}

/* ---- the contact form -------------------------------------------------- */

/** Just the first word of the name — the greeting, not the record. */
function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

function contactNotifyHtml(msg: ContactMessage): string {
  const row = (k: string, v: string) =>
    v ? `<tr><td style="padding:2px 14px 2px 0;color:${MUTED};">${k}</td><td><b>${esc(v)}</b></td></tr>` : "";

  return `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:${NAVY};">
<h2 style="font-size:18px;margin:0 0 14px;">New message from the contact form</h2>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;margin-bottom:18px;">
  ${row("Name", msg.name)}
  ${row("Company", msg.company)}
  <tr><td style="padding:2px 14px 2px 0;color:${MUTED};">Email</td><td><a href="mailto:${esc(msg.email)}">${esc(msg.email)}</a></td></tr>
  ${row("Phone", msg.phone)}
  ${row("Where they are", msg.stage)}
</table>
<h3 style="font-size:14px;margin:0 0 8px;">What they wrote</h3>
<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:13px;line-height:1.6;background:#f8fafc;padding:14px;margin:0;">${esc(
    msg.message,
  )}</pre>
</body></html>`;
}

/** The reader's copy — short, and it repeats what they sent so they have it. */
function contactAckHtml(msg: ContactMessage): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>We've got your message</title></head>
<body style="margin:0;padding:0;background:#f8fafc;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;">
    <tr><td bgcolor="${TEAL}" height="4" style="font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">We Are In Collective</p>
      <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;line-height:1.18;color:${NAVY};">Thanks, ${esc(
        firstName(msg.name),
      )}. We&rsquo;ve got it.</h1>
      ${para(
        "A human reads this inbox — usually the same day, and always within two working days. When we reply it will probably be with a question rather than a deck.",
        MUTED,
      )}
    </td></tr>
    <tr><td style="padding:0 36px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border-top:1px solid ${RULE};padding-top:22px;">
          ${label("What you sent us")}
          <p style="margin:0;white-space:pre-wrap;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.62;color:${NAVY};">${esc(
            msg.message,
          )}</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:26px 36px 34px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr><td bgcolor="${TEAL}" style="padding:14px 26px;">
          <a href="https://wearein.in/diagnosis/" style="font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">While you wait: take the growth diagnosis &rarr;</a>
        </td></tr>
      </table>
    </td></tr>
    <tr><td bgcolor="${NAVY}" style="padding:24px 36px;">
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.62);">
        We Are In Collective &middot; <a href="mailto:hello@wearein.in" style="color:#4fd0d0;text-decoration:none;">hello@wearein.in</a>
      </p>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

/**
 * Sends the message to the collective and an acknowledgement to the sender.
 * Returns whether the collective's copy went out — that is the one the page's
 * "we've got it" claim depends on, so the acknowledgement must not decide it.
 */
export async function deliverContact(env: SendEnv, msg: ContactMessage): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return false;

  const to = env.MAIL_NOTIFY || "hello@wearein.in";
  let delivered = false;
  try {
    await send(
      env,
      to,
      `Contact form — ${msg.name}${msg.company ? `, ${msg.company}` : ""}`,
      contactNotifyHtml(msg),
      msg.email,
    );
    delivered = true;
  } catch (err) {
    console.error("[contact] notification failed:", err);
  }

  // A failed acknowledgement is a worse reply, not a lost message.
  if (delivered) {
    try {
      await send(
        env,
        msg.email,
        "We've got your message — We Are In Collective",
        contactAckHtml(msg),
        "hello@wearein.in",
      );
    } catch (err) {
      console.error("[contact] acknowledgement failed:", err);
    }
  }

  return delivered;
}
