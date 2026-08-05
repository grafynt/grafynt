/**
 * Renders a schema.org document as a plain <script type="application/ld+json">.
 *
 * A native script tag is correct here — JSON-LD is data, not code, so
 * next/script would only get in the way. `<` is escaped to its unicode
 * form so a string in the payload cannot break out of the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
