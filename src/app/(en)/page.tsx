import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHead } from "@/components/section-head";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppThread } from "@/components/whatsapp-thread";
import { ServiceRows } from "@/components/service-rows";
import { Ladder } from "@/components/ladder";
import { AuditPanel } from "@/components/audit-panel";
import { AnswerIndexList } from "@/components/answer-index-list";
import { ClosingCta } from "@/components/closing-cta";
import { homeThread } from "@/lib/threads";
import { loadAnswers } from "@/lib/answers";
import { SERVICES_EN } from "@/lib/services";
import { CATALYST, SITE } from "@/lib/site";
import {
  auditOfferSchema,
  buildMetadata,
  graph,
  localBusinessSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grafynt — AI automation for small and medium businesses",
  description:
    "WhatsApp AI agents, n8n workflow automation, and websites built to be found by AI answer engines. Jakarta-based, working with teams in six markets.",
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
          <Eyebrow>AI automation · Jakarta</Eyebrow>
          <h1 className="font-display text-display-xl text-ink mt-5 max-w-[15ch]">
            Your customers already message you. Answering every one is the part
            that doesn&rsquo;t scale.
          </h1>
          <p className="text-lead text-ink-soft mt-6 max-w-[46ch]">
            WhatsApp agents, workflow automation, and websites built to be
            found. Jakarta-based, working with teams in Indonesia, the US, the
            UK, Australia, Singapore and the UAE.
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

        <WhatsAppThread thread={homeThread()} id="home-thread" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead eyebrow="What we build" title="Three things, done properly." />
        <ServiceRows
          services={SERVICES_EN}
          basePath="/services"
          className="mt-10"
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="The ladder"
          title="Four steps, and each one exists to make the next easier to decide."
          lede="Start free. Nothing here needs a long-term contract, and you can stop at any step."
        />
        <Ladder className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="The free audit"
          title="Three findings and a test."
          lede="We run it before we talk, so the first conversation starts with your numbers rather than our pitch."
        />
        <AuditPanel className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="Answers"
          title="One question per page, answered properly."
        />
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
        <SectionHead eyebrow="Who builds this" title={SITE.founder.name} />
        <div className="mt-6 max-w-[var(--gf-measure)]">
          <p className="text-body text-ink">
            Grafynt is one person in Jakarta. I build the systems myself, which
            is why the pricing on this site is a real number rather than a
            conversation, and why the audit is free — it is faster for both of
            us if you can see the problem before you decide anything.
          </p>
          <p className="text-body text-ink mt-5">
            {CATALYST.name} is the longer project: a WhatsApp-native operating
            system that generalises what every automation build has in common.
            It is in development and not for sale yet. Everything on the pricing
            page is available today.
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
        heading="Three findings and a test. No cost, no pitch."
        lede="I check whether AI answer engines name your business, whether they describe it correctly, and who gets named instead. About three days."
      />
    </>
  );
}
