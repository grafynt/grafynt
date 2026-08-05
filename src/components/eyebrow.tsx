import type { ReactNode } from "react";

/**
 * The house signature: tiny uppercase mono above a large serif heading.
 *
 * The accent is a 3px rule, not the text colour — #ff0a0a on paper
 * measures 3.70:1, which is below the 4.5:1 floor for text this size.
 * The mark carries the brand, the ink-soft label carries the meaning,
 * and both are legible.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-eyebrow text-ink-soft flex items-center gap-2.5 font-mono uppercase ${className}`}
    >
      <span aria-hidden className="bg-accent inline-block h-px w-3.5" />
      {children}
    </p>
  );
}
