import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHead } from "@/components/section-head";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { EngineAnswer } from "@/components/engine-answer";
import { ServiceRows } from "@/components/service-rows";
import { Ladder } from "@/components/ladder";
import { AuditPanel } from "@/components/audit-panel";
import { AnswerIndexList } from "@/components/answer-index-list";
import { ClosingCta } from "@/components/closing-cta";
import { homeEngineAnswer } from "@/lib/engine-answer";
import { loadAnswers } from "@/lib/answers";
import { SERVICES_EN } from "@/lib/services";
import { SITE } from "@/lib/site";
import {
  auditOfferSchema,
  buildMetadata,
  graph,
  localBusinessSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grafynt, a GEO/AEO/SEO agency for demand capture",
  description:
    "We make search engines and AI assistants name your business to the people already looking for what you sell. Audits, Google Business Profile, competitor analysis, websites.",
  path: "/",
  absoluteTitle: true,
});

/**
 * There is no proof section on this page, and that is deliberate: no
 * logo wall, no testimonial carousel, no metric that did not happen.
 * An empty space is more credible than a fabricated one. /work says
 * the same thing in words.
 */
export default async function HomePage() {
  const answers = await loadAnswers("en");

  return (
    <>
      <JsonLd data={graph(localBusinessSchema(), auditOfferSchema())} />

      <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Eyebrow>GEO · AEO · SEO · Jakarta</Eyebrow>
          <h1 className="font-display text-display-xl text-ink mt-5 max-w-[15ch]">
            Someone is searching for what you sell right now. They are being
            shown a competitor.
          </h1>
          <p className="text-lead text-ink-soft mt-6 max-w-[42ch]">
            Grafynt works on demand capture, not demand generation. We make
            search engines and AI assistants name you to the buyers who are
            already looking.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaButton />
            <Link
              href="/pricing"
              className="text-body-s text-ink-soft hover:text-ink decoration-rule underline underline-offset-4 transition-colors duration-[var(--gf-dur-micro)]"
            >
              Prices are published
            </Link>
          </div>
        </div>

        <EngineAnswer script={homeEngineAnswer()} id="home-answer" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          title="Capture, not generation."
          lede="Demand generation spends money teaching people to want something. Demand capture spends it on being the answer they get when they already do. The second is cheaper, it is measurable, and for most small businesses it is the one left undone."
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title="Five things, done properly." />
        <ServiceRows
          services={SERVICES_EN}
          basePath="/services"
          className="mt-10"
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="The order of work"
          title="Five steps, and each one exists to make the next easier to decide."
          lede="Start with the audit. Nothing here needs a long-term contract, and you can stop at any step."
        />
        <Ladder className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="The audit"
          title="Three findings and a test."
          lede="We run it before we talk, so the first conversation starts with your numbers rather than our pitch."
        />
        <AuditPanel className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title="One question per page, answered properly." />
        <AnswerIndexList
          className="mt-10"
          items={answers.map((answer) => ({
            href: answer.path,
            question: answer.meta.question,
            updated: answer.meta.updated,
          }))}
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title={SITE.founder.name} />
        <div className="mt-6 max-w-[var(--gf-measure)]">
          <p className="text-body text-ink">
            Grafynt is one person in Jakarta. I do the work myself, which is
            why the pricing on this site is a real number rather than a
            conversation. The audit is cheap on purpose, and free if a website
            build follows, because it is faster for both of us if you can see
            the problem before you decide anything.
          </p>
          <p className="text-body text-ink mt-5">
            The work is narrow on purpose. I do not run ads, I do not build
            funnels, and I will not sell you awareness. I find out which
            buying-intent questions your market is asking, then make you the
            business that gets named when they are asked.
          </p>
          <p className="text-body-s text-ink-soft mt-5">
            <Link
              href="/about"
              className="decoration-accent underline decoration-2 underline-offset-4"
            >
              More about how this works
            </Link>
          </p>
        </div>
      </Container>

      <ClosingCta
        heading="Three findings and a test, in about three days."
        lede="I check whether search engines and AI assistants name your business, whether they describe it correctly, and who gets named instead. Rp 710.000, and free if a website build follows."
      />
    </>
  );
}
