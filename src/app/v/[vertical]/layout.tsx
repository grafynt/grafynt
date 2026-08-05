import type { ReactNode } from "react";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";

/**
 * VERTICAL OFFER PAGES — /v/[vertical]
 *
 * Not in the nav. Not in the sitemap. noindex. These are sent to a
 * prospect after an audit; nobody browses here.
 *
 * This layout is the entire fork surface for a vertical skin: one
 * `data-skin` attribute, plus the faces that skin needs. The token
 * overrides live in src/styles/skins.css and every component picks
 * them up without knowing a skin exists.
 *
 * The faces below are loaded here and nowhere else, so the public
 * site's bundle never carries them.
 *
 * No site nav and no site footer: this page has one job and one CTA
 * (WhatsApp, not Cal.com — see CtaButton).
 */

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default async function VerticalLayout({
  children,
  params,
}: LayoutProps<"/v/[vertical]">) {
  const { vertical } = await params;

  return (
    <div
      data-skin={vertical}
      lang="id"
      className={`${fraunces.variable} ${hanken.variable} ${spaceMono.variable} bg-surface text-ink flex min-h-full flex-1 flex-col`}
    >
      {children}
    </div>
  );
}
