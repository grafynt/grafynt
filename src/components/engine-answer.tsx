import type { CSSProperties, ReactNode } from "react";

/**
 * THE SIGNATURE.
 *
 * An AI answer being composed for a buying-intent question, naming
 * three sources and never naming the reader's business. It shows the
 * problem instead of describing it, which is the same job the WhatsApp
 * thread used to do for the old positioning.
 *
 * THERE IS NO JAVASCRIPT HERE AT ALL. The sequence is CSS animations
 * with per-element delays passed in as a --at custom property, the same
 * mechanism the thread uses. An earlier version of that component
 * staged itself with a tiny inline script, which ran during parse,
 * mutated attributes React was about to hydrate, and produced a
 * hydration mismatch React explicitly refuses to patch up. Do not
 * reintroduce one here.
 *
 * The four constraints that shape every decision in this file:
 *
 *  1. IT MUST WORK WITH JAVASCRIPT DISABLED. It does, and it still
 *     animates: CSS animations need no runtime. A crawler reads the
 *     whole answer out of the markup regardless.
 *
 *  2. ZERO LAYOUT SHIFT. Every row occupies its final space from first
 *     paint. The animation touches opacity and 6px of transform and
 *     nothing else, so it cannot move layout. Nothing is ever added to
 *     or removed from the DOM.
 *
 *  3. 3.55s CEILING, PLAYS ONCE. No loop, no IntersectionObserver, no
 *     animation library. The whole staging rule lives inside
 *     `@media (prefers-reduced-motion: no-preference)`, so under
 *     reduced motion no rule applies, nothing is ever hidden, and the
 *     finished answer is simply what you get.
 *
 *  4. CHEAP. Eight elements animating opacity and transform once, on
 *     compositor-friendly properties only. Nothing here touches layout
 *     or paint on a loop, so it cannot make the page feel slow.
 *
 * The <style> carries href + precedence so React dedupes and hoists it,
 * and it stays in the component that owns it rather than leaking into
 * the global sheet. Selectors are scoped under [data-eans] so they
 * cannot collide with the thread's [data-thread] rules.
 *
 * Skin-agnostic: every colour resolves through the --gf-* contract, so
 * a vertical skin restyles it without a fork. No hex value appears
 * here. No industry is named either, which is why the question renders
 * its subject and city as placeholders: the public site stays broad,
 * and a template reads as "this is about you" anyway.
 */

export type AnswerSource = {
  /** What the engine names. Never a real business. */
  label: string;
  /** Why it got named, one short clause. */
  note: string;
  /** ms after load when this row appears. */
  at: number;
};

export type EngineAnswerScript = {
  /** The engine's name bar, e.g. "AI Overview". */
  engine: string;
  /** Small mono status under it. */
  status: string;
  /** Initial in the mark. */
  mark: string;
  /** The question, as a buyer would type it. */
  question: ReactNode;
  /** When the question appears. */
  questionAt: number;
  /** Mono label above the named sources, e.g. "Answer". */
  answerLabel: string;
  answerLabelAt: number;
  sources: AnswerSource[];
  /** The point of the whole thing: the reader, absent. */
  gap: { label: string; note: string; at: number };
  /** Mono caption under the card. */
  caption?: string;
  captionAt?: number;
};

export function EngineAnswer({
  script,
  id = "engine-answer",
  className = "",
}: {
  script: EngineAnswerScript;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <style href="gf-engine-answer" precedence="medium">
        {ENGINE_ANSWER_CSS}
      </style>

      <div
        id={id}
        data-eans
        className="border-rule bg-surface mx-auto w-full max-w-[22rem] overflow-hidden rounded-[var(--gf-radius)] border"
      >
        <div className="bg-deep text-on-dark flex items-center gap-3 px-4 py-3.5">
          <span
            aria-hidden
            className="text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 font-display text-base"
          >
            {script.mark}
          </span>
          <span>
            <span className="block text-sm leading-tight font-semibold">
              {script.engine}
            </span>
            <span className="text-note block font-mono opacity-80">
              {script.status}
            </span>
          </span>
        </div>

        <div className="px-4 py-4">
          <p
            data-at
            style={delay(script.questionAt)}
            className="text-body-s text-ink border-rule border-l-2 pl-3"
          >
            {script.question}
          </p>

          <p
            data-at
            style={delay(script.answerLabelAt)}
            className="text-meta text-ink-soft mt-5 font-mono uppercase"
          >
            {script.answerLabel}
          </p>

          <ol className="border-rule mt-2.5 border-t">
            {script.sources.map((source) => (
              <li
                key={source.label}
                data-at
                style={delay(source.at)}
                className="border-rule border-b py-2.5"
              >
                <span className="text-body-s text-ink block leading-snug">
                  {source.label}
                </span>
                <span className="text-note text-ink-soft block">
                  {source.note}
                </span>
              </li>
            ))}
          </ol>

          {/* The payload. Accent as a left border, never as text
              colour: #ff0a0a measures 3.70:1 on paper, below the 4.5:1
              floor. The words stay --ink. */}
          <div
            data-at
            style={delay(script.gap.at)}
            className="bg-accent-wash mt-4 border-l-2 border-l-[var(--gf-accent)] px-3 py-2.5"
          >
            <span className="text-body-s text-ink block leading-snug font-semibold">
              {script.gap.label}
            </span>
            <span className="text-note text-ink-soft block">
              {script.gap.note}
            </span>
          </div>
        </div>
      </div>

      {script.caption ? (
        <p
          data-at
          style={delay(script.captionAt ?? script.gap.at)}
          className="text-note text-ink-soft mt-4 text-center font-mono uppercase"
        >
          {script.caption}
        </p>
      ) : null}
    </div>
  );
}

/** When this element animates in. Read by ENGINE_ANSWER_CSS below. */
function delay(at: number): CSSProperties {
  return { "--at": `${at}ms` } as CSSProperties;
}

/* Everything that hides a row lives inside the reduced-motion query.
   Under reduced motion not one rule applies, so nothing is ever hidden
   and the finished answer is what renders. The same is true if CSS
   animations are unsupported. */
const ENGINE_ANSWER_CSS = `
@keyframes gf-eans-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: no-preference) {
  [data-eans] [data-at],
  [data-eans] ~ [data-at] {
    opacity: 0;
    animation: gf-eans-in 280ms var(--gf-ease) var(--at) forwards;
  }
}
`;
