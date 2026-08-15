"use client";

import { useState } from "react";
import type { LeadDetails } from "@/lib/diagnosis/types";
import { Mail, Spinner } from "./Icons";

const FIELDS: { key: keyof LeadDetails; label: string; type: string; required: boolean }[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "company", label: "Company", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone (optional)", type: "tel", required: false },
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
    <form className="gd-form" onSubmit={submit} noValidate>
      <div className="gd-eye">
        <span className="mk mk-cir" />
        <span className="t">The full picture</span>
      </div>

      <h2 className="gd-form-h">Receive your detailed report.</h2>
      <p className="lede">
        A fuller department-by-department read — strategy, customers, marketing, sales, operations,
        finance, and how much of the business still runs through you.
      </p>

      <div className="gd-fields">
        {FIELDS.map((f) => {
          const invalid =
            touched &&
            f.required &&
            (f.key === "email" ? !emailValid : !form[f.key].trim());
          return (
            <label key={f.key} className={invalid ? "bad" : undefined}>
              <span className="label">{f.label}</span>
              <input
                type={f.type}
                value={form[f.key]}
                required={f.required}
                autoComplete={
                  f.key === "email" ? "email" : f.key === "phone" ? "tel" : f.key === "name" ? "name" : "organization"
                }
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              />
              {invalid ? (
                <em>{f.key === "email" ? "Enter a valid email address." : "This one's needed."}</em>
              ) : null}
            </label>
          );
        })}
      </div>

      <div className="gd-actions">
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? <Spinner size={15} /> : <Mail size={15} />}
          {submitting
            ? "Preparing your report…"
            : willEmail
              ? "Send my detailed report"
              : "Show my detailed report"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={submitting}>
          Back to my diagnosis
        </button>
      </div>

      <p className="gd-fine">
        {willEmail
          ? "We use these details to send the report and, if you want it, to follow up once. Nothing else, and never to anyone outside the collective."
          : "Your report opens on the next screen. Email delivery isn't switched on yet, so these details stay in your browser and reach no one — use Download to keep a copy."}
      </p>
    </form>
  );
}
