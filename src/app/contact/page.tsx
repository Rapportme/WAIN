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
      <header className="chapter ct-head" id="top">
        <div className="wrap">
          <a href={withBase("/")} className="pg-back">
            <span className="arw" aria-hidden="true">
              &larr;
            </span>{" "}
            Back to the book
          </a>
          <Eyebrow shape="mk-cir" t="Contact" />
          <Reveal as="h1" className="pg-title" d={1}>
            Start with the business.
            <br />
            Not the brief.
          </Reveal>
          <Reveal as="p" className="lede" d={2}>
            Tell us what&apos;s actually going on and we&apos;ll tell you what we think — including
            when the honest answer is that you shouldn&apos;t spend anything yet.
          </Reveal>
        </div>
      </header>

      <section className="chapter ct-body">
        <div className="wrap ct-grid">
          <Reveal as="div" className="ct-col-form">
            <div className="gd-eye">
              <span className="mk mk-tri" />
              <span className="t">Send us a note</span>
            </div>
            <h2 className="ct-h">A conversation, not a pitch.</h2>
            <ContactForm />
          </Reveal>

          <Reveal as="aside" className="ct-aside" d={2}>
            <div className="ct-card">
              <h3>Reach us directly</h3>
              <a className="ct-mail" href="mailto:hello@wearein.in">
                hello@wearein.in
              </a>
              <p className="ct-addr">
                St. Mary&apos;s Arcade, Near Nalumanikkattu,
                <br />
                Thiruvalla &ndash; Ettumanoor Bypass, Kottayam
              </p>
            </div>

            <div className="ct-card">
              <h3>Elsewhere</h3>
              <SocialLinks className="social social--stack" withHandles />
            </div>

            <div className="ct-card ct-card--alt">
              <h3>Not ready to write?</h3>
              <p>
                Take the growth diagnosis instead. Fifteen questions, under five minutes, and you
                get an honest first read of where the business stands.
              </p>
              <a className="btn btn--ghost" href={withBase("/diagnosis/")}>
                Get a free growth diagnosis
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PageNext
        href="/why-we-exist/"
        label="Before you write"
        title="Why we exist"
        note="Who you'd actually be talking to, and why we stopped calling ourselves an agency."
        shape="mk-cir"
      />
    </main>
  );
}
