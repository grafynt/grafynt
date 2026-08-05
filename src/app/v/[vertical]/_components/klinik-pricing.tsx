import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { CATALYST } from "@/lib/site";

/**
 * Three cards, middle one filled with --gf-deep.
 *
 * No button on any card. This page has one CTA and it is the closing
 * band; three "Minta Audit / Mulai Pasang / Langganan" buttons is three
 * competing actions for one decision.
 *
 * Prices: Langkah 02 is Rp 5.300.000, and Catalyst is read from
 * CATALYST.verticalPrice so the number cannot drift from src/lib/site.ts.
 * Both reduce to 8 by digit sum, which assertRootEight enforces at
 * module load.
 */

const PLANS = [
  {
    step: "Langkah 01",
    price: "Gratis",
    per: "tanpa komitmen",
    desc: "Audit kebocoran booking klinik Anda.",
    items: [
      "Analisa kecepatan balas WhatsApp",
      "Cek visibilitas di AI & Google",
      "Laporan + rekomendasi ringkas",
    ],
    featured: false,
    flag: null as string | null,
  },
  {
    step: "Langkah 02",
    price: "Rp 5.300.000",
    per: "sekali pasang",
    desc: "Asisten WhatsApp AI, terpasang & dilatih untuk klinik Anda.",
    items: [
      "Balas instan 24/7 dalam Bahasa",
      "Booking & reschedule otomatis",
      "Reminder anti no-show",
      "Hafal treatment, harga & jadwal",
    ],
    featured: true,
    flag: "Paling dipilih",
  },
  {
    step: "Langkah 03",
    price: CATALYST.verticalPrice,
    per: CATALYST.verticalPer,
    desc: "Platform Catalyst — sistem yang terus berjalan & berkembang.",
    items: [
      "Dashboard operasional & performa",
      "Kelola membership & cabang",
      "Maintenance, update & support",
      "Makin pintar dari data Anda",
    ],
    featured: false,
    flag: null as string | null,
  },
];

export function KlinikPricing() {
  return (
    <section className="bg-surface-2">
      <Container className="py-18 lg:py-section">
        <SectionHead
          eyebrow="Investasi"
          title="Mulai gratis. Naik saat Anda lihat hasilnya."
          lede="Tanpa kontrak jangka panjang. Anda bisa berhenti di langkah mana pun."
        />

        <div className="mt-13 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.step}
              className={[
                "rounded-card relative flex flex-col border p-7",
                "transition-colors duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)]",
                plan.featured
                  ? "bg-deep border-[var(--gf-deep)] text-on-dark"
                  : "bg-surface border-rule hover:border-[var(--gf-accent)]",
              ].join(" ")}
            >
              {plan.flag ? (
                <span className="bg-accent text-on-dark text-meta absolute -top-3 right-6 rounded-full px-3 py-1 font-mono uppercase">
                  {plan.flag}
                </span>
              ) : null}

              <span
                className={`text-meta font-mono uppercase ${
                  plan.featured ? "text-accent-wash" : "text-accent"
                }`}
              >
                {plan.step}
              </span>

              <p
                className={`font-display mt-4 text-[2.5rem] leading-none ${
                  plan.featured ? "text-on-dark" : "text-deep"
                }`}
              >
                {plan.price}
              </p>
              <span
                className={`text-body-s mt-1 ${
                  plan.featured ? "text-on-dark/65" : "text-ink-soft"
                }`}
              >
                {plan.per}
              </span>

              <p
                className={`text-body-s mt-4 mb-5 ${
                  plan.featured ? "text-on-dark/75" : "text-ink-soft"
                }`}
              >
                {plan.desc}
              </p>

              <ul
                className={`text-body-s flex flex-col gap-3 ${
                  plan.featured ? "text-on-dark/90" : "text-ink"
                }`}
              >
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Tick featured={plan.featured} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="text-note text-ink-soft mt-7 font-mono">
          * Angka di atas contoh paket standar dan bisa disesuaikan dengan skala
          klinik Anda.
        </p>
      </Container>
    </section>
  );
}

/** The source drew this with a hex-coloured SVG data URI, twice. Inline
 *  SVG with currentColor instead, so it inherits the token. */
function Tick({ featured }: { featured: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
        featured ? "bg-accent text-on-dark" : "bg-accent-wash text-accent"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="11"
        height="11"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
