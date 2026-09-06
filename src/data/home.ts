/**
 * Home chapter copy — ported verbatim from the prototype (p3_home.js), with the
 * copy fixes noted in PORT-SPEC.md (#3: Situations item 03).
 */

/** Chapter chips used by the guided path (00b). Keyed by chapter number. */
export interface HomeChapter {
  n: string;
  t: string;
  /** Section id on the home page. */
  a: string;
  /** Chip colour. */
  c: string;
}

export const HOME_CH: readonly HomeChapter[] = [
  { n: "01", t: "The problem", a: "problem", c: "#F45D5D" },
  { n: "02", t: "Where you are", a: "position", c: "#0E9AA7" },
  { n: "03", t: "Why partner", a: "why", c: "#92B67E" },
  { n: "04", t: "Experience", a: "experience", c: "#F4B22D" },
  { n: "05", t: "How we work", a: "method", c: "#0E9AA7" },
  { n: "06", t: "Challenges", a: "situations", c: "#F45D5D" },
  { n: "07", t: "Our thinking", a: "thinking", c: "#8E78C7" },
  { n: "08", t: "Our promise", a: "promise", c: "#96690A" },
  { n: "09", t: "Growth diagnosis", a: "diagnosis", c: "#5C8347" },
  { n: "10", t: "Let's talk", a: "close", c: "#0E9AA7" },
];

export const chapterByNum = (n: string): HomeChapter | undefined => HOME_CH.find((c) => c.n === n);

export interface HomeStage {
  k: string;
  mk: string;
  say: string;
  path: string[];
}

export const HOME_STAGES: readonly HomeStage[] = [
  {
    k: "Starting",
    mk: "mk-cir",
    say: "You're early — which is the cheapest place to get this right. Start with what's true, then decide what to spend.",
    path: ["01", "02", "05", "09", "10"],
  },
  {
    k: "Growing",
    mk: "mk-tri",
    say: "Something's working. The job is finding out what, so it keeps working when you stop guessing.",
    path: ["02", "04", "05", "09", "10"],
  },
  {
    k: "Stuck",
    mk: "mk-sq",
    say: "You're not short of effort. You're short of direction — so we'd start by taking things away.",
    path: ["01", "02", "06", "09", "10"],
  },
  {
    k: "Scaling",
    mk: "mk-wedge",
    say: "Demand is real. The question is whether the business can carry it without something quietly breaking.",
    path: ["02", "06", "05", "09", "10"],
  },
  {
    k: "Reinventing",
    mk: "mk-cir",
    say: "The story needs rebuilding from what's true now, not from what used to work.",
    path: ["01", "03", "02", "07", "10"],
  },
];

export interface HomePosition {
  n: string;
  k: string;
  q: string;
  t: string;
  s: string;
}

export const POS: readonly HomePosition[] = [
  {
    n: "01",
    k: "Starting",
    q: "“We have an idea, maybe a product. We just need people to see it.”",
    t: "You have a product and an audience, but no proof yet. Attention bought before proof is attention wasted — the most expensive way to learn the promise isn't landing.",
    s: "One offer. One audience. One promise you can defend under pressure. Most of the first month is spent deleting things — which feels like nothing and is worth everything.",
  },
  {
    n: "02",
    k: "Growing",
    q: "“It's working. We just don't fully know why.”",
    t: "Something is working, and it usually isn't the thing you're crediting. Growth you can't explain is growth you can't repeat — and it will stop without telling you why.",
    s: "Trace your last twenty customers backwards, by hand. Find the channel quietly doing the work. Then stop starving it to feed the one that photographs better.",
  },
  {
    n: "03",
    k: "Stuck",
    q: "“The team's putting in effort. Nothing's moving the way it used to.”",
    t: "You aren't short of effort. You're short of direction. Activity is currently making the problem harder to see, because everyone's too tired to ask whether any of it is working.",
    s: "Stop three things. Not one — three. Then we watch what the business does when it isn't distracted. That's usually where the real constraint finally shows itself.",
  },
  {
    n: "04",
    k: "Scaling",
    q: "“Demand is real. Can we carry the weight of it?”",
    t: "The question isn't demand — it's whether your systems, team and brand can hold it. Fast growth without structure just means faster chaos, and something quietly breaks first.",
    s: "Map what your team repeats every week, then remove, simplify or automate it. This is where systems and AI earn their keep — making growth repeatable instead of heroic.",
  },
  {
    n: "05",
    k: "Reinventing",
    q: "“The market shifted, or we did. Time to rebuild the story.”",
    t: "Positioning that made sense five years ago rarely still fits. This isn't a refresh — it's a rebuild of the story, starting from what's true now rather than what used to work.",
    s: "Build from where the market is today, not from where the brand used to be. Everything else follows.",
  },
];

export const MOVES: readonly [string, string][] = [
  ["Observe", "We watch before we advise. Revenue, customers, constraints — the real shape of the business, not the Instagram version of it."],
  ["Understand", "We ask until the real problem shows itself. It's usually not the one you named when you first got in touch."],
  ["Challenge", "We say what needs to be said, not what's easy to hear — including \"do nothing yet,\" when that's the honest answer."],
  ["Execute", "We move with intent, not urgency. Built by the same people who did the diagnosing, so nothing gets lost in translation."],
  ["Measure", "We track what actually moves the business — leads, conversion, revenue, hours saved. Not impressions."],
  ["Improve", "Businesses evolve, so the work should too. Keep what works, kill what doesn't, and say plainly which is which."],
];

export const SITS: readonly [string, string][] = [
  ["“We're getting traffic, but it's not converting.”", "A clarity problem, not a traffic problem. The people arriving can't quickly tell what you do, who it's for, or why it beats the alternative — so they leave to go and be sure somewhere else."],
  ["“We've tried marketing before, and it didn't work.”", "Often the strategy was fine. The foundation wasn't ready. Marketing amplified a business that hadn't yet decided what it was — so it amplified the confusion too."],
  ["“I only have an idea — I'll get in touch once I've figured more out.”", "That's usually the best time to start, not after. The earliest decisions are the cheapest to get right and the most expensive to unpick later."],
  ["“We don't know what makes us different anymore.”", "The problem isn't that you aren't different. Your business has simply evolved faster than your story. That's why it's hard to see. An outside perspective helps bring it back into focus."],
  ["“Our team is stretched thin, doing a bit of everything.”", "Growth without systems eventually breaks something. This is where mapping the repeated work — then removing, simplifying or automating it — buys back the hours you're currently spending on friction."],
  ["“We're growing, but it doesn't feel in control.”", "Fast growth without structure just means faster chaos. The fix isn't slowing down — it's putting a spine under the thing so it can carry more weight without cracking."],
  ["“We want to use AI, but don't know where to start.”", "Most businesses need a use case before they need a tool. We start from the hour your team keeps losing, not the software everyone's talking about this month."],
];

/** [headline, marker shape, reference label, body] */
export const BELIEFS: readonly [string, string, string, string][] = [
  ["We tell you the truth. Even when it's not what you want to hear — especially then.", "mk-cir", "Partnership", "If you don't need what we sell, you'll hear it from us, not from your bank statement six months later. Honesty is the whole product; everything else is delivery."],
  ["We think beyond marketing. If the real problem is sales, systems or clarity, that's where we begin.", "mk-tri", "Growth", "Marketing sits next to pricing, operations, product and sales. Growth comes from the whole business, not the one corner everyone can see. We look at all of it."],
  ["We become part of your team. Not a vendor you manage — a partner you think out loud with.", "mk-sq", "Action", "You get the people who did the thinking, in the room. No account manager relaying messages between you and someone you've never actually met."],
  ["We build for long-term growth. Not campaigns that spike and fade — growth that compounds.", "mk-cir", "Impact", "A campaign is a spike; a system is a slope. We'll help you win this quarter, but we're building the thing that still works in three years."],
];

/** [count target, suffix, caption] */
export const STATS: readonly [string, string, string][] = [
  ["23", "+", "years of combined entrepreneurial experience"],
  ["5", "", "businesses founded or co-founded — active across Kerala and the Middle East"],
  ["6", "+", "countries served, from the UK to Australia"],
  ["1", "", "brand doctor with an actual dental degree"],
];

/** Blog format → label / ink class / marker, as the prototype's FMT map. */
export const FMT = {
  PERSPECTIVE: { l: "Perspective", pl: "Perspectives", cls: "f-persp", mk: "mk-cir" },
  OBSERVATION: { l: "Observation", pl: "Observations", cls: "f-obs", mk: "mk-cir" },
  "CASE STUDY": { l: "Case study", pl: "Case studies", cls: "f-case", mk: "mk-tri" },
} as const;

export const pad2 = (n: number): string => String(n).padStart(2, "0");
