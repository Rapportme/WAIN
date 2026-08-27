/**
 * Where the collective can be found off-site. One list, so the footer, the
 * contents overlay and the contact page can never drift apart.
 */
export interface SocialLink {
  /** Platform name — also the accessible label. */
  name: string;
  href: string;
  /** How the account reads to a human, printed where there's room for it. */
  handle: string;
  /** Key into the icon map in components/ui/SocialLinks. */
  icon: "linkedin" | "instagram";
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/we-are-in-collective/",
    handle: "We Are In Collective",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/wearein_collective/",
    handle: "@wearein_collective",
    icon: "instagram",
  },
];
