import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHead } from "@/components/section-head";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { ServiceRows } from "@/components/service-rows";
import { Ladder } from "@/components/ladder";
import { AuditPanel } from "@/components/audit-panel";
import { AnswerIndexList } from "@/components/answer-index-list";
import { ClosingCta } from "@/components/closing-cta";
import { loadAnswers } from "@/lib/answers";
import { SERVICES_ID } from "@/lib/services";
import { AUDIT_ID, CATALYST } from "@/lib/site";
import { buildMetadata, graph, localBusinessSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grafynt, otomatisasi WhatsApp dan alur kerja untuk bisnis Indonesia",
  description:
    "Asisten WhatsApp AI, otomatisasi alur kerja, dan website yang mudah ditemukan mesin jawaban AI. Mulai dari audit gratis. Jakarta.",
  path: "/id",
  locale: "id",
  absoluteTitle: true,
});

/**
 * Not a translation of the English home page. The Bahasa surface
 * targets local buying language, so the sections that earn their place
 * here are not the same ones that earn it there.
 *
 * Language rule: otomatisasi MERINGANKAN pekerjaan tim, tidak pernah
 * MENGGANTIKAN orang.
 */
export default async function IdHomePage() {
  const answers = await loadAnswers("id");

  return (
    <>
      <JsonLd data={graph(localBusinessSchema())} />

      <Container className="py-16 md:py-20">
        <Eyebrow>Otomatisasi AI · Jakarta</Eyebrow>
        <h1 className="font-display text-display-xl text-ink mt-5 max-w-[16ch]">
          Chat pelanggan sudah masuk. Membalas semuanya yang tidak terkejar.
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[48ch]">
          Grafynt memasang asisten WhatsApp AI dan otomatisasi alur kerja untuk
          bisnis kecil dan menengah. Tujuannya meringankan pekerjaan tim Anda,
          bukan menggantikannya.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <CtaButton locale="id" />
          <Link
            href="/id/harga"
            className="text-body-s text-ink-soft hover:text-ink decoration-rule underline underline-offset-4 transition-colors duration-[var(--gf-dur-micro)]"
          >
            Harga kami terbuka
          </Link>
        </div>
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title="Yang kami bangun." />
        <ServiceRows
          services={SERVICES_ID}
          basePath="/id/layanan"
          className="mt-10"
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="Langkah"
          title="Mulai gratis. Naik saat Anda lihat hasilnya sendiri."
          lede="Tanpa kontrak jangka panjang. Anda bisa berhenti di langkah mana pun."
        />
        <Ladder locale="id" className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="Audit gratis"
          title="Tiga temuan dan satu tes."
          lede="Kami jalankan dulu sebelum ngobrol, supaya pembicaraan pertama dimulai dari angka Anda, bukan dari penawaran kami."
        />
        <AuditPanel audit={AUDIT_ID} locale="id" className="mt-10" />
      </Container>

      {answers.length > 0 ? (
        <Container as="section" className="border-rule border-t py-16">
          <SectionHead title="Satu pertanyaan per halaman, dijawab tuntas." />
          <AnswerIndexList
            locale="id"
            className="mt-10"
            items={answers.map((answer) => ({
              href: answer.path,
              question: answer.meta.question,
              updated: answer.meta.updated,
            }))}
          />
        </Container>
      ) : null}

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title="Siapa yang mengerjakan" />
        <div className="mt-6 max-w-[var(--gf-measure)]">
          <p className="text-body text-ink">
            Grafynt dijalankan satu orang dari Jakarta. Sistemnya saya bangun
            sendiri, itu sebabnya harga di situs ini ditulis terbuka, bukan
            &ldquo;hubungi kami&rdquo;. Lebih cepat buat kita berdua kalau Anda
            bisa menilai cocok atau tidak sebelum meeting.
          </p>
          <p className="text-body text-ink mt-5">
            {CATALYST.name} adalah proyek jangka panjangnya: sistem operasional
            berbasis WhatsApp yang sedang dibangun. Belum dijual dan belum ada
            harganya. Semua yang ada di halaman harga sudah bisa dikerjakan
            sekarang.
          </p>
        </div>
      </Container>

      <ClosingCta
        locale="id"
        heading="Tiga temuan dan satu tes. Gratis, tanpa jualan."
        lede="Kami cek apakah mesin jawaban AI menyebut bisnis Anda, apakah deskripsinya benar, dan siapa yang justru disebut. Sekitar tiga hari."
      />
    </>
  );
}
