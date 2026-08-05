import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

/**
 * English public surface (Track B + international inbound).
 *
 * Broad positioning only: AI automation, WhatsApp agents, workflow
 * automation, AI-built websites. No vertical is ever named on a route
 * inside this group.
 */
export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav locale="en" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="en" />
    </>
  );
}
