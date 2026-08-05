import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { CATALYST, SITE } from "@/lib/site";
import {
  buildMetadata,
  graph,
  localBusinessSchema,
  personSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Grafynt is Jonathan Frans, building WhatsApp agents and workflow automation for small and medium businesses from Jakarta. How the work actually runs.",
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
          lede="Grafynt is one person in Jakarta, building WhatsApp agents and workflow automation for small and medium businesses in Indonesia and abroad."
        />

        <div className="mt-12 max-w-[var(--gf-measure)]">
          <p className="text-body text-ink">
            I build the systems myself. That is the reason the prices on this
            site are published rather than quoted on request — there is no sales
            layer to protect, and it is faster for both of us if you can rule
            Grafynt out before a call rather than after one.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            How the work runs
          </h2>
          <p className="text-body text-ink mt-4">
            Every engagement starts with the free audit, because the most common
            outcome of a first conversation is discovering the problem is not
            the one you thought. The audit checks whether AI answer engines name
            your business for buying-intent questions, whether they describe it
            correctly, and which businesses get named instead. It comes with a
            response-speed test on your WhatsApp at three different times.
          </p>
          <p className="text-body text-ink mt-4">
            If a build follows, it is scoped in writing before it starts and
            priced at a fixed number. If nothing follows, you keep the audit.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            On automation and people
          </h2>
          <p className="text-body text-ink mt-4">
            Automation here means reducing the time your operations take, not
            replacing the people who run them. In practice the agent absorbs the
            same handful of questions your team answers a hundred times a week
            — hours, prices, availability, order status — and hands anything
            with judgement in it to a person, quickly and with the history
            attached. Every business I have built for has kept its staff.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            {CATALYST.name}
          </h2>
          <p className="text-body text-ink mt-4">
            {CATALYST.name} is the longer project: a WhatsApp-native operating
            system that generalises what every automation build has in common,
            so the next business does not pay to solve the same problem again.
            It is in development. It is not for sale, it has no price on this
            site, and there is nothing to sign up for. Everything on the{" "}
            <Link
              href="/pricing"
              className="decoration-accent underline decoration-2 underline-offset-4"
            >
              pricing page
            </Link>{" "}
            is available today.
          </p>

          <h2 className="font-display text-display-m text-ink mt-12">
            Where Grafynt works
          </h2>
          <p className="text-body text-ink mt-4">
            Based in {SITE.location.city}, working with teams in Indonesia, the
            United States, the United Kingdom, Australia, Singapore and the
            UAE. Work happens in English or Bahasa Indonesia, and the agents we
            build handle whatever mix of the two your customers actually write
            in.
          </p>
        </div>
      </Container>

      <ClosingCta
        heading="The audit is free and it is not a sales call."
        lede="Three findings and a response-speed test, in about three days."
      />
    </>
  );
}
