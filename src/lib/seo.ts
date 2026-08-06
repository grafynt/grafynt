import type { Metadata } from "next";
import { SITE, HREFLANG_PAIRS, CAL_URL } from "@/lib/site";

/* ------------------------------------------------------------------ *
 * Metadata
 * ------------------------------------------------------------------ */

type PageMetaInput = {
  /** Written for a human, unique per page. No " | Grafynt", the
   *  template in the root layout adds that. */
  title: string;
  /** Unique per page, a real sentence, 120–160 chars. */
  description: string;
  /** Route path, leading slash, no trailing slash. "/" for home. */
  path: string;
  locale?: "en" | "id";
  /** Set on pages whose title already contains "Grafynt", so the root
   *  layout's "%s · Grafynt" template does not double the brand. */
  absoluteTitle?: boolean;
  /** /v/* only. Adds noindex and drops the canonical + hreflang. */
  noindex?: boolean;
};

/**
 * Every page exports `generateMetadata` or `metadata` built through
 * this. It guarantees: a self-referencing canonical, hreflang where a
 * real EN/ID pair exists, and correct og/twitter.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale = "en",
  absoluteTitle = false,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = absoluteTitle ? { absolute: title } : title;

  if (noindex) {
    return {
      title: resolvedTitle,
      description,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url,
      languages: languagesFor(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE.url;
  return `${SITE.url}${path}`;
}

/**
 * hreflang, only where a real equivalent page exists. The EN/ID split
 * is deliberate, most pages are single-language on purpose, and
 * pointing hreflang at a page that does not exist is worse than
 * omitting it.
 */
function languagesFor(path: string): Record<string, string> | undefined {
  const pair = HREFLANG_PAIRS.find((p) => p.en === path || p.id === path);
  if (!pair) return undefined;
  return {
    en: absoluteUrl(pair.en),
    id: absoluteUrl(pair.id),
    "x-default": absoluteUrl(pair.en),
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD
 *
 * Organization + WebSite are emitted once, sitewide, from the root
 * layout. Page-level types are added by the page that owns them.
 * ------------------------------------------------------------------ */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const PERSON_ID = `${SITE.url}/about#jonathan-frans`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    areaServed: SITE.markets.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: ["en", "id"],
    publisher: { "@id": ORG_ID },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.founder.name,
    jobTitle: SITE.founder.role,
    description: SITE.founder.bio,
    worksFor: { "@id": ORG_ID },
    url: `${SITE.url}/about`,
  };
}

export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    parentOrganization: { "@id": ORG_ID },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: SITE.markets.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
  };
}

export type Faq = { question: string; answer: string };

/**
 * Every answer page carries this, built from its "Common questions"
 * section. The answers must also be visible in the DOM, schema that
 * describes text a reader cannot see is a manual-action risk, not a
 * shortcut.
 */
export function faqPageSchema(faqs: readonly Faq[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  inLanguage?: "en" | "id";
}) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.inLanguage ?? "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

/** The free audit, as a bookable offer. One CTA, one schema. */
export function auditOfferSchema() {
  return {
    "@type": "Offer",
    "@id": `${SITE.url}/#audit-offer`,
    name: "GEO/AEO + WhatsApp audit",
    description:
      "Whether AI answer engines name your business, whether they describe it correctly, which competitors get named instead, plus a WhatsApp response-speed test.",
    price: "0",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
    url: CAL_URL,
    offeredBy: { "@id": ORG_ID },
  };
}

/**
 * Wraps one or more schema objects into a single @graph document.
 * One <script> per page beats several, it lets the entities
 * cross-reference by @id instead of repeating themselves.
 */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
