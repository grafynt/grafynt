/**
 * Single source of truth for everything that appears in more than one
 * place: the CTA, the ladder, prices, routes, the author entity.
 *
 * RULES FOR ANYONE EDITING THIS FILE
 *  - There is ONE call to action on the public site: `CAL_URL`.
 *    /v/* verticals use `WHATSAPP.url` instead. Never both on one page.
 *  - Every client-facing price must reduce to 8 by full digit sum.
 *    `assertRootEight` runs over LADDER at module load, so a bad price
 *    fails the build rather than shipping.
 *  - Do not invent a price, a metric, a testimonial or a client name.
 *  - The vertical is never named on a public route.
 */

export const SITE = {
  name: "Grafynt",
  url: "https://grafynt.com",
  locale: "en",
  description:
    "AI automation for small and medium businesses. WhatsApp agents, n8n workflow automation, and websites built to be found by AI answer engines.",
  founder: {
    name: "Jonathan Frans",
    role: "Founder",
    bio: "Jonathan Frans builds WhatsApp agents and workflow automation for small and medium businesses from Jakarta.",
  },
  location: {
    city: "Jakarta",
    region: "DKI Jakarta",
    country: "ID",
  },
  /** areaServed on Service schema. */
  markets: ["ID", "US", "GB", "AU", "SG", "AE"],
} as const;

/* ------------------------------------------------------------------ *
 * The one CTA
 * ------------------------------------------------------------------ */

/** Public site CTA. Every button, every page. Change here only. */
export const CAL_URL = "https://cal.com/grafynt/audit";

export const CTA = {
  href: CAL_URL,
  label: "Book the free audit",
  /** Used where the surrounding copy already says "free". */
  labelShort: "Book the audit",
} as const;

/**
 * /v/* verticals only. Buyers arrive in WhatsApp and convert there;
 * routing them to a calendar adds friction at the warmest moment.
 * Prefill stays vertical-neutral, this string must never name an
 * industry, because the same constant is read by every skin.
 */
const WA_NUMBER = "6281319190388";
const WA_PREFILL = "Halo Grafynt, saya mau minta audit gratis untuk bisnis saya.";

export const WHATSAPP = {
  number: WA_NUMBER,
  display: "+62 813-1919-0388",
  prefill: WA_PREFILL,
  url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_PREFILL)}`,
} as const;

/* ------------------------------------------------------------------ *
 * The ladder
 * ------------------------------------------------------------------ */

export type Rung = {
  n: string;
  name: string;
  /** Rendered verbatim. `null` means deliberately unpriced. */
  price: string | null;
  priceNote?: string;
  timeline: string | null;
  role: string;
  /** false = named on the site but not sold: no price, no CTA. */
  sold: boolean;
};

export const LADDER: readonly Rung[] = [
  {
    n: "01",
    name: "GEO/AEO + WhatsApp audit",
    price: "Free",
    timeline: "~3 days",
    role: "Wedge, earns the discovery call",
    sold: true,
  },
  {
    n: "02",
    name: "Website",
    price: "from Rp 8.000.000",
    priceNote:
      "Moves on page count, whether content needs writing, and rebuild vs new.",
    timeline: "2–3 weeks",
    role: "Cashflow, never the front door",
    sold: true,
  },
  {
    n: "03",
    name: "Automation build",
    price: "Rp 5.300.000",
    priceNote: "one-time",
    timeline: "1–2 weeks",
    role: "Land, creates the integration surface",
    sold: true,
  },
  {
    n: "04",
    name: "Catalyst",
    price: null,
    timeline: null,
    role: "The WhatsApp-native operating system being built on top of this work",
    sold: false,
  },
] as const;

/**
 * Catalyst is priced differently by audience, on purpose.
 *
 *  public site , named and described, never priced, no purchase path.
 *                 It is still being built; quoting a subscription for
 *                 unshipped software is the one thing on this site
 *                 that could cost a client.
 *  /v/* offers , priced. Those pages are noindexed and sent one to
 *                 one after an audit, so the number lands inside a
 *                 live conversation where timing can be explained.
 */
export const CATALYST = {
  name: "Catalyst",
  publicPrice: null,
  verticalPrice: "Rp 1.700.000",
  verticalPer: "/ bulan",
  description:
    "A WhatsApp-native operating system for running day-to-day operations. In development.",
} as const;

/** Structural type so AUDIT and AUDIT_ID are interchangeable at a
 *  call site. `typeof AUDIT` would pin the English string literals. */
export type Audit = {
  turnaround: string;
  cost: string;
  findings: readonly { title: string; body: string }[];
  test: { title: string; body: string };
};

/**
 * What the free audit is. Three findings and a test.
 * Referenced by /, /pricing and the answer pages so the description
 * cannot drift between them.
 */
export const AUDIT = {
  turnaround: "~3 days",
  cost: "No cost, no pitch.",
  findings: [
    {
      title: "Citation presence",
      body: "Whether ChatGPT, Gemini, Perplexity and Google AI Overviews name your business for buying-intent questions.",
    },
    {
      title: "Description accuracy",
      body: "When they do name you, whether what they say about you is correct.",
    },
    {
      title: "Competitor set",
      body: "Which businesses get named instead of you, by name.",
    },
  ],
  test: {
    title: "Response-speed test",
    body: "We message your WhatsApp at three times, business hours, evening, and Sunday, and log time to first reply.",
  },
} as const;

/**
 * The same audit in Bahasa. A parallel object rather than a
 * translation layer, there are exactly two of these and each is read
 * by two pages. Pass it explicitly on /id/* routes; the English one
 * rendering verbatim on a Bahasa page is the failure this prevents.
 */
export const AUDIT_ID = {
  turnaround: "±3 hari",
  cost: "Gratis, tanpa jualan.",
  findings: [
    {
      title: "Muncul atau tidak",
      body: "Apakah ChatGPT, Gemini, Perplexity dan AI Overviews Google menyebut bisnis Anda saat orang bertanya dengan niat membeli.",
    },
    {
      title: "Akurasi deskripsi",
      body: "Kalau disebut, apakah yang dikatakan tentang bisnis Anda sudah benar.",
    },
    {
      title: "Siapa yang muncul",
      body: "Bisnis mana yang justru disebut, lengkap dengan namanya.",
    },
  ],
  test: {
    title: "Tes kecepatan balas",
    body: "Kami kirim pesan ke WhatsApp Anda di tiga waktu berbeda, jam kerja, malam, dan hari Minggu, lalu catat berapa lama baru dibalas.",
  },
} as const;

/* ------------------------------------------------------------------ *
 * Pricing rule
 * ------------------------------------------------------------------ */

/** Sum of every digit in a string. "Rp 5.300.000" -> 8 */
export function digitSum(value: string): number {
  return (value.match(/\d/g) ?? []).reduce((sum, d) => sum + Number(d), 0);
}

/** Digit sum reduced to a single digit. Root 8 is the house rule. */
export function digitalRoot(value: string): number {
  let n = digitSum(value);
  while (n > 9) n = digitSum(String(n));
  return n;
}

/**
 * Fails the build if a client-facing price does not reduce to 8.
 * Prices with no digits ("Free", "Quoted") are exempt, as are
 * internal costs, which never appear in this file.
 */
export function assertRootEight(rungs: readonly Rung[] = LADDER): void {
  for (const rung of rungs) {
    if (!rung.price) continue;
    if (digitSum(rung.price) === 0) continue;
    if (digitalRoot(rung.price) !== 8) {
      throw new Error(
        `Pricing rule violated: "${rung.name}" is ${rung.price}, which reduces to ${digitalRoot(
          rung.price,
        )}, not 8.`,
      );
    }
  }
}

assertRootEight();
assertRootEight([
  {
    n: ",",
    name: "Catalyst (vertical offer pages)",
    price: CATALYST.verticalPrice,
    timeline: null,
    role: "",
    sold: true,
  },
]);

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export const NAV_EN = [
  { href: "/services/whatsapp-ai-agent", label: "Services" },
  { href: "/answers", label: "Answers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const NAV_ID = [
  { href: "/id/layanan/whatsapp-ai-agent", label: "Layanan" },
  { href: "/id/jawaban", label: "Jawaban" },
  { href: "/id/harga", label: "Harga" },
] as const;

/**
 * EN/ID pairs. Drives hreflang. A route only appears here when a real
 * equivalent exists, the language split is deliberate, not a mirror,
 * and pointing hreflang at a page that does not exist is worse than
 * omitting it.
 */
export const HREFLANG_PAIRS: ReadonlyArray<{ en: string; id: string }> = [
  { en: "/", id: "/id" },
  { en: "/pricing", id: "/id/harga" },
  {
    en: "/answers/how-to-automate-whatsapp-customer-service",
    id: "/id/jawaban/cara-otomatisasi-whatsapp-customer-service",
  },
  // NOT paired: /answers/cost-to-automate-order-processing and
  // /id/jawaban/biaya-bikin-chatbot-whatsapp are related but not
  // equivalent, one is order processing, the other is what a WhatsApp
  // chatbot costs. hreflang between near-misses is worse than none, and
  // the Bahasa page is deliberately single-language: "biaya bikin
  // chatbot WhatsApp" is local buying language with no English query
  // worth chasing.
  {
    en: "/answers/hire-cs-rep-or-automate",
    id: "/id/jawaban/rekrut-admin-atau-otomatisasi",
  },
  {
    en: "/services/whatsapp-ai-agent",
    id: "/id/layanan/whatsapp-ai-agent",
  },
];

/** Routes excluded from the sitemap. Never robots.txt-disallowed: a
 *  disallow stops crawlers reading the noindex tag, which is how a
 *  noindexed URL ends up indexed anyway. */
export const NOINDEX_PREFIXES = ["/v/"] as const;
