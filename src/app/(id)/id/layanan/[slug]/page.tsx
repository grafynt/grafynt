import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_ID, serviceBySlug } from "@/lib/services";
import { buildMetadata, graph, serviceSchema } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES_ID.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/id/layanan/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug, "id");
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/id/layanan/${slug}`,
    locale: "id",
  });
}

/** TODO(agent-2): salinan lengkap — ini halaman niat komersial lokal. */
export default async function LayananPage({
  params,
}: PageProps<"/id/layanan/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug, "id");
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/id/layanan/${slug}`,
          }),
        )}
      />
      <Container className="py-20">
        <Eyebrow>Layanan</Eyebrow>
        <h1 className="font-display text-display-l text-ink mt-4 max-w-[18ch]">
          {service.name}
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[52ch]">
          {service.summary}
        </p>
        <div className="mt-10">
          <CtaButton locale="id" />
        </div>
      </Container>
    </>
  );
}
