/* ============================================================================
   Growth Diagnosis — the local read.

   A deterministic, rule-based diagnosis used when no NEXT_PUBLIC_DIAGNOSIS_API
   endpoint is configured (or when that endpoint is unreachable). The site is a
   static export with no server of its own, so this keeps the whole flow honest
   and demoable today; the same shapes come back from the model-backed endpoint
   once it exists, so nothing downstream changes.

   It scores eight dimensions from the closed questions, weights them by
   revenue stage, then writes the read from banded copy. No randomness — the
   same answers always produce the same diagnosis.
   ========================================================================= */

import { QUESTIONS } from "./questions";
import type {
  Answers,
  DepartmentKey,
  DepartmentRead,
  DetailedDiagnosis,
  InstantDiagnosis,
} from "./types";

/* ---- scoring ------------------------------------------------------------ */

type DimKey = DepartmentKey | "acquisition";

/** Score per option index, in the order the options are listed. */
const SCALES: Record<Exclude<DimKey, "acquisition">, { q: string; scores: number[] }> = {
  strategy: { q: "q5", scores: [95, 68, 42, 28, 32] },
  customers: { q: "q6", scores: [95, 76, 52, 28, 32] },
  marketing: { q: "q8", scores: [92, 70, 48, 34, 20, 32] },
  sales: { q: "q9", scores: [92, 68, 44, 26, 32] },
  operations: { q: "q10", scores: [94, 70, 46, 26, 32] },
  finance: { q: "q11", scores: [95, 78, 55, 34, 20, 32] },
  leadership: { q: "q14", scores: [95, 74, 46, 22, 32] },
};

/** Option order is the scale, so the answer's index in the question bank is the score. */
function optionIndex(qid: string, value: unknown): number {
  if (typeof value !== "string") return -1;
  const opts = QUESTIONS.find((q) => q.id === qid)?.options;
  return opts ? opts.indexOf(value) : -1;
}

/** Revenue band → stage tier 0–4. */
function stageTier(answers: Answers): number {
  const band = typeof answers.q4 === "string" ? answers.q4 : "";
  if (band === "Pre-revenue") return 0;
  if (["Under ₹50,000", "₹50,000 – ₹1 Lakh", "₹1 – ₹2 Lakhs"].includes(band)) return 1;
  if (["₹2 – ₹5 Lakhs", "₹5 – ₹10 Lakhs"].includes(band)) return 2;
  if (band === "₹10 – ₹25 Lakhs") return 3;
  if (band === "Above ₹25 Lakhs") return 4;
  return 1;
}

const STAGE_LABEL = [
  "pre-revenue",
  "early-revenue",
  "growing",
  "structuring",
  "scaling",
] as const;

/** How much each dimension counts, by stage. Delegation only matters once
    there is something to delegate; validation stops mattering once there isn't. */
const WEIGHTS: Record<DimKey, number[]> = {
  //             tier 0  1    2    3    4
  strategy: [1.4, 1.1, 1.0, 1.1, 1.2],
  customers: [1.8, 1.5, 1.1, 0.9, 0.9],
  acquisition: [1.3, 1.4, 1.2, 1.0, 0.9],
  marketing: [0.8, 1.3, 1.4, 1.1, 1.0],
  sales: [0.9, 1.4, 1.4, 1.2, 1.0],
  operations: [0.5, 0.8, 1.2, 1.4, 1.4],
  finance: [0.7, 1.1, 1.2, 1.3, 1.3],
  leadership: [0.3, 0.7, 1.1, 1.5, 1.6],
};

const DIMS: DimKey[] = [
  "strategy", "customers", "acquisition", "marketing",
  "sales", "operations", "finance", "leadership",
];

const weightOf = (d: DimKey, tier: number): number => WEIGHTS[d][tier] ?? 1;

/** Stage tier is derived, never user-supplied, but the copy tables are indexed
    by it — so clamp once here rather than guarding at every use. */
const stageFrame = (tier: number): string => STAGE_FRAME[tier] ?? STAGE_FRAME[1];
const stageLabel = (tier: number): string => STAGE_LABEL[tier] ?? STAGE_LABEL[1];

/** Channel breadth from q7 — "still acquiring" and "not sure" are not channels. */
function acquisitionScore(answers: Answers): number {
  const picked = Array.isArray(answers.q7) ? answers.q7 : [];
  const real = picked.filter(
    (p) => p !== "We are still acquiring our first customers." && p !== "I'm not sure",
  );
  const durable = real.filter((p) => p === "Repeat Customers" || p === "Organic Marketing" || p === "Partnerships");
  if (real.length === 0) return picked.includes("I'm not sure") ? 30 : 26;
  const base = [0, 44, 60, 72, 82, 88][Math.min(real.length, 5)] ?? 88;
  return Math.min(95, base + durable.length * 4);
}

export interface Scores {
  dims: Record<DimKey, number>;
  bhi: number;
  tier: number;
  ranked: DimKey[];
  concern: string;
  /** Dimensions the founder answered "I'm not sure" on. Not the same as weak —
      an absent read has to be described as absent, not as a failing. */
  unsure: Set<DimKey>;
}

export function score(answers: Answers): Scores {
  const tier = stageTier(answers);
  const dims = {} as Record<DimKey, number>;
  const unsure = new Set<DimKey>();

  for (const key of Object.keys(SCALES) as Exclude<DimKey, "acquisition">[]) {
    const { q, scores } = SCALES[key];
    const i = optionIndex(q, answers[q]);
    dims[key] = (i >= 0 ? scores[i] : undefined) ?? 45;
    // "I'm not sure" is always the last option on these scales.
    const opts = QUESTIONS.find((x) => x.id === q)?.options;
    if (i < 0 || (opts && i === opts.length - 1)) unsure.add(key);
  }
  dims.acquisition = acquisitionScore(answers);
  const channels = Array.isArray(answers.q7) ? answers.q7 : [];
  if (!channels.length || (channels.length === 1 && channels[0] === "I'm not sure")) {
    unsure.add("acquisition");
  }

  // The founder's own read of the constraint (q12) pulls the flagged
  // dimensions down a little — self-reported friction is evidence too.
  const flagged = Array.isArray(answers.q12) ? answers.q12 : [];
  const FLAG_MAP: Record<string, DimKey[]> = {
    Customers: ["customers", "acquisition"],
    Marketing: ["marketing"],
    Sales: ["sales"],
    Team: ["leadership"],
    Operations: ["operations"],
    "Cash Flow": ["finance"],
    Strategy: ["strategy"],
    Technology: ["operations"],
  };
  for (const f of flagged) {
    for (const d of FLAG_MAP[f] ?? []) dims[d] = Math.max(12, dims[d] - 7);
  }

  // Firefighting as the dominant time sink is a founder-dependency signal.
  const time = Array.isArray(answers.q13) ? answers.q13 : [];
  if (time.includes("Firefighting")) dims.leadership = Math.max(12, dims.leadership - 6);
  if (time.includes("Strategy") && time.length <= 3) dims.strategy = Math.min(95, dims.strategy + 4);

  let weighted = 0;
  let total = 0;
  for (const d of DIMS) {
    const w = weightOf(d, tier);
    weighted += dims[d] * w;
    total += w;
  }
  const bhi = Math.max(8, Math.min(97, Math.round(weighted / total)));

  // Weakest first, weighted by stage relevance so the priority order is the
  // order this business would actually benefit from.
  const ranked = [...DIMS].sort(
    (a, b) => dims[a] / weightOf(a, tier) - dims[b] / weightOf(b, tier),
  );

  const concern = typeof answers.q15 === "string" ? answers.q15.trim() : "";
  return { dims, bhi, tier, ranked, concern, unsure };
}

function brrFor(bhi: number): string {
  const table: [number, string][] = [
    [88, "A+"], [82, "A"], [76, "A-"], [70, "B+"], [63, "B"],
    [56, "B-"], [49, "C+"], [42, "C"], [35, "C-"],
  ];
  for (const [floor, grade] of table) if (bhi >= floor) return grade;
  return "D";
}

function maturityFor(tier: number, bhi: number): string {
  if (tier === 0) return bhi >= 62 ? "Level 2 – Emerging" : "Level 1 – Formation";
  if (tier === 1) return bhi >= 58 ? "Level 3 – Establishing" : "Level 2 – Emerging";
  if (tier === 2) return bhi >= 58 ? "Level 4 – Consolidating" : "Level 3 – Establishing";
  if (tier === 3) return bhi >= 62 ? "Level 5 – Structured" : "Level 4 – Consolidating";
  return bhi >= 66 ? "Level 6 – Scaling" : "Level 5 – Structured";
}

/* ---- banded copy -------------------------------------------------------
   Four bands, not three. "unsure" exists because a founder who answered
   "I'm not sure" has told us something real — that there is no read here —
   and describing that as a weakness would be putting words in their mouth. */

type Band = "strong" | "mixed" | "weak" | "unsure";

const bandOfValue = (n: number): Band => (n >= 72 ? "strong" : n >= 48 ? "mixed" : "weak");

function bandOf(s: Scores, d: DimKey): Band {
  return s.unsure.has(d) ? "unsure" : bandOfValue(s.dims[d]);
}

/** The subject of each dimension, as a noun phrase copy can be built around. */
const SUBJECT: Record<DimKey, string> = {
  strategy: "strategic direction",
  customers: "the definition of the ideal customer",
  acquisition: "where customers come from",
  marketing: "marketing's conversion into enquiries",
  sales: "the sales process",
  operations: "day-to-day operations",
  finance: "financial visibility",
  leadership: "founder dependency",
};

/** Only used when the dimension actually scored strong — these assert facts. */
const STRENGTH_PHRASE: Record<DimKey, string> = {
  strategy: "Documented direction with measurable goals",
  customers: "Clear understanding of the ideal customer",
  acquisition: "More than one working source of customers",
  marketing: "Marketing that reliably produces enquiries",
  sales: "A sales process that does not depend on chance",
  operations: "Defined systems with clear ownership",
  finance: "Current, trustworthy business records",
  leadership: "The business runs without the founder present",
};

/** Mid-band: real ground to stand on, stated without overclaiming. */
const PARTIAL_STRENGTH: Record<DimKey, string> = {
  strategy: "Goals exist, even without a formal roadmap",
  customers: "A broadly correct read on who the customer is",
  acquisition: "At least one channel that reliably brings work",
  marketing: "Marketing that lands intermittently rather than never",
  sales: "Sales that works through consistent habit",
  operations: "Some processes already written down",
  finance: "Records kept, if not always current",
  leadership: "The business survives a short absence",
};

/** When nothing clears the bar, say something true instead of something kind.
    Indexed by stage tier so it stays appropriate. */
const HONEST_STRENGTHS: string[][] = [
  ["Willingness to examine the idea before building on it", "Nothing is locked in yet", "Full context on every part of the plan"],
  ["Willingness to look at the business honestly", "Small enough to change direction quickly", "Direct contact with every customer"],
  ["Revenue arriving consistently enough to build on", "Willingness to look at the business honestly", "Close knowledge of how the work actually gets done"],
  ["A business at a scale worth structuring properly", "Willingness to examine what is not working", "Deep operating knowledge held by the founder"],
  ["Meaningful scale already achieved", "Willingness to examine what is not working", "A business substantial enough to systematise"],
];

const ATTENTION_PHRASE: Record<DimKey, string> = {
  strategy: "Direction set situationally rather than deliberately",
  customers: "Ideal customer defined too loosely",
  acquisition: "Customer acquisition concentrated in one channel",
  marketing: "Marketing visible but not converting to enquiries",
  sales: "Sales outcomes tied to the founder personally",
  operations: "Delivery dependent on individuals, not systems",
  finance: "Limited real-time financial visibility",
  leadership: "High founder dependency across the business",
};

const FOCUS_OBSERVATION: Record<DimKey, string> = {
  strategy: "Direction appears to be set reactively rather than against a documented plan.",
  customers: "Positioning around a specific ideal customer looks like the earliest constraint.",
  acquisition: "Customer acquisition rests on a narrow base of channels.",
  marketing: "Marketing appears to generate attention without generating qualified demand.",
  sales: "The sales process looks personality-led rather than process-led.",
  operations: "Day-to-day delivery appears to depend on people rather than defined systems.",
  finance: "Financial and customer records appear too delayed to inform decisions.",
  leadership: "The business appears structurally dependent on the founder's availability.",
};

/** Mid-band attention: a real gap, but not the weak-band version of it. */
const MIXED_ATTENTION: Record<DimKey, string> = {
  strategy: "Goals set without a roadmap to test them against",
  customers: "Customer definition broadly right, not yet precise",
  acquisition: "Acquisition working, but resting on few channels",
  marketing: "Marketing effective intermittently rather than predictably",
  sales: "Sales consistent by habit rather than by process",
  operations: "Process partly documented, partly individual habit",
  finance: "Records current enough to review, not to decide on",
  leadership: "Several critical paths still route through the founder",
};

const MIXED_FOCUS: Record<DimKey, string> = {
  strategy: "Direction appears understood but not yet written down in a form the business can follow.",
  customers: "The customer is broadly identified; the precision that makes marketing cheaper is not there yet.",
  acquisition: "Acquisition works, but through few enough channels that any one of them changing would be felt.",
  marketing: "Marketing appears to work in bursts rather than at a rate that could be planned around.",
  sales: "Sales appears to rely on consistent habit, which works until someone else has to do it.",
  operations: "Process appears to be documented in parts, which typically shows up as uneven output between people.",
  finance: "Records appear current enough to look back on, but not current enough to decide with.",
  leadership: "Enough still routes through the founder that a longer absence would be felt.",
};

/** Attention items, phrased for the band so a mid area is not described as a
    weak one and an unanswered question is never reported as a weakness. Only
    ever called for dimensions needsAttention() has already kept, so there is no
    strong-band case: a strong area does not belong on this list at all. */
function attentionPhrase(s: Scores, d: DimKey): string {
  switch (bandOf(s, d)) {
    case "unsure":
      return `No clear read yet on ${SUBJECT[d]}`;
    case "mixed":
      return MIXED_ATTENTION[d];
    default:
      return ATTENTION_PHRASE[d];
  }
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** `rank` only varies the phrasing: three items built from one template read
    as a form letter, so the second and third are said differently. */
function focusObservation(s: Scores, d: DimKey, rank = 0): string {
  switch (bandOf(s, d)) {
    case "unsure":
      return rank === 0
        ? `Your responses do not yet give a clear read on ${SUBJECT[d]} — which is itself worth noticing.`
        : `${cap(SUBJECT[d])} is similarly unresolved.`;
    case "mixed":
      return MIXED_FOCUS[d];
    default:
      return FOCUS_OBSERVATION[d];
  }
}

/** Three strengths, taken best-first, each phrased for what was actually
    reported. Falls back to stage-appropriate truths rather than inventing
    capabilities the answers contradict. */
function strengthsFor(s: Scores, exclude: DimKey[] = []): string[] {
  const best = [...DIMS].sort((a, b) => s.dims[b] - s.dims[a]);
  const out: string[] = [];
  for (const d of best) {
    if (out.length === 3) break;
    // A dimension already named as needing attention cannot also be a strength;
    // listing both sides of one mid-band score just reads as self-contradiction.
    if (exclude.includes(d)) continue;
    const b = bandOf(s, d);
    if (b === "strong") out.push(STRENGTH_PHRASE[d]);
    else if (b === "mixed") out.push(PARTIAL_STRENGTH[d]);
  }
  const honest = HONEST_STRENGTHS[Math.min(s.tier, HONEST_STRENGTHS.length - 1)] ?? [];
  for (const h of honest) {
    if (out.length === 3) break;
    if (!out.includes(h)) out.push(h);
  }
  return out.slice(0, 3);
}

/** The root-cause reading: several flagged areas usually share one origin. */
function rootCause(s: Scores): string {
  const weak = new Set(s.ranked.slice(0, 4).filter((d) => s.dims[d] < 60));
  if (s.unsure.size >= 4)
    return "the most useful signal is how much of this is still unknown — several areas came back unanswered, which usually means the business is being run on instinct rather than on information";
  if (weak.has("customers") && (weak.has("marketing") || weak.has("sales")))
    return "one likely contributing factor appears to be positioning — when the ideal customer is defined loosely, marketing and sales both inherit that ambiguity rather than failing independently";
  if (weak.has("operations") && weak.has("leadership"))
    return "these patterns commonly share a single origin: work that lives in the founder's head rather than in defined systems, which limits how much the business can carry at once";
  if (weak.has("finance") && weak.has("strategy"))
    return "this may indicate that decisions are being made without current numbers to test them against, which tends to show up as strategy drift rather than as a finance problem";
  if (weak.has("acquisition") && weak.has("marketing"))
    return "your responses suggest demand generation is the binding constraint rather than delivery — the business can serve more than it can currently attract";
  if (weak.size === 0)
    return "no single area stands out as a structural weakness; at this level the constraint is more often consistency than capability";
  return "these areas appear related rather than independent, and treating them as one underlying issue is usually more productive than addressing them separately";
}

const STAGE_FRAME = [
  "At pre-revenue, the questions that matter are still whether the problem is real and the offer is wanted",
  "At early revenue, the priority is making customer acquisition repeatable rather than occasional",
  "Between ₹2 and ₹10 lakhs a month, consistency and operational discipline usually decide whether growth compounds",
  "Between ₹10 and ₹25 lakhs a month, structure — ownership, reporting, delegation — becomes the limiting factor",
  "Above ₹25 lakhs a month, the constraint is usually organisational: how much the business can run without the founder",
] as const;

/** The attention list must contain only things that actually need attention.
    Padding it to three from the ranked list puts strong areas under a heading
    that says the opposite — so this returns one or two items when that is the
    honest answer, and an empty list when nothing qualifies. */
function needsAttention(s: Scores): DimKey[] {
  return s.ranked.filter((d) => bandOf(s, d) !== "strong").slice(0, 3);
}

const NOTHING_PRESSING = "No structural weakness stands out at this stage";
const NOTHING_PRESSING_LONG =
  "Nothing in your responses points to a structural constraint. At this level the risk is usually drift — losing the discipline that got you here — rather than any specific deficiency.";

/* ---- the instant read -------------------------------------------------- */

export function localInstant(answers: Answers): InstantDiagnosis {
  const s = score(answers);
  const priority = needsAttention(s);
  const lead = priority[0];

  // Only claim a repeating pattern when more than one area actually shows it.
  const spread = DIMS.filter((d) => s.dims[d] < 60).length;
  const patternLine =
    spread >= 2
      ? "The same signal shows up in more than one part of the assessment, which usually means it is structural rather than situational."
      : "It shows up in one place rather than across the assessment, which suggests it is contained rather than systemic.";

  const paragraphOne = lead
    ? `${stageFrame(s.tier)}, and that is the lens applied here. Read together rather than question by question, ` +
      `one signal stands out ahead of the others. ${focusObservation(s, lead)} ${patternLine} ` +
      `The order below is the order this business would most likely benefit from, not the order the questions were answered.`
    : `${stageFrame(s.tier)}, and that is the lens applied here. Read across the assessment rather than ` +
      `question by question, every area came back at or above the level this stage calls for. ` +
      `That is an unusual result, and worth treating as a finding rather than a formality.`;

  const concernLine = s.concern
    ? " The concern you described in your own words is consistent with that reading."
    : "";
  const paragraphTwo =
    `Looking at what sits underneath, ${rootCause(s)}. ` +
    `A health index of ${s.bhi} places this as ${article(stageLabel(s.tier))} business that is ` +
    `${s.bhi >= 75 ? "broadly well run, with the constraint sitting in one area rather than across the board" : "uneven in maturity across areas rather than uniformly weak"}.` +
    `${concernLine} This is an initial read, and the areas above are named as observations rather than instructions.`;

  return {
    maturityLevel: maturityFor(s.tier, s.bhi),
    bhi: s.bhi,
    brr: brrFor(s.bhi),
    topStrengths: strengthsFor(s, priority),
    topAttentionAreas: priority.length ? priority.map((d) => attentionPhrase(s, d)) : [NOTHING_PRESSING],
    focusAreas: priority.length
      ? priority.map((d, i) => ({ priority: i + 1, title: focusObservation(s, d, i) }))
      : [{ priority: 1, title: NOTHING_PRESSING_LONG }],
    paragraphOne,
    paragraphTwo,
  };
}

/** "a growing business" / "an early-revenue business". */
function article(word: string): string {
  return `${/^[aeiou]/i.test(word) ? "an" : "a"} ${word}`;
}
/* ---- the detailed read ------------------------------------------------- */

const OBSERVATION: Record<DepartmentKey, Record<Band, string>> = {
  strategy: {
    strong: "The assessment indicates a documented direction with goals that can be measured, which suggests decisions are being tested against a plan rather than made in isolation.",
    mixed: "Goals appear to exist without a structured route to them. Direction seems understood at the founder level but not yet written down in a form the business can follow.",
    weak: "Decisions appear to be made situationally, day to day. Your responses suggest the business is being steered by circumstance more than by a stated intent.",
    unsure: "This came back unanswered, which is a finding in itself: it suggests direction has not yet been articulated clearly enough to describe, rather than that it is absent.",
  },
  customers: {
    strong: "The ideal customer appears clearly identified, including why they buy — the single most useful piece of information a business can hold about itself.",
    mixed: "Customer understanding appears broadly correct but loosely defined, which usually means the business is serving a range rather than a segment.",
    weak: "The ideal customer appears not yet defined with precision. This tends to be the root of problems that present themselves as marketing or pricing issues.",
    unsure: "The read on the ideal customer came back uncertain. That usually means the business serves whoever arrives, rather than a segment it has chosen deliberately.",
  },
  marketing: {
    strong: "Marketing appears to produce qualified enquiries consistently, which suggests message and audience are reasonably well matched.",
    mixed: "Marketing appears to generate interest intermittently. The activity exists; the predictability does not yet.",
    weak: "Marketing appears either inconsistent or largely absent, so demand is likely arriving through relationships rather than through a system.",
    unsure: "Marketing's effect came back unanswered, which itself suggests there is no measurement connecting activity to enquiries.",
  },
  sales: {
    strong: "The sales process appears documented and measurable, which means outcomes can be diagnosed rather than guessed at.",
    mixed: "Sales appears to work through consistent habit rather than defined process — effective now, harder to hand to anyone else.",
    weak: "Sales appears to depend heavily on the founder or to have no defined shape, which caps volume at one person's available hours.",
    unsure: "The shape of the sales process came back uncertain, which usually indicates it exists as habit rather than as anything written down or tracked.",
  },
  operations: {
    strong: "Operations appear to run on defined systems with clear ownership, which is what allows volume to increase without quality falling.",
    mixed: "Some processes appear documented while others live in individual habit, which typically produces uneven output between people.",
    weak: "Delivery appears to rest on specific individuals or on the founder directly, meaning capacity and consistency move together.",
    unsure: "How work gets done came back unanswered. In practice this tends to mean process lives in individual memory rather than anywhere it could be described.",
  },
  finance: {
    strong: "Accounts, customer data and sales records appear current, which means the numbers can be trusted when a decision needs them.",
    mixed: "Records appear to be updated periodically. Useful in hindsight, but often too delayed to influence the decision being made.",
    weak: "Business records appear inconsistent or unstructured, which makes it difficult to separate a revenue problem from a margin problem.",
    unsure: "The state of the records came back uncertain — which, for the purpose of making decisions, has much the same effect as records being out of date.",
  },
  leadership: {
    strong: "The business appears able to continue with only minor disruption in the founder's absence — a meaningful indicator of organisational maturity.",
    mixed: "A prolonged absence appears likely to cause noticeable disruption, suggesting several critical paths still route through the founder.",
    weak: "The assessment indicates a prolonged absence would disrupt the business substantially — in the more acute case, bring it close to a halt. This is the clearest form of concentration risk.",
    unsure: "What would happen in your absence came back unanswered. It is a question worth sitting with, because the answer sets a ceiling on the business.",
  },
};

const WHY_MATTERS: Record<DepartmentKey, string> = {
  strategy: "Strategy is what makes it possible to say no. Without it, every opportunity looks equally valid, and effort spreads across activities that never compound into anything.",
  customers: "Almost every other decision — pricing, message, channel, product — is downstream of knowing precisely who you serve. Clarity here reduces cost everywhere else.",
  marketing: "Marketing's job at this stage is predictability, not volume. A modest number of enquiries you can forecast is worth more than a large number you cannot.",
  sales: "A defined sales process is what turns interest into revenue at a known rate, and what makes it possible for someone other than the founder to sell.",
  operations: "Operations determine whether growth improves the business or strains it. Systems are what let output rise without quality or margin falling.",
  finance: "Current numbers are the instrument panel. Without them, problems are noticed at the point they affect cash rather than at the point they begin.",
  leadership: "How much the business depends on the founder sets a ceiling on both its growth and its value, and determines whether the founder can work on it rather than in it.",
};

const IF_UNADDRESSED: Record<DepartmentKey, string> = {
  strategy: "Businesses in this position commonly find themselves busy without moving — resources committed to several partial directions, and no clear basis for choosing between them.",
  customers: "Where this persists, marketing spend typically rises while conversion falls, because a broad message has to work harder to reach anyone specific.",
  marketing: "The usual pattern is dependence on referral flow the business cannot influence, which makes revenue difficult to plan and growth difficult to fund.",
  sales: "Commonly, enquiries are lost to follow-up rather than to competitors, and the founder becomes the only person capable of closing work.",
  operations: "Typically, quality becomes inconsistent as volume rises, and the business absorbs the cost as rework, delay and staff turnover.",
  finance: "Where records stay unreliable, decisions get made on estimates, and profitable and unprofitable work continue to look identical for too long.",
  leadership: "Businesses that stay founder-dependent tend to plateau at the founder's capacity, and remain difficult to value, delegate or step away from.",
};

export function localDetailed(answers: Answers): DetailedDiagnosis {
  const s = score(answers);
  const departments = {} as Record<DepartmentKey, DepartmentRead>;
  const keys: DepartmentKey[] = [
    "strategy", "customers", "marketing", "sales", "operations", "finance", "leadership",
  ];

  for (const k of keys) {
    // Customers reads both clarity (q6) and channel breadth (q7).
    const b: Band =
      k === "customers" && !s.unsure.has("customers") && !s.unsure.has("acquisition")
        ? bandOfValue(Math.round((s.dims.customers + s.dims.acquisition) / 2))
        : bandOf(s, k);
    departments[k] = {
      currentObservation: OBSERVATION[k][b],
      whyItMatters: WHY_MATTERS[k],
      ifLeftUnaddressed: IF_UNADDRESSED[k],
    };
  }

  const priority = needsAttention(s);
  const strengths = strengthsFor(s, priority);
  const lead = priority[0];
  const anchor = strengths[0] ?? "Willingness to look at the business honestly";

  const executiveSummary =
    `This read places the business at ${maturityFor(s.tier, s.bhi)}, with a health index of ${s.bhi} and a readiness rating of ${brrFor(s.bhi)}. ` +
    `${stageFrame(s.tier)}. ` +
    `${lead ? `Across the assessment, one signal is more consistent than the rest. ${focusObservation(s, lead)}` : "Across the assessment, no area came back below the level this stage calls for."} ` +
    `Set against that, ${anchor.toLowerCase()} is the most stable ground to work from. ` +
    `The department notes below describe what the responses indicate, why each area matters at this stage, and the difficulties that commonly follow when it is left unattended.`;

  const closingSummary =
    `Taken as a whole, this is a business with real strengths and a small number of structural constraints rather than a long list of unrelated problems. ` +
    `Looking beneath the individual answers, ${rootCause(s)}. ` +
    `${s.concern ? "The concern you described yourself sits within the same picture. " : ""}` +
    `Nothing here is a verdict; it is a starting point for a more informed conversation.`;

  return {
    executiveSummary,
    departments,
    keyStrengths: strengths,
    areasRequiringAttention: priority.length
      ? priority.map((d) => attentionPhrase(s, d))
      : [NOTHING_PRESSING],
    closingSummary,
  };
}
