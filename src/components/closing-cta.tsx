import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { CtaButton } from "@/components/cta-button";

/**
 * The one dark band on a page, and the last thing on it.
 *
 * One heading, one line, ONE button. There is no secondary action and
 * there is no prop to add one, a second choice next to the primary one
 * measurably costs conversions, and this site has exactly one thing it
 * wants a reader to do.
 *
 * --gf-deep is the only fill. No gradient, no glow, no full-bleed
 * dark/light alternation elsewhere on the page: this band is the
 * contrast event, which is why it works.
 */
export function ClosingCta({
  heading,
  lede,
  locale = "en",
  channel = "cal",
  label,
  className = "",
}: {
  heading: ReactNode;
  lede?: ReactNode;
  locale?: "en" | "id";
  /** "whatsapp" on /v/* routes only. */
  channel?: "cal" | "whatsapp";
  label?: string;
  className?: string;
}) {
  return (
    <section className={`bg-deep ${className}`}>
      <Container className="py-16 md:py-20">
        <div className="max-w-[34rem]">
          <span
            aria-hidden
            className="bg-accent mb-7 block h-px w-10"
          />
          <h2 className="font-display text-display-l text-on-dark">{heading}</h2>
          {lede ? (
            <p className="text-lead text-on-dark/80 mt-4">{lede}</p>
          ) : null}
          <div className="mt-8">
            <CtaButton
              locale={locale}
              channel={channel}
              label={label}
              className="bg-surface text-ink border-b-[var(--gf-accent)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
