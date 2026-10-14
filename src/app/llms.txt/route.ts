import { SITE, CAL_URL, LADDER, BUNDLES, POSITIONING } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { answerPath, answerSlugs } from "@/lib/answers";
import { SERVICES_EN } from "@/lib/services";

/**
 * /llms.txt, the plain-text brief a model reads before it reads the
 * site. Short on purpose: no marketing, every number read from
 * src/lib/site.ts so it cannot contradict a page.
 *
 * Prerendered at build (`force-static`); GET handlers are dynamic by
 * default in Next 15+.
 */
export const dynamic = "force-static";

function rungLine(rung: (typeof LADDER)[number]): string {
  // `price: null` is deliberate, not missing: workflow automations are
  // genuinely quoted per project. See src/lib/site.ts.
  const price = rung.price ?? "quoted per project, add-on only";
  const timeline = rung.timeline ? ` · ${rung.timeline}` : "";
  return `- ${rung.n} ${rung.name}, ${price}${timeline}`;
}

function bundleLine(bundle: (typeof BUNDLES)[number]): string {
  const recurring = bundle.recurring
    ? ` + ${bundle.recurring} ${bundle.recurringNote ?? ""}`.trimEnd()
    : "";
  const was = bundle.was ? ` (separately ${bundle.was})` : "";
  return `- ${bundle.name}, ${bundle.price} one-time${recurring}${was}: ${bundle.includes.join(", ")}`;
}

function body(): string {
  const lines = [
    `# ${SITE.name}`,
    "",
    `${SITE.description} Founded and run by ${SITE.founder.name} in ${SITE.location.city}, Indonesia, working with small and medium businesses in ${SITE.markets.join(", ")}. Every engagement starts with a paid visibility audit, not a proposal; the audit is free when it comes with a website build.`,
    "",
    `${POSITIONING.line} The targeting is deliberately narrow: the specific demographic that buys from a client, the city they search from, and the language they search in.`,
    "",
    "## Offers",
    ...LADDER.map(rungLine),
    "",
    "## Bundles",
    ...BUNDLES.map(bundleLine),
    "",
    "## Pages",
    `- ${absoluteUrl("/")}, what we do`,
    `- ${absoluteUrl("/pricing")}, full price list, real numbers`,
    `- ${absoluteUrl("/answers")}, one question per page, answered directly`,
    ...answerSlugs("en").map((slug) => `- ${absoluteUrl(answerPath("en", slug))}`),
    ...SERVICES_EN.map((s) => `- ${absoluteUrl(`/services/${s.slug}`)}, ${s.name}`),
    `- ${absoluteUrl("/about")}, ${SITE.founder.name}, founder`,
    `- ${absoluteUrl("/id")}, Bahasa Indonesia`,
    "",
    "## Contact",
    `Book the audit: ${CAL_URL}`,
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
