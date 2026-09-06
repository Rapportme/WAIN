import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export interface PageIndexEntry {
  /** In-page anchor, e.g. "#story", or a full route. */
  href: string;
  title: string;
  note: string;
  shape: string;
  /** Ink class for the entry, e.g. "ink-sage". */
  ink?: string;
}

interface PageHeadProps {
  /** Eyebrow title — the contents-menu column this page belongs to. */
  kicker: string;
  /** Eyebrow marker shape. */
  shape: string;
  /** Section ink class: ink-teal | ink-sage | ink-coral | ink-amber | ink-lav | ink-lift | ink-navy. */
  ink?: string;
  title: string;
  intro: string;
  index: readonly PageIndexEntry[];
}

/**
 * The head of a standalone page (prototype `pageHead`). Carries `.pg-head` so
 * Effects picks it up for the ink bleed.
 */
export function PageHead({ kicker, shape, ink = "ink-teal", title, intro, index }: PageHeadProps) {
  return (
    <section className={`pg-head ${ink}`} id="top">
      <div className="wrap">
        <a className="pg-back" href={withBase("/")}>
          ← Back to the book
        </a>
        <Eyebrow shape={shape} t={kicker} />
        <Reveal as="h1" className="pg-title">
          {title}
        </Reveal>
        <Reveal as="p" className="lede" d={1}>
          {intro}
        </Reveal>
        <Reveal as="div" className="pg-index" d={2}>
          {index.map((entry, i) => (
            <a href={entry.href} className={entry.ink ?? ""} key={entry.href}>
              <span className="k">
                <i className={`mk ${entry.shape}`} />
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong>{entry.title}</strong>
              <em>{entry.note}</em>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
