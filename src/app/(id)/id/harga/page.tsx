import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHead } from "@/components/section-head";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { PriceTable } from "@/components/price-table";
import { BundleRows } from "@/components/bundle-rows";
import { AuditPanel } from "@/components/audit-panel";
import { AUDIT_ID } from "@/lib/site";
import { auditOfferSchema, buildMetadata, graph } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Harga",
  description:
    "Angka yang sebenarnya. Audit visibilitas Rp 710.000, website mulai Rp 7.550.000, Google Bisnis Profil Rp 1.520.000 per bulan. Tanpa kontrak jangka panjang.",
  path: "/id/harga",
  locale: "id",
});

export default function HargaPage() {
  return (
    <>
      <JsonLd data={graph(auditOfferSchema())} />
      <Container className="py-20">
        <Eyebrow>Harga</Eyebrow>
        <h1 className="font-display text-display-l text-ink mt-4 max-w-[20ch]">
          Angkanya ditulis terbuka, supaya Anda bisa menilai sebelum ngobrol.
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[48ch]">
          Agensi di pasar ini biasanya menulis &ldquo;hubungi kami&rdquo;. Itu
          lebih melindungi agensinya daripada Anda. Ini angka yang sebenarnya.
        </p>

        <PriceTable locale="id" className="mt-12" />

        <section className="border-rule mt-16 border-t pt-12">
          <SectionHead
            eyebrow="Paket"
            title="Dua kombinasi, lebih murah dari kalau dibeli terpisah."
            lede="Yang didiskon hanya biaya sekali bayar. Biaya bulanan Google Bisnis Profil sama saja, mau ambil paket atau tidak."
          />
          <BundleRows locale="id" className="mt-10" />
        </section>

        <div className="border-rule mt-16 grid gap-12 border-t pt-12 md:grid-cols-2">
          <section>
            <h2 className="font-display text-display-m text-ink">
              Yang menggerakkan harga website
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              Rp 7.550.000 itu batas bawah, bukan rata-rata. Angka itu mencakup
              perombakan atau company profile sampai sekitar lima halaman. Di
              atas itu, harganya bergerak tergantung jumlah halaman, apakah
              tulisannya sudah ada atau harus dibuat, apakah dirombak dari
              struktur yang sudah punya peringkat atau dibangun baru, dan
              seberapa banyak data Anda yang harus disambungkan. Website custom
              multi-halaman dihitung per proyek.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              Penawaran tetapnya Anda terima dalam dua hari kerja setelah
              ngobrol, dan setelah itu tidak berubah.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-m text-ink">
              Kenapa Google Bisnis Profil dihitung bulanan
            </h2>
            <p className="text-body text-ink mt-4 max-w-[46ch]">
              Rp 1.520.000 per bulan, minimum 3 bulan. Google Bisnis Profil
              bukan sesuatu yang diatur sekali lalu ditinggal. Jam buka berubah,
              kategori digeser Google, kompetitor bisa mengusulkan perubahan di
              listing Anda, ulasan dan pertanyaan terus masuk dan harus dijawab
              dengan istilah yang sama seperti di tempat lain.
            </p>
            <p className="text-body-s text-ink-soft mt-4 max-w-[46ch]">
              Pembenahan profil sekali jalan akan rusak sendiri dalam beberapa
              bulan, itu sebabnya tidak dijual begitu. Sisanya di halaman ini
              sekali bayar.
            </p>
          </section>
        </div>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Kenapa audit lebih murah dari analisis kompetitor
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            Audit Rp 710.000 dan tugasnya menentukan posisi Anda sekarang.
            Analisis kompetitor lebih mahal karena pekerjaannya lebih dalam:
            membedah tiga sampai lima bisnis lain per pertanyaan, bukan cuma
            posisi Anda sendiri. Kalau mau ambil salah satu dulu, ambil
            auditnya. Itu yang menentukan sisanya layak dikerjakan atau tidak,
            dan gratis kalau lanjut ambil website.
          </p>
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Otomatisasi dijual sebagai tambahan
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            Otomatisasi alur kerja dihitung per proyek dan dijual bersama
            pekerjaan lain, bukan sendirian. Alasannya urutan: membenahi alur
            setelah chat masuk itu berguna justru setelah chat-nya mulai ramai
            dan pekerjaan visibilitasnya jalan. Kalau dibeli paling awal, yang
            Anda dapat cuma balasan lebih cepat untuk inbox yang masih sepi.
            Biaya layanan pihak ketiga yang terukur per pemakaian ditagih ke
            akun Anda sendiri; kami tidak menjual ulang dan tidak mengambil
            margin di situ.
          </p>
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Semua dimulai dari sini
          </h2>
          <p className="text-body text-ink mt-4 max-w-[var(--gf-measure)]">
            Tiga temuan dan satu tes, dan ini bukan sesi jualan.
          </p>
          <AuditPanel audit={AUDIT_ID} locale="id" className="mt-8" />
        </section>

        <section className="border-rule mt-16 border-t pt-12">
          <h2 className="font-display text-display-m text-ink">
            Kapan ini belum perlu
          </h2>
          <ul className="border-rule mt-6 max-w-[var(--gf-measure)] border-t">
            <li className="border-rule text-body-s text-ink border-b py-4">
              Belum ada yang mencari apa yang Anda jual. Pekerjaan ini menangkap
              permintaan yang sudah ada. Kalau produknya benar-benar baru dan
              pasarnya belum tahu, yang Anda butuhkan hal lain, bukan ini.
              Auditnya akan menunjukkan Anda ada di situasi mana.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Nama Anda sudah muncul untuk hampir semua pertanyaan niat beli di
              pasar Anda dan deskripsinya sudah benar. Ini kejadian, biasanya
              pada bisnis yang rajin menulis bertahun-tahun. Ambil auditnya,
              pastikan, lalu pakai sisa uangnya untuk hal lain.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Layanan, harga, atau area layanan Anda berubah tiap minggu. Semua
              yang kami buat konsisten harus dijaga konsisten, dan kalau
              faktanya terus bergerak, konsistensinya rusak lebih cepat daripada
              hasilnya.
            </li>
            <li className="border-rule text-body-s text-ink border-b py-4">
              Chat yang masuk sekarang saja belum terbalas semua. Dibikin lebih
              mudah ditemukan malah memperburuk. Benahi dulu alur membalasnya,
              itu yang dikerjakan baris otomatisasi.
            </li>
          </ul>
        </section>

        <div className="mt-12">
          <CtaButton locale="id" />
        </div>
      </Container>
    </>
  );
}
