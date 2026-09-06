"use client";

import { useState } from "react";
import type { LeadDetails } from "@/lib/diagnosis/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, Spinner } from "./Icons";

const FIELDS: {
  key: keyof LeadDetails;
  id: string;
  label: string;
  type: string;
  required: boolean;
  autoComplete: string;
}[] = [
  { key: "name", id: "lName", label: "Name", type: "text", required: true, autoComplete: "name" },
  { key: "company", id: "lCo", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { key: "email", id: "lMail", label: "Email", type: "email", required: true, autoComplete: "email" },
  { key: "phone", id: "lPh", label: "Phone (optional)", type: "tel", required: false, autoComplete: "tel" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface LeadFormProps {
  onSubmit: (lead: LeadDetails) => void;
  onCancel: () => void;
  submitting: boolean;
  /** False until the report endpoint is configured — the copy must not promise
      an email nobody is going to receive. */
  willEmail: boolean;
}

export function LeadForm({ onSubmit, onCancel, submitting, willEmail }: LeadFormProps) {
  const [form, setForm] = useState<LeadDetails>({ name: "", company: "", email: "", phone: "" });
  const [touched, setTouched] = useState(false);

  const emailValid = EMAIL_RE.test(form.email.trim());
  const canSubmit = Boolean(form.name.trim() && form.company.trim() && emailValid);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (canSubmit && !submitting) onSubmit(form);
  };

  return (
    <div className="gd-form">
      <Eyebrow shape="mk-cir" t="The full picture" />
      <Reveal as="h2">Receive your detailed report.</Reveal>
      <Reveal as="p" className="lede" d={1}>
        A fuller department-by-department read — strategy, customers, marketing, sales, operations,
        finance, and how much of the business still runs through you.
      </Reveal>

      {/* Reveal can't render a <form>; the form is wrapped in a revealed div instead. */}
      <Reveal as="div" d={2}>
        <form id="leadForm" onSubmit={submit} noValidate>
          <div className="fields">
            {FIELDS.map((f) => {
              const invalid =
                touched &&
                f.required &&
                (f.key === "email" ? !emailValid : !form[f.key].trim());
              return (
                <div key={f.key} className={`field${invalid ? " bad" : ""}`}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input
                    className="gd-in"
                    id={f.id}
                    type={f.type}
                    value={form[f.key]}
                    required={f.required}
                    autoComplete={f.autoComplete}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  />
                  {f.required ? (
                    <span className="err">
                      {f.key === "email" ? "Enter a valid email address." : "This one's needed."}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="ctas">
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? <Spinner size={15} /> : <Mail size={15} />}
              {submitting
                ? "Preparing your report…"
                : willEmail
                  ? "Send my detailed report"
                  : "Show my detailed report"}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onCancel}
              disabled={submitting}
            >
              Back to my diagnosis
            </button>
          </div>

          <p className="fine" style={{ marginTop: 18 }}>
            {willEmail
              ? "We use these details to send the report and, if you want it, to follow up once. Nothing else, and never to anyone outside the collective."
              : "Your report opens on the next screen. Email delivery isn't switched on yet, so these details stay in your browser and reach no one — use Download to keep a copy."}
          </p>
        </form>
      </Reveal>
    </div>
  );
}
