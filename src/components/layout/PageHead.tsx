import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export interface PageIndexEntry {
  /** In-page anchor, e.g. "#story". */
  href: string;
  title: string;
  note: string;
  shape: string;
}

interface PageHeadProps {
  /** Eyebrow title — the contents-menu column this page belongs to. */
  kicker: string;
  /** Eyebrow marker shape. */
  shape: string;
  title: string;
  intro: string;
  index: readonly PageIndexEntry[];
}

/**
 * The head of a standalone page. The book's chapters are numbered because
 * they're a sequence; these pages aren't, so the eyebrow carries the column
 * name instead of a number, and the numbering runs inside the page index —
 * which is the contents overlay, printed where the reader already is.
 */
export function PageHead({ kicker, shape, title, intro, index }: PageHeadProps) {
  return (
    <header className="chapter pg-head" id="top">
      <div className="wrap">
        <a href={withBase("/")} className="pg-back">
          <span className="arw" aria-hidden="true">
            &larr;
          </span>{" "}
          Back to the book
        </a>
        <Eyebrow shape={shape} t={kicker} />
        <Reveal as="h1" className="pg-title" d={1}>
          {title}
        </Reveal>
        <Reveal as="p" className="lede" d={2}>
          {intro}
        </Reveal>
        <Reveal as="div" className="pg-index" d={3}>
          {index.map((entry, i) => (
            <a href={entry.href} key={entry.href}>
              <span className="pg-i-n">
                <span className={`mk ${entry.shape}`} />
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong className="pg-i-t">{entry.title}</strong>
              <span className="pg-i-note">{entry.note}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
