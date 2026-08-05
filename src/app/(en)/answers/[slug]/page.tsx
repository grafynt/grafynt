import { AnswerPage } from "@/components/answer-page";
import { answerPath, answerSlugs, loadAnswer } from "@/lib/answers";
import { buildMetadata } from "@/lib/seo";

/** Only the answers that exist on disk. Anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return answerSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/answers/[slug]">) {
  const { slug } = await params;
  const { meta } = await loadAnswer("en", slug);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: answerPath("en", slug),
  });
}

export default async function Page({ params }: PageProps<"/answers/[slug]">) {
  const { slug } = await params;
  const { meta, Content, path } = await loadAnswer("en", slug);

  return (
    <AnswerPage meta={meta} path={path} locale="en">
      <Content />
    </AnswerPage>
  );
}
