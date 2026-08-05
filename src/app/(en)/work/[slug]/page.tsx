import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { JsonLd } from "@/components/json-ld";
import { PUBLISHED_WORK, WORK } from "@/lib/work";
import { articleSchema, buildMetadata, graph } from "@/lib/seo";

export const dynamicParams = false;

/** Only published entries get a route. `ai-visibility-baseline` is
 *  registered in src/lib/work.ts but not published, so it has no URL
 *  and no sitemap entry until the data behind it is real. */
export function generateStaticParams() {
  return PUBLISHED_WORK.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.summary,
    path: `/work/${slug}`,
  });
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug && w.published);
  if (!item) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({
            headline: item.title,
            description: item.summary,
            path: `/work/${slug}`,
            datePublished: item.datePublished ?? "",
          }),
        )}
      />
      <article>
        <Container className="py-20">
          <Eyebrow>Case study</Eyebrow>
          <h1 className="font-display text-display-l text-ink mt-4 max-w-[22ch]">
            {item.title}
          </h1>
          <p className="text-lead text-ink mt-6 max-w-[52ch]">{item.summary}</p>
        </Container>
      </article>
    </>
  );
}
