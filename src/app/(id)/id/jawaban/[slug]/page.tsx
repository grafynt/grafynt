import { AnswerPage } from "@/components/answer-page";
import { answerPath, answerSlugs, loadAnswer } from "@/lib/answers";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return answerSlugs("id").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/id/jawaban/[slug]">) {
  const { slug } = await params;
  const { meta } = await loadAnswer("id", slug);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: answerPath("id", slug),
    locale: "id",
  });
}

export default async function Page({
  params,
}: PageProps<"/id/jawaban/[slug]">) {
  const { slug } = await params;
  const { meta, Content, path } = await loadAnswer("id", slug);

  return (
    <AnswerPage meta={meta} path={path} locale="id">
      <Content />
    </AnswerPage>
  );
}
