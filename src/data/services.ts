/**
 * The three services people search for by name: branding, social media and
 * digital marketing. Each gets its own page (src/app/<slug>/page.tsx) built by
 * components/services/ServicePage from the entry below.
 *
 * Written to the same rule as the rest of the site: say what we do and what we
 * won't, no invented numbers, no client results we can't show. Prices are
 * described, not listed, until the team signs off on published ranges — when
 * they do, put them in `pricing.ranges` and they appear as a table.
 */

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** <title>, ≤ 60 characters. */
  seoTitle: string;
  /** Meta description, ≤ 155 characters. */
  description: string;
  /** Short name used in menus, breadcrumbs and schema. */
  name: string;
  /** schema.org serviceType. */
  serviceType: string;
  ink: string;
  shape: string;
  kicker: string;
  h1: string;
  intro: string;
  /** 40–60 words, written to be quoted whole by a search or AI answer. */
  answer: string;
  statement: [string, string];
  why: string[];
  included: { title: string; body: string }[];
  steps: ServiceStep[];
  goodFit: string[];
  notFit: string[];
  pricing: { body: string; ranges?: { item: string; range: string }[] };
  faq: ServiceFaq[];
  related: { href: string; label: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "branding",
    seoTitle: "Branding Agency in Kottayam, Kerala — We Are In",
    description:
      "Brand strategy, identity and messaging for businesses in Kottayam and across Kerala. We settle what the business stands for, then design how it looks.",
    name: "Branding",
    serviceType: "Brand strategy and brand identity design",
    ink: "ink-coral",
    shape: "mk-cir",
    kicker: "Branding",
    h1: "Branding in Kottayam, built from the business out.",
    intro:
      "Brand strategy, identity and messaging for founders and owners across Kerala. We work out what the business should stand for first, then design how it looks, sounds and shows up.",
    answer:
      "We Are In Collective is a branding team in Kottayam, Kerala. We build brands in order: first what the business stands for and who it is for, then the name and message, then the identity — logo, colour, type — and finally the templates your team uses every day. A logo alone is not a brand, and we won't sell you one as if it were.",
    statement: ["A brand is a decision.", "The logo is how you remember it."],
    why: [
      "Most branding projects in Kerala start with a logo brief. The logo gets made, the business still sounds like everyone else in its category, and a year later someone asks for a rebrand.",
      "We start a step earlier: who the business is really for, why they should choose it over the shop down the road, and what it should never be mistaken for. The design work is faster and better once that is settled — and it lasts.",
    ],
    included: [
      { title: "Brand strategy", body: "Who the business is for, what it stands for, how it is different, and the one sentence a stranger should remember." },
      { title: "Messaging and voice", body: "What you say first, what you never say, and how the brand sounds in a WhatsApp reply as much as on a billboard." },
      { title: "Visual identity", body: "Logo, colour, typography and the rules for using them — designed for the places you actually appear." },
      { title: "Brand guidelines", body: "A short, usable guide your team, printers and future agencies can follow without calling us." },
      { title: "Everyday applications", body: "Social media templates, stationery, signage, uniforms, packaging — whatever the business really uses." },
      { title: "Launch", body: "How to roll the brand out to customers and staff without confusing either." },
    ],
    steps: [
      { title: "Understand", body: "Conversations with the owner and team, a look at customers and competitors, and an honest read of where the brand is now." },
      { title: "Decide", body: "Positioning, audience and message agreed in writing before any design starts." },
      { title: "Design", body: "Identity routes built on that decision, refined with you until one is clearly right." },
      { title: "Apply", body: "Guidelines and templates for everything the brand touches in daily use." },
      { title: "Launch and check", body: "Roll-out plan, then a check a few months in on whether the brand is doing its job." },
    ],
    goodFit: [
      "You're starting a business and want to get the foundation right once.",
      "The business has grown but still looks and sounds like it did on day one.",
      "Customers can't explain what makes you different — and neither can your team.",
      "You're entering a new market, city or category and need to be understood quickly.",
    ],
    notFit: [
      "You only need a logo file this week. A good freelancer will serve you better and cheaper.",
      "The real problem is price, product or follow-up. We'll say so, and point you at that first.",
    ],
    pricing: {
      body: "Branding is priced by scope: strategy only, identity on top of an existing strategy, or the full build with guidelines and applications. You get a fixed quote after the first conversation, before anything starts — no hourly surprises.",
    },
    faq: [
      { q: "How much does branding cost in Kerala?", a: "It depends on scope more than anything else. Refreshing an identity on top of a clear strategy is a smaller fixed fee; a full brand — strategy, identity, guidelines and applications — is a larger project priced up front. We give a fixed quote after the first conversation, once we know what the business actually needs." },
      { q: "How long does a branding project take?", a: "A focused identity project usually takes a few weeks. A full brand with strategy and applications takes longer, mostly because of the decisions the owners need to make — we keep those moving so the project doesn't stall." },
      { q: "Do you only work with businesses in Kottayam?", a: "No. We're based in Kottayam and work with businesses across Kerala, and remotely wherever the problem is interesting enough. Meeting in person helps early on, so Kerala clients usually get at least one working session face to face." },
      { q: "Can you refresh our existing brand instead of starting over?", a: "Often that's the better answer. If the brand has recognition worth keeping, we'll sharpen the message and tidy the identity rather than throw it away." },
      { q: "What do we get at the end?", a: "A written brand strategy, the identity files in every format you need, a brand guide your team can follow, and ready-to-use templates for the places you appear most — usually social media, print and signage." },
    ],
    related: [
      { href: "/social-media-marketing/", label: "Social media marketing" },
      { href: "/digital-marketing/", label: "Digital marketing" },
      { href: "/thinking/a-logo-does-not-become-a-brand-just-because-there-is-space-for-it/", label: "Why a logo is not a brand" },
    ],
  },
  {
    slug: "social-media-marketing",
    seoTitle: "Social Media Marketing in Kottayam, Kerala — We Are In",
    description:
      "Social media management for Kerala businesses: strategy, reels, posts and carousels made in-house, published on schedule, with a monthly report.",
    name: "Social media marketing",
    serviceType: "Social media management and content production",
    ink: "ink-teal",
    shape: "mk-tri",
    kicker: "Social media",
    h1: "Social media marketing in Kottayam that adds up.",
    intro:
      "Strategy, content and publishing for Instagram, Facebook, LinkedIn and YouTube — planned, produced and measured by one team, so the posts add up to something.",
    answer:
      "We Are In Collective manages social media for businesses in Kottayam and across Kerala. We plan a monthly content calendar from the business goal, produce the reels, posts, carousels and stories in-house, publish on schedule across Instagram, Facebook, LinkedIn and YouTube, and report every month on reach, engagement and what it did for enquiries.",
    statement: ["Posting every day is not a strategy.", "Knowing why each post exists is."],
    why: [
      "Most social media accounts we inherit are busy and aimless: a post a day, a festival greeting, a reel that did well once. Followers go up a little, enquiries don't.",
      "We plan backwards from what the business needs — more walk-ins, more enquiries, a new service understood — and make fewer, better pieces that do that job. Then we measure it and change what isn't working.",
    ],
    included: [
      { title: "Social media strategy", body: "Which platforms, which audience, what the content is for, and how often is enough." },
      { title: "Monthly content calendar", body: "Every post planned in advance with its date, format, platform and purpose — shared with you before it goes out." },
      { title: "Content production", body: "Reels, posts, carousels, stories and AI video made by our own creative team, with shoots when the brand needs real footage." },
      { title: "Publishing and scheduling", body: "Posted on time across Instagram, Facebook, LinkedIn and YouTube, with captions and hashtags written for each." },
      { title: "Account setup and health", body: "Profiles, bios, highlights and links set up so a new visitor understands the business in five seconds." },
      { title: "Monthly performance report", body: "Reach, engagement rate and follower growth per account, what worked, what didn't, and what changes next month." },
    ],
    steps: [
      { title: "Audit", body: "Where the accounts are now, what competitors are doing, and what the business actually needs from social." },
      { title: "Plan", body: "A strategy and the first month's calendar, agreed with you before anything is made." },
      { title: "Produce", body: "Content made, reviewed and approved in batches so nothing goes out rushed." },
      { title: "Publish", body: "Posted on schedule, with every channel covered." },
      { title: "Measure and adjust", body: "A monthly report and a short call on what to keep, drop or try." },
    ],
    goodFit: [
      "You know social media matters but nobody in the business has the time to do it properly.",
      "The accounts are active but you can't point to a single enquiry they brought in.",
      "You're launching something and need consistent, good-looking content from day one.",
      "You want one team for planning, content and reporting instead of three freelancers.",
    ],
    notFit: [
      "You want the cheapest possible posts at the highest possible volume. We make fewer, better ones.",
      "The website or follow-up is broken. Traffic from social will leak there first — we'd fix that before adding more.",
    ],
    pricing: {
      body: "Social media is a monthly retainer, priced by the number of accounts, how many pieces a month, and whether shoots are involved. You get a fixed monthly quote after the audit, and the first month's calendar before you commit to the second.",
    },
    faq: [
      { q: "How much does social media management cost in Kerala?", a: "It's a monthly fee that depends on how many platforms we run, how many posts and reels a month, and whether we need to shoot. We quote a fixed monthly amount after looking at your accounts, so you know the cost before we start." },
      { q: "Which platforms should my business be on?", a: "The ones your customers actually use, done properly. For most Kerala consumer businesses that's Instagram and Facebook; B2B firms usually need LinkedIn; YouTube earns its place when you have things worth explaining at length. We'd rather run two accounts well than five badly." },
      { q: "Do you create the content or just post it?", a: "Both. Our creative team makes the reels, posts, carousels and stories, and we arrange shoots when the brand needs real footage. You approve the calendar and the finished pieces before anything is published." },
      { q: "How will we know if it's working?", a: "Every month you get reach, engagement rate and follower growth for each account, plus which posts drove enquiries or messages. We agree up front what 'working' means for your business, so the report answers that question." },
      { q: "Can you also run paid ads on Instagram and Facebook?", a: "Yes — that sits under digital marketing. Organic content and paid ads work best planned together, so we usually run them side by side." },
    ],
    related: [
      { href: "/digital-marketing/", label: "Digital marketing" },
      { href: "/branding/", label: "Branding" },
      { href: "/thinking/the-next-battle-between-instagram-and-youtube-may-be-about-social-not-video/", label: "Instagram vs YouTube: a battle for social" },
    ],
  },
  {
    slug: "digital-marketing",
    seoTitle: "Digital Marketing in Kottayam, Kerala — We Are In",
    description:
      "Digital marketing in Kerala: Google, Instagram and LinkedIn ads, SEO and AI search, landing pages and lead follow-up — judged on customers, not clicks.",
    name: "Digital marketing",
    serviceType: "Digital marketing and lead generation",
    ink: "ink-sage",
    shape: "mk-sq",
    kicker: "Digital marketing",
    h1: "Digital marketing in Kottayam, judged on customers.",
    intro:
      "Ads on Google, Instagram, Facebook and LinkedIn, SEO and AI search, landing pages and the follow-up behind them — planned as one system and judged on what reaches the till.",
    answer:
      "We Are In Collective runs digital marketing for businesses in Kottayam and across Kerala. We choose the channels from the business goal — Google search ads, Instagram and Facebook ads, LinkedIn for B2B, SEO and AI search — build the landing pages and tracking, and make sure every lead is followed up. We report on enquiries and customers, not just clicks.",
    statement: ["More traffic is easy to buy.", "More customers takes a system."],
    why: [
      "Most digital marketing we see in Kerala is judged on the wrong numbers: impressions, clicks, likes. The ads run, the dashboard looks busy, and nobody can say how many customers came from the money.",
      "We treat it as one system — the ad, the page it lands on, the form or WhatsApp message, and the person who replies. Most of the waste is in the last two, so that's where we look first.",
    ],
    included: [
      { title: "Strategy and channel plan", body: "Which channels, what budget, what a good result looks like — decided from the business goal, not a package." },
      { title: "Paid ads", body: "Google search ads for people already looking, Instagram and Facebook ads for reach and retargeting, LinkedIn when you sell to businesses." },
      { title: "SEO and AI search", body: "Your website set up to be found on Google and cited by ChatGPT, Perplexity and Google's AI answers — including your Google Business Profile." },
      { title: "Landing pages", body: "Pages built for one offer and one action, fast on a phone, with a WhatsApp button where it helps." },
      { title: "Tracking and analytics", body: "Google Analytics, conversion tracking and lead-source tracking, so every enquiry says where it came from." },
      { title: "Lead handling and follow-up", body: "A simple process — and a CRM if you need one — so leads are answered the same day and nothing goes quiet." },
    ],
    steps: [
      { title: "Diagnose", body: "What's running now, what it costs, where leads come from and where they get lost." },
      { title: "Fix the leaks", body: "Tracking, landing pages and follow-up sorted before more money goes in." },
      { title: "Launch", body: "Campaigns on the channels that fit, starting with a test budget." },
      { title: "Optimise", body: "Weekly adjustments to what's spending well and what isn't." },
      { title: "Report", body: "A monthly report in plain language: spend, enquiries, cost per enquiry and customers won." },
    ],
    goodFit: [
      "You're spending on ads and can't tell what it's bringing in.",
      "You get enquiries but too few turn into customers.",
      "You want to be found on Google and in AI answers when people in Kerala search for what you do.",
      "You're launching and need leads quickly, with tracking in place from the start.",
    ],
    notFit: [
      "You want guaranteed rankings or guaranteed leads. Nobody honest can promise either.",
      "There's no budget for ads and no time to follow up. We'd start with the diagnosis instead.",
    ],
    pricing: {
      body: "Digital marketing is a monthly management fee plus your ad budget, which is paid to Google or Meta directly and stays visible to you. Setup work — tracking, landing pages, SEO fixes — is quoted once, up front. You get the full picture after the first conversation.",
    },
    faq: [
      { q: "How much does digital marketing cost for a small business in Kerala?", a: "Two parts: our monthly management fee, and the ad budget you pay to Google or Meta directly. Setup work like tracking or landing pages is a one-time quote. We'd rather start with a modest test budget and increase it once the numbers justify it." },
      { q: "Which is better for my business — Google ads or Instagram ads?", a: "Google search ads reach people already looking for what you sell, so they usually convert better but cost more per click. Instagram and Facebook ads create demand and are cheaper to reach people, but those people weren't searching. Most businesses need a bit of both; the mix depends on what you sell and how people decide." },
      { q: "Do you do SEO?", a: "Yes — technical SEO, local SEO including your Google Business Profile, and content that answers what your customers search for. We also set sites up to be cited by AI search tools like ChatGPT and Google's AI Overviews." },
      { q: "How soon will we see results?", a: "Paid ads can bring enquiries within days of launch. SEO takes months to build. We tell you which to expect from each channel before you spend, and report honestly on both." },
      { q: "Can you guarantee leads or first-page rankings?", a: "No, and be wary of anyone who does. What we can promise is clear tracking, honest reporting, and changes every month based on what the numbers show." },
    ],
    related: [
      { href: "/social-media-marketing/", label: "Social media marketing" },
      { href: "/branding/", label: "Branding" },
      { href: "/thinking/digital-marketing-is-still-marketing/", label: "Digital marketing is still marketing" },
    ],
  },
];

export function serviceBySlug(slug: string): Service {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}
