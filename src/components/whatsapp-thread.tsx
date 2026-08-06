import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * THE SIGNATURE.
 *
 * A WhatsApp thread that plays once on load: someone messages late at
 * night, the agent answers and books them inside a minute. It
 * demonstrates the product instead of describing it.
 *
 * THERE IS NO JAVASCRIPT HERE AT ALL. The whole sequence is CSS
 * animations with per-element delays, passed in as a --at custom
 * property. An earlier version used a tiny inline script to stage the
 * bubbles; it ran during parse, mutated attributes React was about to
 * hydrate, and produced a hydration mismatch that React explicitly
 * refuses to patch up. CSS has none of that problem and is strictly
 * better on every other axis too.
 *
 * The three constraints that shape every decision in this file:
 *
 *  1. IT MUST WORK WITH JAVASCRIPT DISABLED. It does, and now it even
 *     animates: CSS animations do not need a runtime. A crawler reads
 *     the full conversation out of the markup regardless.
 *
 *  2. ZERO LAYOUT SHIFT. Every bubble occupies its final space from
 *     first paint; the animation touches opacity and 6px of transform,
 *     nothing else. The typing indicator is absolutely positioned
 *     inside its bubble's slot, so it costs no height when it appears
 *     or disappears. Nothing is ever added to or removed from the DOM.
 *
 *  3. 3.55s CEILING, PLAYS ONCE. No loop, no IntersectionObserver, no
 *     animation library. The entire staging rule lives inside
 *     `@media (prefers-reduced-motion: no-preference)`, so under
 *     reduced motion no rule applies, nothing is ever hidden, and the
 *     finished thread is simply what you get.
 *
 * Skin-agnostic: colours come from --gf-chat-* so a vertical skin
 * restyles it without a fork. See src/styles/skins.css.
 */

export type ThreadMessage = {
  from: "in" | "out";
  body: ReactNode;
  time: string;
  /** ms after load when this bubble appears. */
  at: number;
  /** ms when the typing indicator appears above an "out" bubble.
   *  Omit for no typing beat. */
  typingFrom?: number;
};

export type Thread = {
  title: string;
  status: string;
  /** Initials in the avatar. */
  mark: string;
  messages: ThreadMessage[];
  /** Small centred label, e.g. "Answered automatically". */
  badge?: { text: string; at: number };
  /** Mono caption under the phone. */
  caption?: string;
};

export function WhatsAppThread({
  thread,
  id = "thread",
  className = "",
}: {
  thread: Thread;
  id?: string;
  className?: string;
}) {
  const badgeIndex = thread.badge
    ? thread.messages.findIndex((m) => m.at > thread.badge!.at)
    : -1;

  return (
    <div className={className}>
      <div
        id={id}
        data-thread
        className="bg-chat-shell mx-auto w-full max-w-[21rem] rounded-[2rem] p-2.5"
      >
        <div className="bg-chat-bg overflow-hidden rounded-[1.6rem]">
          <div className="bg-chat-head flex items-center gap-3 px-4 py-3.5 text-white">
            <span
              aria-hidden
              className="text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 font-[family-name:var(--gf-font-display)] text-base"
            >
              {thread.mark}
            </span>
            <span>
              <span className="block text-sm leading-tight font-semibold">
                {thread.title}
              </span>
              <span className="block text-[0.7rem] opacity-85">
                {thread.status}
              </span>
            </span>
          </div>

          <ol className="flex flex-col gap-2 px-3.5 py-4">
            {thread.messages.map((message, i) => (
              <Fragment key={i}>
                {thread.badge && i === badgeIndex ? (
                  <li
                    data-at
                    style={delay(thread.badge.at)}
                    className="text-ink-soft self-center rounded-full bg-white/60 px-2.5 py-0.5 font-[family-name:var(--gf-font-mono)] text-[0.6rem] tracking-[0.12em] uppercase"
                  >
                    {thread.badge.text}
                  </li>
                ) : null}

                <li
                  className={`relative flex max-w-[86%] flex-col ${
                    message.from === "out" ? "self-end" : "self-start"
                  }`}
                >
                  {message.from === "out" && message.typingFrom != null ? (
                    <span
                      data-typing
                      style={typingWindow(message.typingFrom, message.at)}
                      aria-hidden
                      className="bg-chat-in absolute top-0 left-0 hidden items-center gap-1 rounded-xl rounded-tl-[3px] px-3.5 py-3"
                    >
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                    </span>
                  ) : null}

                  <span
                    data-at
                    style={delay(message.at)}
                    className={[
                      "text-ink block rounded-xl px-3 py-2.5 text-[0.875rem] leading-snug",
                      message.from === "out"
                        ? "bg-chat-out rounded-tr-[3px]"
                        : "bg-chat-in rounded-tl-[3px]",
                    ].join(" ")}
                  >
                    {message.body}
                    <span className="text-ink-soft mt-1 block text-right text-[0.62rem]">
                      {message.time}
                    </span>
                  </span>
                </li>
              </Fragment>
            ))}
          </ol>
        </div>
      </div>

      {thread.caption ? (
        <p className="text-note text-ink-soft mt-4 text-center font-mono uppercase">
          {thread.caption}
        </p>
      ) : null}
    </div>
  );
}

/** When this element animates in. Read by the CSS in globals.css. */
function delay(at: number): CSSProperties {
  return { "--at": `${at}ms` } as CSSProperties;
}

/**
 * The typing indicator's whole visible life: it appears at `from` and
 * is gone by `to`, which is the moment its bubble lands.
 */
function typingWindow(from: number, to: number): CSSProperties {
  return {
    "--at": `${from}ms`,
    "--dur": `${Math.max(to - from, 120)}ms`,
  } as CSSProperties;
}
