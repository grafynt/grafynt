import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { HREFLANG_PAIRS, NOINDEX_PREFIXES } from "@/lib/site";
import { answerPath, loadAnswers } from "@/lib/answers";
import { SERVICES_EN, SERVICES_ID } from "@/lib/services";
import { PUBLISHED_WORK } from "@/lib/work";

/**
 * sitemap.xml, generated at build from the same registries the pages
 * render from, so it cannot drift when content is added. Adding an
 * answer, a service or publishing a case study needs no edit here.
 *
 * Excluded: everything under NOINDEX_PREFIXES (/v/*, the vertical
 * offer pages) and unpublished work. Those pages stay crawlable ,
 * they are noindexed by meta tag, not by robots.txt, they are simply
 * never advertised. The filter at the bottom is a backstop so a future
 * registry entry cannot leak one in.
 *
 * hreflang: `alternates.languages` is added only where a real EN/ID
 * equivalent exists (HREFLANG_PAIRS). The language split is by query,
 * not a mirror, and pointing hreflang at a page that does not exist is
 * worse than omitting it.
 */

type Entry = MetadataRoute.Sitemap[number];

/** Build date, for pages with no content date of their own. */
const BUILT = new Date();

type Draft = {
  path: string;
  lastModified?: string | Date;
  changeFrequency?: Entry["changeFrequency"];
  priority?: number;
};

function route(
  path: string,
  opts: Omit<Draft, "path"> = {},
): Draft {
  return { path, ...opts };
}

/**
 * hreflang, but only where BOTH sides of the pair are routes this
 * sitemap is actually emitting. HREFLANG_PAIRS is a declaration of
 * intent and can run ahead of the content, /id/jawaban/* is declared
 * but the Bahasa answer registry is still empty, and an alternate
 * pointing at a 404 is worse than no alternate at all.
 */
function languagesFor(
  path: string,
  live: ReadonlySet<string>,
): Pick<Entry, "alternates"> | undefined {
  const pair = HREFLANG_PAIRS.find((p) => p.en === path || p.id === path);
  if (!pair) return undefined;
  if (!live.has(pair.en) || !live.has(pair.id)) return undefined;
  return {
    alternates: {
      languages: {
        en: absoluteUrl(pair.en),
        id: absoluteUrl(pair.id),
        "x-default": absoluteUrl(pair.en),
      },
    },
  };
}

function isIndexable(path: string): boolean {
  return !NOINDEX_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [answersEn, answersId] = await Promise.all([
    loadAnswers("en"),
    loadAnswers("id"),
  ]);

  const drafts: Draft[] = [
    /* English ------------------------------------------------------ */
    route("/", { changeFrequency: "weekly", priority: 1 }),
    route("/pricing", { changeFrequency: "monthly", priority: 0.9 }),
    route("/answers", { changeFrequency: "weekly", priority: 0.8 }),
    route("/about", { changeFrequency: "yearly", priority: 0.5 }),
    route("/work", { changeFrequency: "monthly", priority: 0.4 }),

    ...SERVICES_EN.map((service) =>
      route(`/services/${service.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),

    // Answer pages carry their own freshness. `updated` is a ranking
    // input, so it is the lastmod rather than the build date.
    ...answersEn.map((answer) =>
      route(answerPath("en", answer.slug), {
        lastModified: answer.meta.updated,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),

    // Only published case studies. Unpublished entries have no route.
    ...PUBLISHED_WORK.map((item) =>
      route(`/work/${item.slug}`, {
        lastModified: item.datePublished ?? BUILT,
        changeFrequency: "yearly",
        priority: 0.5,
      }),
    ),

    /* Bahasa ------------------------------------------------------- */
    route("/id", { changeFrequency: "weekly", priority: 1 }),
    route("/id/harga", { changeFrequency: "monthly", priority: 0.9 }),
    route("/id/jawaban", { changeFrequency: "weekly", priority: 0.8 }),

    ...SERVICES_ID.map((service) =>
      route(`/id/layanan/${service.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),

    ...answersId.map((answer) =>
      route(answerPath("id", answer.slug), {
        lastModified: answer.meta.updated,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
  ];

  // Backstop. Nothing above should produce a /v/* URL; if a registry
  // ever does, it dies here rather than in the published sitemap.
  const published = drafts.filter((d) => isIndexable(d.path));
  const live = new Set(published.map((d) => d.path));

  return published.map((d) => ({
    url: absoluteUrl(d.path),
    lastModified: d.lastModified ?? BUILT,
    changeFrequency: d.changeFrequency ?? "monthly",
    priority: d.priority ?? 0.6,
    ...languagesFor(d.path, live),
  }));
}
