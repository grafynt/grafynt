import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

/* Fonts are downloaded at build time and served from our own origin ,
   no request ever goes to Google. Display is preloaded because the h1
   is the LCP element on every page; body and mono are not, to keep the
   critical request chain short. */

const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const body = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Grafynt, AI automation for small and medium businesses",
    template: "%s · Grafynt",
  },
  description: SITE.description,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        {/* Organization + WebSite, once, sitewide. Page-level schema is
            added by the page that owns it and cross-references these
            by @id. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
