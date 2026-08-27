import { SOCIAL_LINKS, type SocialLink } from "@/data/social";

/* The brand marks, drawn as filled glyphs in currentColor so each plate can
   tint them. No icon dependency — these are the only two the site needs. */
const GLYPHS: Record<SocialLink["icon"], React.ReactNode> = {
  linkedin: (
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  ),
  instagram: (
    <path d="M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 2.16c3.2 0 3.58.02 4.85.07 1.17.06 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.23.05 1.26.07 1.65.07 4.85s-.02 3.58-.07 4.85c-.06 1.17-.26 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.24.42-1.27.05-1.65.07-4.86.07-3.21 0-3.59-.02-4.86-.07-1.17-.06-1.82-.26-2.24-.42-.57-.22-.96-.48-1.38-.9-.42-.42-.69-.82-.9-1.38-.16-.42-.36-1.06-.42-2.24-.04-1.26-.06-1.65-.06-4.84 0-3.2.02-3.59.06-4.86.06-1.17.26-1.81.42-2.23.21-.57.48-.96.9-1.38.42-.42.81-.69 1.38-.9.42-.17 1.05-.36 2.22-.42 1.28-.05 1.65-.06 4.86-.06Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  ),
};

interface SocialLinksProps {
  /** Wrapper class — each plate styles the row itself. */
  className?: string;
  /** Print the handle beside the mark (contact page); icons alone elsewhere. */
  withHandles?: boolean;
}

/**
 * The collective's social accounts. Rendered from one list so adding a third
 * platform is a one-line change in data/social.ts.
 */
export function SocialLinks({ className = "social", withHandles = false }: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${s.name} — opens in a new tab`}
            title={s.name}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              {GLYPHS[s.icon]}
            </svg>
            {withHandles ? (
              <span className="social-t">
                <b>{s.name}</b>
                <em>{s.handle}</em>
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
