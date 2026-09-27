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
  /** Schema `name` when "<name> in Kottayam, Kerala" doesn't read right. */
  schemaName?: string;
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

  {
    slug: "content-production",
    seoTitle: "Reels & Content Production in Kottayam, Kerala",
    description:
      "Reels, product photos, short ad films and brand videos shot and edited in Kottayam for Kerala businesses. Made to be posted, not just to look good.",
    name: "Content production",
    serviceType: "Video, reels and photo content production",
    ink: "ink-amber",
    shape: "mk-sq",
    kicker: "Content production",
    h1: "Reels and content in Kottayam, made to be used.",
    intro:
      "Reels, product and team photography, short ad films and brand videos for businesses across Kerala. Planned around what you need to post, shot efficiently, and delivered in every size the platforms want.",
    answer:
      "We Are In Collective produces reels, photos, short ad films and brand videos for businesses in Kottayam and across Kerala. Every shoot starts from a list of what the content is for and where it will be posted, so one shoot day gives you weeks of usable posts, ads and website images, not a folder of nice clips nobody uses.",
    statement: ["Content is a supply problem.", "Plan the shoot around the calendar."],
    why: [
      "Most businesses in Kerala run out of good content within a month. The team is busy, the phone photos look like phone photos, and posting becomes whatever was lying around.",
      "We plan content the other way round: first the month's posts, ads and pages, then one shoot that covers them. Your real place, real people and real product, in Malayalam or English, cut for Instagram, YouTube, WhatsApp and the website at once.",
    ],
    included: [
      { title: "Content plan", body: "The list of reels, photos and videos the business needs for the next month or campaign, and where each one will be used." },
      { title: "Shoot days", body: "On-location shoots at your shop, clinic, site or office, with a shot list agreed in advance so the day runs to time." },
      { title: "Reels and short video", body: "Vertical edits with hooks, captions and subtitles, made for Instagram and YouTube Shorts." },
      { title: "Photography", body: "Product, team, space and behind-the-scenes photos for social media, the website and your Google Business Profile." },
      { title: "Ad films and brand videos", body: "Short films for launches, festivals and ads, from script to final cut." },
      { title: "Formats and handover", body: "Every piece exported in the sizes each platform needs, organised and handed over so your team can post without us." },
    ],
    steps: [
      { title: "Brief", body: "What the content is for, who it is for, and where it will run." },
      { title: "Plan", body: "Ideas, scripts and a shot list, approved by you before the shoot is booked." },
      { title: "Shoot", body: "One focused day, or a few short sessions, at your location." },
      { title: "Edit", body: "First cuts for review, one round of changes, then final exports." },
      { title: "Deliver and reuse", body: "Files in every format, plus a note on how to use them across the month." },
    ],
    goodFit: [
      "You already post, but the content looks tired or inconsistent.",
      "You have a launch, festival or campaign coming and need content for it.",
      "Your team can post and reply, but can't shoot and edit well.",
      "You want real footage of your business instead of stock images.",
    ],
    notFit: [
      "You need a feature-length film or a big studio production. We'll point you to a production house.",
      "You want content without knowing what it is for. We'll start with the plan first.",
    ],
    pricing: {
      body: "Content production is priced per shoot and per set of deliverables: how many reels, photos and videos, and how many shoot days. It can be a one-off project or a monthly retainer. You get a fixed quote after the brief, before we shoot anything.",
    },
    faq: [
      { q: "How many reels can you make from one shoot day?", a: "It depends on the business and the ideas, but a well-planned shoot day usually covers several reels plus a set of photos. We agree the list before the shoot, so you know what you'll get." },
      { q: "Do you shoot in Malayalam?", a: "Yes. Scripts, voice-overs and captions can be in Malayalam, English or a mix, whichever your customers respond to." },
      { q: "Do you also post the content?", a: "We can, as part of social media marketing. Or we hand the files over and your team posts them. Both work." },
      { q: "Do you work outside Kottayam?", a: "Yes. We shoot across Kerala. Travel beyond Kottayam is added to the quote." },
      { q: "Who owns the content?", a: "You do. Final files are yours to use on your own channels and ads." },
    ],
    related: [
      { href: "/social-media-marketing/", label: "Social media marketing" },
      { href: "/thinking/instagram-marketing-for-local-businesses-in-kottayam/", label: "Instagram marketing for Kottayam businesses" },
      { href: "/thinking/good-ideas-are-not-single-use/", label: "Good ideas are not single-use" },
    ],
  },
  {
    slug: "lead-generation",
    seoTitle: "Lead Generation & Follow-up for Kerala Businesses",
    description:
      "Lead generation for small businesses in Kerala: more enquiries, answered the same day, tracked from first click to sale. Ads, WhatsApp, CRM and follow-up.",
    name: "Lead generation",
    serviceType: "Lead generation, lead handling and sales follow-up",
    ink: "ink-lav",
    shape: "mk-a",
    kicker: "Lead generation",
    h1: "Lead generation for Kerala businesses, through to the sale.",
    intro:
      "More enquiries is only half the job. We set up where leads come from, how fast they are answered, how they are followed up and how you can see which ones turned into customers.",
    answer:
      "We Are In Collective helps small and mid-sized businesses in Kerala generate leads and turn them into customers. We set up the sources, usually Google, Instagram, WhatsApp and your website, then the part most agencies skip: same-day replies, a simple CRM, follow-up reminders and a monthly view of which source brought paying customers.",
    statement: ["Most leads aren't lost to competitors.", "They're lost to slow replies."],
    why: [
      "Businesses often ask for more leads when the real problem is what happens after the enquiry. Calls go unanswered, WhatsApp messages wait until the evening, and nobody follows up after the first quote.",
      "We look at the whole path, from the ad or search to the first reply to the sale, and fix the weakest step first. Sometimes that is more ads. Often it is a faster reply and a follow-up routine.",
    ],
    included: [
      { title: "Lead source setup", body: "Google search ads, Instagram and Facebook lead ads, website forms and a WhatsApp button, chosen to fit the business." },
      { title: "Landing pages", body: "One page per offer, fast on a phone, with one clear action." },
      { title: "Lead tracking", body: "Every enquiry tagged with where it came from, so you know which channel pays for itself." },
      { title: "CRM setup", body: "A simple pipeline your team will actually use, from new enquiry to won or lost, with reminders." },
      { title: "Reply and follow-up scripts", body: "What to say in the first reply, the quote and the follow-ups, written for your business and your customers." },
      { title: "Monthly review", body: "Enquiries, response time, conversion and cost per customer, with the one change to make next." },
    ],
    steps: [
      { title: "Map", body: "Where enquiries come from today, who answers them, and where they drop off." },
      { title: "Fix the follow-up", body: "Reply times, scripts and a CRM before any extra money goes into ads." },
      { title: "Add sources", body: "Ads and pages on the channels that suit your customers, starting small." },
      { title: "Track", body: "Every lead followed from first click to sale." },
      { title: "Improve", body: "Monthly review of what brought customers, and more budget behind it." },
    ],
    goodFit: [
      "You get enquiries but too few turn into customers.",
      "You're spending on ads and can't tell what they bring in.",
      "Your team replies late, or leads fall through the cracks.",
      "You want steady enquiries instead of depending on referrals alone.",
    ],
    notFit: [
      "You want a list of phone numbers to cold-call. We don't buy or sell data.",
      "Nobody in the business can reply to enquiries on the same day. We'll help set that up first.",
    ],
    pricing: {
      body: "Lead generation is priced as a setup project plus a monthly fee for running and reviewing it. Ad spend is paid directly to Google or Meta and is always separate. You get a fixed quote after we map how enquiries are handled today.",
    },
    faq: [
      { q: "Can you guarantee a number of leads?", a: "No. Anyone who guarantees leads before seeing your business is guessing. What we promise is clear tracking, fast follow-up and honest monthly numbers." },
      { q: "Do we need a CRM?", a: "If more than a handful of enquiries come in a week, yes. It can be very simple. We set up something your team will actually keep updated." },
      { q: "Do you handle the calls and WhatsApp replies for us?", a: "We set up the process, scripts and reminders and train your team. The replies should come from your business, because that is who the customer wants to talk to." },
      { q: "Which is better for leads in Kerala, Google or Instagram?", a: "Google usually works for people already looking for what you sell. Instagram works for creating demand and reaching people nearby. Most local businesses need both, in different proportions." },
      { q: "How soon do leads start?", a: "Ads can bring enquiries within days of launch. The bigger gains usually come from fixing replies and follow-up, which shows up within the first month." },
    ],
    related: [
      { href: "/digital-marketing/", label: "Digital marketing" },
      { href: "/thinking/sales-is-not-the-last-department-of-a-business/", label: "Sales is not the last department" },
      { href: "/thinking/most-of-your-customers-arent-ready-to-buy-yet/", label: "Most customers aren't ready to buy yet" },
    ],
  },
];

/**
 * Pages for a place or an industry rather than a service: the Kottayam page and
 * the industries the team has real work in. Same layout as a service page; the
 * experience cited is the team's own, from /experience.
 */
export const LOCAL_PAGES: Service[] = [
  {
    slug: "marketing-agency-kottayam",
    seoTitle: "Marketing & Branding Agency in Kottayam — We Are In",
    description:
      "We Are In Collective is a marketing, branding and growth team based in Kottayam, Kerala. Strategy, branding, social media, content and leads in one place.",
    name: "Marketing agency in Kottayam",
    schemaName: "Marketing, branding and growth services in Kottayam",
    serviceType: "Marketing, branding and business growth consultancy",
    ink: "ink-teal",
    shape: "mk-cir",
    kicker: "Kottayam",
    h1: "A marketing and branding team in Kottayam.",
    intro:
      "We Are In Collective works from Kottayam with businesses across the district and the rest of Kerala. One team for strategy, branding, social media, content, digital marketing and lead follow-up, so nothing gets lost between agencies.",
    answer:
      "We Are In Collective is a marketing, branding and growth partner based in Kottayam, Kerala, near Nalumanikkattu on the Thiruvalla – Ettumanoor bypass. We work with businesses across Kottayam district and the rest of Kerala on branding, social media, content, digital marketing and lead follow-up, starting with what is actually holding the business back.",
    statement: ["Local businesses don't need more agencies.", "They need one team that gets the whole picture."],
    why: [
      "A typical Kottayam business has a designer for the logo, a freelancer for Instagram, someone else for ads and nobody watching the enquiries. Each does their part, and nobody owns the result.",
      "We sit down with the owner, look at the business as a whole, and take responsibility for the parts that matter most right now. Being in Kottayam means we can meet in person, visit the shop or site, and shoot content without a travel day.",
    ],
    included: [
      { title: "Branding", body: "Strategy, identity and messaging, in that order. See the branding page for details." },
      { title: "Social media marketing", body: "Planned, produced, published and measured every month." },
      { title: "Content production", body: "Reels, photos and short films shot at your location in and around Kottayam." },
      { title: "Digital marketing", body: "Google and Meta ads, SEO, AI search and your Google Business Profile." },
      { title: "Lead generation and follow-up", body: "Enquiries tracked, answered the same day and followed through to the sale." },
      { title: "Growth diagnosis", body: "A free first read of where the business stands, before you commit to anything." },
    ],
    steps: [
      { title: "Meet", body: "A conversation at our office, your place or on a call, about the business and what's not working." },
      { title: "Diagnose", body: "An honest read of the brand, marketing and sales, including what not to spend on." },
      { title: "Plan", body: "A short plan with priorities, costs and what success looks like." },
      { title: "Do the work", body: "Our own team handles the parts you choose, with one person accountable." },
      { title: "Review", body: "A monthly review in plain language, and changes based on the numbers." },
    ],
    goodFit: [
      "You run a business in Kottayam district and want one team rather than several vendors.",
      "You want to meet the people doing the work.",
      "You're growing and marketing has become a patchwork.",
      "You're launching something new in Kerala and want to get it right the first time.",
    ],
    notFit: [
      "You only want the cheapest possible posts every month.",
      "You want guaranteed rankings or follower counts. We don't promise those.",
    ],
    pricing: {
      body: "Every engagement is quoted after a first conversation: a fixed fee for projects like branding, or a monthly fee for ongoing work like social media and ads. Ad spend is always separate. The growth diagnosis is free.",
    },
    faq: [
      { q: "Where is your office in Kottayam?", a: "St. Mary's Arcade, near Nalumanikkattu, on the Thiruvalla – Ettumanoor bypass, Kottayam. Call or WhatsApp before visiting so the right person is there." },
      { q: "Do you work with businesses outside Kottayam?", a: "Yes. Most of our work is in and around Kottayam, but we work across Kerala and remotely beyond it." },
      { q: "What kinds of businesses do you work with?", a: "Mostly owner-led businesses: clinics and hospitals, hotels and resorts, retail, real estate, education, FMCG and service businesses. See our experience page for the work behind the team." },
      { q: "Are you a digital marketing agency?", a: "We do digital marketing, but we call ourselves a growth partner, because we start with the business problem and only then pick the channels. Sometimes the answer isn't marketing at all." },
      { q: "How do we start?", a: "Take the free growth diagnosis online, or call or WhatsApp us. We'll set up a first conversation, usually within the week." },
    ],
    related: [
      { href: "/branding/", label: "Branding" },
      { href: "/social-media-marketing/", label: "Social media marketing" },
      { href: "/digital-marketing/", label: "Digital marketing" },
      { href: "/experience/", label: "Our experience" },
    ],
  },
  {
    slug: "healthcare-marketing",
    seoTitle: "Healthcare & Clinic Marketing in Kerala — We Are In",
    description:
      "Marketing for hospitals, clinics and Ayurveda centres in Kerala: patient trust, doctor brands, Google reviews and content that stays within medical ethics.",
    name: "Healthcare marketing",
    schemaName: "Healthcare and clinic marketing in Kerala",
    serviceType: "Healthcare marketing and branding",
    ink: "ink-sage",
    shape: "mk-tri",
    kicker: "Healthcare",
    h1: "Healthcare marketing in Kerala, built on trust.",
    intro:
      "Branding, content and patient enquiries for hospitals, clinics, Ayurveda centres and veterinary practices. Healthcare is the sector our team has worked in longest.",
    answer:
      "We Are In Collective markets hospitals, clinics and Ayurveda centres in Kerala. In healthcare, patients choose a doctor and a place they trust, so we build the doctor's and institution's reputation first: clear branding, honest educational content, strong Google reviews and fast replies to enquiries. We never make claims that medical ethics or advertising rules don't allow.",
    statement: ["In healthcare, the doctor is the brand.", "Trust comes before traffic."],
    why: [
      "Patients don't compare clinics the way they compare phones. They ask people they know, read Google reviews and look for a doctor they feel they can trust. Discounts and loud ads rarely help and can hurt.",
      "Our team's healthcare work goes back to 2016. Ananthu led the rebrand of Swetaranya Ayurvedasram and has stayed with it since; more than half its patients now come from outside India. He built a veterinary founder's personal brand to 42,000 organic followers before the hospital opened, and redesigned Sreedhareeyam Eye Hospital's identity.",
    ],
    included: [
      { title: "Institution and doctor branding", body: "Identity and messaging for the hospital or clinic, and personal brands for the doctors patients ask for." },
      { title: "Patient education content", body: "Reels, posts and articles that answer the questions patients actually ask, reviewed by your doctors." },
      { title: "Google Business Profile and reviews", body: "Listings set up properly for every location, and a simple routine for asking patients for reviews." },
      { title: "Website and appointment enquiries", body: "Clear department and doctor pages, with WhatsApp and call buttons that reach the front desk." },
      { title: "Local and international patients", body: "Separate messages for patients nearby and for those travelling from the Gulf or abroad." },
      { title: "Ethics check", body: "Every piece checked against medical advertising rules and your own standards before it goes out." },
    ],
    steps: [
      { title: "Listen", body: "Conversations with the doctors and management about who the institution serves and what it is known for." },
      { title: "Audit", body: "Google listings, reviews, website, social media and how enquiries are handled today." },
      { title: "Build trust assets", body: "Branding, doctor profiles, listings and a review routine." },
      { title: "Educate", body: "A steady rhythm of content answering real patient questions." },
      { title: "Measure", body: "Enquiries, appointments and reviews tracked monthly." },
    ],
    goodFit: [
      "A hospital, clinic, Ayurveda centre or veterinary practice in Kerala.",
      "A doctor starting a practice who wants to build a reputation early.",
      "An institution attracting patients from outside Kerala or India.",
      "A healthcare brand whose online presence doesn't match its reputation.",
    ],
    notFit: [
      "You want before-and-after claims or promises of cures. We won't make them.",
      "You want to buy reviews. We only help you ask real patients.",
    ],
    pricing: {
      body: "Healthcare work is usually a branding project followed by a monthly retainer for content, listings and enquiries. Quoted after a first conversation with the doctors and management.",
    },
    faq: [
      { q: "Can hospitals and clinics advertise in India?", a: "Healthcare advertising in India is restricted, and doctors have their own ethical rules. That's why we focus on education, reputation and honest information rather than promotional claims, and check every piece before it goes out." },
      { q: "Should a doctor have a personal brand?", a: "Often, yes. Patients look for a doctor as much as a hospital. A doctor who explains things clearly online earns trust before the first appointment." },
      { q: "How do we get more Google reviews?", a: "Ask at the right moment, after a good outcome, and make it easy with a direct review link. Reply to every review, good or bad. Never buy reviews." },
      { q: "Do you work with Ayurveda centres?", a: "Yes. Ayurveda is where our team's healthcare work began, including international patients." },
    ],
    related: [
      { href: "/branding/", label: "Branding" },
      { href: "/thinking/google-business-profile-for-kerala-businesses-a-practical-setup-guide/", label: "Google Business Profile guide" },
      { href: "/experience/", label: "Our experience" },
    ],
  },
  {
    slug: "hotel-resort-marketing",
    seoTitle: "Hotel & Resort Marketing in Kerala — We Are In",
    description:
      "Marketing for hotels, resorts and homestays in Kerala: brand, reels, Google reviews and direct bookings, so fewer guests arrive through commission sites.",
    name: "Hotel and resort marketing",
    schemaName: "Hotel, resort and tourism marketing in Kerala",
    serviceType: "Hospitality and tourism marketing",
    ink: "ink-coral",
    shape: "mk-sq",
    kicker: "Hotels and resorts",
    h1: "Hotel and resort marketing in Kerala, for direct guests.",
    intro:
      "Branding, content, reviews and direct bookings for hotels, resorts, homestays and travel businesses across Kerala, from Kumarakom and Vagamon to Munnar and the coast.",
    answer:
      "We Are In Collective markets hotels, resorts, homestays and travel businesses in Kerala. We help properties earn more direct bookings by showing the real stay in reels and photos, building strong Google and platform reviews, and making it easy to book on WhatsApp or the website instead of through commission-heavy portals.",
    statement: ["Guests book the experience.", "Show it before they arrive."],
    why: [
      "Travellers decide on a hotel from photos, reels and reviews long before they compare prices. Properties with the same rooms and rates end up very differently booked because of how they show up online.",
      "Our team has done this work. A Women's Day guest campaign Ananthu worked on for Malabar Village Luxe brought more than 30 five-star Google reviews in a single day, and his campaign for Alisha Travels built a travel brand around experience rather than discounts.",
    ],
    included: [
      { title: "Property branding", body: "What the stay is known for, who it is for, and how that shows in every photo and message." },
      { title: "Reels and photography", body: "Rooms, food, views and experiences shot through the seasons, not just once." },
      { title: "Reviews", body: "Guest-experience moments and a routine that earns reviews on Google and booking platforms." },
      { title: "Direct booking", body: "A website and WhatsApp booking path that is quicker than the portals." },
      { title: "Seasonal campaigns", body: "Onam, Christmas, monsoon and holiday campaigns planned months ahead." },
      { title: "Google Business Profile", body: "Listing, photos, hours and offers kept current for travellers searching nearby." },
    ],
    steps: [
      { title: "Stay", body: "We experience the property and talk to guests and staff." },
      { title: "Position", body: "What makes the stay worth choosing, written down and agreed." },
      { title: "Produce", body: "Seasonal shoots for reels and photos." },
      { title: "Publish and campaign", body: "Social media, listings and campaigns around the travel calendar." },
      { title: "Track bookings", body: "Direct enquiries and bookings tracked against portal bookings every month." },
    ],
    goodFit: [
      "A resort, hotel, homestay or boutique stay in Kerala.",
      "You depend heavily on booking portals and their commissions.",
      "Your photos and reels no longer do the property justice.",
      "A travel company building a brand rather than competing on price.",
    ],
    notFit: [
      "You want fake reviews or paid follower boosts.",
      "You want to compete only on being the cheapest room in town.",
    ],
    pricing: {
      body: "Hospitality work is usually a content and branding setup followed by a monthly retainer, with extra shoots around the seasons. Quoted after we visit the property.",
    },
    faq: [
      { q: "How can a hotel get more direct bookings?", a: "Make booking direct easier than booking through a portal: a fast website, a WhatsApp number that replies quickly, and a small reason to book direct. Then show the stay well in reels, photos and reviews." },
      { q: "How do resorts get more Google reviews?", a: "Create moments guests want to talk about, then ask at checkout with a direct review link. Reply to every review." },
      { q: "Do you shoot on location?", a: "Yes. We shoot at the property, ideally more than once a year so content reflects the seasons." },
      { q: "Do you work with travel agencies?", a: "Yes. Travel businesses need the same things: a clear brand, real content and trust." },
    ],
    related: [
      { href: "/content-production/", label: "Content production" },
      { href: "/social-media-marketing/", label: "Social media marketing" },
      { href: "/experience/", label: "Our experience" },
    ],
  },
];

export function serviceBySlug(slug: string): Service {
  const s = [...SERVICES, ...LOCAL_PAGES].find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}
