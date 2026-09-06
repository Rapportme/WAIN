import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { OG_IMAGES } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageNext } from "@/components/layout/PageNext";

const TITLE = "Contact — We Are In Collective";
const DESCRIPTION =
  "Tell us about the business before we talk about proposals, scope or fees. A human reads every message — usually the same day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    url: "/contact/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "We Are In Collective",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
};

/** Contact — the one page on the site that asks the reader a question back. */
export default function ContactPage() {
  return (
    <main>
      <section className="pg-head ink-teal" id="top">
        <div className="wrap">
          <a className="pg-back" href={withBase("/")}>
            ← Back to the book
          </a>
          <Eyebrow shape="mk-cir" t="Contact" />
          <Reveal as="h1" className="pg-title">
            Start with the business.
            <br />
            Not the brief.
          </Reveal>
          <Reveal as="p" className="lede" d={1}>
            Tell us what&apos;s actually going on and we&apos;ll tell you what we think — including
            when the honest answer is that you shouldn&apos;t spend anything yet.
          </Reveal>
        </div>
      </section>

      <section className="ink-teal">
        <div className="wrap ct-grid">
          <Reveal as="div" id="ctFormWrap">
            <ContactForm />
          </Reveal>

          <Reveal as="aside" d={1}>
            <div className="card">
              <h4>Reach us directly</h4>
              <a className="mail" href="mailto:hello@wearein.in">
                hello@wearein.in
              </a>
              <address>
                St. Mary&apos;s Arcade, Near Nalumanikkattu,
                <br />
                Thiruvalla – Ettumanoor Bypass, Kottayam
              </address>
            </div>
            <div className="card">
              <h4>Elsewhere</h4>
              <SocialLinks className="soc" withHandles />
            </div>
            <div className="card alt">
              <h4>Not ready to write?</h4>
              <p>
                Take the growth diagnosis instead. Fifteen questions, under five minutes, and you
                get an honest first read of where the business stands.
              </p>
              <div>
                <a
                  className="btn btn--ghost"
                  href={withBase("/diagnosis/")}
                  style={{ color: "#fff", boxShadow: "inset 0 0 0 1.5px var(--rule-dark)" }}
                >
                  Get a free growth diagnosis
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageNext
        ink="ink-teal"
        href="/why-we-exist/"
        label="Before you write"
        title="Why we exist"
        note="Who you'd actually be talking to, and why we stopped calling ourselves an agency."
        shape="mk-cir"
      />
    </main>
  );
}
