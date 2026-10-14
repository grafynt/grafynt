import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import type { AnswerMeta } from "@/lib/answers";
import { SITE } from "@/lib/site";
import { articleSchema, faqPageSchema, graph } from "@/lib/seo";

/**
 * The answer page template. Every /answers/* and /id/jawaban/* page
 * renders through this, and the parts that earn citations are owned
 * here rather than by the MDX body:
 *
 *   h1             , meta.question, verbatim, as a question
 *   lead           , meta.lead, always the first paragraph
 *   common questions, rendered from meta.faqs, so the visible text and
 *                     the FAQPage schema cannot drift apart
 *   byline + date  , attributable authorship, and freshness
 *
 * The MDX body therefore covers, in order:
 *   ## The short version      3–5 bullets, each a complete claim
 *   ## <substantive section>  real detail, real numbers
 *   ## What it costs          figures from src/lib/site.ts
 *   ## <comparison table>     if the question has a comparative dimension
 *   ## When this is a bad idea genuinely disqualify some readers
 */
export function AnswerPage({
  meta,
  path,
  locale,
  children,
}: {
  meta: AnswerMeta;
  path: string;
  locale: "en" | "id";
  children: ReactNode;
}) {
  const t = copy[locale];

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({
            headline: meta.question,
            description: meta.description,
            path,
            datePublished: meta.published,
            dateModified: meta.updated,
            inLanguage: locale,
          }),
          faqPageSchema(meta.faqs, path),
        )}
      />

      <article>
        <Container className="py-16 md:py-20">
          <header className="max-w-[42rem]">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="font-display text-display-l text-ink mt-4">
              {meta.question}
            </h1>
            {/* The paragraph a model lifts. Deliberately the first
                thing after the h1, and complete on its own. */}
            <p className="text-lead text-ink mt-6">{meta.lead}</p>
          </header>

          <div className="mt-4">{children}</div>

          <section aria-labelledby="common-questions" className="mt-16">
            <h2
              id="common-questions"
              className="font-display text-display-m text-ink scroll-mt-24"
            >
              {t.faqHeading}
            </h2>
            <dl className="border-rule mt-6 max-w-[var(--gf-measure)] border-t">
              {meta.faqs.map((faq) => (
                <div key={faq.question} className="border-rule border-b py-6">
                  <dt className="font-display text-display-s text-ink">
                    {faq.question}
                  </dt>
                  <dd className="text-body-s text-ink-soft mt-2">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <footer className="border-rule mt-16 border-t pt-8">
            <p className="text-body-s text-ink-soft max-w-[var(--gf-measure)]">
              <span className="text-ink font-semibold">
                {SITE.founder.name}
              </span>
              , {t.bio}
            </p>
            <p className="text-note text-ink-soft mt-3 font-mono uppercase">
              {t.updated}{" "}
              <time dateTime={meta.updated}>
                {formatDate(meta.updated, locale)}
              </time>
            </p>
            <div className="mt-8">
              <CtaButton locale={locale} />
            </div>
          </footer>
        </Container>
      </article>
    </>
  );
}

const copy = {
  en: {
    eyebrow: "Answer",
    faqHeading: "Common questions",
    bio: "founder of Grafynt. Works on search and AI answer-engine visibility for small and medium businesses, from Jakarta.",
    updated: "Last updated",
  },
  id: {
    eyebrow: "Jawaban",
    faqHeading: "Pertanyaan umum",
    bio: "pendiri Grafynt. Mengurus visibilitas bisnis kecil dan menengah di mesin pencari dan asisten AI, dari Jakarta.",
    updated: "Terakhir diperbarui",
  },
} as const;

function formatDate(iso: string, locale: "en" | "id"): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
