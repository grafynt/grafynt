import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global element map for every MDX file. Content authors write plain
 * markdown; the typography is decided here, once, off the tokens.
 *
 * Notes that matter beyond looks:
 *  - tables scroll inside their own container, so a wide comparison
 *    table never makes the page scroll sideways on a phone
 *  - internal links use next/link, external ones get rel attributes
 *  - headings keep the ids added by rehype-slug, so an answer section
 *    can be cited directly
 */
const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    // Answer pages render their h1 from meta.question in the layout.
    // An h1 inside MDX body copy is a mistake, flag it loudly rather
    // than silently shipping two.
    <h1
      {...props}
      className="font-display text-display-l text-ink mt-12 first:mt-0"
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="font-display text-display-m text-ink mt-14 scroll-mt-24 first:mt-0"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="font-body text-label text-ink mt-10 scroll-mt-24 font-semibold uppercase"
    >
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p {...props} className="text-body text-ink mt-5 max-w-[var(--gf-measure)]">
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="mt-5 max-w-[var(--gf-measure)] border-t border-rule"
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="mt-5 max-w-[var(--gf-measure)] list-decimal border-t border-rule pl-5"
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li
      {...props}
      className="text-body-s text-ink border-b border-rule py-2.5 marker:font-mono marker:text-ink-soft"
    >
      {children}
    </li>
  ),

  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    const className =
      "text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-[var(--gf-dur-micro)] hover:text-ink-soft";

    if (external) {
      return (
        <a
          {...props}
          href={href}
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...props} href={href} className={className}>
        {children}
      </Link>
    );
  },

  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold">
      {children}
    </strong>
  ),

  em: ({ children, ...props }) => (
    <em {...props} className="italic">
      {children}
    </em>
  ),

  // Wide tables scroll inside themselves; the page body never does.
  table: ({ children, ...props }) => (
    <div className="mt-8 -mx-[var(--gf-gutter)] overflow-x-auto px-[var(--gf-gutter)] sm:mx-0 sm:px-0">
      <table {...props} className="w-full min-w-[30rem] border-collapse">
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      className="text-meta text-ink-soft border-b border-ink pr-4 pb-2.5 text-left font-medium uppercase"
      style={{ fontFamily: "var(--gf-font-mono)" }}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      {...props}
      className="text-body-s text-ink border-b border-rule py-3 pr-4 align-top"
    >
      {children}
    </td>
  ),

  hr: (props) => <hr {...props} className="border-rule mt-12 border-t" />,

  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="border-accent bg-accent-wash text-body text-ink mt-8 max-w-[var(--gf-measure)] border-l-[3px] px-6 py-5 [&>p]:mt-0"
    >
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }) => (
    <code {...props} className="text-data font-mono">
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
