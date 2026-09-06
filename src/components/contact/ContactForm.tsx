"use client";

import { useState } from "react";
import { CONTACT_LIMITS, CONTACT_STAGES, type ContactMessage } from "@/lib/contact/types";
import { CONTACT_EMAIL, hasEndpoint, mailtoHref, sendContact } from "@/lib/contact/client";
import { Spinner } from "@/components/diagnosis/Icons";

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
 * A static site can't send mail, so the send goes to Web3Forms or the Worker.
 * When no endpoint is configured, or the send fails, the form says so plainly
 * and hands over a prefilled mail draft instead of swallowing the message.
 */
export function ContactForm() {
  const [form, setForm] = useState<ContactMessage>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // Spam honeypot: hidden from people, filled in by bots that complete every
  // field. A value here tells the send path to drop the submission.
  const [botcheck, setBotcheck] = useState("");

  const set =
    (key: keyof ContactMessage) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
      <div className="ct-ok">
        <div className="ct-eye label">
          <i className="mk mk-cir" />
          Message received
        </div>
        <h2>Thanks, {form.name.trim().split(/\s+/)[0]}. We&apos;ve got it.</h2>
        <p className="lede">
          A human reads this inbox — usually the same day, and always within two working days. If
          it&apos;s urgent, {CONTACT_EMAIL} reaches the same place.
        </p>
        <div>
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
      </div>
    );
  }

  return (
    <>
      <div className="ct-eye label">
        <i className="mk mk-tri" />
        Send us a note
      </div>
      <h2>A conversation, not a pitch.</h2>
      <form id="ctForm" onSubmit={submit} noValidate>
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          checked={Boolean(botcheck)}
          onChange={(e) => setBotcheck(e.target.checked ? "true" : "")}
        />
        <div className="fields">
          <div className={`field${bad.name ? " bad" : ""}`}>
            <label htmlFor="cName">Your name</label>
            <input
              className="gd-in"
              id="cName"
              name="name"
              value={form.name}
              autoComplete="name"
              maxLength={CONTACT_LIMITS.name}
              onChange={set("name")}
            />
            <span className="err">This one&apos;s needed.</span>
          </div>

          <div className="field">
            <label htmlFor="cCo">Company (optional)</label>
            <input
              className="gd-in"
              id="cCo"
              name="company"
              value={form.company}
              autoComplete="organization"
              maxLength={CONTACT_LIMITS.company}
              onChange={set("company")}
            />
          </div>

          <div className={`field${bad.email ? " bad" : ""}`}>
            <label htmlFor="cMail">Email</label>
            <input
              className="gd-in"
              id="cMail"
              type="email"
              name="email"
              value={form.email}
              autoComplete="email"
              maxLength={CONTACT_LIMITS.email}
              onChange={set("email")}
            />
            <span className="err">Enter a valid email address.</span>
          </div>

          <div className="field">
            <label htmlFor="cPh">Phone (optional)</label>
            <input
              className="gd-in"
              id="cPh"
              type="tel"
              name="phone"
              value={form.phone}
              autoComplete="tel"
              maxLength={CONTACT_LIMITS.phone}
              onChange={set("phone")}
            />
          </div>

          <div className="field full">
            <label htmlFor="cSt">Where the business is right now (optional)</label>
            <select className="gd-in" id="cSt" name="stage" value={form.stage} onChange={set("stage")}>
              <option value="">Pick one, or leave it</option>
              {CONTACT_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={`field full${bad.message ? " bad" : ""}`}>
            <label htmlFor="cMsg">What would you like to talk about?</label>
            <textarea
              className="gd-in"
              id="cMsg"
              name="message"
              rows={6}
              value={form.message}
              maxLength={CONTACT_LIMITS.message}
              placeholder="The business, the problem, or the thing that isn't working. Plain words are fine."
              onChange={set("message")}
            />
            <div className="gd-count">
              <span id="cCount">{form.message.length}</span>/{CONTACT_LIMITS.message}
            </div>
            <span className="err">A sentence or two, so we know what we&apos;re walking into.</span>
          </div>
        </div>

        <div className="ct-actions">
          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Spinner size={15} /> Sending…
              </>
            ) : (
              "✉ Send it"
            )}
          </button>
          <a className="btn btn--ghost" id="ctMailto" href={mailtoHref(form)}>
            Write to us directly instead
          </a>
        </div>

        {status === "failed" ? (
          <p className="fine" style={{ marginTop: 18, color: "var(--coral-ink)" }} role="alert">
            {hasEndpoint
              ? "That didn't go through — the send failed on our side. "
              : "Sending isn't switched on for this site yet, so nothing was sent. "}
            Use <a href={mailtoHref(form)}>write to us directly</a> and your message goes to{" "}
            {CONTACT_EMAIL} with everything above already filled in.
          </p>
        ) : (
          <p className="fine" style={{ marginTop: 18 }}>
            {hasEndpoint
              ? "We use these details to reply, and for nothing else. No list, no sequence, no one outside the collective."
              : `Email sending isn't switched on for this site yet — use "write to us directly" and your message reaches ${CONTACT_EMAIL} with everything above already filled in.`}
          </p>
        )}
      </form>
    </>
  );
}
