/* ============================================================================
   WAIN — Growth Diagnosis mail endpoint.

   POST /detailed  { answers, lead }  ->  { emailed: boolean }

   The diagnosis itself is written by the deterministic scorer in
   src/lib/diagnosis/localRead.ts, which runs in the browser to draw the screen
   and again here to build the email. Same code, same input, no randomness — so
   the emailed report matches what the founder just read, exactly.

   The report is recomputed here rather than accepted from the request on
   purpose: an endpoint that emails caller-supplied content is a spam relay with
   your sending domain on it. The browser sends answers; only this Worker
   decides what the email says.

   This URL is inlined into the site's public JS bundle, so treat it as public:
   CORS is an allowlist, every request is rate limited by IP, and the body is
   validated before anything is sent.
   ========================================================================= */

import { localDetailed } from "../../src/lib/diagnosis/localRead";
import { deliverReport } from "./email";
import { BadRequest, parseAnswers, parseLead } from "./validate";

export interface Env {
  /** Comma-separated allowlist, e.g. "https://wearein.in,http://localhost:3000". */
  ALLOWED_ORIGINS: string;
  /** KV namespace backing the rate limiter. */
  RATE_LIMIT: KVNamespace;
  RESEND_API_KEY: string;
  /** Verified sender, e.g. "WAIN <diagnosis@wearein.in>". */
  MAIL_FROM: string;
  /** Where lead notifications go, e.g. "hello@wearein.in". */
  MAIL_NOTIFY?: string;
}

/* ---- rate limiting ------------------------------------------------------ */

const WINDOW_SECONDS = 3600;
const MAX_PER_HOUR = 5;

/**
 * Fixed-window counter per IP. Two requests in the same millisecond can each
 * read the same count, so the cap is approximate under a burst — and in
 * production KV reads can be briefly stale, which loosens it further. It exists
 * to stop the endpoint being used as a mail relay, not to be exact.
 */
async function overLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rl:mail:${ip}`;
  const current = Number((await env.RATE_LIMIT.get(key)) ?? "0");
  if (current >= MAX_PER_HOUR) return true;
  await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: WINDOW_SECONDS });
  return false;
}

/* ---- CORS -------------------------------------------------------------- */

function allowedOrigin(env: Env, origin: string | null): string | null {
  if (!origin) return null;
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return allowed.includes(origin) ? origin : null;
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders(origin) },
  });
}

/* ---- handler ----------------------------------------------------------- */

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = allowedOrigin(env, request.headers.get("Origin"));

    if (request.method === "OPTIONS") {
      // No echo without a match — an unlisted origin gets no CORS grant at all.
      return new Response(null, { status: origin ? 204 : 403, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") return json({ error: "method not allowed" }, 405, origin);
    if (!origin) return json({ error: "origin not allowed" }, 403, null);

    if (!env.RESEND_API_KEY || !env.MAIL_FROM) {
      console.error("[diagnosis] RESEND_API_KEY or MAIL_FROM is not configured");
      return json({ error: "mail is not configured" }, 500, origin);
    }

    const path = new URL(request.url).pathname.replace(/\/+$/, "");
    if (!path.endsWith("/detailed")) return json({ error: "not found" }, 404, origin);

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (await overLimit(env, ip)) return json({ error: "too many requests" }, 429, origin);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid JSON body" }, 400, origin);
    }

    try {
      const { answers: rawAnswers, lead: rawLead } = (body ?? {}) as Record<string, unknown>;
      const answers = parseAnswers(rawAnswers);
      const lead = parseLead(rawLead);

      // Recomputed here, never taken from the request.
      const report = localDetailed(answers);
      const emailed = await deliverReport(env, lead, report, answers);

      // A failed send is not a failed request — the browser already has the
      // report on screen. Reporting `emailed: false` keeps the page honest
      // rather than claiming a delivery that didn't happen.
      return json({ emailed }, 200, origin);
    } catch (err) {
      if (err instanceof BadRequest) return json({ error: err.message }, 400, origin);
      console.error("[diagnosis] unhandled error:", err);
      return json({ error: "internal error" }, 500, origin);
    }
  },
};
