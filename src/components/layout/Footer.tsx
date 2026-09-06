"use client";

import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";
import { useSectionHref } from "@/hooks/useSectionHref";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const { openModal } = useUI();
  const h = useSectionHref();

  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <a className="logo" href={withBase("/")} aria-label="We Are In Collective — back to the cover">
              <Logo />
            </a>
            <p className="tag">We join your business. We don&apos;t work for it.</p>
            <address>
              <a href="mailto:hello@wearein.in">hello@wearein.in</a>
              <br />
              St. Mary&apos;s Arcade, Near Nalumanikkattu,
              <br />
              Thiruvalla – Ettumanoor Bypass, Kottayam
            </address>
            <div>
              <div className="label" style={{ color: "rgba(255,255,255,.55)", marginBottom: 10 }}>
                Find us
              </div>
              <SocialLinks className="soc" />
            </div>
            <div className="f-dots" aria-hidden="true">
              <i style={{ background: "var(--signal)" }} />
              <i style={{ background: "var(--sage)" }} />
              <i style={{ background: "var(--amber)" }} />
              <i style={{ background: "var(--coral)" }} />
              <i style={{ background: "var(--lav)" }} />
            </div>
          </div>

          <div className="f-col ink-teal">
            <h4>
              <i className="mk mk-cir" />
              <a href={withBase("/")}>Start here</a>
            </h4>
            <a href={h("#routes")}>Three ways in</a>
            <a href={withBase("/contact/")}>Let&apos;s talk over coffee</a>
            <a href={withBase("/contact/")}>Contact us</a>
            <a className="hi" href={withBase("/diagnosis/")}>
              Growth diagnosis — diagnose my business
            </a>
            <button type="button" onClick={openModal}>
              Before you hire an agency — 12 questions
            </button>
          </div>

          <div className="f-col ink-sage">
            <h4>
              <i className="mk mk-tri" />
              <a href={withBase("/why-we-exist/")}>Why we exist</a>
            </h4>
            <a href={withBase("/why-we-exist/#story")}>Our story</a>
            <a href={withBase("/why-we-exist/#people")}>People behind the thinking</a>
          </div>

          <div className="f-col ink-amber">
            <h4>
              <i className="mk mk-sq" />
              <a href={withBase("/how-we-exist/")}>How we exist</a>
            </h4>
            <a href={withBase("/how-we-exist/#believe")}>What we believe</a>
            <a href={withBase("/how-we-exist/#think")}>How we think</a>
            <a href={h("#method")}>How we work</a>
            <a href={withBase("/experience/")}>Experience</a>
          </div>

          <div className="f-col ink-lav">
            <h4>
              <i className="mk mk-wedge" />
              <a href={withBase("/thinking/")}>Our thinking</a>
            </h4>
            <a className="hi" href={withBase("/thinking/")}>
              Everything we&apos;ve published
            </a>
            <a href={withBase("/thinking/#observations")}>Observations</a>
            <a href={withBase("/thinking/#perspectives")}>Perspectives</a>
            <a href={withBase("/thinking/#case-studies")}>Case studies</a>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 We Are In Collective</span>
          <span>Clarity is the product · Growth is the outcome</span>
          <span>
            Developed by{" "}
            <a
              href="https://rapportme.com/"
              target="_blank"
              rel="noopener"
              aria-label="Developed by Rapport Group — opens rapportme.com in a new tab"
            >
              Rapport Group
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
