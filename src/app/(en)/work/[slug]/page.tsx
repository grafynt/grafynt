import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHead } from "@/components/section-head";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { PUBLISHED_WORK, WORK } from "@/lib/work";
import { articleSchema, buildMetadata, graph } from "@/lib/seo";

export const dynamicParams = false;

/** Only published entries get a route, so an entry waiting on real
 *  data has no URL and no sitemap entry until it has some. */
export function generateStaticParams() {
  return PUBLISHED_WORK.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.summary,
    path: `/work/${slug}`,
  });
}

/**
 * A measurement entry renders from `baseline` in src/lib/work.ts. No
 * finding is typed into this file, for the same reason no price is
 * typed into the price table: the next run edits the data, and the page
 * follows.
 *
 * The method is listed before the findings on purpose. A result nobody
 * can reproduce is an advertisement, and this page only means anything
 * if the next run is run identically.
 */
export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug && w.published);
  if (!item) notFound();

  const baseline = item.baseline;

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({
            headline: item.title,
            description: item.summary,
            path: `/work/${slug}`,
            datePublished: item.datePublished ?? "",
          }),
        )}
      />
      <article>
        <Container className="py-16 md:py-20">
          <Eyebrow>Case study</Eyebrow>
          <h1 className="font-display text-display-l text-ink mt-4 max-w-[22ch]">
            {item.title}
          </h1>
          <p className="text-lead text-ink mt-6 max-w-[52ch]">{item.summary}</p>

          {baseline ? (
            <p className="text-note text-ink-soft border-rule mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t pt-4 font-mono uppercase">
              <span>Measured {baseline.measuredOn}</span>
              <span>Subject: Grafynt</span>
            </p>
          ) : null}
        </Container>

        {baseline ? (
          <>
            <Container as="section" className="border-rule border-t py-16">
              <SectionHead
                eyebrow="Method"
                title="How this was run, so it can be run again."
                lede="A result nobody can reproduce is an advertisement. The next run uses this list unchanged."
              />
              <ol className="border-rule mt-8 max-w-[var(--gf-measure)] border-t">
                {baseline.method.map((step, i) => (
                  <li
                    key={step}
                    className="border-rule flex gap-5 border-b py-4"
                  >
                    <span
                      aria-hidden
                      className="text-data text-ink-faint w-6 shrink-0 font-mono"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-s text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </Container>

            <Container as="section" className="border-rule border-t py-16">
              <SectionHead
                eyebrow="Findings"
                title="Three findings and a test."
              />
              <div className="mt-8 max-w-[var(--gf-measure)]">
                {baseline.findings.map((finding) => (
                  <section key={finding.title} className="border-rule border-t py-6">
                    <h3 className="font-display text-display-s text-ink">
                      {finding.title}
                    </h3>
                    <p className="text-body-s text-ink-soft mt-2">
                      {finding.body}
                    </p>
                  </section>
                ))}

                {/* The test carries the accent left edge, as it does in
                    AuditPanel: it is the part nobody else does. */}
                <section className="border-rule border-t border-l-2 border-l-[var(--gf-accent)] py-6 pl-4">
                  <h3 className="font-display text-display-s text-ink">
                    {baseline.retrieval.title}
                  </h3>
                  <p className="text-body-s text-ink-soft mt-2">
                    {baseline.retrieval.body}
                  </p>
                </section>
              </div>
            </Container>

            <Container as="section" className="border-rule border-t py-16">
              <SectionHead
                eyebrow="What happens next"
                title="Written down before we know the answer."
                lede="Published in advance so it cannot be rewritten afterwards."
              />
              <ul className="border-rule mt-8 max-w-[var(--gf-measure)] border-t">
                {baseline.next.map((line) => (
                  <li
                    key={line}
                    className="border-rule text-body-s text-ink border-b py-4"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Container>
          </>
        ) : null}
      </article>

      <ClosingCta
        heading="The same measurement, run on your business."
        lede="Three findings and a retrieval test, in about three days. Rp 710.000, and free if a website build follows."
      />
    </>
  );
}
