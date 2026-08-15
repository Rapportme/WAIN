"use client";

import { withBase } from "@/lib/withBase";
import type { DepartmentKey, DetailedDiagnosis } from "@/lib/diagnosis/types";
import { Calendar, Download } from "./Icons";

const DEPTS: { key: DepartmentKey; label: string; ink: string }[] = [
  { key: "strategy", label: "Strategy", ink: "var(--amber)" },
  { key: "customers", label: "Customers", ink: "var(--signal)" },
  { key: "marketing", label: "Marketing", ink: "var(--coral)" },
  { key: "sales", label: "Sales", ink: "var(--coral)" },
  { key: "operations", label: "Operations", ink: "var(--sage)" },
  { key: "finance", label: "Finance", ink: "var(--sage)" },
  { key: "leadership", label: "Leadership & founder dependency", ink: "var(--lav)" },
];

interface FullReportProps {
  report: DetailedDiagnosis;
  name: string;
  /** True once the endpoint confirmed the report was actually emailed. */
  emailed: boolean;
}

export function FullReport({ report, name, emailed }: FullReportProps) {
  return (
    <article className="gd-rep">
      <div className="gd-eye">
        <span className="mk mk-sq" />
        <span className="t">Detailed diagnostic report</span>
      </div>

      <h2 className="gd-rep-h">{name ? `Prepared for ${name}` : "Your detailed report"}</h2>
      <p className="gd-rep-note">
        {emailed
          ? "A copy is on its way to your inbox."
          : "This is your full report, on screen. We couldn't email a copy this time — use Download to keep one."}
      </p>

      <section className="gd-rep-sec">
        <h3 className="label">Executive summary</h3>
        <p className="gd-prose-lg">{report.executiveSummary}</p>
      </section>

      <section className="gd-rep-sec">
        <h3 className="label">Department-wise observations</h3>
        <div className="gd-depts">
          {DEPTS.map(({ key, label, ink }) => {
            const d = report.departments?.[key];
            if (!d) return null;
            return (
              <div className="gd-dept" key={key} style={{ "--sig": ink } as React.CSSProperties}>
                <h4>{label}</h4>
                <dl>
                  <dt className="label">Current observation</dt>
                  <dd className="strong">{d.currentObservation}</dd>
                  <dt className="label">Why it matters</dt>
                  <dd>{d.whyItMatters}</dd>
                  <dt className="label">If left unaddressed</dt>
                  <dd>{d.ifLeftUnaddressed}</dd>
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <div className="gd-cols">
        <div className="gd-list good">
          <h3 className="label">Key strengths</h3>
          <ul>
            {report.keyStrengths.map((s) => (
              <li key={s}>
                <i aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="gd-list watch">
          <h3 className="label">Areas requiring attention</h3>
          <ul>
            {report.areasRequiringAttention.map((s) => (
              <li key={s}>
                <i aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="gd-rep-sec">
        <h3 className="label">Closing summary</h3>
        <p className="gd-prose-lg">{report.closingSummary}</p>
      </section>

      <p className="gd-fine">
        This report is generated from the responses submitted during the assessment using our own
        scoring model. It is designed to support reflection and discussion, and should not replace
        professional business, legal, financial or industry-specific advice.
      </p>

      <div className="gd-actions no-print">
        <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
          <Download size={15} /> Download this report
        </button>
        <a className="btn" href={withBase("/#close")}>
          <Calendar size={15} /> Book a consultation
          <span className="arw" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </article>
  );
}
