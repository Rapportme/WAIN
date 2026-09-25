/**
 * Shorter <title> tags for pieces whose headline runs past what search results
 * show (~60 characters). The headline on the page, the share card and the
 * schema keep the author's words exactly; only the browser/search title uses
 * these. Pieces not listed here are short enough to use the headline as is.
 */
export const SEO_TITLES: Record<string, string> = {
  "before-you-choose-a-marketing-channel-decide-what-you-are-trying-to-build": "Before You Choose a Marketing Channel",
  "what-is-the-actual-job-in-an-ai-assisted-workplace": "The Real Job in an AI-Assisted Workplace",
  "when-businesses-keep-going-because-they-have-already-invested-too-much": "Sunk Cost: When Businesses Can't Stop Investing",
  "the-next-battle-between-instagram-and-youtube-may-be-about-social-not-video": "Instagram vs YouTube: A Battle for Social",
  "most-of-your-customers-arent-ready-to-buy-yet": "Most of Your Customers Aren't Ready to Buy Yet",
  "the-segmentation-blind-spot-what-people-are-willing-to-spend": "Segmentation's Blind Spot: Willingness to Spend",
  "people-are-already-being-influenced-the-question-is-by-what": "People Are Already Being Influenced. By What?",
  "a-campaign-you-dont-like-can-still-be-a-good-campaign": "A Campaign You Don't Like Can Still Be Good",
  "designing-for-context-the-malayalam-ad-on-zomatos-order-tracking-page": "Zomato's Malayalam Ad: Designing for Context",
  "a-logo-does-not-become-a-brand-just-because-there-is-space-for-it": "Space for a Logo Doesn't Make It a Brand",
  "when-a-marketing-idea-moves-faster-than-the-campaign-calendar": "When an Idea Outruns the Campaign Calendar",
  "sometimes-the-billboard-next-to-yours-is-part-of-your-campaign": "The Billboard Next to Yours Is Your Campaign Too",
  "ai-is-becoming-a-team-tool-not-just-an-individual-tool": "AI Is Becoming a Team Tool, Not a Personal One",
  "the-best-business-automation-may-not-need-new-software": "Business Automation May Not Need New Software",
  "a-good-product-can-become-unpopular-because-of-how-it-is-sold": "How Selling Can Make a Good Product Unpopular",
  "sales-is-not-the-last-department-of-a-business": "Sales Is Not the Last Department of a Business",
  "customer-experience-starts-before-the-product-does": "Customer Experience Starts Before the Product",
  "why-should-businesses-be-the-only-ones-being-rated": "Why Are Only Businesses Being Rated?",
};

/** The <title> for a piece: the headline when it fits, else the short form. */
export function seoTitle(slug: string, headline: string): string {
  const full = `${headline} — We Are In Collective`;
  if (full.length <= 62) return full;
  const short = SEO_TITLES[slug];
  return short ? `${short} — We Are In` : full;
}
