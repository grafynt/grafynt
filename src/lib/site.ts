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
 *    A service that is genuinely quoted per project carries
 *    `price: null` and renders as "Quoted per project". That is the
 *    honest placeholder; a plausible-looking number is not.
 *  - Anything recurring states its minimum term next to the number.
 *  - The vertical is never named on a public route.
 */

export const SITE = {
  name: "Grafynt",
  url: "https://grafynt.com",
  locale: "en",
  description:
    "A GEO, AEO and SEO agency for small and medium businesses. Grafynt makes you the answer search engines and AI assistants give to the people already looking for what you sell.",
  founder: {
    name: "Jonathan Frans",
    role: "Founder",
    bio: "Jonathan Frans runs Grafynt, a GEO/AEO/SEO agency in Jakarta working on search and AI answer-engine visibility for small and medium businesses.",
  },
  location: {
    city: "Jakarta",
    region: "DKI Jakarta",
    country: "ID",
  },
  /** areaServed on Service schema. */
  markets: ["ID", "US", "GB", "AU", "SG", "AE"],
} as const;

/**
 * The positioning, in one place, because it is the sentence every page
 * is a longer version of.
 *
 * Demand capture, not demand generation: we do not try to make people
 * want the thing. We make sure the people already searching for it, in
 * the specific demographic a client actually sells to, find that client
 * rather than a competitor. Every rung in LADDER below is a different
 * surface of that same job.
 */
export const POSITIONING = {
  capture: "demand capture",
  generation: "demand generation",
  line:
    "Demand capture, not demand generation: the buyer already wants this, and the only question is whether they find you or somebody else.",
} as const;

/* ------------------------------------------------------------------ *
 * The one CTA
 * ------------------------------------------------------------------ */

/** Public site CTA. Every button, every page. Change here only. */
export const CAL_URL = "https://cal.com/grafynt/audit";

export const CTA = {
  href: CAL_URL,
  label: "Book the audit",
  /** Used where the surrounding copy already carries the price. */
  labelShort: "Book the audit",
} as const;

/**
 * /v/* verticals only. Buyers arrive in WhatsApp and convert there;
 * routing them to a calendar adds friction at the warmest moment.
 * Prefill stays vertical-neutral, this string must never name an
 * industry, because the same constant is read by every skin.
 */
const WA_NUMBER = "6281319190388";
const WA_PREFILL = "Halo Grafynt, saya mau minta audit untuk bisnis saya.";

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
  /** Rendered verbatim. `null` means no number has been set yet and
   *  renders as "Quoted after the audit". */
  price: string | null;
  priceNote?: string;
  timeline: string | null;
  role: string;
  /** false = named on the site but not sold: no price, no CTA. */
  sold: boolean;
};

/**
 * The five things Grafynt sells, in the order a client buys them.
 *
 * The audit is first because it is the only one that tells you which of
 * the other four you actually need. Competitor analysis sits above it
 * because it is the deeper piece of work: it takes apart three to five
 * other businesses, not just your own position. The website is last
 * because it is the asset every other rung points buyers at, and
 * rebuilding it before you know which queries matter wastes the budget.
 */
export const LADDER: readonly Rung[] = [
  {
    n: "01",
    name: "Visibility audit",
    price: "Rp 710.000",
    priceNote: "one-time, and free with a website build",
    timeline: "~3 days",
    role: "Tells you which of the rest you actually need",
    sold: true,
  },
  {
    n: "02",
    name: "Competitor analysis",
    price: "Rp 1.250.000",
    priceNote: "one-time, 3–5 competitors",
    timeline: "~1 week",
    role: "Shows which queries are winnable and which are not",
    sold: true,
  },
  {
    n: "03",
    name: "Google Business Profile optimisation",
    price: "Rp 1.520.000",
    priceNote: "per month, minimum 3 months",
    timeline: "1–2 weeks to set up",
    role: "Capture at the exact moment of local intent",
    sold: true,
  },
  {
    n: "04",
    name: "Workflow automations",
    price: null,
    priceNote: "Quoted per project. Sold as an add-on, not on its own.",
    timeline: "1–2 weeks",
    role: "Stops captured demand leaking before anyone replies",
    sold: true,
  },
  {
    n: "05",
    name: "Website, new or revamped",
    price: "from Rp 7.550.000",
    priceNote:
      "Covers a revamp or company profile up to about five pages. Custom multi-page builds are quoted per project.",
    timeline: "2–3 weeks",
    role: "The asset every other rung sends buyers to",
    sold: true,
  },
] as const;

/* ------------------------------------------------------------------ *
 * Bundles
 * ------------------------------------------------------------------ */

export type Bundle = {
  n: string;
  name: string;
  /** Rung names, verbatim, so a bundle cannot drift from LADDER. */
  includes: readonly string[];
  /** One-time total, rendered verbatim. */
  price: string;
  /** The sum of the same items bought separately. Struck through. */
  was?: string;
  /** Recurring component, kept separate and never discounted. */
  recurring?: string;
  recurringNote?: string;
  /** One line, plain. What the reader should take from the row. */
  note: string;
};

/**
 * Two bundles, and only two. Both discount the one-time work only; the
 * monthly Google Business Profile fee is the same inside a bundle as
 * outside one, because a discounted recurring price is a permanent
 * discount pretending to be an introductory one.
 */
export const BUNDLES: readonly Bundle[] = [
  {
    n: "A",
    name: "Website + audit",
    includes: ["Website, new or revamped", "Visibility audit"],
    price: "Rp 7.550.000",
    was: "Rp 8.260.000",
    note: "The audit is free when it comes with a website build, because the audit is what tells us what the website has to say.",
  },
  {
    n: "B",
    name: "Everything except automation",
    includes: [
      "Visibility audit",
      "Competitor analysis",
      "Website, new or revamped",
      "Google Business Profile optimisation",
    ],
    price: "Rp 8.540.000",
    was: "Rp 9.510.000",
    recurring: "Rp 1.520.000",
    recurringNote: "per month, minimum 3 months",
    note: "First three months, everything included: Rp 13.100.000. The monthly profile fee is not discounted here and will not be.",
  },
] as const;

/** Structural type so AUDIT and AUDIT_ID are interchangeable at a
 *  call site. `typeof AUDIT` would pin the English string literals. */
export type Audit = {
  turnaround: string;
  cost: string;
  findings: readonly { title: string; body: string }[];
  test: { title: string; body: string };
};

/**
 * What the audit is. Three findings and a test.
 * Referenced by /, /pricing and the answer pages so the description
 * cannot drift between them.
 */
export const AUDIT = {
  turnaround: "~3 days",
  cost: "Rp 710.000, free with a website build.",
  findings: [
    {
      title: "Citation presence",
      body: "Whether ChatGPT, Gemini, Perplexity and Google AI Overviews name your business for buying-intent questions, and whether ordinary search ranks you for the same ones.",
    },
    {
      title: "Description accuracy",
      body: "When they do name you, whether what they say is correct: services, areas served, hours and prices.",
    },
    {
      title: "Competitor set",
      body: "Which businesses get named instead of you, by name, and what their pages carry that yours does not.",
    },
  ],
  test: {
    title: "Retrieval and consistency test",
    body: "AI assistants answer by retrieving live pages, so we check what is actually retrievable: whether your site, your Google Business Profile and your third-party listings use the same keywords for the same services, and which of your pages a live web-search API can pull at all.",
  },
} as const;

/**
 * The same audit in Bahasa. A parallel object rather than a translation
 * layer, there are exactly two of these and each is read by two pages.
 * Pass it explicitly on /id/* routes; the English one rendering
 * verbatim on a Bahasa page is the failure this prevents.
 */
export const AUDIT_ID = {
  turnaround: "±3 hari",
  cost: "Rp 710.000, gratis kalau ambil website.",
  findings: [
    {
      title: "Muncul atau tidak",
      body: "Apakah ChatGPT, Gemini, Perplexity dan AI Overviews Google menyebut bisnis Anda saat orang bertanya dengan niat membeli, dan apakah pencarian biasa juga memunculkan Anda.",
    },
    {
      title: "Akurasi deskripsi",
      body: "Kalau disebut, apakah yang dikatakan tentang bisnis Anda sudah benar: layanan, area yang dilayani, jam buka dan harga.",
    },
    {
      title: "Siapa yang muncul",
      body: "Bisnis mana yang justru disebut, lengkap dengan namanya, dan apa yang ada di halaman mereka tapi tidak ada di halaman Anda.",
    },
  ],
  test: {
    title: "Tes keterbacaan dan konsistensi",
    body: "Asisten AI menjawab dengan menarik halaman secara langsung, jadi kami cek apa yang benar-benar bisa ditarik: apakah website, Google Bisnis Profil, dan listing Anda di tempat lain memakai kata kunci yang sama untuk layanan yang sama, dan halaman mana saja yang bisa diambil mesin pencari.",
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
 * Prices with no digits ("Free", "Quoted") are exempt, as are internal
 * costs, which never appear in this file.
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

/**
 * Bundle prices are held to the same rule. Their `was` figures are
 * not, and cannot be: a `was` is the arithmetic sum of prices that each
 * already reduce to 8, and a sum of root-8 numbers is not itself root
 * 8. Forcing one would mean printing a total that does not match what
 * the parts add up to, which is worse than breaking the pattern.
 */
assertRootEight(
  BUNDLES.map((b) => ({
    n: b.n,
    name: `Bundle ${b.name}`,
    price: b.price,
    timeline: null,
    role: "",
    sold: true,
  })),
);
assertRootEight(
  BUNDLES.filter((b) => b.recurring).map((b) => ({
    n: b.n,
    name: `Bundle ${b.name}, recurring`,
    price: b.recurring!,
    timeline: null,
    role: "",
    sold: true,
  })),
);

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export const NAV_EN = [
  { href: "/services/ai-search-visibility-audit", label: "Services" },
  { href: "/answers", label: "Answers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const NAV_ID = [
  { href: "/id/layanan/audit-visibilitas-ai", label: "Layanan" },
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
  { en: "/answers", id: "/id/jawaban" },

  // Services. All five exist in both languages under locale-specific
  // slugs: the Bahasa slug has to carry local query wording, which is
  // the whole point of having a Bahasa surface at all.
  {
    en: "/services/ai-search-visibility-audit",
    id: "/id/layanan/audit-visibilitas-ai",
  },
  {
    en: "/services/google-business-profile-optimization",
    id: "/id/layanan/optimasi-google-bisnis-profil",
  },
  {
    en: "/services/competitor-analysis",
    id: "/id/layanan/analisis-kompetitor",
  },
  {
    en: "/services/workflow-automation",
    id: "/id/layanan/otomatisasi-alur-kerja",
  },
  { en: "/services/websites", id: "/id/layanan/jasa-pembuatan-website" },

  // Answers. Three of the six English pages have a real Bahasa
  // equivalent. The other three are deliberately single-language:
  // "GEO vs AEO vs SEO" and "demand capture vs demand generation" are
  // English-market vocabulary with no Indonesian query worth chasing
  // yet, and the audit how-to would duplicate the Bahasa service page.
  {
    en: "/answers/what-does-a-geo-agency-cost",
    id: "/id/jawaban/biaya-jasa-geo-aeo-jakarta",
  },
  {
    en: "/answers/why-is-my-business-not-on-google-maps",
    id: "/id/jawaban/kenapa-bisnis-saya-tidak-muncul-di-google-maps",
  },
  {
    en: "/answers/why-chatgpt-doesnt-mention-your-business",
    id: "/id/jawaban/kenapa-chatgpt-tidak-menyebut-bisnis-saya",
  },
  {
    en: "/answers/how-ai-answer-engines-choose-who-to-cite",
    id: "/id/jawaban/bagaimana-ai-memilih-bisnis-yang-disebut",
  },
  {
    en: "/answers/google-business-profile-keyword-consistency",
    id: "/id/jawaban/optimasi-google-bisnis-profil",
  },
];

/** Routes excluded from the sitemap. Never robots.txt-disallowed: a
 *  disallow stops crawlers reading the noindex tag, which is how a
 *  noindexed URL ends up indexed anyway. */
export const NOINDEX_PREFIXES = ["/v/"] as const;
