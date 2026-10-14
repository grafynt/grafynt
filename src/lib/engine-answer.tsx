import type { EngineAnswerScript } from "@/components/engine-answer";

/**
 * The English home hero.
 *
 * It is the problem, not the product: an assistant answering a
 * buying-intent question, naming three sources, and never naming the
 * reader. Every row states why the thing it names got named, so the
 * card doubles as the shortest possible summary of what the work is.
 *
 * Nothing here is a real business, and no industry is named. The
 * question renders its subject and city as placeholders because the
 * public site stays broad, and because a template reads as "this is
 * about you" more directly than someone else's vertical would.
 *
 * Timing, ms from load. Ceiling is 3.55s and this lands inside it.
 *   200   the question
 *   900   "Answer" label
 *  1200   first source named
 *  1700   second
 *  2200   third
 *  2900   the reader, absent, in the accent band
 *  3400   caption
 */
export function homeEngineAnswer(): EngineAnswerScript {
  return {
    engine: "AI Overview",
    status: "generating · live web results",
    mark: "AI",
    questionAt: 200,
    question: (
      <>
        Who are the best{" "}
        <span className="text-ink-soft font-mono">[your service]</span>{" "}
        providers in{" "}
        <span className="text-ink-soft font-mono">[your city]</span>?
      </>
    ),
    answerLabel: "Answer",
    answerLabelAt: 900,
    sources: [
      {
        label: "A competitor two suburbs away",
        note: "Their page answers this exact question in its first line.",
        at: 1200,
      },
      {
        label: "A national directory listing",
        note: "Name, address and services written identically everywhere.",
        at: 1700,
      },
      {
        label: "A competitor's comparison page",
        note: "One page per question a buyer actually asks.",
        at: 2200,
      },
    ],
    gap: {
      label: "Your business, not mentioned",
      note: "Found and read, but nothing on it answers the question outright.",
      at: 2900,
    },
    caption: "This is what the audit measures",
    captionAt: 3400,
  };
}
