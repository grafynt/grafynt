import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_EN, serviceBySlug } from "@/lib/services";
import { buildMetadata, graph, serviceSchema } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES_EN.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${slug}`,
  });
}

/** TODO(agent-2): body copy. Structure, schema and metadata are set. */
export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${slug}`,
          }),
        )}
      />
      <Container className="py-20">
        <Eyebrow>Service</Eyebrow>
        <h1 className="font-display text-display-l text-ink mt-4 max-w-[18ch]">
          {service.name}
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[52ch]">
          {service.summary}
        </p>
        <dl className="border-rule mt-10 max-w-[32rem] border-t">
          <div className="border-rule flex justify-between border-b py-3">
            <dt className="text-meta text-ink-soft font-mono uppercase">
              Price
            </dt>
            <dd className="text-data text-accent font-mono font-medium">
              {service.price}
            </dd>
          </div>
          <div className="border-rule flex justify-between border-b py-3">
            <dt className="text-meta text-ink-soft font-mono uppercase">
              Timeline
            </dt>
            <dd className="text-data text-ink font-mono font-medium">
              {service.timeline}
            </dd>
          </div>
        </dl>
        <div className="mt-10">
          <CtaButton />
        </div>
      </Container>
    </>
  );
}
