"use client";

import { withBase } from "@/lib/withBase";
import type { DepartmentKey, DetailedDiagnosis } from "@/lib/diagnosis/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Calendar, Download } from "./Icons";

const DEPTS: { key: DepartmentKey; label: string; ink: string }[] = [
  { key: "strategy", label: "Strategy", ink: "ink-amber" },
  { key: "customers", label: "Customers", ink: "ink-teal" },
  { key: "marketing", label: "Marketing", ink: "ink-coral" },
  { key: "sales", label: "Sales", ink: "ink-coral" },
  { key: "operations", label: "Operations", ink: "ink-sage" },
  { key: "finance", label: "Finance", ink: "ink-sage" },
  { key: "leadership", label: "Leadership & founder dependency", ink: "ink-lav" },
];

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "watch";
}) {
  const list = items.length ? items : ["No structural weakness stands out at this stage"];
  return (
    <div className={tone}>
      <h3>{title}</h3>
      <ul>
        {list.map((s) => (
          <li key={s}>
            <i aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FullReportProps {
  report: DetailedDiagnosis;
  name: string;
  /** Where the copy went, when it went anywhere. */
  email?: string;
  /** True once the endpoint confirmed the report was actually emailed. */
  emailed: boolean;
}

export function FullReport({ report, name, email = "", emailed }: FullReportProps) {
  return (
    <div className="rep">
      <Eyebrow shape="mk-sq" t="Detailed diagnostic report" />
      <Reveal as="h2">{name ? `Prepared for ${name}` : "Your detailed report"}</Reveal>
      <Reveal as="p" className="note">
        {emailed
          ? `This is your full report, on screen. A copy is on its way to ${email || "your inbox"}.`
          : "This is your full report, on screen. We couldn't email a copy this time — use Download to keep one."}
      </Reveal>

      <Reveal as="section">
        <h3>Executive summary</h3>
        <p>{report.executiveSummary}</p>
      </Reveal>

      <section>
        <Reveal as="h3">Department-wise observations</Reveal>
        <div className="dept">
          {DEPTS.map(({ key, label, ink }, i) => {
            const d = report.departments?.[key];
            if (!d) return null;
            return (
              <Reveal as="div" className={`dcard ${ink}`} d={i % 2} key={key}>
                <h4>{label}</h4>
                <div>
                  <div className="k">Current observation</div>
                  <p className="obs">{d.currentObservation}</p>
                </div>
                <div>
                  <div className="k">Why it matters</div>
                  <p>{d.whyItMatters}</p>
                </div>
                <div>
                  <div className="k">If left unaddressed</div>
                  <p>{d.ifLeftUnaddressed}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal as="div" className="gd-lists">
        <ListBlock title="Key strengths" items={report.keyStrengths} tone="good" />
        <ListBlock
          title="Areas requiring attention"
          items={report.areasRequiringAttention}
          tone="watch"
        />
      </Reveal>

      <Reveal as="section">
        <h3>Closing summary</h3>
        <p>{report.closingSummary}</p>
      </Reveal>

      <Reveal as="p" className="fine">
        This report is generated from the responses submitted during the assessment using our own
        scoring model. It is designed to support reflection and discussion, and should not replace
        professional business, legal, financial or industry-specific advice.
      </Reveal>

      <Reveal as="div" className="gd-actions no-print">
        <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
          <Download size={15} /> Download this report
        </button>
        <a className="btn" href={withBase("/contact/")}>
          <Calendar size={15} /> Book a consultation <span className="ar">→</span>
        </a>
      </Reveal>
    </div>
  );
}
