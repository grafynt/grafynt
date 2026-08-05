import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

/**
 * Bahasa surface. Not a mirror of the English site — the split is by
 * query, not by page, so only the routes that earn a Bahasa version
 * have one. See HREFLANG_PAIRS in src/lib/site.ts.
 *
 * `lang` is set here rather than on <html>, which only the root layout
 * can reach. It is valid on any element and scopes correctly to this
 * subtree.
 */
export default function IdLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="id" className="flex min-h-full flex-1 flex-col">
      <SiteNav locale="id" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="id" />
    </div>
  );
}
