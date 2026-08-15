# The diagnosis endpoint

The site is a **static export** on GitHub Pages (`output: "export"`), so it has
no server of its own.

**The diagnosis needs no server.** `src/lib/diagnosis/localRead.ts` scores the
fifteen answers and writes the read in the visitor's browser — deterministic, no
network call, no cost, nothing to configure. That is the live behaviour today.

**Email does need a server**, because a browser cannot send mail. That is the
only job of `worker/` — a Cloudflare Worker holding the Resend key.

→ Setup lives in [`worker/README.md`](../worker/README.md): four things to
provide, none of which cost money.

## With and without the Worker

|  | No Worker | Worker deployed |
|---|---|---|
| Quiz and on-screen read | works | works |
| Detailed report on screen | works | works |
| Report emailed to the founder | no | yes |
| Lead notification to you | no | yes |
| Form button reads | "Show my detailed report" | "Send my detailed report" |

The page tells the truth in both states, and a delivery failure never costs the
founder their report — it still opens on screen, and the copy says the email
couldn't be sent rather than claiming it was.

## The dormant AI path

`src/lib/diagnosis/prompts.ts` still holds the system prompts, the revenue-stage
guidance and the reasoning pipeline, marked dormant. They're kept so the
model-written diagnosis can be switched on without rewriting anything — see the
last section of `worker/README.md` for what that would cost and what it buys.
