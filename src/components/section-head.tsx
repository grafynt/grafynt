import type { ReactNode } from "react";
import { Eyebrow } from "@/components/eyebrow";

/**
 * The house signature, as one component: 10px uppercase mono directly
 * above a large Instrument Serif heading, with an optional lede.
 *
 * The heading LEVEL is a prop and the heading SIZE is a separate prop,
 * on purpose. A section that has to sit under an h2 still wants to look
 * like a section opener, and the alternative — picking the level to get
 * the size — is how heading order gets broken by a layout decision.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  size = "l",
  id,
  className = "",
}: {
  /** Mono label. Rendered through <Eyebrow>, so it carries the accent rule. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** One or two plain sentences. Never a second heading. */
  lede?: ReactNode;
  /** Semantic level. Choose it from document order, never from size. */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Visual step only. */
  size?: "xl" | "l" | "m" | "s";
  /** Set when something links to this section; adds scroll offset. */
  id?: string;
  className?: string;
}) {
  return (
    <header className={`max-w-[var(--gf-measure)] ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        id={id}
        className={`font-display text-ink ${sizeClass[size]} ${
          eyebrow ? "mt-4" : ""
        } ${id ? "scroll-mt-24" : ""}`}
      >
        {title}
      </Tag>
      {lede ? <p className="text-lead text-ink-soft mt-4">{lede}</p> : null}
    </header>
  );
}

const sizeClass = {
  xl: "text-display-xl",
  l: "text-display-l",
  m: "text-display-m",
  s: "text-display-s",
} as const;
