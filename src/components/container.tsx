import type { ReactNode } from "react";

/** Page gutter and max width, from the skin contract. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--gf-maxw)] px-[var(--gf-gutter)] ${className}`}
    >
      {children}
    </Tag>
  );
}
