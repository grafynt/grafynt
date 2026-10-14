import Link from "next/link";
import type { Service } from "@/lib/services";

/**
 * The services as ruled rows, not cards. A card would ask the reader
 * to compare five boxes; a row list asks them to read five lines,
 * which is what this actually is.
 *
 * The whole row is the link, one target, no nested "learn more".
 * Hover is a border and an opacity change. Nothing scales, nothing
 * lifts, nothing casts a shadow.
 *
 * The mono index is decorative and hidden from assistive tech; the row
 * already has a name and an order.
 */
export function ServiceRows({
  services,
  basePath,
  className = "",
}: {
  services: readonly Service[];
  /** "/services" or "/id/layanan". Slug is appended. */
  basePath: string;
  className?: string;
}) {
  return (
    <ul className={`border-rule border-t ${className}`}>
      {services.map((service, i) => (
        <li key={service.slug} className="border-rule border-b">
          <Link
            href={`${basePath}/${service.slug}`}
            className="block border-l-2 border-l-transparent py-7 pl-4 transition-[transform,border-color] duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] hover:translate-x-[2px] hover:border-l-[var(--gf-accent)] focus-visible:outline-offset-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span aria-hidden className="text-meta text-ink-faint font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-display-s text-ink mr-auto">
                {service.name}
              </h3>
              <span className="text-data text-ink-soft font-mono">
                {service.timeline}
              </span>
            </div>
            <p className="text-body-s text-ink-soft mt-2 max-w-[var(--gf-measure)]">
              {service.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
