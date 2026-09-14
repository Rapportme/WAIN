/**
 * The person behind chapter 07.
 *
 * Every Thinking piece is written by one named strategist, and both search
 * engines and AI systems weight a resolvable author entity heavily — a name in
 * a byline is worth far less than a name that points at a page. This file is
 * the single source for that entity: the layout's JSON-LD graph declares it,
 * each article references it by `@id`, and /people/ananthu-vasudev renders it.
 *
 * Everything below is drawn from the site's own experience data. `sameAs` is
 * deliberately empty until we have the real profile URLs — a wrong or guessed
 * one is worse than none, because it tells the graph the wrong person wrote it.
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
  /** Profile URLs. Empty until confirmed — see the note at the top of this file. */
  sameAs: [] as readonly string[],
  bio: [
    "Ananthu writes everything filed under Our Thinking. He works on positioning and market strategy — the part of the job that happens before anyone opens a design file or books a media slot.",
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
