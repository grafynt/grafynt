import { BUNDLES, type Bundle } from "@/lib/site";

/**
 * The two bundles, read from BUNDLES in src/lib/site.ts. No name, price
 * or inclusion is typed into this file.
 *
 * Built out of the patterns already on the site: hairline rules, no
 * cards, no shadows, the mono index in --ink-faint, the numeric price
 * in the accent. That accent-on-a-price-cell is the one documented
 * exception to "the accent is never a text colour", and this is a price
 * cell, so it holds.
 *
 * The struck-through `was` is --ink-faint, which is decorative-only
 * contrast, and that is correct here: it is a number the reader is not
 * being asked to read carefully, it is there to be compared. The price
 * that matters is the one in the accent next to it, and the discount is
 * also stated in words in the note, so nothing depends on seeing it.
 *
 * Recurring is rendered on its own line rather than folded into the
 * total, because a monthly fee and a one-time fee are different
 * commitments and adding them into one figure hides that.
 */
export function BundleRows({
  bundles = BUNDLES,
  locale = "en",
  className = "",
}: {
  bundles?: readonly Bundle[];
  locale?: "en" | "id";
  className?: string;
}) {
  const t = copy[locale];

  return (
    <ul className={`border-rule border-t ${className}`}>
      {bundles.map((bundle) => (
        <li key={bundle.n} className="border-rule border-b py-7">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span aria-hidden className="text-meta text-ink-faint font-mono">
              {bundle.n}
            </span>
            <h3 className="font-display text-display-s text-ink mr-auto">
              {bundle.name}
            </h3>

            {bundle.was ? (
              <span className="text-data text-ink-faint font-mono line-through">
                {bundle.was}
              </span>
            ) : null}
            <span className="text-data font-mono text-[var(--gf-accent)]">
              {bundle.price}
            </span>
          </div>

          <p className="text-note text-ink-soft mt-2 font-mono uppercase">
            {t.oneTime}
          </p>

          {bundle.recurring ? (
            <p className="text-data text-ink mt-3 font-mono">
              {t.plus} {bundle.recurring}
              {bundle.recurringNote ? (
                <span className="text-note text-ink-soft ml-2 normal-case">
                  {bundle.recurringNote}
                </span>
              ) : null}
            </p>
          ) : null}

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {bundle.includes.map((item) => (
              <li
                key={item}
                className="text-body-s text-ink-soft flex items-baseline gap-2"
              >
                <span
                  aria-hidden
                  className="bg-accent mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-body-s text-ink mt-4 max-w-[var(--gf-measure)]">
            {bundle.note}
          </p>
        </li>
      ))}
    </ul>
  );
}

const copy = {
  en: { oneTime: "One-time", plus: "+" },
  id: { oneTime: "Sekali bayar", plus: "+" },
} as const;
