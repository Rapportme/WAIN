/**
 * The /experience page's content.
 *
 * Two kinds of experience: the industries the collective has been inside, and
 * the work its people led before the name existed. The project list is grouped
 * by person rather than by client, because that is the point the page makes.
 *
 * `body` copy marks its own emphasis with `**…**` — see <Emphasis> in
 * components/ui/Emphasis.tsx. Keeping it in the string means the copy reads as
 * copy in this file instead of as an array of fragments.
 */

/* The industry tags, split by how much depth is actually behind them. */

export const INDUSTRIES_CORE: readonly string[] = [
  "Marketing & Branding",
  "Healthcare & Ayurveda",
  "Education & Career Development",
  "AI & Emerging Tech",
  "Logistics & Operations",
  "Consumer Products & FMCG",
];

export const INDUSTRIES_ALSO: readonly string[] = [
  "Financial Services",
  "Real Estate & Construction",
  "Automotive & Mobility",
  "Retail & E-commerce",
  "Media & Publishing",
  "Social Impact & NGO",
  "Music & Creative Production",
  "Tourism & Travel",
];

/** A figure from the work behind the collective. */
export interface Proof {
  n: string;
  t: string;
}

export const PROOF: readonly Proof[] = [
  { n: "3", t: "businesses founded together by one of us, still running" },
  { n: "40%", t: "cost reduction in one operational turnaround, 90 days" },
  { n: "300%", t: "revenue growth, same 90-day turnaround" },
  { n: "650+", t: "clients across a platform spanning 4 countries" },
];

/** One piece of work, filed under the person who led it. */
export interface Project {
  /** The client, company or campaign. */
  name: string;
  /** Industry or role. */
  tag: string;
  /** When, where, and in what capacity. */
  ctx?: string;
  /** What happened. `**…**` marks emphasis. */
  body: string;
}

export interface Founder {
  name: string;
  /** The person's ink, matching the People section on /why-we-exist. */
  ink: string;
  projects: readonly Project[];
}

export const FOUNDERS: readonly Founder[] = [
  {
    name: "Ananthu",
    ink: "var(--amber)",
    projects: [
      {
        name: "Swetaranya Ayurvedasram",
        tag: "Healthcare / Ayurveda",
        ctx: "GM 2016 · Consultant 2017–present · Content lead since 2021",
        body: "Led the original rebrand and has stayed involved ever since — brand communications, marketing, digital presence, corporate film production. **50%+ of patients now come from outside India.**",
      },
      {
        name: "Antutive AB / Famant",
        tag: "AI / Emerging Tech",
        ctx: "Head of Brand & Market Strategy, 2026–present, Gothenburg, Sweden",
        body: "Leading brand strategy and market positioning for Famant, an AI platform built to make household mental load visible. Defining go-to-market strategy, segmentation and competitive differentiation for its Nordic launch — the same engagement Savio is also part of.",
      },
      {
        name: "The Evolvers Project",
        tag: "Founder",
        ctx: "2020–2025",
        body: "Built the brand solo — strategy, identity, content, digital presence. Ran experiential learning programs for students, job seekers and professionals. Impacted **500+ lives directly.** Along the way: produced one of India's earliest long-form educational vlog series, built a student-consultant model for a career-clarity journal, conceptualized a recruitment-focused reality show format, launched a teacher recognition award chosen by students and alumni, and implemented a mental health leave policy in 2020 — years ahead of most Indian companies.",
      },
      {
        name: "Petklin Multispecialty Center",
        tag: "Healthcare / Veterinary",
        ctx: "Consultant at Hiwaga Makers, 2024–2025",
        body: "Built the founding doctor's personal brand before the hospital even opened. **42,000 organic followers before launch day** — proof that in healthcare, the doctor is the brand.",
      },
      {
        name: "Sreedhareeyam Eye Hospital",
        tag: "Healthcare",
        ctx: "via The Bridge, 2020",
        body: "Redesigned the visual identity end-to-end — moved it from clinical and cold to warm and human.",
      },
      {
        name: "Aarogyamantra Integrated Healing",
        tag: "Healthcare",
        ctx: "Manager — Operations & Governance, 2017–2019",
        body: "Led a full internal rebrand — identity, digital presence, content — while running operations. Brought the organization to break-even in three months. **300% revenue growth. First-time profitability.**",
      },
      {
        name: "Victoria Realtors",
        tag: "Real Estate",
        ctx: "via The Bridge, 2018–2020",
        body: "Corporate rebrand plus individual brand architecture for multiple villa projects across South India — each with its own positioning, identity and audience.",
      },
      {
        name: "Allen & Habour Opticals",
        tag: "Retail",
        ctx: "Hiwaga Makers, 2026",
        body: "A store-launch campaign built entirely around real local people and their own stories of the town — the brand woven in, never announced.",
      },
      {
        name: "Malabar Village Luxe",
        tag: "Hospitality",
        ctx: "Hiwaga Makers, 2026",
        body: "A Women's Day campaign — welcome drink, flower, handwritten card, gift box. **30+ five-star Google reviews in a single day.**",
      },
      {
        name: "MM Originals",
        tag: "FMCG / Social Impact",
        ctx: "via The Bridge, 2021 · Concept, not executed",
        body: "A campaign built around a visually impaired student's growing independence in the kitchen — the product's benefit shown through a real story, never stated outright.",
      },
      {
        name: "Alisha Travels — “Travel Beyond Sight”",
        tag: "Tourism / Social Impact",
        ctx: "Hiwaga Makers",
        body: "A campaign featuring visually impaired students from a blind school, built on the idea that travel isn't about seeing — it's about experiencing with every sense. One of the more philosophically distinct campaigns in the body of work.",
      },
      {
        name: "Make A Wish",
        tag: "Social Impact — self-initiated",
        ctx: "Multi-year",
        body: "A years-long creative campaign giving visually impaired students real experiences — painting, cinema, sport. Their paintings became calendars, bags and plates. **Raised over ₹8 lakhs across 6 years.**",
      },
      {
        name: "Be Light, Be A Light",
        tag: "Mental Health Awareness — self-initiated",
        body: "A public mental health advocacy campaign — open conversations, destigmatizing therapy and psychiatric treatment, translated into real content and products.",
      },
      {
        name: "Various branding & consultancy work",
        tag: "Multiple industries",
        ctx: "via The Bridge and independent consulting, 2016–2023",
        body: "Naming, identity and rebrand work across a range of businesses — Quartz Car Studio, Urban Living Ideas, N V Brothers Engineering, website.as, Earthyquette, That Biryani Station, and the Lotus travel brand rebrand, among others.",
      },
    ],
  },
  {
    name: "Divine",
    ink: "var(--signal)",
    projects: [
      {
        name: "Rapport Group",
        tag: "Founder",
        ctx: "2017–present, Doha, Qatar",
        body: "Started as a single cloud-based GPS tracking product. Grew into a four-division group — fleet management, IT/ERP, commercial contracting, warehousing. **650+ clients across Qatar, UAE, Kuwait and Oman.** Teltonika Platinum Partner. Strategic accounts include **QatarEnergy, QatarGas and Vodafone Qatar**, with ongoing work at Ras Laffan.",
      },
      {
        name: "Refillr Networks",
        tag: "Founder & CEO",
        ctx: "2025–present, Kottayam",
        body: "A technology-enabled 19L water delivery platform — QR jar tracking, route optimization, digital ordering. **150+ business customers, 500+ households** in its Kottayam pilot. Holds DPIIT Startup Recognition.",
      },
      {
        name: "Energy Middle East Oil & Gas Services",
        tag: "Accounting Manager",
        ctx: "2013–2015, Dubai",
        body: "Given oversight of three group companies across three different sectors early in his career — responsibility that shaped his entrepreneurial instincts before he'd founded anything of his own.",
      },
      {
        name: "Bluvalue",
        tag: "Business Consultant",
        ctx: "2015–2016",
        body: "Market research and go-to-market strategy work that, by his own account, contributed to a 150% sales increase and a 25% larger user base for a client in under a year.",
      },
      {
        name: "Pinobal Telematics",
        tag: "Regional Sales Manager",
        ctx: "2016–2018, Middle East",
        body: "Ran the entire Middle East sales territory — new business, channel partnerships, pricing strategy.",
      },
    ],
  },
  {
    name: "Savio",
    ink: "var(--sage)",
    projects: [
      {
        name: "ERMN",
        tag: "Brand & Strategy Consultant",
        ctx: "From inception, 2021",
        body: "Part of a football-inspired apparel brand from the moment the idea existed — positioning, brand book, visual identity, social presence. Coined the tagline **“Eternally Epic,”** still in use today.",
      },
      {
        name: "Kopi Luwak White Koffie",
        tag: "FMCG",
        ctx: "Indonesia → India expansion",
        body: "Strategy and content for the brand's entry into the Indian market — localization, positioning, consumer communication for an unfamiliar audience.",
      },
      {
        name: "Antutive AB / Famant",
        tag: "Brand & Narrative Strategist",
        ctx: "2026–present, Sweden",
        body: "Building the core narrative for an AI platform designed to make household mental load visible — the same engagement Ananthu leads on strategy and positioning.",
      },
    ],
  },
];
