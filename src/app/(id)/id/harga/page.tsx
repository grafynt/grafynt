import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { LADDER } from "@/lib/site";
import { auditOfferSchema, buildMetadata, graph } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Harga",
  description:
    "Angka yang sebenarnya. Audit gratis, website mulai Rp 8.000.000, dan pemasangan otomatisasi Rp 5.300.000. Tanpa kontrak jangka panjang.",
  path: "/id/harga",
  locale: "id",
});

/** TODO(agent-2): salinan lengkap, termasuk bagian "kapan ini belum perlu". */
export default function HargaPage() {
  return (
    <>
      <JsonLd data={graph(auditOfferSchema())} />
      <Container className="py-20">
        <Eyebrow>Harga</Eyebrow>
        <h1 className="font-display text-display-l text-ink mt-4 max-w-[20ch]">
          Mulai gratis. Naik saat Anda lihat hasilnya sendiri.
        </h1>

        <ol className="border-rule mt-12 border-t">
          {LADDER.map((rung) => (
            <li
              key={rung.n}
              className="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b py-6"
            >
              <span className="font-display text-display-s text-ink">
                <span className="text-data text-ink-faint mr-4 font-mono">
                  {rung.n}
                </span>
                {rung.name}
              </span>
              <span className="text-data text-accent font-mono font-medium">
                {rung.price ?? "Belum dijual"}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <CtaButton locale="id" />
        </div>
      </Container>
    </>
  );
}
