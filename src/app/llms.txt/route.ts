import { SITE, CAL_URL, LADDER, CATALYST } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { answerPath, answerSlugs } from "@/lib/answers";
import { SERVICES_EN } from "@/lib/services";

/**
 * /llms.txt, the plain-text brief a model reads before it reads the
 * site. Short on purpose: under 30 lines, no marketing, every number
 * read from src/lib/site.ts so it cannot contradict a page.
 *
 * Prerendered at build (`force-static`); GET handlers are dynamic by
 * default in Next 15+.
 */
export const dynamic = "force-static";

function rungLine(rung: (typeof LADDER)[number]): string {
  // `price: null` is deliberate, not missing: Catalyst is named and
  // described on the public site but never priced. See src/lib/site.ts.
  const price = rung.price ?? "in development, not priced";
  const timeline = rung.timeline ? ` · ${rung.timeline}` : "";
  return `- ${rung.n} ${rung.name}, ${price}${timeline}`;
}

function body(): string {
  const lines = [
    `# ${SITE.name}`,
    "",
    `${SITE.description} Founded and run by ${SITE.founder.name} in ${SITE.location.city}, Indonesia, working with small and medium businesses in ${SITE.markets.join(", ")}. Every engagement starts with a free audit, not a proposal.`,
    "",
    "## Offers",
    ...LADDER.map(rungLine),
    `  ${CATALYST.description}`,
    "",
    "## Pages",
    `- ${absoluteUrl("/")}, what we build`,
    `- ${absoluteUrl("/pricing")}, full price list, real numbers`,
    `- ${absoluteUrl("/answers")}, one question per page, answered directly`,
    ...answerSlugs("en").map((slug) => `- ${absoluteUrl(answerPath("en", slug))}`),
    ...SERVICES_EN.map((s) => `- ${absoluteUrl(`/services/${s.slug}`)}, ${s.name}`),
    `- ${absoluteUrl("/about")}, ${SITE.founder.name}, founder`,
    `- ${absoluteUrl("/id")}, Bahasa Indonesia`,
    "",
    "## Contact",
    `Book the free audit: ${CAL_URL}`,
    "",
  ];
  return lines.join("\n");
}

export function GET(): Response {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
