import type { Metadata } from "next";
import { withBase } from "@/lib/withBase";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHead, type PageIndexEntry } from "@/components/layout/PageHead";
import { PageNext } from "@/components/layout/PageNext";
import { DirectLines } from "@/components/contact/DirectLines";
import { SERVICES, type Service } from "@/data/services";
import { CONTACT, hasPhone } from "@/data/contact";
import { postsForService } from "@/data/blog";

const SITE = "https://wearein.in";

export function serviceMetadata(s: Service): Metadata {
  const url = `/${s.slug}/`;
  return {
    title: s.seoTitle,
    description: s.description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.seoTitle, description: s.description, siteName: "We Are In Collective" },
    twitter: { card: "summary_large_image", title: s.seoTitle, description: s.description },
  };
}

function jsonLd(s: Service) {
  const url = `${SITE}/${s.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${s.name} in Kottayam, Kerala`,
        serviceType: s.serviceType,
        description: s.answer,
        url,
        provider: { "@id": `${SITE}/#organization` },
        areaServed: [
          { "@type": "City", name: "Kottayam" },
          { "@type": "AdministrativeArea", name: "Kerala" },
          { "@type": "Country", name: "India" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: s.name,
          itemListElement: s.included.map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.title, description: i.body },
          })),
        },
        ...(hasPhone ? { telephone: CONTACT.phone } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: s.name, item: url },
        ],
      },
    ],
  };
}

/** One service page: answer, what's included, how it works, fit, pricing, FAQ, next step. */
export function ServicePage({ service: s }: { service: Service }) {
  const i = SERVICES.findIndex((x) => x.slug === s.slug);
  const next = SERVICES[(i + 1) % SERVICES.length] ?? s;
  const index: PageIndexEntry[] = [
    { href: "#included", title: "What's included", note: "Everything that's part of the work, in plain words.", shape: "mk-sq", ink: "ink-teal" },
    { href: "#how", title: "How it works", note: "Five steps, in order, with you at each decision.", shape: "mk-tri", ink: "ink-sage" },
    { href: "#fit", title: "Is it right for you?", note: "When we're a good fit — and when we're not.", shape: "mk-cir", ink: "ink-coral" },
    { href: "#faq", title: "Questions people ask", note: "Including what it costs.", shape: "mk-a", ink: "ink-amber" },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(s)) }} />
      <PageHead ink={s.ink} kicker={s.kicker} shape={s.shape} title={s.h1} intro={s.intro} index={index} />

      <section className={`sec ${s.ink}`} id="answer" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal as="div" className="tl-dr" style={{ marginTop: 0 }}>
            <div className="k">The short version</div>
            <p>{s.answer}</p>
          </Reveal>
          <div className="two" style={{ marginTop: "clamp(40px,6vh,70px)" }}>
            <Reveal as="h2" className="statement">
              {s.statement[0]} <span className="soft">{s.statement[1]}</span>
            </Reveal>
            <Reveal as="div" className="stack" d={1}>
              {s.why.map((p) => (
                <p className="lede" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec ink-teal" id="included" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-sq" t="What's included" />
          <Reveal as="h2" className="statement">
            What you get. <span className="soft">Nothing padded.</span>
          </Reveal>
          <Reveal as="ul" className="plist svc-list" d={1} style={{ marginTop: 30 }}>
            {s.included.map((it) => (
              <li key={it.title}>
                <i className="mk mk-sq" />
                <span>
                  <strong>{it.title}.</strong> {it.body}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec ink-sage" id="how" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-tri" t="How it works" />
          <Reveal as="h2" className="statement">
            Five steps. <span className="soft">In order.</span>
          </Reveal>
          <Reveal as="ol" className="svc-steps" d={1}>
            {s.steps.map((st, k) => (
              <li key={st.title}>
                <span className="n">{String(k + 1).padStart(2, "0")}</span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec ink-coral" id="fit" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-cir" t="Is it right for you?" />
          <div className="two">
            <div>
              <Reveal as="h2" className="statement">
                A good fit when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={1} style={{ marginTop: 30 }}>
                {s.goodFit.map((t) => (
                  <li key={t}>
                    <i className="mk mk-tri" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <Reveal as="h2" className="statement" d={1}>
                Not the right fit when&hellip;
              </Reveal>
              <Reveal as="ul" className="plist" d={2} style={{ marginTop: 30 }}>
                {s.notFit.map((t) => (
                  <li key={t}>
                    <i className="mk mk-cir" />
                    {t}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
          <Reveal as="div" className="svc-price" d={1}>
            <h2 className="k">What it costs</h2>
            <p>{s.pricing.body}</p>
            {s.pricing.ranges?.length ? (
              <div className="cmp-wrap"><table className="cmp">
                <tbody>
                  {s.pricing.ranges.map((r) => (
                    <tr key={r.item}>
                      <th scope="row">{r.item}</th>
                      <td>{r.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="sec ink-amber" id="faq" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap">
          <Eyebrow shape="mk-a" t="Questions people ask" />
          <Reveal as="h2" className="statement">
            Asked before, <span className="soft">answered plainly.</span>
          </Reveal>
          <Reveal as="div" className="faq" d={1}>
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
          <Reveal as="div" className="ctas" style={{ marginTop: 40 }}>
            <a className="btn" href={withBase("/contact/")}>
              Talk to us about {s.name.toLowerCase()} <span className="ar">→</span>
            </a>
            <a className="mark" href={withBase("/diagnosis/")}>
              Not sure what you need? Take the free growth diagnosis <span className="ar">→</span>
            </a>
          </Reveal>
          <DirectLines place={`service-${s.slug}`} />
          {postsForService(s.slug).length ? (
            <div className="svc-reading">
              <p className="k">Read before you decide</p>
              <ul>
                {postsForService(s.slug).map((p) => (
                  <li key={p.slug}>
                    <a href={withBase(`/thinking/${p.slug}/`)}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="svc-related">
            Related:{" "}
            {s.related.map((r, k) => (
              <span key={r.href}>
                {k ? " · " : ""}
                <a href={withBase(r.href)}>{r.label}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <PageNext
        ink={next.ink}
        href={`/${next.slug}/`}
        label="Another way we help"
        title={next.name}
        note={next.intro}
        shape={next.shape}
      />
    </main>
  );
}
