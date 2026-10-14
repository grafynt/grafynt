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
import { AUDIT_ID } from "@/lib/site";
import { buildMetadata, graph, localBusinessSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grafynt, agensi GEO/AEO/SEO untuk bisnis Indonesia",
  description:
    "Supaya bisnis Anda yang disebut Google dan asisten AI saat calon pembeli mencari, bukan kompetitor. Audit visibilitas Rp 710.000. Jakarta.",
  path: "/id",
  locale: "id",
  absoluteTitle: true,
});

/**
 * Bukan terjemahan halaman depan versi Inggris. Permukaan Bahasa ini
 * menyasar kata-kata yang benar-benar dipakai orang Indonesia saat
 * mencari, jadi bagian yang layak tampil di sini tidak sama dengan
 * yang layak tampil di sana.
 *
 * Aturan bahasa: otomatisasi MERINGANKAN pekerjaan tim, tidak pernah
 * MENGGANTIKAN orang.
 */
export default async function IdHomePage() {
  const answers = await loadAnswers("id");

  return (
    <>
      <JsonLd data={graph(localBusinessSchema())} />

      <Container className="py-16 md:py-20">
        <Eyebrow>GEO · AEO · SEO · Jakarta</Eyebrow>
        <h1 className="font-display text-display-xl text-ink mt-5 max-w-[16ch]">
          Calon pembeli Anda sedang mencari. Yang muncul nama kompetitor.
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[48ch]">
          Grafynt mengurus visibilitas bisnis kecil dan menengah di mesin
          pencari dan di asisten AI seperti ChatGPT. Kami tidak bikin orang
          jadi ingin beli, kami pastikan yang sudah ingin beli menemukan Anda.
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
        <SectionHead
          title="Menangkap permintaan, bukan menciptakannya."
          lede="Iklan dipakai untuk membuat orang ingin sesuatu. Itu mahal dan lambat terukur. Pekerjaan kami sebaliknya: orangnya sudah mau beli dan sedang mencari, tinggal memastikan yang ketemu itu Anda."
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead title="Yang kami kerjakan." />
        <ServiceRows
          services={SERVICES_ID}
          basePath="/id/layanan"
          className="mt-10"
        />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="Urutan kerja"
          title="Mulai dari audit. Naik saat Anda lihat hasilnya sendiri."
          lede="Mulai dari audit. Tanpa kontrak jangka panjang, dan Anda bisa berhenti di langkah mana pun."
        />
        <Ladder locale="id" className="mt-10" />
      </Container>

      <Container as="section" className="border-rule border-t py-16">
        <SectionHead
          eyebrow="Auditnya"
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
            Grafynt dijalankan satu orang dari Jakarta. Pekerjaannya saya
            kerjakan sendiri, itu sebabnya harga di situs ini ditulis terbuka,
            bukan &ldquo;hubungi kami&rdquo;. Lebih cepat buat kita berdua kalau
            Anda bisa menilai cocok atau tidak sebelum meeting.
          </p>
          <p className="text-body text-ink mt-5">
            Cakupannya sengaja sempit. Saya tidak mengelola iklan dan tidak
            menjual awareness. Saya cari pertanyaan apa yang diketik calon
            pembeli di pasar Anda, lalu memastikan nama Anda yang muncul saat
            pertanyaan itu ditanyakan.
          </p>
        </div>
      </Container>

      <ClosingCta
        locale="id"
        heading="Tiga temuan dan satu tes, sekitar tiga hari."
        lede="Kami cek apakah Google dan asisten AI menyebut bisnis Anda, apakah deskripsinya benar, dan siapa yang justru disebut. Rp 710.000, dan gratis kalau lanjut ambil website."
      />
    </>
  );
}
