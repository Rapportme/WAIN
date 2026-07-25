import { Reveal } from "./Reveal";

interface EyebrowProps {
  /** Marker shape class, e.g. "mk-cir" | "mk-tri" | "mk-sq" | "mk-wedge" | "mk-bar" | "mk-a". */
  shape: string;
  /** Chapter number, e.g. "01". Omitted on the cover-adjacent chapters. */
  n?: string;
  /** Chapter title. */
  t: string;
  /** Hide the trailing hairline rule (the Close chapter centres its eyebrow). */
  hideRule?: boolean;
}

/**
 * The numbered eyebrow: shape marker + chapter number + title + hairline.
 * The marker inherits the chapter's ink via the `--sig` custom property.
 */
export function Eyebrow({ shape, n, t, hideRule = false }: EyebrowProps) {
  return (
    <Reveal as="div" className="eyebrow">
      <span className={`mk ${shape}`} />
      {n ? <span className="n">{n}</span> : null}
      <span className="t">{t}</span>
      {hideRule ? null : <span className="r" />}
    </Reveal>
  );
}
