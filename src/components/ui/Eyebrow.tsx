import { Reveal } from "./Reveal";

interface EyebrowProps {
  /** Marker shape class: "mk-cir" | "mk-tri" | "mk-sq" | "mk-wedge" | "mk-bar" | "mk-a". */
  shape: string;
  /** Chapter number, e.g. "01". Omitted on unnumbered sections. */
  n?: string;
  t: string;
  hideRule?: boolean;
}

/** Marker + chapter number + title + drawn hairline. Inherits the section ink via --sig. */
export function Eyebrow({ shape, n, t, hideRule = false }: EyebrowProps) {
  return (
    <Reveal as="div" className="eyebrow">
      <i className={`mk ${shape}`} />
      {n ? <span className="n">{n}</span> : null}
      <span className="t">{t}</span>
      {hideRule ? null : <i />}
    </Reveal>
  );
}
