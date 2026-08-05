import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import { ClosingCta } from "@/components/closing-cta";
import { WhatsAppThread } from "@/components/whatsapp-thread";
import { klinikThread } from "@/lib/threads";
import { CATALYST, LADDER } from "@/lib/site";

/**
 * Ported from grafynt-klinik-kecantikan.html.
 *
 * Palette, copy, section order, the WhatsApp thread and the pricing
 * cards are preserved. Not one hex value appears in this file — every
 * colour resolves through the `--gf-*` contract, which
 * [data-skin="klinik"] in src/styles/skins.css rebinds to porcelain,
 * wine and champagne. The shared WhatsAppThread, CtaButton and
 * ClosingCta components are the same ones the English site uses. That
 * is the proof: a vertical is a skin, not a fork.
 *
 * Five deliberate changes from the source:
 *  1. Langkah 02 is Rp 5.300.000 (was 3.500.000 — that number is dead)
 *  2. Langkah 03 Catalyst is Rp 1.700.000 / bulan (was 1.250.000),
 *     read from CATALYST.verticalPrice
 *  3. No hover lift on the leak cards — border and opacity only
 *  4. No scroll reveal; the source faded ~20 elements in on scroll
 *  5. The FAQ is <details open>: text in the DOM, expanded by default,
 *     works with JavaScript disabled
 *
 * The nav also loses its backdrop-blur for a solid surface.
 */

const automation = LADDER.find((r) => r.name === "Automation build")!;

export function KlinikPage() {
  return (
    <>
      <KlinikNav />
      <main className="flex-1">
        <Hero />
        <Leaks />
        <Steps />
        <Features />
        <Why />
        <Pricing />
        <Faq />
        <ClosingCta
          locale="id"
          channel="whatsapp"
          heading={
            <>
              Berhenti kehilangan booking.{" "}
              <em className="italic">Mulai dari audit gratis.</em>
            </>
          }
          lede="Kami tunjukkan di mana klinik Anda bocor — lalu Anda putuskan langkah berikutnya."
        />
      </main>
      <KlinikFooter />
    </>
  );
}

/* ---------------------------------------------------------------- */

function KlinikNav() {
  return (
    <header className="border-rule bg-surface sticky top-0 z-40 border-b">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <span className="font-display text-display-s text-ink leading-none">
          Gra<span className="text-accent">fynt</span>
        </span>
        <CtaButton
          locale="id"
          channel="whatsapp"
          label="Minta Audit Gratis"
          className="hidden px-4 py-2.5 sm:inline-flex"
        />
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <Container
      as="section"
      className="grid items-center gap-12 py-14 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
    >
      <div>
        <Eyebrow>Untuk Klinik Kecantikan &amp; Estetika</Eyebrow>
        <h1 className="font-display text-display-xl text-ink mt-5 max-w-[15ch]">
          Setiap chat yang telat dibalas adalah{" "}
          <em className="text-accent italic">booking yang hilang.</em>
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[34ch]">
          Grafynt memasang asisten WhatsApp AI untuk klinik Anda — balas calon
          pasien dalam hitungan detik, atur jadwal treatment otomatis, dan
          pangkas no-show. Tanpa nambah admin.
        </p>
        <div className="mt-8">
          <CtaButton
            locale="id"
            channel="whatsapp"
            label="Minta Audit Gratis"
          />
        </div>
        <p className="text-body-s text-ink-soft mt-5">
          <strong className="text-ink font-semibold">
            Gratis, tanpa komitmen.
          </strong>{" "}
          Kami tunjukkan di mana booking Anda bocor dulu.
        </p>
      </div>

      <WhatsAppThread thread={klinikThread()} id="klinik-thread" />
    </Container>
  );
}

const LEAKS = [
  {
    tag: "Celah 01 — Kecepatan",
    title: "Balasan lambat",
    body: "Calon pasien tanya “masih ada slot, Kak?” jam 9 malam. Dibalas besok siang. Dia sudah booking di klinik sebelah yang membalas duluan.",
  },
  {
    tag: "Celah 02 — Kehadiran",
    title: "No-show",
    body: "Pasien lupa jadwal, kursi tindakan kosong, jam terapis terbuang. Tanpa reminder otomatis, satu no-show sama dengan satu slot revenue hangus.",
  },
  {
    tag: "Celah 03 — Visibilitas",
    title: "Tak muncul saat dicari",
    body: "Saat calon pasien tanya ChatGPT atau Google “klinik kecantikan terbaik di kota saya”, nama Anda tak muncul. Yang muncul justru kompetitor.",
  },
];

function Leaks() {
  return (
    <section className="bg-surface-2">
      <Container className="py-[var(--gf-section-y)]">
        <div className="max-w-[40rem]">
          <Eyebrow>Diagnosa</Eyebrow>
          <h2 className="font-display text-display-l text-ink mt-4">
            Di mana booking Anda bocor
          </h2>
          <p className="text-body text-ink-soft mt-4">
            Bukan karena treatment kurang bagus. Biasanya karena tiga celah
            operasional yang diam-diam menggerus pendapatan setiap hari.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {LEAKS.map((leak) => (
            <li
              key={leak.tag}
              className="bg-surface border-rule hover:border-accent rounded-[var(--gf-radius)] border p-7 transition-colors duration-[var(--gf-dur-micro)]"
            >
              <p className="text-meta text-accent font-mono uppercase">
                {leak.tag}
              </p>
              <h3 className="font-display text-display-s text-ink mt-3.5">
                {leak.title}
              </h3>
              <p className="text-body-s text-ink-soft mt-2.5">{leak.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Audit",
    pill: "Gratis",
    free: true,
    body: "Kami petakan kebocoran Anda: seberapa cepat WhatsApp dibalas, berapa DM yang tak terkonversi jadi booking, dan apakah klinik Anda muncul saat dicari di AI & Google. Hasilnya laporan ringkas dengan angka — bukan tebakan.",
    side: "±3 hari · tanpa biaya",
  },
  {
    n: "02",
    title: "Otomasi",
    pill: "Dibangun untuk Anda",
    free: false,
    body: "Kami bangun asisten WhatsApp AI khusus klinik Anda — hafal daftar treatment, harga, dan jam praktik. Balas instan 24/7 dalam Bahasa, booking & reschedule otomatis, plus reminder anti no-show. Terpasang, bukan template.",
    side: "±1–2 minggu",
  },
  {
    n: "03",
    title: CATALYST.name,
    pill: "Platform",
    free: false,
    body: "Sistem operasional WhatsApp yang terus berjalan. Kelola membership, treatment, cabang, dan performa dari satu dashboard. Langganan bulanan — makin lama makin pintar karena belajar dari data percakapan klinik Anda sendiri.",
    side: "langganan bulanan",
  },
];

function Steps() {
  return (
    <Container as="section" className="py-[var(--gf-section-y)]">
      <div className="max-w-[40rem]">
        <Eyebrow>Cara Kerja</Eyebrow>
        <h2 className="font-display text-display-l text-ink mt-4">
          Tiga langkah, dari kebocoran ke sistem
        </h2>
        <p className="text-body text-ink-soft mt-4">
          Kami tidak minta Anda langsung berlangganan. Mulai dari audit — baru
          naik saat Anda lihat hasilnya sendiri.
        </p>
      </div>

      <ol className="border-rule mt-12 border-t">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className={`border-rule grid gap-x-8 gap-y-3 border-b py-9 md:grid-cols-[6rem_1fr_auto] ${
              step.free ? "border-l-accent border-l-[3px] pl-5 md:pl-6" : ""
            }`}
          >
            <span className="font-display text-ink-faint text-[2.4rem] leading-none md:text-[3.2rem]">
              {step.n}
            </span>
            <div>
              <h3 className="font-display text-display-m text-ink flex flex-wrap items-center gap-3">
                {step.title}
                <span
                  className={`text-note rounded-full px-2.5 py-1 font-mono uppercase ${
                    step.free
                      ? "bg-accent text-on-dark"
                      : "bg-accent-wash text-ink"
                  }`}
                >
                  {step.pill}
                </span>
              </h3>
              <p className="text-body-s text-ink-soft mt-3 max-w-[52ch]">
                {step.body}
              </p>
            </div>
            <span className="text-note text-ink-soft font-mono whitespace-nowrap md:text-right">
              {step.side}
            </span>
          </li>
        ))}
      </ol>
    </Container>
  );
}

const FEATURES = [
  {
    title: "Balas instan 24/7",
    body: "Chat masuk tengah malam tetap terjawab dalam detik. Tidak ada lagi lead dingin karena telat.",
  },
  {
    title: "Booking otomatis",
    body: "Cek slot, jadwalkan, dan reschedule treatment langsung dari chat — tersinkron ke kalender klinik.",
  },
  {
    title: "Reminder anti no-show",
    body: "Pengingat otomatis H-1 dan hari-H. Kursi tindakan terisi, revenue tidak hangus.",
  },
  {
    title: "Jawab FAQ treatment",
    body: "Harga, durasi, perawatan pasca-tindakan — dijawab akurat dan seragam, tanpa capek mengetik ulang.",
  },
  {
    title: "Follow-up lead",
    body: "Calon pasien yang cuma nanya lalu hilang, disapa kembali otomatis di waktu yang pas.",
  },
  {
    title: "Bahasa yang natural",
    body: "Membalas dalam Bahasa Indonesia yang luwes — bisa menyesuaikan gaya dan bahasa daerah pelanggan Anda.",
  },
];

function Features() {
  return (
    <section className="bg-deep text-on-dark">
      <Container className="py-[var(--gf-section-y)]">
        <div className="max-w-[40rem]">
          <p className="text-eyebrow text-on-dark/70 flex items-center gap-2.5 font-mono uppercase">
            <span aria-hidden className="bg-accent inline-block h-px w-3.5" />
            Yang Dikerjakan
          </p>
          <h2 className="font-display text-display-l text-on-dark mt-4">
            Satu asisten, kerja admin semalaman
          </h2>
          <p className="text-body text-on-dark/75 mt-4">
            Semua percakapan berulang yang bikin tim front-office kewalahan —
            ditangani otomatis, konsisten, tanpa lelah.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--gf-radius)] bg-white/15 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="bg-deep p-7">
              <h3 className="font-display text-display-s text-on-dark">
                {feature.title}
              </h3>
              <p className="text-body-s text-on-dark/70 mt-2.5">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const WHY = [
  {
    n: "01",
    title: "WhatsApp-native, bukan chatbot web",
    body: "Pasien Anda hidup di WhatsApp, bukan di widget pojok website yang diabaikan. Kami pasang di kanal tempat mereka benar-benar bertanya dan booking.",
  },
  {
    n: "02",
    title: "Paham konteks & bahasa lokal",
    body: "Bukan terjemahan kaku dari template luar. Nuansa, sopan-santun, dan istilah treatment terasa natural buat pasien Indonesia.",
  },
  {
    n: "03",
    title: "Data pasien tetap milik Anda",
    body: "Percakapan dan data tersimpan di infrastruktur privat klinik Anda — aman, dan menjadi aset yang makin bernilai seiring waktu.",
  },
];

function Why() {
  return (
    <Container
      as="section"
      className="grid gap-12 py-[var(--gf-section-y)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
    >
      <div>
        <Eyebrow>Kenapa Grafynt</Eyebrow>
        <h2 className="font-display text-display-l text-ink mt-4">
          Dibuat untuk cara Indonesia berbelanja — lewat{" "}
          <em className="text-accent italic">WhatsApp,</em> dalam Bahasa.
        </h2>
      </div>

      <dl className="border-rule border-t">
        {WHY.map((item) => (
          <div key={item.n} className="border-rule flex gap-5 border-b py-6">
            <span className="text-data text-decor w-8 shrink-0 pt-1 font-mono">
              {item.n}
            </span>
            <div>
              <dt className="font-display text-display-s text-ink">
                {item.title}
              </dt>
              <dd className="text-body-s text-ink-soft mt-1.5">{item.body}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Container>
  );
}

const PLANS = [
  {
    name: "Langkah 01",
    price: "Gratis",
    per: "tanpa komitmen",
    desc: "Audit kebocoran booking klinik Anda.",
    feature: false,
    flag: null as string | null,
    items: [
      "Analisa kecepatan balas WhatsApp",
      "Cek visibilitas di AI & Google",
      "Laporan + rekomendasi ringkas",
    ],
  },
  {
    name: "Langkah 02",
    price: automation.price!,
    per: "sekali pasang",
    desc: "Asisten WhatsApp AI, terpasang & dilatih untuk klinik Anda.",
    feature: true,
    flag: "Paling dipilih",
    items: [
      "Balas instan 24/7 dalam Bahasa",
      "Booking & reschedule otomatis",
      "Reminder anti no-show",
      "Hafal treatment, harga & jadwal",
    ],
  },
  {
    name: "Langkah 03",
    price: CATALYST.verticalPrice,
    per: CATALYST.verticalPer,
    desc: `Platform ${CATALYST.name} — sistem yang terus berjalan & berkembang.`,
    feature: false,
    flag: null,
    items: [
      "Dashboard operasional & performa",
      "Kelola membership & cabang",
      "Maintenance, update & support",
      "Makin pintar dari data Anda",
    ],
  },
];

function Pricing() {
  return (
    <section className="bg-surface-2" id="harga">
      <Container className="py-[var(--gf-section-y)]">
        <div className="max-w-[40rem]">
          <Eyebrow>Investasi</Eyebrow>
          <h2 className="font-display text-display-l text-ink mt-4">
            Mulai gratis. Naik saat Anda lihat hasilnya.
          </h2>
          <p className="text-body text-ink-soft mt-4">
            Tanpa kontrak jangka panjang. Anda bisa berhenti di langkah mana
            pun.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-[var(--gf-radius)] border p-8 ${
                plan.feature
                  ? "bg-deep text-on-dark border-transparent"
                  : "bg-surface border-rule"
              }`}
            >
              {plan.flag ? (
                <span className="bg-accent text-on-dark text-note absolute -top-3 right-6 rounded-full px-3 py-1 font-mono uppercase">
                  {plan.flag}
                </span>
              ) : null}

              <p
                className={`text-meta font-mono uppercase ${
                  plan.feature ? "text-on-dark/70" : "text-accent"
                }`}
              >
                {plan.name}
              </p>
              <p
                className={`font-display mt-4 text-[2.4rem] leading-none ${
                  plan.feature ? "text-on-dark" : "text-ink"
                }`}
              >
                {plan.price}
              </p>
              <p
                className={`text-body-s mt-1 ${
                  plan.feature ? "text-on-dark/65" : "text-ink-soft"
                }`}
              >
                {plan.per}
              </p>
              <p
                className={`text-body-s mt-4 ${
                  plan.feature ? "text-on-dark/75" : "text-ink-soft"
                }`}
              >
                {plan.desc}
              </p>

              <ul className="mt-5 mb-7 space-y-2.5">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className={`text-body-s flex gap-3 ${
                      plan.feature ? "text-on-dark/90" : "text-ink"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="bg-accent mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="text-note text-ink-soft mt-7 font-mono">
          * Angka di atas contoh paket standar dan bisa disesuaikan dengan skala
          klinik Anda.
        </p>
      </Container>
    </section>
  );
}

const FAQS = [
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

/**
 * <details open>, not an accordion. The source hid every answer behind
 * max-height:0, which means no answer exists without JavaScript. Open
 * by default keeps the text in the DOM and readable either way.
 */
function Faq() {
  return (
    <Container as="section" className="py-[var(--gf-section-y)]">
      <div className="max-w-[40rem]">
        <Eyebrow>Pertanyaan</Eyebrow>
        <h2 className="font-display text-display-l text-ink mt-4">
          Yang biasanya ditanya pemilik klinik
        </h2>
      </div>

      <div className="border-rule mt-10 max-w-[52rem] border-t">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            open
            className="border-rule group border-b py-6"
          >
            <summary className="font-display text-display-s text-ink flex cursor-pointer items-center justify-between gap-6 list-none">
              {faq.q}
              <span
                aria-hidden
                className="text-accent shrink-0 font-mono text-xl transition-transform duration-[var(--gf-dur-micro)] group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-body-s text-ink-soft mt-3 max-w-[60ch]">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}

function KlinikFooter() {
  return (
    <footer className="bg-deep text-on-dark/75 mt-auto">
      <Container className="flex flex-wrap items-end justify-between gap-6 py-14">
        <div>
          <p className="font-display text-on-dark text-[1.8rem] leading-none">
            Gra<span className="text-accent-wash">fynt</span>
          </p>
          <p className="text-body-s mt-3 max-w-[34ch]">
            Otomasi WhatsApp AI untuk bisnis Indonesia — dibangun dalam Bahasa,
            untuk cara Anda melayani pelanggan.
          </p>
        </div>
        <p className="text-note font-mono uppercase">
          grafynt.com
          <br />
          Jakarta · Tangerang
        </p>
      </Container>
    </footer>
  );
}
