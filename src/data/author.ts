/**
 * The person behind chapter 07.
 *
 * Every Thinking piece is written by one named strategist, and both search
 * engines and AI systems weight a resolvable author entity heavily — a name in
 * a byline is worth far less than a name that points at a page. This file is
 * the single source for that entity: the layout's JSON-LD graph declares it,
 * each article references it by `@id`, and /people/ananthu-vasudev renders it.
 *
 * Everything below is drawn from the site's own experience data. `sameAs` may
 * only ever hold profile URLs we have been given — a wrong or guessed one is
 * worse than none, because it tells the graph the wrong person wrote this.
 */

export const SITE_URL = "https://wearein.in";

/** Stable identifier for the author across every graph on the site. */
export const AUTHOR_ID = `${SITE_URL}/people/ananthu-vasudev/#person`;

export const AUTHOR = {
  slug: "ananthu-vasudev",
  name: "Ananthu Vasudev",
  role: "Brand & market strategist",
  url: `${SITE_URL}/people/ananthu-vasudev/`,
  /** One line, for the article rail and the index. */
  short: "Brand and market strategist at We Are In. Writes the Thinking pieces.",
  /** Profile URLs. Confirmed only — see the note at the top of this file. */
  sameAs: ["https://www.linkedin.com/in/ananthu-in/"] as readonly string[],
  bio: [
    "Ananthu writes most of what is filed under Our Thinking. He works on positioning and market strategy — the part of the job that happens before anyone opens a design file or books a media slot.",
    "He has been inside healthcare, education, retail, hospitality, FMCG and emerging tech, usually in the room where the decision gets made rather than the one where it gets executed. That range is why the writing moves between an ayurvedic hospital, a Zomato placement and an AI platform in Gothenburg without changing its footing.",
    "Before the collective existed he spent five years building The Evolvers Project on his own — strategy, identity, content and digital presence — running experiential learning programmes for students, job seekers and professionals.",
  ],
  /** Roles worth stating plainly, newest first. Drawn from /experience. */
  credentials: [
    {
      what: "Head of Brand & Market Strategy",
      where: "Antutive AB / Famant, Gothenburg",
      when: "2026 – present",
      note: "Brand strategy and market positioning for an AI platform built to make household mental load visible. Go-to-market, segmentation and competitive differentiation for its Nordic launch.",
    },
    {
      what: "Founder",
      where: "The Evolvers Project",
      when: "2020 – 2025",
      note: "Built the brand solo. Experiential learning programmes that reached more than 500 people directly, one of India's earliest long-form educational vlog series, and a mental health leave policy adopted in 2020.",
    },
    {
      what: "Consultant, then content lead",
      where: "Swetaranya Ayurvedasram",
      when: "2016 – present",
      note: "General manager in 2016, consultant since 2017, leading content since 2021. The longest continuous engagement behind the collective.",
    },
    {
      what: "Brand and campaign work",
      where: "Hiwaga Makers, The Bridge, and independently",
      when: "2016 – 2026",
      note: "Allen & Habour Opticals, Malabar Village Luxe, Alisha Travels, Petklin, Sreedhareeyam Eye Hospital, Victoria Realtors and others across Kerala.",
    },
  ],
} as const;

/**
 * Divine Abraham — founder of the collective. Writes the practical guides on
 * branding, social media and digital marketing for Kerala businesses.
 * Facts here are the ones he has stated; the LinkedIn URL is the one the
 * founders section already links.
 */
export const DIVINE = {
  slug: "divine-abraham",
  id: `${SITE_URL}/people/divine-abraham/#person`,
  name: "Divine Abraham",
  role: "Founder, We Are In Collective",
  url: `${SITE_URL}/people/divine-abraham/`,
  short: "Founder of We Are In. Writes the practical guides on branding, social media and digital marketing for Kerala businesses.",
  sameAs: ["https://www.linkedin.com/in/divine-abraham-a9b83773/"] as readonly string[],
  bio: [
    "Divine started We Are In and brought the collective together with Ananthu and Savio. He writes the practical pieces here: what things cost, what to ask, and what to set up first.",
    "He writes as an owner rather than an agency. He founded Rapport Group in Doha in 2017 and Refillr in Kottayam in 2025, so most of what he knows about marketing comes from paying for it, measuring it and living with the results.",
    "He holds an MBA in Finance, which is why his pieces keep coming back to the same question: what did the money bring in?",
  ],
  credentials: [
    {
      what: "Founder",
      where: "We Are In Collective, Kottayam",
      when: "2026 – present",
      note: "Started the collective with Ananthu Vasudev and Savio to give Kerala businesses one partner for strategy, brand, content and growth.",
    },
    {
      what: "Founder",
      where: "Refillr Networks Pvt Ltd, Kottayam",
      when: "2025 – present",
      note: "A technology-enabled 19-litre drinking water delivery platform for homes and businesses, with DPIIT startup recognition.",
    },
    {
      what: "Founder",
      where: "Rapport Group, Doha",
      when: "2017 – present",
      note: "Fleet management, IT and digital marketing, contracting and warehousing, serving 650+ clients across Qatar, the UAE, Kuwait and Oman. Teltonika Platinum Partner.",
    },
    {
      what: "Earlier roles",
      where: "Energy Middle East Oil & Gas Services, Bluvalue, Pinobal Telematics, UAE",
      when: "2013 – 2018",
      note: "Five years in the UAE across oil and gas services and telematics before starting his own businesses.",
    },
  ],
} as const;

/** Link and schema id for a byline. Unknown names fall back to Ananthu's page. */
export function personFor(name: string): { name: string; slug: string; id: string } {
  if (name === DIVINE.name) return { name: DIVINE.name, slug: DIVINE.slug, id: DIVINE.id };
  return { name: AUTHOR.name, slug: AUTHOR.slug, id: AUTHOR_ID };
}
