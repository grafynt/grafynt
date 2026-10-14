import { LADDER, type Rung } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";

/**
 * THE LADDER, five rungs, read from LADDER in src/lib/site.ts. No name,
 * price or timeline is typed into this file.
 *
 * Shape:
 *   - each rung indents a little further than the one below it, so the
 *     climb is legible without a single decorative icon
 *   - hairline rules, no cards, no shadows
 *   - the entry rung carries an accent left edge; the accent is a
 *     border, never the text colour
 *   - the top rung is filled with --gf-deep, because it is the thing
 *     being built toward
 *   - price === null renders name and role only: no price, no button.
 *     Those rows are quoted after the audit, and that is enforced by
 *     the data, not by a prop
 *
 * THE ONE SCROLL REVEAL ON THE SITE, and it is CSS-only:
 *
 *   default state = final state. The rungs are opaque and in position
 *   in the markup. The reveal is added *inside* two guards, a
 *   prefers-reduced-motion: no-preference media query and an
 *   @supports (animation-timeline: view()) test, so a browser without
 *   scroll-driven animations, a reader with reduced motion, and anyone
 *   with JavaScript disabled all get the finished ladder immediately.
 *   No IntersectionObserver, no client component, no library.
 *
 *   It animates opacity and 8px of transform only, so it cannot move
 *   layout. Rungs already in the viewport at load sit past the end of
 *   their range, which means the above-the-fold case is simply visible.
 *
 * The <style> is emitted with href + precedence so React dedupes and
 * hoists it, and it stays inside the component that owns it rather than
 * leaking into the global sheet.
 */
export function Ladder({
  rungs = LADDER,
  /** Render THE call to action on the free rung. Off by default: a page
   *  that already ends in <ClosingCta> must not show two. */
  cta = false,
  locale = "en",
  className = "",
}: {
  rungs?: readonly Rung[];
  cta?: boolean;
  locale?: "en" | "id";
  className?: string;
}) {
  const t = copy[locale];

  return (
    <>
      <style href="gf-ladder" precedence="medium">
        {LADDER_CSS}
      </style>

      <ol className={`gf-ladder ${className}`}>
        {rungs.map((rung, i) => {
          const isTop = i === rungs.length - 1;
          // The entry rung, which is where a client starts and where
          // the one CTA belongs. It used to be derived from the price
          // being digit-free, back when the audit was free.
          const isEntry = i === 0;

          return (
            <li
              key={rung.n}
              className={[
                "gf-rung border-rule border-t",
                indent[Math.min(i, indent.length - 1)],
                isTop
                  ? "bg-deep text-on-dark rounded-[var(--gf-radius)] border-transparent"
                  : "",
                isEntry ? "border-l-2 border-l-[var(--gf-accent)] pl-4" : "",
              ].join(" ")}
            >
              <div
                className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 py-6 ${
                  isTop ? "px-5" : ""
                }`}
              >
                <span
                  className={`text-meta font-mono ${
                    isTop ? "text-on-dark/70" : "text-ink-soft"
                  }`}
                >
                  {rung.n}
                </span>

                <h3
                  className={`font-display text-display-s mr-auto ${
                    isTop ? "text-on-dark" : "text-ink"
                  }`}
                >
                  {rung.name}
                </h3>

                {rung.price ? (
                  <span className="text-data text-[var(--gf-accent)] font-mono">
                    {rung.price}
                  </span>
                ) : null}

                {rung.timeline ? (
                  <span
                    className={`text-data font-mono ${
                      isTop ? "text-on-dark/70" : "text-ink-soft"
                    }`}
                  >
                    {rung.timeline}
                  </span>
                ) : null}
              </div>

              <div className={`pb-6 ${isTop ? "px-5" : ""}`}>
                <p
                  className={`text-body-s max-w-[var(--gf-measure)] ${
                    isTop ? "text-on-dark/80" : "text-ink-soft"
                  }`}
                >
                  {rung.role}
                </p>

                {rung.priceNote ? (
                  <p className="text-note text-ink-soft mt-2 font-mono">
                    {rung.priceNote}
                  </p>
                ) : null}

                {rung.price === null ? (
                  <p
                    className={`text-note mt-3 font-mono uppercase ${
                      isTop ? "text-on-dark/70" : "text-ink-soft"
                    }`}
                  >
                    {t.unpriced}
                  </p>
                ) : null}

                {cta && isEntry ? (
                  <div className="mt-5">
                    <CtaButton locale={locale} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

/** Staggered indent. Held flat below sm so 360px never gets squeezed. */
const indent = ["", "sm:ml-6", "sm:ml-12", "sm:ml-18"] as const;

const copy = {
  en: { unpriced: "Quoted per project" },
  id: { unpriced: "Dihitung per proyek" },
} as const;

const LADDER_CSS = `
@keyframes gf-rung-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .gf-ladder .gf-rung {
      animation: gf-rung-in linear both;
      animation-timeline: view();
      animation-range: entry 8% cover 20%;
    }
  }
}
`;
