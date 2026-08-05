import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";

/**
 * The source built this as a JS accordion: max-height:0 plus a click
 * handler, so every answer was invisible to a reader with no JS and to
 * anything reading the DOM. Rebuilt on <details open> — the answers are
 * in the markup, expanded on arrival, collapsible with the keyboard, and
 * correct with the bundle removed entirely. No client component.
 */

const FAQ = [
  {
    q: "Apakah ini menggantikan admin saya?",
    a: "Tidak. Asisten menangani chat berulang yang menyita waktu — sapaan, harga, cek slot, reminder. Admin Anda jadi punya ruang untuk fokus ke pasien yang butuh sentuhan manusia dan penjualan yang lebih bernilai.",
  },
  {
    q: "Data pasien saya aman?",
    a: "Ya. Percakapan dan data pasien tersimpan di infrastruktur privat milik klinik Anda, bukan bercampur dengan klinik lain. Anda pemilik penuh datanya.",
  },
  {
    q: "Berapa lama sampai bisa dipakai?",
    a: "Audit selesai sekitar 3 hari. Setelah itu, asisten WhatsApp dasar biasanya siap dalam 1–2 minggu, tergantung banyaknya treatment dan alur booking klinik Anda.",
  },
  {
    q: "Klinik saya masih kecil / baru buka. Cocok?",
    a: "Justru di sinilah dampaknya paling terasa. Saat setiap lead berharga dan tim masih terbatas, satu booking yang tidak lolos itu signifikan. Otomasi membuat klinik kecil terasa responsif seperti yang besar.",
  },
];

export function KlinikFaq() {
  return (
    <section>
      <Container className="py-18 lg:py-section">
        <SectionHead
          eyebrow="Pertanyaan"
          title="Yang biasanya ditanya pemilik klinik"
        />

        <div className="border-rule mt-11 border-t">
          {FAQ.map((item) => (
            <details key={item.q} open className="group border-rule border-b">
              <summary className="font-display text-display-s text-ink flex cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="relative block h-[22px] w-[22px] shrink-0"
                >
                  <span className="bg-accent absolute top-[10px] left-[2px] block h-[2px] w-[18px] rounded-[2px]" />
                  <span className="bg-accent absolute top-[2px] left-[10px] block h-[18px] w-[2px] rounded-[2px] opacity-100 transition-opacity duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] group-open:opacity-0" />
                </span>
              </summary>
              <p className="text-ink-soft max-w-[60ch] pb-6">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
