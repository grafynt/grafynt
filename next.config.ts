import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx files are pages. Content lives in the repo, no CMS, no DB.
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return LEGACY_REDIRECTS;
  },
};

/**
 * 301s from the automation-era URLs.
 *
 * These paths were indexed before the repositioning to GEO/AEO/SEO, and
 * dropping them would throw away whatever equity and inbound links they
 * had. Permanent, because the move is permanent.
 *
 * Each one points at the nearest page that genuinely answers the same
 * question. Where no close equivalent exists, the target is the
 * relevant index rather than the home page, so the redirect does not
 * look like a soft 404 to a crawler. Nothing here points at a page that
 * does not exist; the build would still serve the redirect, but the
 * landing would 404.
 *
 * Do not delete a row to tidy up. A redirect that has been live is
 * cheaper to keep than the ranking it protects is to re-earn.
 */
const LEGACY_REDIRECTS = [
  // Services, renamed and re-scoped.
  {
    source: "/services/whatsapp-ai-agent",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/services/ai-websites",
    destination: "/services/websites",
    permanent: true,
  },
  {
    source: "/id/layanan/whatsapp-ai-agent",
    destination: "/id/layanan/otomatisasi-alur-kerja",
    permanent: true,
  },

  // Answer pages. The automation questions are no longer answered, so
  // each goes to the closest surviving page, not to /answers wholesale.
  {
    source: "/answers/how-to-automate-whatsapp-customer-service",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/answers/cost-to-automate-order-processing",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/answers/hire-cs-rep-or-automate",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/answers/can-ai-handle-whatsapp-bookings",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/answers/n8n-vs-make-vs-zapier-small-business",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/answers/whatsapp-business-api-vs-unofficial-gateway",
    destination: "/services/workflow-automation",
    permanent: true,
  },
  {
    source: "/id/jawaban/cara-otomatisasi-whatsapp-customer-service",
    destination: "/id/layanan/otomatisasi-alur-kerja",
    permanent: true,
  },
  {
    source: "/id/jawaban/biaya-bikin-chatbot-whatsapp",
    destination: "/id/layanan/otomatisasi-alur-kerja",
    permanent: true,
  },
  {
    source: "/id/jawaban/rekrut-admin-atau-otomatisasi",
    destination: "/id/layanan/otomatisasi-alur-kerja",
    permanent: true,
  },
];

const withMDX = createMDX({
  options: {
    // Plugin names as strings so this config works under both the
    // webpack and Turbopack compilers.
    remarkPlugins: [
      // GitHub-flavoured markdown: tables, strikethrough, autolinks.
      // Answer pages need tables.
      "remark-gfm",
    ],
    rehypePlugins: [
      // Stable id on every heading, so answers are deep-linkable and
      // a model can cite a specific section.
      "rehype-slug",
    ],
  },
});

export default withMDX(nextConfig);
