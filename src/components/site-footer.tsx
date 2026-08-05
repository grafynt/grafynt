import Link from "next/link";
import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

/**
 * The footer is also the sitemap a reader can see, and every link in
 * it is an internal retrieval signal. /v/* routes are never listed
 * here — they are sent, not browsed to.
 */
export function SiteFooter({ locale = "en" }: { locale?: "en" | "id" }) {
  const t = copy[locale];

  return (
    <footer className="border-rule mt-auto border-t">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-display-s text-ink">Grafynt</p>
          <p className="text-body-s text-ink-soft mt-3 max-w-[28ch]">
            {t.tagline}
          </p>
          <p className="text-note text-ink-soft mt-4 font-mono uppercase">
            {SITE.location.city}, Indonesia
          </p>
        </div>

        {t.columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className="text-meta text-ink-soft font-mono uppercase">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-s text-ink hover:text-ink-soft transition-colors duration-[var(--gf-dur-micro)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="border-rule flex flex-wrap items-center justify-between gap-4 border-t py-6">
        <p className="text-note text-ink-soft font-mono uppercase">
          &copy; {new Date().getFullYear()} Grafynt
        </p>
        <p className="text-note text-ink-soft font-mono uppercase">
          <a href="/llms.txt" className="hover:text-ink">
            llms.txt
          </a>
        </p>
      </Container>
    </footer>
  );
}

const copy = {
  en: {
    tagline:
      "WhatsApp agents, workflow automation, and websites built to be found. Jakarta.",
    columns: [
      {
        heading: "Services",
        links: [
          { href: "/services/whatsapp-ai-agent", label: "WhatsApp AI agent" },
          { href: "/services/workflow-automation", label: "Workflow automation" },
          { href: "/services/ai-websites", label: "AI-built websites" },
          { href: "/pricing", label: "Pricing" },
        ],
      },
      {
        heading: "Answers",
        links: [
          { href: "/answers", label: "All answers" },
          { href: "/work", label: "Work" },
          { href: "/about", label: "About" },
        ],
      },
      {
        heading: "Bahasa",
        links: [
          { href: "/id", label: "Grafynt dalam Bahasa" },
          { href: "/id/harga", label: "Harga" },
          { href: "/id/jawaban", label: "Jawaban" },
        ],
      },
    ],
  },
  id: {
    tagline:
      "Asisten WhatsApp, otomatisasi alur kerja, dan website yang mudah ditemukan. Jakarta.",
    columns: [
      {
        heading: "Layanan",
        links: [
          { href: "/id/layanan/whatsapp-ai-agent", label: "Asisten WhatsApp AI" },
          { href: "/id/harga", label: "Harga" },
        ],
      },
      {
        heading: "Jawaban",
        links: [
          { href: "/id/jawaban", label: "Semua jawaban" },
        ],
      },
      {
        heading: "English",
        links: [
          { href: "/", label: "Grafynt in English" },
          { href: "/pricing", label: "Pricing" },
          { href: "/answers", label: "Answers" },
        ],
      },
    ],
  },
} as const;
