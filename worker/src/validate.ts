/* ============================================================================
   Request validation.

   This endpoint is publicly reachable — its URL is inlined into the site's JS
   bundle — so every field is checked before a token is spent. Anything that
   isn't recognisably a diagnosis submission is rejected here rather than
   forwarded to the model.
   ========================================================================= */

import { QUESTIONS } from "../../src/lib/diagnosis/questions";
import type { Answers, LeadDetails } from "../../src/lib/diagnosis/types";
import { CONTACT_LIMITS, CONTACT_STAGES, type ContactMessage } from "../../src/lib/contact/types";

const IDS = new Set(QUESTIONS.map((q) => q.id));
const MAX_ANSWER_CHARS = 400;
const MAX_MULTI = 12;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export class BadRequest extends Error {}

/** Accepts only q1–q15 keys, with values of the shape those questions produce. */
export function parseAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new BadRequest("answers must be an object");
  }
  const entries = Object.entries(raw as Record<string, unknown>);
  if (entries.length > IDS.size) throw new BadRequest("too many answers");

  const answers: Answers = {};
  for (const [key, value] of entries) {
    if (!IDS.has(key)) throw new BadRequest(`unknown answer key: ${key}`);

    if (typeof value === "string") {
      if (value.length > MAX_ANSWER_CHARS) throw new BadRequest(`${key} is too long`);
      answers[key] = value;
    } else if (Array.isArray(value)) {
      if (value.length > MAX_MULTI) throw new BadRequest(`${key} has too many values`);
      for (const v of value) {
        if (typeof v !== "string" || v.length > MAX_ANSWER_CHARS) {
          throw new BadRequest(`${key} contains an invalid value`);
        }
      }
      answers[key] = value as string[];
    } else if (value !== null && value !== undefined) {
      throw new BadRequest(`${key} has an invalid type`);
    }
  }

  // A submission with almost nothing answered is not worth a model call.
  const answered = Object.values(answers).filter(
    (a) => (Array.isArray(a) ? a.length > 0 : Boolean(a)),
  ).length;
  if (answered < 5) throw new BadRequest("too few answers to diagnose");

  return answers;
}

export function parseLead(raw: unknown): LeadDetails {
  if (!raw || typeof raw !== "object") throw new BadRequest("lead is required");
  const l = raw as Record<string, unknown>;

  const str = (key: string, max: number, required: boolean): string => {
    const v = l[key];
    if (typeof v !== "string" || !v.trim()) {
      if (required) throw new BadRequest(`lead.${key} is required`);
      return "";
    }
    if (v.length > max) throw new BadRequest(`lead.${key} is too long`);
    return v.trim();
  };

  const email = str("email", 200, true);
  if (!EMAIL_RE.test(email)) throw new BadRequest("lead.email is not a valid address");

  return {
    name: str("name", 120, true),
    company: str("company", 160, true),
    email,
    phone: str("phone", 40, false),
  };
}

/* ---- the contact form -------------------------------------------------- */

/**
 * Accepts only the six fields the contact form collects, each within the same
 * limits the browser enforces. Anything else is rejected here — this endpoint
 * emails on request, so an unbounded body is an unbounded email.
 */
export function parseContact(raw: unknown): ContactMessage {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new BadRequest("message is required");
  }
  const m = raw as Record<string, unknown>;

  const str = (key: keyof ContactMessage, required: boolean): string => {
    const v = m[key];
    if (typeof v !== "string" || !v.trim()) {
      if (required) throw new BadRequest(`message.${key} is required`);
      return "";
    }
    const trimmed = v.trim();
    if (trimmed.length > CONTACT_LIMITS[key]) throw new BadRequest(`message.${key} is too long`);
    return trimmed;
  };

  const email = str("email", true);
  if (!EMAIL_RE.test(email)) throw new BadRequest("message.email is not a valid address");

  const body = str("message", true);
  if (body.length < 10) throw new BadRequest("message.message is too short");

  const stage = str("stage", false);
  // A free-typed stage is not an error, but it is not one of ours either.
  const knownStage = (CONTACT_STAGES as readonly string[]).includes(stage) ? stage : "";

  return {
    name: str("name", true),
    company: str("company", false),
    email,
    phone: str("phone", false),
    stage: knownStage,
    message: body,
  };
}
