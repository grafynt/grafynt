/**
 * The three things Grafynt sells and builds. Broad by design — this
 * registry is what keeps the public site from reading as a
 * single-industry agency. No vertical is named here, ever.
 */
export type Service = {
  slug: string;
  name: string;
  /** One line, plain. The on-page lead and the Service schema
   *  description. Written to be read. */
  summary: string;
  /** The meta description. Written for a search result, 120–165 chars.
   *  Separate from `summary` because the two jobs are different — one
   *  opens a page, the other has to earn the click. */
  metaDescription: string;
  /** Concrete, from src/lib/site.ts. Every service states one. */
  timeline: string;
  price: string;
};

export const SERVICES_EN: readonly Service[] = [
  {
    slug: "whatsapp-ai-agent",
    name: "WhatsApp AI agent",
    summary:
      "An agent on your own WhatsApp number that answers the questions you answer most, checks availability, and books appointments.",
    metaDescription:
      "An AI agent on your own WhatsApp number that answers repeated questions, checks availability and books appointments. Rp 5.300.000, live in one to two weeks.",
    timeline: "1–2 weeks",
    price: "Rp 5.300.000",
  },
  {
    slug: "workflow-automation",
    name: "Workflow automation",
    summary:
      "n8n pipelines connecting the tools you already use, so the handoffs between them stop being somebody's job.",
    metaDescription:
      "n8n workflow automation connecting the tools your business already runs on, so the copying between them stops being a person's job. Rp 5.300.000, one to two weeks.",
    timeline: "1–2 weeks",
    price: "Rp 5.300.000",
  },
  {
    slug: "ai-websites",
    name: "AI-built websites",
    summary:
      "Fast, static sites built to be cited by AI answer engines, not just indexed by search.",
    metaDescription:
      "Static, fast websites structured so AI answer engines can quote them, not just so search can index them. From Rp 8.000.000, two to three weeks.",
    timeline: "2–3 weeks",
    price: "from Rp 8.000.000",
  },
] as const;

export const SERVICES_ID: readonly Service[] = [
  {
    slug: "whatsapp-ai-agent",
    name: "Asisten WhatsApp AI",
    summary:
      "Asisten di nomor WhatsApp Anda sendiri yang menjawab pertanyaan yang paling sering masuk, mengecek jadwal, dan mencatat booking.",
    metaDescription:
      "Asisten WhatsApp AI di nomor Anda sendiri: menjawab pertanyaan berulang, mengecek jadwal, dan mencatat booking. Rp 5.300.000, siap dalam 1–2 minggu.",
    timeline: "1–2 minggu",
    price: "Rp 5.300.000",
  },
] as const;

export function serviceBySlug(
  slug: string,
  locale: "en" | "id" = "en",
): Service | undefined {
  const list = locale === "id" ? SERVICES_ID : SERVICES_EN;
  return list.find((s) => s.slug === slug);
}
