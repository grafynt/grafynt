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

/**
 * Halaman niat komersial lokal. Slug-nya Bahasa, bukan terjemahan slug
 * Inggris, karena justru itu gunanya permukaan Bahasa ini. Pasangannya
 * ada di HREFLANG_PAIRS, src/lib/site.ts.
 */
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
        <dl className="border-rule mt-10 max-w-[32rem] border-t">
          <div className="border-rule flex justify-between gap-6 border-b py-3">
            <dt className="text-meta text-ink-soft font-mono uppercase">
              Harga
            </dt>
            <dd
              className={
                service.price
                  ? "text-data text-accent font-mono font-medium"
                  : "text-data text-ink-soft font-mono"
              }
            >
              {service.price ?? "Dihitung per proyek"}
            </dd>
          </div>
          {service.priceNote ? (
            <div className="border-rule border-b py-3">
              <p className="text-note text-ink-soft max-w-[46ch] font-mono">
                {service.priceNote}
              </p>
            </div>
          ) : null}
          <div className="border-rule flex justify-between gap-6 border-b py-3">
            <dt className="text-meta text-ink-soft font-mono uppercase">
              Waktu
            </dt>
            <dd className="text-data text-ink font-mono font-medium">
              {service.timeline}
            </dd>
          </div>
        </dl>

        <section className="mt-16">
          <h2 className="font-display text-display-m text-ink">
            Yang Anda dapat
          </h2>
          <ul className="border-rule mt-6 max-w-[var(--gf-measure)] border-t">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="border-rule text-body-s text-ink border-b py-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <CtaButton locale="id" />
        </div>
      </Container>
    </>
  );
}
