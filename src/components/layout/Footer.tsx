"use client";

import Image from "next/image";
import { withBase } from "@/lib/withBase";
import { useUI } from "@/components/providers/UIProvider";
import { useSectionHref } from "@/hooks/useSectionHref";

export function Footer() {
  const { openModal } = useUI();
  const h = useSectionHref();

  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <a href={h("#top")} className="logo f-logo" aria-label="We Are In Collective — back to the cover">
              <Image
                src={withBase("/images/weareinwhite.png")}
                alt="We Are In Collective"
                width={1022}
                height={1077}
                priority={false}
              />
            </a>
            <p>We join your business. We don&apos;t work for it.</p>
            <div className="f-contact">
              <a href="mailto:hello@wearein.in">hello@wearein.in</a>
              <p>
                St. Mary&apos;s Arcade, Near Nalumanikkattu, Thiruvalla &ndash; Ettumanoor Bypass,
                Kottayam
              </p>
            </div>
            <div className="f-dots" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="f-col">
            <h5>
              <span className="mk mk-cir" />
              Start here
            </h5>
            <a href={h("#routes")}>Three ways in</a>
            <a href={h("#close")}>Let&apos;s talk over coffee</a>
            <a href={withBase("/diagnosis/")} className="hi">
              Growth diagnosis — diagnose my business
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              Before you hire an agency — 12 questions
            </a>
          </div>

          <div className="f-col">
            <h5>
              <span className="mk mk-tri" />
              Why we exist
            </h5>
            <a href="#">Our story</a>
            <a href="#">People behind the thinking</a>
            <a href="#">Failure resumes</a>
            <a href="#">Founder Q&amp;A</a>
          </div>

          <div className="f-col">
            <h5>
              <span className="mk mk-sq" />
              How we exist
            </h5>
            <a href="#">What we believe</a>
            <a href="#">How we think</a>
            <a href={h("#method")}>How we work</a>
            <a href={h("#experience")}>Experience</a>
          </div>

          <div className="f-col">
            <h5>
              <span className="mk mk-wedge" />
              Our thinking
            </h5>
            <a href={h("#thinking")}>Observations</a>
            <a href={h("#thinking")}>Perspectives</a>
            <a href={h("#thinking")}>Case studies</a>
            <a href={h("#thinking")}>Field notes</a>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 We Are In Collective</span>
          <span className="f-tag">Clarity is the product · Growth is the outcome</span>
          <a
            className="f-credit"
            href="https://pixlverse.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Developed by Pixlverse — opens pixlverse.in in a new tab"
          >
            <span className="f-credit-label">Developed by</span>
            <span className="f-credit-name">Pixlverse</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
