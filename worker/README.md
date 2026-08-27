# Growth Diagnosis mail endpoint

The site is a static export on GitHub Pages, so it has no server and cannot send
email. This Worker is the one piece that can: it takes the founder's answers,
rebuilds their report, emails it to them, and notifies you of the lead.

**The diagnosis itself doesn't need this.** It's written by the deterministic
scorer in `src/lib/diagnosis/localRead.ts`, which runs in the visitor's browser.
Without this Worker deployed, the whole flow still works — the report just opens
on screen instead of also arriving by email.

---

## What you need to provide

Four things. No Anthropic account, and nothing here costs money.

| # | Thing | Notes |
|---|---|---|
| 1 | **Cloudflare account** | free — 100k requests/day, far beyond this |
| 2 | **Resend account + API key** | free — 3,000 emails/month, 100/day |
| 3 | **`wearein.in` verified in Resend** | SPF + DKIM DNS records. The slow step. |
| 4 | **The two addresses** | already `diagnosis@wearein.in` and `hello@wearein.in` |

Item 3 is the only one with real lead time, and the only one that might depend on
someone else — you need access to whoever manages the domain's DNS. Start there.

`diagnosis@wearein.in` does **not** need to be a real mailbox. It's a sending
identity; nothing is ever delivered to it. Replies go to `hello@wearein.in`,
which the report sets as its Reply-To.

---

## Setup

```sh
cd worker
npm install
npx wrangler login
```

**1. Create the KV namespace** backing the rate limiter, and paste the id it
prints into `wrangler.toml` under `[[kv_namespaces]]`:

```sh
npx wrangler kv namespace create RATE_LIMIT
```

**2. Set the one secret.** `wrangler` stores it encrypted on Cloudflare's side —
it's never written to a file:

```sh
npx wrangler secret put RESEND_API_KEY
```

**3. Check the plain config** in `wrangler.toml` — `ALLOWED_ORIGINS`,
`MAIL_FROM`, `MAIL_NOTIFY`. `MAIL_FROM` must be on the domain you verified in
Resend, or Resend will reject the send.

**4. Deploy:**

```sh
npm run deploy
```

**5. Point the site at it.** Add a repository **variable** (Settings → Secrets
and variables → Actions → Variables) named `DIAGNOSIS_API`, set to the Worker
URL. The deploy workflow already reads it.

A **variable, not a secret**: `NEXT_PUBLIC_*` values are inlined into the
JavaScript bundle at build time, so this URL is public no matter what. Which is
why the Worker rate limits and restricts CORS.

**6. Push to `main`.** The next Pages deploy bakes the URL in, and the form's
button changes from "Show my detailed report" to "Send my detailed report".

---

## Local development

```sh
cp .dev.vars.example .dev.vars   # then fill in the Resend key
npm run dev                      # http://localhost:8787
```

Add `http://localhost:3000` to `ALLOWED_ORIGINS` while developing, and take it
out before deploying. Then run the site against it:

```sh
NEXT_PUBLIC_DIAGNOSIS_API=http://localhost:8787 npm run dev   # from the repo root
```

---

## The endpoint

| Route | Body | Returns |
|---|---|---|
| `POST /detailed` | `{ answers, lead }` | `{ emailed: boolean }` |
| `POST /contact` | `{ message }` | `{ sent: boolean }` |

`emailed` is the literal result of the send, not an inference. The report screen
says "a copy is on its way to your inbox" only when it's `true`; on `false` it
says the copy couldn't be sent and points at Download.

`sent` works the same way for `/contact`, and reflects the collective's copy
only — the sender's acknowledgement is a nicer reply, not the delivery the page
claims. On `false` the contact page says nothing was sent and hands the reader a
prefilled `mailto:` instead, so the message isn't quietly lost.

The rate limit is counted per route, so someone taking the diagnosis has their
own budget from someone using the contact form.

### The contact form

By default the `/contact/` page does **not** use this Worker — it sends through
Web3Forms, which needs no DNS and no Cloudflare account (see
[`docs/contact-form.md`](../docs/contact-form.md)). Setting `CONTACT_API` or
`DIAGNOSIS_API` makes it prefer this route instead, with no code change.

`/contact` is the send path for the `/contact/` page, which is a plain form —
name, company, email, phone, stage, message. The site points at it with either
`NEXT_PUBLIC_CONTACT_API` or, if that's unset, the same
`NEXT_PUBLIC_DIAGNOSIS_API` (it's one Worker; there's no reason to deploy two).
Unlike the diagnosis, nothing is recomputed here — the body *is* the message —
so every field is length-capped, the stage must be one of ours, and everything
reaching the email HTML is escaped.

### Why the report is rebuilt here

The Worker recomputes the report from the answers rather than emailing what the
browser posts. An endpoint that mails caller-supplied content is a spam relay
with your verified domain on it.

Because `localRead.ts` is deterministic — no dates, no randomness — the browser
and the Worker independently produce byte-identical reports from the same
answers. The founder's email matches what they just read.

---

## What it protects against

The endpoint URL is in the public bundle, so all of this matters:

- **CORS** is an allowlist. An unlisted origin gets no grant, not even on the
  preflight.
- **Rate limit**: 5 sends per IP per hour. Fixed-window KV counters, so a
  simultaneous burst can slip slightly over, and production KV reads can be
  briefly stale — it's there to stop relay abuse, not to be exact.
- **Validation** before anything sends: keys must be `q1`–`q15`, values must be
  strings or string arrays within length caps, the email must parse, and a
  near-empty submission is rejected.
- **Escaping**: every value that reaches the email HTML is escaped. The answers
  are attacker-controlled text.
- **The Resend key never reaches the browser.**

`npx wrangler tail` streams live logs, including the `[diagnosis]` lines this
Worker writes when a send fails.

---

## Switching the AI diagnosis on later

The prompts, JSON schemas and revenue-stage guidance are all still in the repo
(`src/lib/diagnosis/prompts.ts`, marked dormant). Turning it on means an
Anthropic key, a call in this Worker, and roughly $0.15–0.25 per diagnosis. The
tradeoff: the current read selects from about 100 pre-written phrases and never
mentions the founder's industry or engages with the sentence they typed at
question 15; a model-written one does both.
