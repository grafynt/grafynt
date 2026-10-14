/**
 * The five things Grafynt sells and builds. Broad by design, this
 * registry is what keeps the public site from reading as a
 * single-industry agency. No vertical is named here, ever.
 *
 * Prices and timelines mirror LADDER in src/lib/site.ts. A service with
 * `price: null` is quoted per project and renders as such; `priceNote`
 * carries the qualifier, including a minimum term on anything
 * recurring.
 *
 * Slugs are locale-specific on purpose: the Bahasa surface exists to
 * catch local query wording, and an English slug on an Indonesian page
 * throws that away. HREFLANG_PAIRS maps the pairs.
 */
export type Service = {
  slug: string;
  name: string;
  /** One line, plain. The on-page lead and the Service schema
   *  description. Written to be read. */
  summary: string;
  /** The meta description. Written for a search result, 120–165 chars.
   *  Separate from `summary` because the two jobs are different, one
   *  opens a page, the other has to earn the click. */
  metaDescription: string;
  /** Concrete, from src/lib/site.ts. Every service states one. */
  timeline: string;
  /** `null` = quoted per project. The page renders the placeholder. */
  price: string | null;
  /** Qualifies the number: recurring, minimum term, what it covers. */
  priceNote?: string;
  /**
   * What the client actually receives. Rendered as a ruled list, the
   * same pattern /pricing uses. Four to six items: fewer reads thin,
   * more stops being read.
   */
  deliverables: readonly string[];
};

export const SERVICES_EN: readonly Service[] = [
  {
    slug: "ai-search-visibility-audit",
    name: "Visibility audit",
    summary:
      "Where you stand on search engines and inside AI assistants, measured rather than guessed, for the buying-intent questions your customers actually type.",
    metaDescription:
      "We measure whether search engines and AI assistants name your business for buying-intent questions, whether they describe it correctly, and who gets named instead. Rp 710.000, about three days.",
    timeline: "~3 days",
    price: "Rp 710.000",
    priceNote: "one-time, and free when it comes with a website build",
    deliverables: [
      "A prompt panel run across ChatGPT, Gemini, Perplexity and Google AI Overviews, using the questions your buyers ask, not generic ones.",
      "The same queries checked in ordinary search, so you can see where the two disagree.",
      "Every business named instead of you, listed by name.",
      "What the assistants get wrong about your services, areas served, hours and prices.",
      "A retrieval check: which of your pages a live web-search API can actually pull, and which are invisible to it.",
      "One page of what to fix first, in order, whether or not you hire us.",
    ],
  },
  {
    slug: "google-business-profile-optimization",
    name: "Google Business Profile optimisation",
    summary:
      "The profile that answers local buying intent, with every keyword kept consistent against your site and your other listings.",
    metaDescription:
      "Google Business Profile optimisation for local buying intent: categories, services and keywords kept consistent across your profile, your website and your third-party listings. Rp 1.520.000 a month.",
    timeline: "1–2 weeks to set up",
    price: "Rp 1.520.000",
    priceNote: "per month, minimum 3 months",
    deliverables: [
      "Primary and secondary categories chosen against the queries your buyers use, not the ones that sound right.",
      "Every service and product entry written out, so the profile can answer a question rather than just exist.",
      "One keyword per service, used identically on the profile, the website and third-party listings. Inconsistency is what makes a listing unquotable.",
      "Business name, address, hours, service areas and attributes reconciled across every place they appear.",
      "Review and Q&A prompts set up, because both are text an assistant can retrieve and quote.",
      "A re-check after the changes settle, measured against your audit baseline.",
    ],
  },
  {
    slug: "competitor-analysis",
    name: "Competitor analysis",
    summary:
      "Who is being named instead of you, what their pages carry that yours do not, and which of those queries are worth contesting.",
    metaDescription:
      "We find the businesses search engines and AI assistants name instead of you, show what their pages carry that yours do not, and say which queries are worth contesting. Rp 1.250.000.",
    timeline: "~1 week",
    price: "Rp 1.250.000",
    priceNote: "one-time, covers 3–5 competitors",
    deliverables: [
      "The competitor set as the engines see it, which is often not the one you would have named.",
      "Query-by-query comparison: who gets cited, for what, in which engine.",
      "What their cited pages have structurally, in wording and in schema, that yours do not.",
      "Which queries are winnable in months, which would take years, and which are not worth the budget at all.",
      "The gaps nobody in your market has filled yet, which are the cheapest positions to take.",
    ],
  },
  {
    slug: "workflow-automation",
    name: "Workflow automations",
    summary:
      "Simple automations on the handoffs that follow an enquiry, so captured demand does not leak while it waits for somebody to notice it.",
    metaDescription:
      "Simple workflow automations for the handoffs after an enquiry: routing, logging, reminders and follow-up, so captured demand is not lost waiting for a reply. Quoted per project.",
    timeline: "1–2 weeks",
    price: null,
    priceNote: "Quoted per project. Sold as an add-on alongside other work, not on its own.",
    deliverables: [
      "Enquiries from every channel landing in one place, logged, with nothing depending on a person remembering to copy it.",
      "Routing and alerting, so a new enquiry reaches whoever can answer it while the buyer is still interested.",
      "Follow-up and reminder sequences for the enquiries that go quiet, which is where most captured demand is lost.",
      "The copying between the tools you already run removed, rather than a new tool added on top.",
      "Built on your own accounts, documented, and yours to keep.",
    ],
  },
  {
    slug: "websites",
    name: "Website, new or revamped",
    summary:
      "A fast, static site structured so search engines rank it and AI assistants can quote it, built new or rebuilt on what already works.",
    metaDescription:
      "Fast static websites, new builds or revamps, structured so search engines rank them and AI assistants can retrieve and quote them. From Rp 7.550.000, two to three weeks.",
    timeline: "2–3 weeks",
    price: "from Rp 7.550.000",
    priceNote:
      "Covers a revamp or company profile up to about five pages. Custom multi-page builds are quoted per project.",
    deliverables: [
      "A page per buying-intent question, because that is the unit an assistant retrieves and quotes.",
      "Answers written to stand alone, so a model can lift one paragraph and still be correct about you.",
      "Schema that describes text actually visible on the page, never text a reader cannot see.",
      "The same keyword per service as your profile and listings use, so the three corroborate each other.",
      "Fast and readable with JavaScript disabled, which is also how most retrieval sees a page.",
      "A revamp keeps the structure and URLs that already earn rankings; only a new build starts over.",
    ],
  },
] as const;

export const SERVICES_ID: readonly Service[] = [
  {
    slug: "audit-visibilitas-ai",
    name: "Audit visibilitas",
    summary:
      "Posisi bisnis Anda di mesin pencari dan di asisten AI, diukur bukan dikira-kira, untuk pertanyaan yang benar-benar diketik calon pembeli.",
    metaDescription:
      "Kami ukur apakah mesin pencari dan asisten AI menyebut bisnis Anda saat orang siap membeli, apakah deskripsinya benar, dan siapa yang justru disebut. Rp 710.000, sekitar 3 hari.",
    timeline: "±3 hari",
    price: "Rp 710.000",
    priceNote: "sekali bayar, dan gratis kalau sekalian ambil website",
    deliverables: [
      "Panel pertanyaan dijalankan di ChatGPT, Gemini, Perplexity dan AI Overviews Google, memakai pertanyaan calon pembeli Anda, bukan pertanyaan umum.",
      "Pertanyaan yang sama dicek juga di pencarian biasa, supaya terlihat di mana keduanya berbeda.",
      "Semua bisnis yang disebut menggantikan Anda, lengkap dengan namanya.",
      "Apa yang salah disebut soal layanan, area, jam buka dan harga Anda.",
      "Cek keterbacaan: halaman mana yang benar-benar bisa ditarik mesin pencari, dan mana yang tidak terlihat sama sekali.",
      "Satu halaman rekomendasi, berurutan, mau Anda pakai jasa kami atau tidak.",
    ],
  },
  {
    slug: "optimasi-google-bisnis-profil",
    name: "Optimasi Google Bisnis Profil",
    summary:
      "Profil yang menjawab niat beli lokal, dengan setiap kata kunci dijaga konsisten dengan website dan listing Anda di tempat lain.",
    metaDescription:
      "Optimasi Google Bisnis Profil untuk niat beli lokal: kategori, layanan, dan kata kunci dibuat konsisten antara profil, website, dan listing Anda. Rp 1.520.000 per bulan.",
    timeline: "1–2 minggu untuk disiapkan",
    price: "Rp 1.520.000",
    priceNote: "per bulan, minimum 3 bulan",
    deliverables: [
      "Kategori utama dan pendukung dipilih berdasarkan kata yang dipakai calon pembeli, bukan yang kedengarannya cocok.",
      "Setiap layanan dan produk ditulis lengkap, supaya profil bisa menjawab pertanyaan, bukan cuma ada.",
      "Satu kata kunci per layanan, dipakai sama persis di profil, website, dan listing lain. Ketidakkonsistenan inilah yang membuat listing tidak bisa dikutip.",
      "Nama, alamat, jam buka, area layanan, dan atribut disamakan di semua tempat yang menampilkannya.",
      "Alur minta ulasan dan Q&A disiapkan, karena keduanya teks yang bisa ditarik dan dikutip asisten AI.",
      "Pengecekan ulang setelah perubahan stabil, dibandingkan dengan hasil audit awal.",
    ],
  },
  {
    slug: "analisis-kompetitor",
    name: "Analisis kompetitor",
    summary:
      "Siapa yang disebut menggantikan Anda, apa yang ada di halaman mereka tapi tidak di halaman Anda, dan kata kunci mana yang layak dikejar.",
    metaDescription:
      "Kami cari bisnis yang disebut mesin pencari dan asisten AI menggantikan Anda, tunjukkan apa yang halaman mereka punya, dan mana yang layak dikejar. Rp 1.250.000.",
    timeline: "±1 minggu",
    price: "Rp 1.250.000",
    priceNote: "sekali bayar, mencakup 3–5 kompetitor",
    deliverables: [
      "Daftar kompetitor menurut mesin pencari, yang sering berbeda dari daftar yang Anda sendiri sebutkan.",
      "Perbandingan per pertanyaan: siapa yang dikutip, untuk apa, di mesin mana.",
      "Apa yang halaman mereka punya secara struktur, pilihan kata, dan schema, yang tidak ada di halaman Anda.",
      "Kata kunci mana yang bisa dimenangkan dalam hitungan bulan, mana yang butuh tahunan, dan mana yang tidak layak dibiayai.",
      "Celah yang belum diisi siapa pun di pasar Anda, karena itu posisi yang paling murah untuk diambil.",
    ],
  },
  {
    slug: "otomatisasi-alur-kerja",
    name: "Otomatisasi alur kerja",
    summary:
      "Otomatisasi sederhana untuk alur setelah chat masuk, supaya calon pembeli yang sudah datang tidak hilang sambil menunggu dibalas.",
    metaDescription:
      "Otomatisasi alur kerja sederhana untuk proses setelah chat masuk: pencatatan, penerusan, pengingat, dan follow-up, supaya calon pembeli tidak hilang karena telat dibalas.",
    timeline: "1–2 minggu",
    price: null,
    priceNote:
      "Dihitung per proyek. Dijual sebagai tambahan bersama pekerjaan lain, bukan sendirian.",
    deliverables: [
      "Pertanyaan dari semua kanal masuk ke satu tempat dan tercatat, tanpa bergantung pada orang yang harus ingat menyalinnya.",
      "Penerusan dan notifikasi, supaya chat baru sampai ke orang yang bisa menjawab saat calon pembeli masih tertarik.",
      "Urutan follow-up dan pengingat untuk chat yang mendadak sepi, karena di situlah paling banyak calon pembeli hilang.",
      "Pekerjaan menyalin data antar tool yang sudah Anda pakai dihilangkan, bukan ditambah tool baru di atasnya.",
      "Dibangun di akun milik Anda sendiri, terdokumentasi, dan tetap jadi milik Anda.",
    ],
  },
  {
    slug: "jasa-pembuatan-website",
    name: "Pembuatan atau perombakan website",
    summary:
      "Website statis yang cepat, disusun supaya mesin pencari memberi peringkat dan asisten AI bisa mengutipnya. Dibuat baru atau dirombak dari yang sudah ada.",
    metaDescription:
      "Jasa pembuatan dan perombakan website statis yang cepat, disusun supaya mesin pencari memberi peringkat dan asisten AI bisa mengutipnya. Mulai Rp 7.550.000, 2–3 minggu.",
    timeline: "2–3 minggu",
    price: "mulai Rp 7.550.000",
    priceNote:
      "Mencakup perombakan atau company profile sampai sekitar lima halaman. Website custom multi-halaman dihitung per proyek.",
    deliverables: [
      "Satu halaman untuk satu pertanyaan niat beli, karena itulah satuan yang ditarik dan dikutip asisten AI.",
      "Jawaban ditulis supaya berdiri sendiri, jadi satu paragraf bisa diambil mesin dan tetap benar soal bisnis Anda.",
      "Schema yang menjelaskan teks yang benar-benar terlihat di halaman, bukan teks yang disembunyikan dari pembaca.",
      "Kata kunci per layanan dibuat sama dengan profil dan listing Anda, supaya ketiganya saling menguatkan.",
      "Tetap cepat dan terbaca walau JavaScript dimatikan, dan begitulah cara mesin pencari melihat halaman.",
      "Perombakan mempertahankan struktur dan URL yang sudah punya peringkat; hanya pembuatan baru yang mulai dari nol.",
    ],
  },
] as const;

export function serviceBySlug(
  slug: string,
  locale: "en" | "id" = "en",
): Service | undefined {
  const list = locale === "id" ? SERVICES_ID : SERVICES_EN;
  return list.find((s) => s.slug === slug);
}
