import Link from "next/link";
import { Container } from "@/components/container";
import { CtaButton } from "@/components/cta-button";
import { NAV_EN, NAV_ID } from "@/lib/site";

/**
 * No hamburger. A menu that needs JavaScript to open is a menu a
 * crawler cannot follow and a reader with a failed bundle cannot use;
 * at this link count the row simply wraps on small screens.
 */
export function SiteNav({ locale = "en" }: { locale?: "en" | "id" }) {
  const links = locale === "id" ? NAV_ID : NAV_EN;
  const home = locale === "id" ? "/id" : "/";

  return (
    <header className="border-rule bg-surface sticky top-0 z-40 border-b">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
        <Link
          href={home}
          className="font-display text-display-s text-ink leading-none"
        >
          Grafynt
        </Link>

        <nav aria-label={locale === "id" ? "Utama" : "Primary"}>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-meta text-ink-soft hover:text-ink border-b border-transparent pb-0.5 font-mono uppercase transition-colors duration-[var(--gf-dur-micro)] hover:border-[var(--gf-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto hidden sm:block">
          <CtaButton locale={locale} className="px-4 py-2.5" />
        </div>
      </Container>
    </header>
  );
}
