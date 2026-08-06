/**
 * Case studies.
 *
 * There is no client work published here yet, and nothing invented
 * fills the gap, no logo wall, no testimonial carousel, no metrics
 * that did not happen.
 *
 * The first real entry is our own: the month-zero prompt-panel
 * baseline for Grafynt, run before any of this site existed, with the
 * follow-up measured against it. It is honest because it starts by
 * showing us invisible, and it demonstrates the exact service being
 * sold. `published: false` keeps it out of the sitemap, the index and
 * the nav until the data is real.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  datePublished?: string;
};

export const WORK: readonly CaseStudy[] = [
  {
    slug: "ai-visibility-baseline",
    title: "Measuring what AI says about us, before we did anything",
    summary:
      "The month-zero prompt panel for Grafynt across ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    published: false,
  },
] as const;

export const PUBLISHED_WORK = WORK.filter((w) => w.published);
