import Link from "next/link";

export type AnswerIndexItem = {
  href: string;
  /** The question, verbatim. It is the link text because it is what a
   *  reader searched for. */
  question: string;
  /** Optional single line under it. Usually meta.description. */
  summary?: string;
  /** ISO date. Rendered as a mono <time> when present. */
  updated?: string;
};

/**
 * A ruled list of question links, used by /answers and /id/jawaban and
 * by any page that wants to point at a few related answers.
 *
 * The question is the whole link text — never "read more" — because
 * link text is a retrieval signal and "read more" is not one. Rules
 * instead of cards; the list is meant to be scanned top to bottom, not
 * compared side to side.
 */
export function AnswerIndexList({
  items,
  locale = "en",
  className = "",
}: {
  items: readonly AnswerIndexItem[];
  locale?: "en" | "id";
  className?: string;
}) {
  return (
    <ul className={`border-rule border-t ${className}`}>
      {items.map((item) => (
        <li key={item.href} className="border-rule border-b">
          <Link
            href={item.href}
            className="block border-l-2 border-l-transparent py-6 pl-4 transition-[transform,border-color] duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] hover:translate-x-[2px] hover:border-l-[var(--gf-accent)] focus-visible:outline-offset-4"
          >
            <h3 className="font-display text-display-s text-ink">
              {item.question}
            </h3>
            {item.summary ? (
              <p className="text-body-s text-ink-soft mt-1.5 max-w-[var(--gf-measure)]">
                {item.summary}
              </p>
            ) : null}
            {item.updated ? (
              <p className="text-note text-ink-soft mt-3 font-mono uppercase">
                {copy[locale].updated}{" "}
                <time dateTime={item.updated}>
                  {formatDate(item.updated, locale)}
                </time>
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const copy = {
  en: { updated: "Updated" },
  id: { updated: "Diperbarui" },
} as const;

function formatDate(iso: string, locale: "en" | "id"): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
