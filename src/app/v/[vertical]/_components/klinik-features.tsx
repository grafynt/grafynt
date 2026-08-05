import type { ReactNode } from "react";
import { Container } from "@/components/container";

/**
 * The one band where <SectionHead> is not used: its heading is text-ink
 * by contract, and this section sits on --gf-deep. Everything else here
 * is the same token set, inverted.
 *
 * The 1px "grid lines" are the gap showing through a wash-tinted
 * background — no borders to double up at the seams, no bento.
 */

const FEATURES: { icon: ReactNode; h: string; p: string }[] = [
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </>
    ),
    h: "Balas instan 24/7",
    p: "Chat masuk tengah malam tetap terjawab dalam detik. Tidak ada lagi lead dingin karena telat.",
  },
  {
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    h: "Booking otomatis",
    p: "Cek slot, jadwalkan, dan reschedule treatment langsung dari chat — tersinkron ke kalender klinik.",
  },
  {
    icon: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
    h: "Reminder anti no-show",
    p: "Pengingat otomatis H-1 dan hari-H. Kursi tindakan terisi, revenue tidak hangus.",
  },
  {
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    ),
    h: "Jawab FAQ treatment",
    p: "Harga, durasi, perawatan pasca-tindakan — dijawab akurat dan seragam, tanpa capek mengetik ulang.",
  },
  {
    icon: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
      </>
    ),
    h: "Follow-up lead",
    p: "Calon pasien yang cuma nanya lalu hilang, disapa kembali otomatis di waktu yang pas.",
  },
  {
    icon: (
      <>
        <path d="M4 5h7" />
        <path d="M9 3v2c0 4.4-3.6 8-8 8" />
        <path d="M5 9c0 2.4 3.1 4.5 6 5" />
        <path d="M14 22l4-9 4 9" />
        <path d="M15.5 18h5" />
      </>
    ),
    h: "Bahasa yang natural",
    p: "Membalas dalam Bahasa Indonesia yang luwes — bisa menyesuaikan gaya dan bahasa daerah pelanggan Anda.",
  },
];

export function KlinikFeatures() {
  return (
    <section className="bg-deep">
      <Container className="py-18 lg:py-section">
        <header className="max-w-[var(--gf-measure)]">
          <p className="text-eyebrow text-accent-wash flex items-center gap-2.5 font-mono uppercase">
            <span aria-hidden className="bg-accent-wash inline-block h-px w-3.5" />
            Yang Dikerjakan
          </p>
          <h2 className="font-display text-display-l text-on-dark mt-4">
            Satu asisten, kerja admin semalaman
          </h2>
          <p className="text-lead text-on-dark/72 mt-4">
            Semua percakapan berulang yang bikin tim front-office kewalahan —
            ditangani otomatis, konsisten, tanpa lelah.
          </p>
        </header>

        <div className="rounded-card bg-accent-wash/16 mt-13 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.h} className="bg-deep p-7">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="34"
                height="34"
                className="text-accent-wash mb-4"
              >
                {f.icon}
              </svg>
              <h3 className="font-display text-display-s text-on-dark">{f.h}</h3>
              <p className="text-body-s text-on-dark/70 mt-2">{f.p}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
