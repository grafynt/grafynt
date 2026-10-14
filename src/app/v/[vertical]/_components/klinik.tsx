import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { CtaButton } from "@/components/cta-button";
import { ClosingCta } from "@/components/closing-cta";
import { WhatsAppThread } from "@/components/whatsapp-thread";
import { klinikThread } from "@/lib/threads";
import { BUNDLES, LADDER } from "@/lib/site";

/**
 * The klinik offer page.
 *
 * Palette, section order, the WhatsApp thread and the pricing cards are
 * preserved from the original port. Not one hex value appears in this
 * file, every colour resolves through the `--gf-*` contract, which
 * [data-skin="klinik"] in src/styles/skins.css rebinds to porcelain,
 * wine and champagne. The shared WhatsAppThread, CtaButton and
 * ClosingCta components are the same ones the English site uses. That
 * is the proof: a vertical is a skin, not a fork.
 *
 * The offer is the public one, narrowed to one audience: a clinic is a
 * local-intent business, so the Google Business Profile row carries more
 * of the weight here than it does on the broad site. Every number is
 * read from LADDER and BUNDLES, so this page cannot quote a price the
 * public site contradicts.
 *
 * Four deliberate departures from the source document:
 *  1. No hover lift on the diagnosis cards, border and opacity only
 *  2. No scroll reveal; the source faded ~20 elements in on scroll
 *  3. The FAQ is <details open>: text in the DOM, expanded by default,
 *     works with JavaScript disabled
 *  4. The nav loses its backdrop-blur for a solid surface
 */

const audit = LADDER.find((r) => r.name === "Visibility audit")!;
const profile = LADDER.find(
  (r) => r.name === "Google Business Profile optimisation",
)!;
const websiteBundle = BUNDLES.find((b) => b.name === "Website + audit")!;
const fullBundle = BUNDLES.find(
  (b) => b.name === "Everything except automation",
)!;

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
              Berhenti kalah sebelum ditemukan.{" "}
              <em className="italic">Mulai dari auditnya.</em>
            </>
          }
          lede="Kami tunjukkan dulu klinik mana yang disebut menggantikan Anda, baru Anda putuskan langkah berikutnya."
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
          label="Minta Audit"
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
          Calon pasien sudah mencari.{" "}
          <em className="text-accent italic">Yang disebut klinik sebelah.</em>
        </h1>
        <p className="text-lead text-ink-soft mt-6 max-w-[34ch]">
          Grafynt mengurus visibilitas klinik Anda di Google dan di asisten AI
          seperti ChatGPT. Bukan bikin orang jadi ingin perawatan, tapi
          memastikan yang sudah mau cari justru menemukan klinik Anda.
        </p>
        <div className="mt-8">
          <CtaButton locale="id" channel="whatsapp" label="Minta Audit" />
        </div>
        <p className="text-body-s text-ink-soft mt-5">
          <strong className="text-ink font-semibold">
            {audit.price}, sekitar 3 hari.
          </strong>{" "}
          Gratis kalau sekalian ambil website.
        </p>
      </div>

      <WhatsAppThread thread={klinikThread()} id="klinik-thread" />
    </Container>
  );
}

const LEAKS = [
  {
    tag: "Celah 01, Visibilitas",
    title: "Tak muncul saat dicari",
    body: "Calon pasien tanya ChatGPT atau Google “klinik kecantikan terbaik di kota saya”. Nama Anda tak muncul. Yang muncul justru kompetitor, dan dari situ dia langsung chat.",
  },
  {
    tag: "Celah 02, Konsistensi",
    title: "Informasi beda-beda",
    body: "Website menyebut satu nama treatment, Google Bisnis Profil menyebut nama lain, listing di direktori lain lain lagi. Tidak ada yang saling menguatkan, jadi mesin memilih klinik yang lebih jelas.",
  },
  {
    tag: "Celah 03, Profil lokal",
    title: "Google Bisnis Profil terbengkalai",
    body: "Kategori belum pas, daftar treatment belum diisi, pertanyaan dan ulasan dibiarkan. Padahal justru di situ niat beli lokal paling tinggi, dan itu teks yang paling mudah ditarik mesin.",
  },
];

function Leaks() {
  return (
    <section className="bg-surface-2">
      <Container className="py-[var(--gf-section-y)]">
        <div className="max-w-[40rem]">
          <Eyebrow>Diagnosa</Eyebrow>
          <h2 className="font-display text-display-l text-ink mt-4">
            Kenapa klinik Anda tidak ketemu
          </h2>
          <p className="text-body text-ink-soft mt-4">
            Bukan karena treatment kurang bagus. Biasanya karena tiga celah yang
            membuat klinik Anda sulit dibaca mesin pencari dan asisten AI.
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
    pill: audit.price!,
    free: true,
    body: "Kami ukur posisi klinik Anda sekarang: apakah ChatGPT, Gemini, Perplexity dan AI Overviews Google menyebut klinik Anda saat orang bertanya dengan niat perawatan, apakah deskripsinya benar, dan klinik mana yang justru disebut, lengkap dengan namanya. Hasilnya laporan dengan angka, bukan tebakan.",
    side: `±3 hari · gratis kalau ambil website`,
  },
  {
    n: "02",
    title: "Perbaikan",
    pill: "Dikerjakan untuk Anda",
    free: false,
    body: "Website dirombak atau dibuat baru, satu halaman untuk satu pertanyaan calon pasien, ditulis supaya bisa dikutip mesin. Google Bisnis Profil dibenahi: kategori, daftar treatment, jam praktik, area layanan. Satu istilah per treatment, dipakai sama persis di semua tempat.",
    side: "±2–3 minggu",
  },
  {
    n: "03",
    title: "Dijaga",
    pill: "Bulanan",
    free: false,
    body: "Google Bisnis Profil bukan sekali atur lalu ditinggal. Jam buka berubah, kategori digeser Google, ulasan dan pertanyaan terus masuk dan harus dijawab dengan istilah yang sama. Setiap bulan kami jaga konsistensinya dan ukur ulang hasilnya terhadap audit awal.",
    side: `${profile.price} / bulan · min. 3 bulan`,
  },
];

function Steps() {
  return (
    <Container as="section" className="py-[var(--gf-section-y)]">
      <div className="max-w-[40rem]">
        <Eyebrow>Cara Kerja</Eyebrow>
        <h2 className="font-display text-display-l text-ink mt-4">
          Tiga langkah, dari tidak terlihat ke disebut
        </h2>
        <p className="text-body text-ink-soft mt-4">
          Kami tidak minta Anda langsung ambil semuanya. Mulai dari audit, baru
          naik saat Anda lihat angkanya sendiri.
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
    title: "Panel pertanyaan AI",
    body: "Pertanyaan calon pasien dijalankan di ChatGPT, Gemini, Perplexity dan AI Overviews, lalu dicatat siapa yang disebut.",
  },
  {
    title: "Nama kompetitor, terang-terangan",
    body: "Klinik mana yang disebut menggantikan Anda, dan apa yang ada di halaman mereka tapi tidak ada di halaman Anda.",
  },
  {
    title: "Satu istilah per treatment",
    body: "Dipakai sama persis di website, Google Bisnis Profil, dan listing lain. Konsistensi inilah yang bikin klinik bisa dikutip.",
  },
  {
    title: "Halaman per pertanyaan",
    body: "Satu halaman menjawab satu pertanyaan calon pasien secara tuntas, karena itulah satuan yang ditarik dan dikutip mesin.",
  },
  {
    title: "Profil lokal dibenahi",
    body: "Kategori, daftar treatment, jam praktik, area layanan, ulasan dan Q&A, disusun untuk niat beli lokal.",
  },
  {
    title: "Diukur ulang, bukan diklaim",
    body: "Setelah perubahan stabil, panel yang sama dijalankan lagi dan dibandingkan dengan audit awal.",
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
            Pekerjaan yang membosankan, dan itu memang intinya
          </h2>
          <p className="text-body text-on-dark/75 mt-4">
            Tidak ada trik. Yang kami kerjakan hal-hal kecil yang bikin klinik
            Anda bisa dibaca, dikutip, dan dipercaya mesin pencari.
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
    title: "Menangkap, bukan menciptakan permintaan",
    body: "Kami tidak jualan awareness dan tidak mengelola iklan. Orangnya sudah mau cari klinik, tinggal memastikan yang ketemu itu Anda. Itu bisa diukur hari ini.",
  },
  {
    n: "02",
    title: "Niat beli lokal, dalam Bahasa",
    body: "Calon pasien mencari dengan kata-kata mereka sendiri, bukan istilah medis di brosur. Kami targetkan kata yang benar-benar diketik, per kota dan per area.",
  },
  {
    n: "03",
    title: "Angkanya ditulis terbuka",
    body: "Harga di halaman ini sama dengan harga di grafynt.com. Tidak ada angka khusus yang muncul cuma di presentasi.",
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
          Dibuat untuk cara orang Indonesia{" "}
          <em className="text-accent italic">mencari,</em> dalam Bahasa.
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
    name: "Audit saja",
    price: audit.price!,
    per: "sekali bayar",
    desc: "Ukur posisi klinik Anda sekarang, tanpa komitmen lanjut.",
    feature: false,
    flag: null as string | null,
    items: [
      "Panel pertanyaan di 4 mesin AI",
      "Cek posisi di pencarian biasa",
      "Nama klinik yang disebut menggantikan Anda",
      "Laporan + rekomendasi berurutan",
    ],
  },
  {
    name: "Website + audit",
    price: websiteBundle.price,
    per: "sekali bayar",
    desc: "Auditnya gratis, karena auditlah yang menentukan isi websitenya.",
    feature: true,
    flag: "Paling dipilih",
    items: [
      "Semua isi paket audit",
      "Website dirombak atau dibuat baru",
      "Satu halaman per pertanyaan pasien",
      "Satu istilah per treatment, konsisten",
    ],
  },
  {
    name: "Lengkap",
    price: fullBundle.price,
    per: `sekali bayar + ${fullBundle.recurring} / bulan`,
    desc: "Audit, website, analisis kompetitor, dan Google Bisnis Profil yang dijaga tiap bulan.",
    feature: false,
    flag: null,
    items: [
      "Semua isi paket website",
      "Analisis 3–5 klinik kompetitor",
      "Google Bisnis Profil dibenahi & dijaga",
      "Diukur ulang terhadap audit awal",
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
            Mulai dari audit. Naik saat Anda lihat angkanya.
          </h2>
          <p className="text-body text-ink-soft mt-4">
            Tanpa kontrak jangka panjang. Yang bulanan hanya Google Bisnis
            Profil, minimum 3 bulan, dan itu tidak didiskon di paket mana pun.
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
          * Website di atas mencakup perombakan atau company profile sampai
          sekitar lima halaman. Website custom multi-halaman dihitung per
          proyek.
        </p>
      </Container>
    </section>
  );
}

const FAQS = [
  {
    q: "Bedanya dengan jasa SEO biasa?",
    a: "Pekerjaannya satu keluarga, cuma lebih ketat. SEO soal dapat peringkat di mesin pencari. Yang kami kerjakan juga memastikan klinik Anda jadi teks yang dikutip asisten AI, karena ChatGPT dan sejenisnya tidak menjawab dari hafalan, mereka menarik halaman saat itu juga lalu mengutip yang paling jelas menjawab.",
  },
  {
    q: "Kenapa Google Bisnis Profil dihitung bulanan?",
    a: "Karena profilnya tidak diam. Jam buka berubah, kategori digeser Google, orang lain bisa mengusulkan perubahan di listing Anda, dan ulasan serta pertanyaan terus masuk. Pembenahan sekali jalan akan rusak sendiri dalam beberapa bulan, jadi kami tidak menjualnya begitu. Minimum 3 bulan, dan sisanya di halaman ini sekali bayar.",
  },
  {
    q: "Berapa lama sampai kelihatan hasilnya?",
    a: "Auditnya selesai sekitar 3 hari. Perbaikan website dan profil biasanya 2–3 minggu. Jawaban yang ditarik langsung dari halaman bisa berubah dalam hitungan hari setelah halamannya berubah, sedangkan yang bergantung pada indeks biasanya hitungan minggu. Kami ukur ulang terhadap audit awal, bukan mengklaim.",
  },
  {
    q: "Klinik saya masih kecil atau baru buka. Cocok?",
    a: "Justru di situ selisihnya paling terasa, karena yang menentukan bukan besar kliniknya tapi seberapa jelas informasinya. Klinik kecil yang satu istilah dan konsisten di semua tempat sering lebih mudah dikutip daripada klinik besar yang informasinya berantakan. Auditnya akan menunjukkan posisi Anda apa adanya.",
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
            GEO, AEO dan SEO untuk bisnis Indonesia. Supaya yang sudah mencari
            menemukan Anda, bukan kompetitor.
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
