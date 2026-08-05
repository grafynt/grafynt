import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";

/**
 * Three rungs, not the house <Ladder>. Two reasons, both structural:
 * the house component reads the four-rung site LADDER (audit, website,
 * automation, Catalyst) and this page sells a different three-step
 * offer, and it carries the site's one scroll reveal, which this page
 * is not allowed to have. Same tokens, different data and no motion.
 */

const RUNGS = [
  {
    n: "01",
    h: "Audit",
    pill: "Gratis",
    free: true,
    p: "Kami petakan kebocoran Anda: seberapa cepat WhatsApp dibalas, berapa DM yang tak terkonversi jadi booking, dan apakah klinik Anda muncul saat dicari di AI & Google. Hasilnya laporan ringkas dengan angka — bukan tebakan.",
    side: "±3 hari · tanpa biaya",
  },
  {
    n: "02",
    h: "Otomasi",
    pill: "Dibangun untuk Anda",
    free: false,
    p: "Kami bangun asisten WhatsApp AI khusus klinik Anda — hafal daftar treatment, harga, dan jam praktik. Balas instan 24/7 dalam Bahasa, booking & reschedule otomatis, plus reminder anti no-show. Terpasang, bukan template.",
    side: "±1–2 minggu",
  },
  {
    n: "03",
    h: "Catalyst",
    pill: "Platform",
    free: false,
    p: "Sistem operasional WhatsApp yang terus berjalan. Kelola membership, treatment, cabang, dan performa dari satu dashboard. Langganan bulanan — makin lama makin pintar karena belajar dari data percakapan klinik Anda sendiri.",
    side: "langganan bulanan",
  },
];

export function KlinikLadder() {
  return (
    <section>
      <Container className="py-18 lg:py-section">
        <SectionHead
          eyebrow="Cara Kerja"
          title="Tiga langkah, dari kebocoran ke sistem"
          lede="Kami tidak minta Anda langsung berlangganan. Mulai dari audit — baru naik saat Anda lihat hasilnya sendiri."
        />

        <ol className="mt-14">
          {RUNGS.map((rung, i) => (
            <li
              key={rung.n}
              className={`border-rule grid grid-cols-[64px_1fr] items-start gap-x-4 gap-y-2 border-t py-8 lg:grid-cols-[120px_1fr_auto] lg:gap-x-8 ${
                i === RUNGS.length - 1 ? "border-b" : ""
              }`}
            >
              <span
                aria-hidden
                className="font-display text-accent-wash text-[2.4rem] leading-none font-light lg:text-[3.4rem]"
              >
                {rung.n}
              </span>

              <div>
                <h3 className="font-display text-deep flex flex-wrap items-center gap-3 text-[1.7rem] leading-tight">
                  {rung.h}
                  <span
                    className={`text-note rounded-full px-2.5 py-1 font-semibold tracking-[0.06em] uppercase ${
                      rung.free
                        ? "bg-accent text-on-dark"
                        : "bg-accent-wash text-accent"
                    }`}
                  >
                    {rung.pill}
                  </span>
                </h3>
                <p className="text-ink-soft mt-3 max-w-[52ch]">{rung.p}</p>
              </div>

              <span className="text-data text-ink-soft col-start-2 font-mono lg:col-start-3 lg:pt-2 lg:text-right lg:whitespace-nowrap">
                {rung.side}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
