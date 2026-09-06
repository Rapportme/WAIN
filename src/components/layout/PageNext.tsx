import { withBase } from "@/lib/withBase";

interface PageNextProps {
  /** Route to hand the reader to, e.g. "/how-we-exist/". */
  href: string;
  label: string;
  title: string;
  note: string;
  shape: string;
  /** Ink class for the band's glow. */
  ink?: string;
}

/** The band that closes a standalone page and hands the reader the next one (prototype `pageNext`). */
export function PageNext({ href, label, title, note, shape, ink = "ink-sage" }: PageNextProps) {
  return (
    <a className={`pg-next ${ink}`} href={withBase(href)}>
      <div className="wrap in">
        <div>
          <div className="lbl">
            <i className={`mk ${shape}`} />
            {label}
          </div>
          <div className="ttl">{title}</div>
          <p className="nt">{note}</p>
        </div>
        <span className="big-ar">→</span>
      </div>
    </a>
  );
}
