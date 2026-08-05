import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx files are pages. Content lives in the repo, no CMS, no DB.
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

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
