import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { PUBLISHED_WORK } from "@/lib/work";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies with real numbers. Nothing is listed here until the work is done and the results are measured.",
  path: "/work",
});

/**
 * Empty on purpose. No logo wall, no testimonial carousel, no invented
 * metrics, an empty section is more credible than a fabricated one,
 * and this is the page where that matters most.
 */
export default function WorkIndex() {
  return (
    <Container className="py-20">
      <Eyebrow>Work</Eyebrow>
      <h1 className="font-display text-display-l text-ink mt-4 max-w-[20ch]">
        Case studies, once there are results worth publishing.
      </h1>

      {PUBLISHED_WORK.length === 0 ? (
        <p className="text-body text-ink-soft mt-8 max-w-[52ch]">
          Nothing here yet. The first entry will be our own prompt-panel
          baseline, what AI answer engines said about Grafynt before this site
          existed, measured again once it has been live long enough to matter.
        </p>
      ) : (
        <ul className="border-rule mt-12 border-t">
          {PUBLISHED_WORK.map((item) => (
            <li key={item.slug} className="border-rule border-b">
              <Link
                href={`/work/${item.slug}`}
                className="block py-6"
              >
                <span className="font-display text-display-s text-ink">
                  {item.title}
                </span>
                <span className="text-body-s text-ink-soft mt-1 block max-w-[52ch]">
                  {item.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
