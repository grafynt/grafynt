import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { PriceTable } from "@/components/price-table";
import { BundleRows } from "@/components/bundle-rows";
import { AuditPanel } from "@/components/audit-panel";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { LADDER } from "@/lib/site";
import { auditOfferSchema, buildMetadata, graph } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Real numbers: the visibility audit at Rp 710.000, websites from Rp 7.550.000, Google Business Profile from Rp 1.520.000 a month, and when none of it is worth buying.",
  path: "/pricing",
});

const audit = LADDER.find((r) => r.name === "Visibility audit")!;
const website = LADDER.find((r) => r.name === "Website, new or revamped")!;
const profile = LADDER.find(
  (r) => r.name === "Google Business Profile optimisation",
)!;

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
          lede="Most agencies in this market quote on request. That mostly protects the agency. These are the actual numbers."
        />

        <PriceTable className="mt-12" />

        <section className="border-rule mt-16 border-t pt-12">
          <SectionHead
            eyebrow="Bundles"
            title="Two combinations, priced below the sum of their parts."
            lede="Only the one-time work is discounted. The monthly profile fee is the same inside a bundle as outside one."
          />
          <BundleRows className="mt-10" />
        </section>

        <div className="border-rule mt-16 grid gap-12 border-t pt-12 md:grid-cols-2">
          <section>
            <h2 className="font-display text-display-m text-ink">
              What moves the website price
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              {website.price} is a floor, not an average. It covers a revamp or
              a company profile up to about five pages. Past that, the price
              moves on page count, whether the writing exists or has to be
              written, whether it is a revamp on structure that already ranks or
              a new build, and how much of your own data has to be wired in. A
              custom multi-page build is quoted per project.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              You get a fixed quote within two working days of the call, and it
              does not move afterwards.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-m text-ink">
              Why the profile work is monthly
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              {profile.price} a month, {profile.priceNote?.replace(/^per month, /, "")}.
              A Google Business Profile is not a thing you set and leave. Hours
              change, categories get reshuffled, competitors edit your listing,
              reviews and questions arrive and need answering in the same
              wording as everything else.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              A one-off profile cleanup decays within months, which is why it is
              not sold that way. Everything else on this page is one-time.
            </p>
          </section>
        </div>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Why the audit is cheaper than the competitor analysis
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            The audit is {audit.price} and establishes where you stand. The
            competitor analysis costs more because it is the deeper job: it
            takes apart three to five other businesses query by query, not just
            your own position. If you are buying one of the two first, buy the
            audit. It is the one that tells you whether the rest is worth doing,
            and it is free if a website build follows.
          </p>
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Automation is an add-on
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            Workflow automations are quoted per project and sold alongside other
            work, not on their own. The reason is ordering: automating the
            handoffs after an enquiry is worth doing once enquiries are arriving
            and the visibility work is in place. Bought first, it is a faster
            reply to an inbox that is not filling up. Any metered third-party
            service it talks to is billed to your own account; we do not resell
            it and we do not mark it up.
          </p>
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <SectionHead
            eyebrow="Where every engagement starts"
            title="Three findings and a test."
          />
          <AuditPanel className="mt-8" />
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            When none of this is worth buying
          </h2>
          <ul className="border-rule mt-6 max-w-[var(--gf-measure)] border-t">
            <li className="border-rule text-body-s text-ink border-b py-4">
              Nobody is searching for what you sell yet. Demand capture needs
              demand to exist first. If you are genuinely creating a category,
              you need demand generation, which is a different job and not this
              one. The audit will tell you which situation you are in.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              You already get named for every buying-intent question in your
              market and the descriptions are accurate. It happens, usually
              where someone has been writing properly for years. Take the audit,
              confirm it, and spend the rest elsewhere.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Your services, prices or service areas change every week. Every
              surface we make consistent has to be kept consistent, and if the
              underlying facts move constantly the consistency decays faster
              than it earns anything.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              You cannot answer the enquiries you already get. Being found
              harder makes that worse, not better. Fix the replying first, which
              is what the automation row is for.
            </li>
          </ul>
        </section>
      </Container>

      <ClosingCta
        heading="Start with the audit. It is three days and it is not a pitch."
        lede="Three findings and a retrieval test. Free if a website build follows."
      />
    </>
  );
}
