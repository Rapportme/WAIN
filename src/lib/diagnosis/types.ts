/* ============================================================================
   Growth Diagnosis — shared types
   ========================================================================= */

export type QuestionType = "single" | "multi" | "search" | "text";

/** The chapter inks a question can be printed in (maps to a CSS custom property). */
export type Ink = "signal" | "sage" | "amber" | "coral" | "lav" | "ink";

export interface Question {
  id: string;
  /** Which brand ink this question is printed in. */
  ink: Ink;
  q: string;
  sub?: string;
  type: QuestionType;
  options?: readonly string[];
  maxLength?: number;
}

export type Answer = string | string[];
export type Answers = Record<string, Answer | undefined>;

export interface FocusArea {
  priority: number;
  title: string;
}

/** The on-screen first read, shown immediately after the last question. */
export interface InstantDiagnosis {
  maturityLevel: string;
  /** Business Health Index, 0–100. */
  bhi: number;
  /** Business Readiness Rating, e.g. "B+". */
  brr: string;
  topStrengths: string[];
  topAttentionAreas: string[];
  focusAreas: FocusArea[];
  paragraphOne: string;
  paragraphTwo: string;
}

export interface DepartmentRead {
  currentObservation: string;
  whyItMatters: string;
  ifLeftUnaddressed: string;
}

export type DepartmentKey =
  | "strategy"
  | "customers"
  | "marketing"
  | "sales"
  | "operations"
  | "finance"
  | "leadership";

/** The fuller department-by-department read, gated behind the email form. */
export interface DetailedDiagnosis {
  executiveSummary: string;
  departments: Record<DepartmentKey, DepartmentRead>;
  keyStrengths: string[];
  areasRequiringAttention: string[];
  closingSummary: string;
}

export interface LeadDetails {
  name: string;
  company: string;
  email: string;
  phone: string;
}
