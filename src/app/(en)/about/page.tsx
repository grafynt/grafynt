import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import {
  buildMetadata,
  graph,
  localBusinessSchema,
  personSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Grafynt is Jonathan Frans, working on search and AI answer-engine visibility for small and medium businesses from Jakarta. How the work actually runs.",
  path: "/about",
});

/**
 * The author entity page. It matters more than its traffic suggests:
 * attributable authorship is weighted in model citation, so the Person
 * schema here, the byline on every answer page, and this copy all have
 * to describe the same person consistently.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(personSchema(), localBusinessSchema())} />

      <Container className="py-16 md:py-20">
        <SectionHead
          as="h1"
          size="l"
          id="jonathan-frans"
          eyebrow="About"
          title={SITE.founder.name}
          lede="Grafynt is one person in Jakarta, working on search and AI answer-engine visibility for small and medium businesses in Indonesia and abroad."
        />

        <div className="mt-12 max-w-[var(--gf-measure)]">
          <p className="text-body text-ink">
            I do the work myself. That is the reason the prices on this site are
            published rather than quoted on request. There is no sales layer to
            protect, and it is faster for both of us if you can rule Grafynt out
            before a call rather than after one.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            Demand capture, not demand generation
          </h2>
          <p className="text-body text-ink mt-4">
            Most marketing money is spent on demand generation: convincing
            people to want something they were not looking for. It is expensive,
            it is slow to attribute, and for a small business it is usually the
            wrong order of operations.
          </p>
          <p className="text-body text-ink mt-4">
            Demand capture is the opposite job. The buyer already wants what you
            sell and is actively looking for it. The only question is whether
            they find you or somebody else. That question has a definite answer,
            you can measure it today, and it is almost always fixable. So that
            is the only thing Grafynt works on.
          </p>
          <p className="text-body text-ink mt-4">
            It also means the targeting is narrow by design. We work out the
            specific demographic that actually buys from you, which city or
            district they search from, in which language, and at which point in
            a decision. Being named for everything is not the goal. Being named
            for the questions that precede a purchase is.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            GEO, AEO and SEO
          </h2>
          <p className="text-body text-ink mt-4">
            Three names for overlapping work, and the overlap is larger than the
            acronyms suggest. SEO is being ranked by a search engine. AEO is
            being the answer it extracts. GEO is being the business a generative
            assistant names when it writes a reply in its own words.
          </p>
          <p className="text-body text-ink mt-4">
            The reason they converge: AI assistants do not answer from memory.
            They retrieve. Retrieval-augmented generation and live web-search
            APIs mean an assistant goes and reads pages at the moment it is
            asked, then quotes whichever one answers the question most directly.
            So the work is the same work it always was, made stricter. The page
            has to be retrievable, it has to answer outright rather than
            introduce itself, and everything written about you elsewhere has to
            corroborate it.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            How the work runs
          </h2>
          <p className="text-body text-ink mt-4">
            Every engagement starts with the audit, because the most common
            outcome of a first conversation is discovering the problem is not
            the one you thought. The audit checks whether search engines and AI
            assistants name your business for buying-intent questions, whether
            they describe it correctly, and which businesses get named instead.
            It comes with a retrieval and consistency test across your site,
            your Google Business Profile and your other listings.
          </p>
          <p className="text-body text-ink mt-4">
            If work follows, it is scoped in writing before it starts and priced
            at a fixed number. If nothing follows, you keep the audit.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            On keyword consistency
          </h2>
          <p className="text-body text-ink mt-4">
            One service, one phrase, everywhere. The commonest reason a small
            business is invisible to an assistant is not that it has written too
            little. It is that it has described the same service three different
            ways across its website, its Google Business Profile and its
            directory listings, so nothing corroborates anything and the
            assistant quotes a competitor that reads as one coherent source
            instead.
          </p>
          <p className="text-body text-ink mt-4">
            That is unglamorous and it is most of the job. Where automation
            appears in this list, it exists for the same reason: an enquiry you
            worked to capture and then left sitting unanswered is a cost, not a
            lead. Automation reduces the time your operations take. It does not
            replace the people who run them.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            Where Grafynt works
          </h2>
          <p className="text-body text-ink mt-4">
            Based in {SITE.location.city}, working with teams in Indonesia, the
            United States, the United Kingdom, Australia, Singapore and the UAE.
            Work happens in English or Bahasa Indonesia, and the queries we
            target are the ones your buyers actually type, in whichever of the
            two that turns out to be.
          </p>
          <p className="text-body-s text-ink-soft mt-8">
            <Link
              href="/pricing"
              className="decoration-accent underline decoration-2 underline-offset-4"
            >
              Everything on the pricing page
            </Link>{" "}
            is available today.
          </p>
        </div>
      </Container>

      <ClosingCta
        heading="The audit is three days and it is not a sales call."
        lede="Three findings and a retrieval test. Rp 710.000, and free if a website build follows."
      />
    </>
  );
}
