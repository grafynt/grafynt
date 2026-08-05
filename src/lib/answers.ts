import type { ComponentType } from "react";
import type { Faq } from "@/lib/seo";

/**
 * ANSWER PAGE CONTRACT
 *
 * One question per page. The shape below is not a suggestion — the
 * validator at the bottom of this file fails the build when it is not
 * met, because the template is what earns the citation.
 *
 * The lead lives in `meta`, not in the MDX body, so the component can
 * guarantee it is the first paragraph on the page and can check its
 * length. It is the paragraph a model lifts: it must answer the
 * question completely, standing entirely on its own, with no preamble.
 *
 * The MDX body therefore begins at "## The short version".
 */
export type AnswerMeta = {
  /** The H1, verbatim, phrased as a question. */
  question: string;
  /** <title>. Written for a human. The layout appends " · Grafynt". */
  title: string;
  /** Meta description. A real sentence, unique to this page. */
  description: string;
  /** 40–60 words. Complete, standalone, direct. No "it depends". */
  lead: string;
  /** ISO date. */
  published: string;
  /** ISO date. Freshness is a ranking input — bump it on every edit. */
  updated: string;
  /** 3–5 pairs. Mirrors the "Common questions" section, which must
   *  also be visible in the DOM. Carries FAQPage schema. */
  faqs: Faq[];
};

export type AnswerLocale = "en" | "id";

export type LoadedAnswer = {
  slug: string;
  locale: AnswerLocale;
  path: string;
  meta: AnswerMeta;
  Content: ComponentType;
};

type AnswerModule = { default: ComponentType; meta?: AnswerMeta };

/**
 * THE REGISTRY.
 *
 * Adding an answer page is two edits: write the .mdx file, then add
 * one line here. Explicit imports rather than a directory scan, on
 * purpose — the build stays statically analysable, nothing traces the
 * whole project into the deployment, and the order below is the
 * editorial order the index page renders in.
 */
const ANSWERS: Record<
  AnswerLocale,
  Record<string, () => Promise<AnswerModule>>
> = {
  en: {
    "how-to-automate-whatsapp-customer-service": () =>
      import("@/content/answers/how-to-automate-whatsapp-customer-service.mdx"),
    "cost-to-automate-order-processing": () =>
      import("@/content/answers/cost-to-automate-order-processing.mdx"),
    "hire-cs-rep-or-automate": () =>
      import("@/content/answers/hire-cs-rep-or-automate.mdx"),
    "can-ai-handle-whatsapp-bookings": () =>
      import("@/content/answers/can-ai-handle-whatsapp-bookings.mdx"),
    "n8n-vs-make-vs-zapier-small-business": () =>
      import("@/content/answers/n8n-vs-make-vs-zapier-small-business.mdx"),
    "whatsapp-business-api-vs-unofficial-gateway": () =>
      import("@/content/answers/whatsapp-business-api-vs-unofficial-gateway.mdx"),
  },
  id: {
    "cara-otomatisasi-whatsapp-customer-service": () =>
      import("@/content/jawaban/cara-otomatisasi-whatsapp-customer-service.mdx"),
    "biaya-bikin-chatbot-whatsapp": () =>
      import("@/content/jawaban/biaya-bikin-chatbot-whatsapp.mdx"),
    "rekrut-admin-atau-otomatisasi": () =>
      import("@/content/jawaban/rekrut-admin-atau-otomatisasi.mdx"),
  },
};

const BASE: Record<AnswerLocale, string> = {
  en: "/answers",
  id: "/id/jawaban",
};

const DIR: Record<AnswerLocale, string> = {
  en: "src/content/answers",
  id: "src/content/jawaban",
};

export function answerSlugs(locale: AnswerLocale): string[] {
  return Object.keys(ANSWERS[locale]);
}

export function answerPath(locale: AnswerLocale, slug: string): string {
  return `${BASE[locale]}/${slug}`;
}

export async function loadAnswer(
  locale: AnswerLocale,
  slug: string,
): Promise<LoadedAnswer> {
  const load = ANSWERS[locale][slug];
  const where = `${DIR[locale]}/${slug}.mdx`;
  if (!load) {
    throw new Error(
      `${where} is not registered. Add it to ANSWERS in src/lib/answers.ts.`,
    );
  }

  const mod = await load();
  const meta = mod.meta;
  if (!meta) {
    throw new Error(
      `${where} is missing "export const meta". See the contract at the top of src/lib/answers.ts.`,
    );
  }
  validateAnswerMeta(meta, where);

  return {
    slug,
    locale,
    path: answerPath(locale, slug),
    meta,
    Content: mod.default,
  };
}

/** Every answer for a locale, for the index page and the sitemap. */
export async function loadAnswers(
  locale: AnswerLocale,
): Promise<LoadedAnswer[]> {
  return Promise.all(answerSlugs(locale).map((slug) => loadAnswer(locale, slug)));
}

/* ------------------------------------------------------------------ *
 * Validation — runs at build, so a page that breaks the template
 * cannot ship.
 * ------------------------------------------------------------------ */

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function validateAnswerMeta(meta: AnswerMeta, where: string): void {
  const fail = (msg: string): never => {
    throw new Error(`${where}: ${msg}`);
  };

  const words = wordCount(meta.lead);
  if (words < 40 || words > 60) {
    fail(
      `lead is ${words} words; the template requires 40–60. This is the paragraph a model lifts, so it has to answer the question completely and on its own.`,
    );
  }

  if (!meta.question.trim().endsWith("?")) {
    fail(`question must be phrased as a question and end with "?".`);
  }

  if (meta.faqs.length < 3 || meta.faqs.length > 5) {
    fail(`faqs has ${meta.faqs.length} entries; the template requires 3–5.`);
  }

  for (const iso of [meta.published, meta.updated]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
      fail(`dates must be ISO (YYYY-MM-DD); got "${iso}".`);
    }
  }

  if (meta.description.length < 70 || meta.description.length > 165) {
    fail(
      `description is ${meta.description.length} chars; aim for 70–165 so it is not truncated.`,
    );
  }
}
