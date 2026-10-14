/**
 * Case studies.
 *
 * Nothing invented fills a gap here: no logo wall, no testimonial
 * carousel, no metric that did not happen. An empty section is more
 * credible than a fabricated one.
 *
 * The first entry is our own, and it starts by showing us invisible.
 * That is the point: it is the day-zero baseline for Grafynt, measured
 * with the same method the audit sells, on the day the repositioned
 * site went live. Every later run is compared against these numbers.
 *
 * ON NAMING COMPETITORS. The audit tells a client which businesses get
 * named instead of them, by name, because that client needs the names.
 * This page does not print them. A public page listing competitors for
 * the exact query we want to win is a page that corroborates their
 * relevance to it, retrievable by the engines we are trying to appear
 * in. Describing the set without naming it costs the reader nothing and
 * hands a competitor nothing. `competitorSet` therefore holds a shape,
 * not a list, and must stay that way.
 */
export type BaselineFinding = {
  title: string;
  body: string;
};

export type Baseline = {
  /** ISO date the panel was run. */
  measuredOn: string;
  /** How it was run, so the next run can be run identically. */
  method: readonly string[];
  /** The three findings, in the audit's own order. */
  findings: readonly BaselineFinding[];
  /** The retrieval and consistency test. */
  retrieval: BaselineFinding;
  /** What this predicts, written before we know the answer. */
  next: readonly string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  datePublished?: string;
  /** Present on measurement entries. Rendered as the body. */
  baseline?: Baseline;
};

export const WORK: readonly CaseStudy[] = [
  {
    slug: "ai-visibility-baseline",
    title: "Measuring what AI says about us, before we did anything",
    summary:
      "The day-zero prompt panel for Grafynt across ChatGPT, Gemini, Perplexity and Google AI Overviews, measured against ordinary search for the same queries, on the day this site went live.",
    published: true,
    datePublished: "2026-10-15",
    baseline: {
      measuredOn: "2026-10-15",
      method: [
        "A fixed set of buying-intent questions in the wording a buyer uses, in both Bahasa Indonesia and English, not our own service names.",
        "Run logged out, with no session history, so personalisation could not bias the result toward us.",
        "Each question checked in both AI assistants and ordinary search, so a ranking problem is distinguishable from a citation problem.",
        "Every business named instead of us recorded, which is the output a client receives by name.",
        "A retrieval check on our own pages: what a live web-search API actually receives when it fetches them.",
      ],
      findings: [
        {
          title: "Citation presence: none",
          body: "Grafynt was named for none of the buying-intent questions, in any engine. Searching the brand name directly surfaced neither the site nor its author, and returned two unrelated companies with near-identical names instead. The site was hours old when this ran, so this is the expected result rather than a surprising one, and it is the number every later run is measured against.",
        },
        {
          title: "Description accuracy: nothing to be accurate about",
          body: "Nothing is said about Grafynt because nothing names it. The author entity does not exist publicly either, which matters more than it looks: attributable authorship is weighted in citation, and ours currently corroborates nothing.",
        },
        {
          title: "Competitor set: established and direct",
          body: "Seven agencies were named across the buying-intent questions, and they are not adjacent businesses that happened to appear. They sell the same three letters in the same city and target the same wording, several with pages built specifically for the GEO and AEO queries. This is a contested market, not an empty one, and planning as though it were empty would be the expensive mistake.",
        },
      ],
      retrieval: {
        title: "Retrieval and consistency: passing",
        body: "The one part that already works. Fetched the way an assistant fetches, the site returns a complete and accurate picture: positioning, all five prices, both bundles, timelines and markets, with no JavaScript required and nothing hidden behind an interaction. Every surface agrees because every number is read from one file. The constraint is not that we are unreadable. It is that nothing points at us yet.",
      },
      next: [
        "Visibility is not a switch. Retrieval-based answers can move within days of a page changing, but being named at all requires that something, somewhere, refers to you, and on day zero nothing does.",
        "The next run is in one month, with the same questions, logged out, in both languages. If the method changes, the comparison is worthless, so it will not.",
        "The honest prediction: brand-name queries should resolve first, buying-intent questions much later, and the competitor set is unlikely to shrink. Published here before we know, so it cannot be rewritten afterwards.",
      ],
    },
  },
] as const;

export const PUBLISHED_WORK = WORK.filter((w) => w.published);
