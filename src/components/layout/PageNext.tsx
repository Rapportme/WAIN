import { withBase } from "@/lib/withBase";
import { Reveal } from "@/components/ui/Reveal";

interface PageNextProps {
  /** Route to hand the reader to, e.g. "/how-we-exist/". */
  href: string;
  label: string;
  title: string;
  note: string;
  shape: string;
}

/** The band that closes a standalone page and hands the reader the next one. */
export function PageNext({ href, label, title, note, shape }: PageNextProps) {
  return (
    <section className="chapter pg-next">
      <div className="wrap">
        <Reveal as="div">
          <a href={withBase(href)}>
            <span>
              <span className="lbl">
                <span className={`mk ${shape}`} />
                {label}
              </span>
              <strong className="ttl">{title}</strong>
              <span className="note">{note}</span>
            </span>
            <span className="arw" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
