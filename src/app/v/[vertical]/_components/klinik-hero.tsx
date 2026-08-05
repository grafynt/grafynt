import { Container } from "@/components/container";
import { WhatsAppThread, type Thread } from "@/components/whatsapp-thread";

/**
 * The hero.
 *
 * The phone is <WhatsAppThread> — the house component, unforked. Its
 * colours come from --gf-chat-*, which the klinik skin rebinds to the
 * WhatsApp green head, porcelain field and mint outbound bubble. Nothing
 * in that component knows this page exists.
 *
 * There is no CtaButton here. The page's ONE CTA is the closing band;
 * the two actions below are same-page anchors, and neither is a filled
 * pill, so the single filled button on the page is unambiguous.
 *
 * The entrance is [data-entrance] — six elements, 320ms each, last one
 * finishing at 540ms. Opacity and 10px of transform only, so it cannot
 * move layout. Defined in src/styles/skins.css and killed by
 * prefers-reduced-motion.
 */

const thread: Thread = {
  title: "Klinik Glow Aesthetic",
  status: "online · dibalas otomatis",
  mark: "G",
  badge: { text: "Asisten AI membalas", at: 1000 },
  messages: [
    {
      from: "in",
      at: 300,
      time: "21:47",
      body: "Halo, treatment buat bekas jerawat yang bagus apa ya kak? Masih ada slot weekend ini?",
    },
    {
      from: "out",
      at: 1900,
      typingFrom: 1200,
      time: "21:47",
      body: (
        <>
          Halo Kak 🌸 Untuk bekas jerawat, kami rekomendasikan{" "}
          <strong>Acne Scar Laser</strong> atau{" "}
          <strong>Chemical Peeling</strong>. Sabtu ini slot tersedia jam 13.00 &
          15.30. Mau saya bookingkan yang mana?
        </>
      ),
    },
    {
      from: "in",
      at: 2500,
      time: "21:48",
      body: "Yang jam 1 aja deh",
    },
    {
      from: "out",
      at: 3500,
      typingFrom: 2900,
      time: "21:48",
      body: (
        <>
          Siap Kak! Booking <strong>Sabtu, 13.00 — Acne Scar Laser</strong> sudah
          saya catat ✅ Nanti H-1 saya kirim reminder ya. Ditunggu kedatangannya
          💕
        </>
      ),
    },
  ],
};

export function KlinikHero() {
  return (
    <header>
      <Container className="grid items-center gap-11 pt-12 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-16">
        <div className="order-2 lg:order-1">
          <p
            data-entrance="1"
            className="text-eyebrow text-decor flex items-center gap-2.5 font-mono uppercase"
          >
            <span aria-hidden className="bg-accent inline-block h-px w-3.5" />
            Untuk Klinik Kecantikan &amp; Estetika
          </p>

          <h1
            data-entrance="2"
            className="font-display text-display-xl text-deep mt-5"
          >
            Setiap chat yang telat dibalas adalah{" "}
            <em className="text-accent italic">booking yang hilang.</em>
          </h1>

          <p data-entrance="3" className="text-lead text-ink-soft mt-6 max-w-[36ch]">
            Grafynt memasang asisten WhatsApp AI untuk klinik Anda — balas calon
            pasien dalam hitungan detik, atur jadwal treatment otomatis, dan
            pangkas no-show. Tanpa nambah admin.
          </p>

          <div
            data-entrance="4"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#kontak"
              className="text-body-s border-accent text-accent rounded-[var(--gf-radius-btn)] border px-6 py-3.5 font-semibold transition-colors duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] hover:bg-[var(--gf-accent-wash)]"
            >
              Minta Audit Gratis
            </a>
            <a
              href="#cara"
              className="text-body-s text-deep px-2 py-3.5 font-semibold transition-opacity duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] hover:opacity-70"
            >
              Lihat cara kerjanya <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <p data-entrance="5" className="text-body-s text-ink-soft mt-5">
            <strong className="text-deep font-semibold">
              Gratis, tanpa komitmen.
            </strong>{" "}
            Kami tunjukkan di mana booking Anda bocor dulu.
          </p>
        </div>

        <WhatsAppThread
          thread={thread}
          id="klinik-thread"
          className="order-1 lg:order-2"
        />
      </Container>
    </header>
  );
}
