import { notFound } from "next/navigation";
import { KlinikPage } from "./_components/klinik";
import { buildMetadata } from "@/lib/seo";

/** Every vertical offer page that exists. Adding one means adding a
 *  slug here, a [data-skin] block in src/styles/skins.css, and its
 *  faces in this route's layout. */
const VERTICALS = ["klinik-kecantikan"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return VERTICALS.map((vertical) => ({ vertical }));
}

/** noindex, and no canonical or hreflang. Note there is deliberately
 *  NO robots.txt disallow for /v/: a disallow would stop crawlers
 *  reading this tag, which is how a noindexed URL ends up indexed. */
export const metadata = buildMetadata({
  title: "Penawaran Grafynt",
  description:
    "Halaman penawaran Grafynt. Dikirim langsung setelah audit, bukan untuk ditelusuri publik.",
  path: "/v",
  locale: "id",
  absoluteTitle: true,
  noindex: true,
});

export default async function VerticalPage({
  params,
}: PageProps<"/v/[vertical]">) {
  const { vertical } = await params;
  if (!VERTICALS.includes(vertical as (typeof VERTICALS)[number])) notFound();

  return <KlinikPage />;
}
