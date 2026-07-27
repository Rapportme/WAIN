/**
 * The book's table of contents. The page is a real sequence: each chapter is
 * printed in its own ink, and the rail is a colour ladder down the right edge.
 */
export interface RailChapter {
  /** DOM id of the <section>. */
  id: string;
  /** Short label shown on hover in the rail. */
  label: string;
  /** The chapter's ink (the rail tick colour). */
  ink: string;
  /** Dark-plate chapters flip the rail to its on-dark palette. */
  dark?: boolean;
}

export const RAIL_CHAPTERS: readonly RailChapter[] = [
  { id: "cover", label: "Cover", ink: "#0E9AA7" },
  { id: "routes", label: "Three ways in", ink: "#92B67E" },
  { id: "problem", label: "The problem", ink: "#F45D5D" },
  { id: "position", label: "Where you are", ink: "#0E9AA7" },
  { id: "why", label: "Why partner", ink: "#92B67E" },
  { id: "experience", label: "Experience", ink: "#F4B22D" },
  { id: "method", label: "How we work", ink: "#4FD0D0", dark: true },
  { id: "situations", label: "Challenges", ink: "#F45D5D" },
  { id: "thinking", label: "Our thinking", ink: "#8E78C7" },
  { id: "promise", label: "Our promise", ink: "#F4B22D", dark: true },
  { id: "diagnosis", label: "Diagnosis", ink: "#92B67E" },
  { id: "close", label: "Let's talk", ink: "#0E9AA7" },
];

/* ---- guided path (chapter 00b) ----
   A path is a list of real chapter numbers. Picking a stage also sets
   chapter 02 (Position) to match. */

export interface ChapterRef {
  n: string;
  t: string;
  id: string;
  c: string;
}

export const CH: Record<string, ChapterRef> = {
  problem: { n: "01", t: "The problem", id: "problem", c: "#F45D5D" },
  position: { n: "02", t: "Where you are", id: "position", c: "#0E9AA7" },
  why: { n: "03", t: "Why partner", id: "why", c: "#92B67E" },
  exp: { n: "04", t: "Experience", id: "experience", c: "#F4B22D" },
  method: { n: "05", t: "How we work", id: "method", c: "#0E9AA7" },
  sit: { n: "06", t: "Challenges", id: "situations", c: "#F45D5D" },
  think: { n: "07", t: "Our thinking", id: "thinking", c: "#8E78C7" },
  promise: { n: "08", t: "Our promise", id: "promise", c: "#96690A" },
  diag: { n: "09", t: "Growth diagnosis", id: "diagnosis", c: "#5C8347" },
  close: { n: "10", t: "Let's talk", id: "close", c: "#0E9AA7" },
};

export type StageKey = "starting" | "growing" | "stuck" | "scaling" | "reinventing";

export interface Stage {
  /** Index of the matching Position tab (chapter 02). */
  i: number;
  say: string;
  path: (keyof typeof CH)[];
}

export const STAGES: Record<StageKey, Stage> = {
  starting: {
    i: 0,
    say: "You're early — which is the cheapest place to get this right. Start with what's true, then decide what to spend.",
    path: ["problem", "position", "method", "diag", "close"],
  },
  growing: {
    i: 1,
    say: "Something's working. The job is finding out what, so it keeps working when you stop guessing.",
    path: ["position", "exp", "method", "diag", "close"],
  },
  stuck: {
    i: 2,
    say: "You're not short of effort. You're short of direction — so we'd start by taking things away.",
    path: ["problem", "position", "sit", "diag", "close"],
  },
  scaling: {
    i: 3,
    say: "Demand is real. The question is whether the business can carry it without something quietly breaking.",
    path: ["position", "sit", "method", "diag", "close"],
  },
  reinventing: {
    i: 4,
    say: "The story needs rebuilding from what's true now, not from what used to work.",
    path: ["problem", "why", "position", "think", "close"],
  },
};

/** Chip labels + their marker shape, in display order. */
export const STAGE_CHIPS: { k: StageKey; label: string; shape: string }[] = [
  { k: "starting", label: "Starting", shape: "mk-cir" },
  { k: "growing", label: "Growing", shape: "mk-tri" },
  { k: "stuck", label: "Stuck", shape: "mk-sq" },
  { k: "scaling", label: "Scaling", shape: "mk-wedge" },
  { k: "reinventing", label: "Reinventing", shape: "mk-cir" },
];
