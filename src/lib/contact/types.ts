/** What the contact form collects. Kept in one place: the browser validates
    against it, and the Worker re-validates the same shape before sending. */
export interface ContactMessage {
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Where the business is right now — the Position chapter's five stages. */
  stage: string;
  message: string;
}

export const CONTACT_STAGES = [
  "Just starting",
  "Growing",
  "Stuck",
  "Scaling",
  "Reinventing",
  "Not sure yet",
] as const;

export const CONTACT_LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  stage: 40,
  message: 4000,
} as const;
