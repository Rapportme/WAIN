# The contact form

`/contact/` collects a message and sends it to **hello@wearein.in**.

The site is a **static export** on GitHub Pages (`output: "export"`), so it has
no server, and it cannot hold a secret — every `NEXT_PUBLIC_*` value is inlined
into the JavaScript bundle. Sending therefore happens off-site.

Two transports are supported. Neither is required for the page to work.

|  | Nothing configured | Web3Forms | The Worker |
|---|---|---|---|
| Form, validation, thank-you | works | works | works |
| Mail arrives by itself | no | yes | yes |
| Needs DNS access | — | no | yes (SPF + DKIM) |
| Free ceiling | — | ~250 submissions/month | 3,000 emails/month |
| Spam defence | — | honeypot + their filtering | honeypot, origin allowlist, per-IP rate limit |

**With nothing configured** the form does not pretend to have sent anything. The
fine print reads "Email sending isn't switched on for this site yet", and
"Write to us directly instead" opens the reader's mail client with a draft to
`hello@wearein.in`, every field already filled in. No message is lost; it just
arrives from the visitor's own mail client.

---

## Switching Web3Forms on

**1.** Go to [web3forms.com](https://web3forms.com), enter `hello@wearein.in`,
and copy the **access key** it emails you. No account, no DNS.

**2.** On GitHub: repo → **Settings** → **Secrets and variables** → **Actions**
→ **Variables** → **New repository variable**.

- Name: `WEB3FORMS_KEY`
- Value: the access key

A **variable, not a secret.** The key is inlined into the public bundle either
way; Web3Forms' model assumes it is public and filters spam on their side.

**3.** Push to `main` (or run the Pages workflow by hand).

**To confirm**, open the live `/contact/` page and read the small print under
the Send button:

- "Email sending isn't switched on for this site yet…" → the variable wasn't
  picked up. Check the name, and that the build ran *after* you added it.
- "We use these details to reply, and for nothing else." → live. Send a real
  message to be sure.

Mail arrives with the sender's address as **Reply-To**, so replying in your mail
client goes straight back to them.

### The trade-off worth knowing

The access key is public, so anyone reading the bundle can post to it. The form
ships a honeypot field (hidden, never focusable — bots that fill every field
trip it) and Web3Forms filter on their side, which is normally enough. If spam
does become a problem, the options are their hCaptcha, or moving to the Worker,
which checks the request origin and rate limits by IP.

---

## Moving to the Worker later

The Worker's `POST /contact` route is already written and stays in the repo.
Setting `CONTACT_API` — or `DIAGNOSIS_API`, which the contact form falls back to
— makes the form use the Worker **in preference to Web3Forms**, with no code
change. It needs `wearein.in` verified in Resend first; setup is in
[`worker/README.md`](../worker/README.md).

There is no need to remove `WEB3FORMS_KEY` when you do: the Worker simply wins.
