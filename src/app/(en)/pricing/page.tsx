import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { PriceTable } from "@/components/price-table";
import { AuditPanel } from "@/components/audit-panel";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { CATALYST, LADDER } from "@/lib/site";
import { auditOfferSchema, buildMetadata, graph } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Real numbers: the free audit, websites from Rp 8.000.000, automation builds at Rp 5.300.000, and an honest note on when none of it is worth buying.",
  path: "/pricing",
});

const website = LADDER.find((r) => r.name === "Website")!;
const automation = LADDER.find((r) => r.name === "Automation build")!;

export default function PricingPage() {
  return (
    <>
      <JsonLd data={graph(auditOfferSchema())} />

      <Container className="py-16 md:py-20">
        <SectionHead
          as="h1"
          size="l"
          eyebrow="Pricing"
          title="Published, because you should be able to decide before you talk to me."
          lede="Most agencies in this market quote on request. That mostly protects the agency. These are the actual numbers, and the audit that comes before them is free."
        />

        <PriceTable className="mt-12" />

        <div className="border-rule mt-16 grid gap-12 border-t pt-12 md:grid-cols-2">
          <section>
            <h2 className="font-display text-display-m text-ink">
              What moves the website price
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              {website.price} is a floor, not an average. Four things move it:
              how many pages you need, whether the writing exists or has to be
              written, whether it is a rebuild on structure that already works
              or a new build, and how much of your own data has to be wired in.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              You get a fixed quote within two working days of the call, and it
              does not move afterwards.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-m text-ink">
              What the automation price covers
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              {automation.price} is the build: the agent connected to your own
              number, trained on your services, prices and hours, with booking
              and escalation rules configured and tested. Live in{" "}
              {automation.timeline}.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              WhatsApp Business API access is metered by Meta per conversation
              and billed directly to your own account. We do not resell it and
              we do not mark it up.
            </p>
          </section>
        </div>

        <section className="border-rule mt-16 border-t pt-12">
          <SectionHead
            eyebrow="Before anything is quoted"
            title="The audit is free and it is not a sales call."
          />
          <AuditPanel className="mt-8" />
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            When none of this is worth buying
          </h2>
          <ul className="border-rule mt-6 max-w-[var(--gf-measure)] border-t">
            <li className="border-rule text-body-s text-ink border-b py-4">
              Your message volume is low enough that one person handles it
              comfortably inside working hours. Automation earns its price by
              removing repeated work. If the repetition is not there, you are
              buying a solution to a problem you do not have.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Your services, prices or hours are still changing every week. The
              agent is only ever as accurate as what you tell it, and rebuilding
              it that often costs more attention than answering the messages
              would have.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Nobody can find you in the first place. A faster reply does not
              fix an empty inbox. Take the free audit and find out which problem
              you actually have before you spend anything.
            </li>
          </ul>
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            About {CATALYST.name}
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            {CATALYST.name} is the fourth step and it has no price on this page
            because it is not finished. It is a WhatsApp-native operating system
            that generalises what every automation build turns out to have in
            common. When it is real it will be priced here like everything else.
            Until then, quoting a subscription for it would be the one dishonest
            thing on this site.
          </p>
        </section>
      </Container>

      <ClosingCta
        heading="Start with the audit. It costs nothing and it is not a pitch."
        lede="Three findings and a WhatsApp response-speed test, in about three days."
      />
    </>
  );
}
