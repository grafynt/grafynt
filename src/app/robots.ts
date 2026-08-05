import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt
 *
 * The second job of this site is to be the source a model cites, so
 * the AI crawlers are allowed BY NAME rather than left to inherit the
 * wildcard rule. Naming them costs nothing and removes any ambiguity
 * for the operators that check for a specific token.
 *
 * DO NOT add `Disallow: /v/` here. Those pages carry a noindex meta
 * tag (src/app/v/[vertical]/page.tsx). A robots.txt disallow stops a
 * crawler fetching the page at all, so it never reads the noindex —
 * which is exactly how a noindexed URL ends up indexed from inbound
 * links anyway. Crawlable + noindex is the combination that works.
 * /v/* is kept out of the sitemap instead; see src/app/sitemap.ts.
 */

/** Allowed by name. Blocking any of these defeats the point of the site. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
  "cohere-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...AI_CRAWLERS], allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
