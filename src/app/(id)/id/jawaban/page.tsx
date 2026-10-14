import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { loadAnswers } from "@/lib/answers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Jawaban",
  description:
    "Jawaban langsung untuk pertanyaan pemilik bisnis soal muncul di pencarian Google, disebut asisten AI seperti ChatGPT, dan cara mengukurnya.",
  path: "/id/jawaban",
  locale: "id",
});

export default async function JawabanIndex() {
  const answers = await loadAnswers("id");

  return (
    <Container className="py-20">
      <Eyebrow>Jawaban</Eyebrow>
      <h1 className="font-display text-display-l text-ink mt-4 max-w-[20ch]">
        Satu pertanyaan per halaman, dijawab tuntas.
      </h1>

      <ul className="border-rule mt-12 border-t">
        {answers.map((answer) => (
          <li key={answer.slug} className="border-rule border-b">
            <Link
              href={answer.path}
              className="group flex items-baseline justify-between gap-6 py-6"
            >
              <span className="font-display text-display-s text-ink">
                {answer.meta.question}
              </span>
              <span
                aria-hidden
                className="text-ink-soft group-hover:text-accent shrink-0 font-mono transition-colors duration-[var(--gf-dur-micro)]"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
