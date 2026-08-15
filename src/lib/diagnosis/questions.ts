/* ============================================================================
   Growth Diagnosis — the instrument itself: fifteen questions, the industry
   list behind question 02, and the revenue-band guidance that keeps the read
   stage-appropriate (never "delegate more" to a pre-revenue founder).
   ========================================================================= */

import type { Question } from "./types";

export const INDUSTRIES: readonly string[] = [
  "Agriculture & Farming", "Food Processing", "Manufacturing", "Retail",
  "Wholesale & Distribution", "E-commerce", "FMCG", "Fashion & Apparel",
  "Beauty & Cosmetics", "Healthcare", "Hospitals & Clinics", "Pharmacy",
  "Medical Devices", "Wellness & Fitness", "Ayurveda", "Education", "EdTech",
  "Coaching & Training", "IT Services", "Software / SaaS", "AI & Automation",
  "Cybersecurity", "Digital Marketing", "Branding", "Advertising",
  "Media & Entertainment", "Printing & Packaging", "Photography & Videography",
  "Construction", "Architecture", "Interior Design", "Real Estate",
  "Hospitality", "Travel & Tourism", "Restaurants & Cafés", "Logistics",
  "Transportation", "Automobile", "Finance", "Banking", "Insurance", "FinTech",
  "HR & Recruitment", "Legal Services", "Consulting", "Professional Services",
  "NGO / Social Enterprise", "Government", "Telecom", "Energy",
  "Renewable Energy", "Sports", "Events", "Jewellery", "Home Décor",
  "Furniture", "Consumer Electronics", "Mobile Accessories", "3D Printing",
  "Import & Export", "Other",
];

/** Revenue answer → the guidance the model (or the local read) reasons within. */
export const REVENUE_STAGE: Record<string, string> = {
  "Pre-revenue":
    "Stage: Pre-Revenue. Appropriate focus areas at this stage are idea validation, customer discovery, problem-solution fit and positioning. Do not discuss delegation, advanced systems or scaling — they are not yet relevant.",
  "Under ₹50,000":
    "Stage: Under ₹2 Lakhs/month. Appropriate focus areas are repeatable customer acquisition, value proposition, sales discipline and financial visibility.",
  "₹50,000 – ₹1 Lakh":
    "Stage: Under ₹2 Lakhs/month. Appropriate focus areas are repeatable customer acquisition, value proposition, sales discipline and financial visibility.",
  "₹1 – ₹2 Lakhs":
    "Stage: Under ₹2 Lakhs/month. Appropriate focus areas are repeatable customer acquisition, value proposition, sales discipline and financial visibility.",
  "₹2 – ₹5 Lakhs":
    "Stage: ₹2–10 Lakhs/month. Appropriate focus areas are marketing efficiency, sales consistency, operational discipline, customer retention and basic business systems.",
  "₹5 – ₹10 Lakhs":
    "Stage: ₹2–10 Lakhs/month. Appropriate focus areas are marketing efficiency, sales consistency, operational discipline, customer retention and basic business systems.",
  "₹10 – ₹25 Lakhs":
    "Stage: ₹10–25 Lakhs/month. Appropriate focus areas are team structure, delegation, SOPs, leadership and financial reporting.",
  "Above ₹25 Lakhs":
    "Stage: Above ₹25 Lakhs/month. Appropriate focus areas are scalability, founder dependency, organisational alignment, operational maturity and data-driven decision making.",
};

export const QUESTIONS: readonly Question[] = [
  {
    id: "q1", ink: "amber",
    q: "Which best describes your current business?",
    type: "single",
    options: [
      "I only have an idea.",
      "I am validating my idea.",
      "I have launched but revenue is inconsistent.",
      "I have consistent revenue but growth has slowed.",
      "My business is growing and I want to scale.",
      "I am reinventing an existing business.",
    ],
  },
  {
    id: "q2", ink: "signal",
    q: "Which industry best describes your business?",
    type: "search",
  },
  {
    id: "q3", ink: "sage",
    q: "How many people currently work in your business?",
    type: "single",
    options: ["Just me", "2–5", "6–20", "21–50", "51+"],
  },
  {
    id: "q4", ink: "amber",
    q: "What is your approximate monthly revenue?",
    type: "single",
    options: [
      "Pre-revenue", "Under ₹50,000", "₹50,000 – ₹1 Lakh", "₹1 – ₹2 Lakhs",
      "₹2 – ₹5 Lakhs", "₹5 – ₹10 Lakhs", "₹10 – ₹25 Lakhs", "Above ₹25 Lakhs",
    ],
  },
  {
    id: "q5", ink: "lav",
    q: "Which statement best describes your business strategy?",
    type: "single",
    options: [
      "We have a clearly documented strategy with measurable goals.",
      "We have goals but no structured roadmap.",
      "We mostly make decisions based on day-to-day situations.",
      "We are still figuring things out.",
      "I'm not sure.",
    ],
  },
  {
    id: "q6", ink: "signal",
    q: "How clearly have you identified your ideal customer?",
    type: "single",
    options: ["Extremely clear", "Mostly clear", "Somewhat clear", "Not clear", "I'm not sure"],
  },
  {
    id: "q7", ink: "coral",
    q: "Where do your customers currently come from?",
    sub: "Select all that apply.",
    type: "multi",
    options: [
      "Referrals", "Organic Marketing", "Paid Marketing", "Repeat Customers",
      "Partnerships", "We are still acquiring our first customers.", "I'm not sure",
    ],
  },
  {
    id: "q8", ink: "coral",
    q: "Which statement best describes your marketing efforts?",
    type: "single",
    options: [
      "Consistently generates qualified enquiries.",
      "Generates enquiries occasionally.",
      "Creates visibility but very few enquiries.",
      "We do marketing inconsistently.",
      "We rarely or never market.",
      "I'm not sure.",
    ],
  },
  {
    id: "q9", ink: "coral",
    q: "Which statement best describes your sales process?",
    type: "single",
    options: [
      "Clearly documented and measurable.",
      "Informal but consistent.",
      "Mostly depends on the founder.",
      "No structured sales process.",
      "I'm not sure.",
    ],
  },
  {
    id: "q10", ink: "sage",
    q: "Which statement best describes your day-to-day operations?",
    type: "single",
    options: [
      "Well-defined systems with clear ownership.",
      "Some processes are documented.",
      "Work depends on individual employees.",
      "Everything depends on me.",
      "I'm not sure.",
    ],
  },
  {
    id: "q11", ink: "sage",
    q: "How up-to-date are your business records?",
    sub: "Choose the option that best describes your business.",
    type: "single",
    options: [
      "Our accounts, customer database and sales records are updated in real time.",
      "Most records are updated regularly with only minor delays.",
      "We update records periodically.",
      "Our records are often outdated or inconsistent.",
      "We do not have a structured system for maintaining business records.",
      "I'm not sure.",
    ],
  },
  {
    id: "q12", ink: "amber",
    q: "What do you believe is currently limiting your business growth?",
    sub: "Select all that apply.",
    type: "multi",
    options: [
      "Customers", "Marketing", "Sales", "Team", "Operations",
      "Cash Flow", "Strategy", "Technology", "I'm not sure.",
    ],
  },
  {
    id: "q13", ink: "lav",
    q: "What consumes most of your working time?",
    sub: "Select all that apply.",
    type: "multi",
    options: [
      "Strategy", "Sales", "Marketing", "Operations", "Managing People",
      "Administration", "Firefighting", "I'm not sure.",
    ],
  },
  {
    id: "q14", ink: "ink",
    q: "If you were completely unavailable for two weeks, what would most likely happen?",
    type: "single",
    options: [
      "Business would continue normally.",
      "There would be minor disruptions.",
      "There would be major disruptions.",
      "Business would almost completely stop.",
      "I'm not sure.",
    ],
  },
  {
    id: "q15", ink: "ink",
    q: "If you had to describe your biggest business concern in one sentence, what would you say?",
    type: "text",
    maxLength: 300,
  },
];

export const TOTAL = QUESTIONS.length;
