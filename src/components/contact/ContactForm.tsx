"use client";

import { useState } from "react";
import { CONTACT_LIMITS, CONTACT_STAGES, type ContactMessage } from "@/lib/contact/types";
import { CONTACT_EMAIL, hasEndpoint, mailtoHref, sendContact } from "@/lib/contact/client";
import { Mail, Spinner } from "@/components/diagnosis/Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY: ContactMessage = {
  name: "",
  company: "",
  email: "",
  phone: "",
  stage: "",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * The contact form. Validation happens on submit rather than on every keystroke
 * — the reader shouldn't be told they're wrong while they're still typing.
 *
 * A static site can't send mail, so the send goes to the Worker. When no
 * endpoint is configured, or the send fails, the form says so plainly and hands
 * over a prefilled mail draft instead of swallowing the message.
 */
export function ContactForm() {
  const [form, setForm] = useState<ContactMessage>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // Spam honeypot: hidden from people, filled in by bots that complete every
  // field. A value here tells the send path to drop the submission.
  const [botcheck, setBotcheck] = useState("");

  const set = (key: keyof ContactMessage) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const emailValid = EMAIL_RE.test(form.email.trim());
  const bad = {
    name: touched && !form.name.trim(),
    email: touched && !emailValid,
    message: touched && form.message.trim().length < 10,
  };
  const canSubmit = Boolean(form.name.trim() && emailValid && form.message.trim().length >= 10);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    const result = await sendContact(form, botcheck);
    setStatus(result.sent ? "sent" : "failed");
  };

  if (status === "sent") {
    return (
      <div className="ct-done">
        <div className="gd-eye">
          <span className="mk mk-cir" />
          <span className="t">Message received</span>
        </div>
        <h2 className="ct-done-h">Thanks, {form.name.trim().split(/\s+/)[0]}. We&apos;ve got it.</h2>
        <p className="lede">
          A human reads this inbox — usually the same day, and always within two working days. If
          it&apos;s urgent, {CONTACT_EMAIL} reaches the same place.
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setForm(EMPTY);
            setTouched(false);
            setBotcheck("");
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={submit} noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="ct-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        checked={Boolean(botcheck)}
        onChange={(e) => setBotcheck(e.target.checked ? "true" : "")}
      />
      <div className="ct-fields">
        <label className={bad.name ? "bad" : undefined}>
          <span className="label">Your name</span>
          <input
            type="text"
            value={form.name}
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            onChange={set("name")}
          />
          {bad.name ? <em>This one&apos;s needed.</em> : null}
        </label>

        <label>
          <span className="label">Company (optional)</span>
          <input
            type="text"
            value={form.company}
            autoComplete="organization"
            maxLength={CONTACT_LIMITS.company}
            onChange={set("company")}
          />
        </label>

        <label className={bad.email ? "bad" : undefined}>
          <span className="label">Email</span>
          <input
            type="email"
            value={form.email}
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            onChange={set("email")}
          />
          {bad.email ? <em>Enter a valid email address.</em> : null}
        </label>

        <label>
          <span className="label">Phone (optional)</span>
          <input
            type="tel"
            value={form.phone}
            autoComplete="tel"
            maxLength={CONTACT_LIMITS.phone}
            onChange={set("phone")}
          />
        </label>

        <label className="ct-wide">
          <span className="label">Where the business is right now (optional)</span>
          <select value={form.stage} onChange={set("stage")}>
            <option value="">Pick one, or leave it</option>
            {CONTACT_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className={`ct-wide${bad.message ? " bad" : ""}`}>
          <span className="label">What would you like to talk about?</span>
          <textarea
            rows={6}
            value={form.message}
            maxLength={CONTACT_LIMITS.message}
            placeholder="The business, the problem, or the thing that isn't working. Plain words are fine."
            onChange={set("message")}
          />
          {bad.message ? (
            <em>A sentence or two, so we know what we&apos;re walking into.</em>
          ) : (
            <span className="ct-count">
              {form.message.length}/{CONTACT_LIMITS.message}
            </span>
          )}
        </label>
      </div>

      <div className="gd-actions">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? <Spinner size={15} /> : <Mail size={15} />}
          {status === "sending" ? "Sending…" : "Send it"}
        </button>
        <a className="btn btn--ghost" href={mailtoHref(form)}>
          Write to us directly instead
        </a>
      </div>

      {status === "failed" ? (
        <p className="ct-warn" role="alert">
          {hasEndpoint
            ? "That didn't go through — the send failed on our side. "
            : "Sending isn't switched on for this site yet, so nothing was sent. "}
          Use <a href={mailtoHref(form)}>write to us directly</a> and your message goes to{" "}
          {CONTACT_EMAIL} with everything above already filled in.
        </p>
      ) : (
        <p className="gd-fine">
          {hasEndpoint
            ? "We use these details to reply, and for nothing else. No list, no sequence, no one outside the collective."
            : `Email sending isn't switched on for this site yet — use "write to us directly" and your message reaches ${CONTACT_EMAIL} with everything above already filled in.`}
        </p>
      )}
    </form>
  );
}
