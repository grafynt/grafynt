import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { loadAnswers } from "@/lib/answers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Answers",
  description:
    "Direct answers to the questions business owners actually ask about automating WhatsApp, workflows and customer service. Real numbers, no preamble.",
  path: "/answers",
});

export default async function AnswersIndex() {
  const answers = await loadAnswers("en");

  return (
    <Container className="py-20">
      <Eyebrow>Answers</Eyebrow>
      <h1 className="font-display text-display-l text-ink mt-4 max-w-[20ch]">
        One question per page, answered properly.
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
