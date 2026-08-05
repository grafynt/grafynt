import { Fragment, type ReactNode } from "react";

/**
 * THE SIGNATURE.
 *
 * A WhatsApp thread that plays once on load: someone messages late at
 * night, the agent answers and books them inside a minute. It
 * demonstrates the product instead of describing it.
 *
 * The three constraints that shape every decision in this file:
 *
 *  1. IT MUST WORK WITH JAVASCRIPT DISABLED. The completed thread is
 *     the default state in the markup and in the CSS. The inline
 *     script *opts into* the animation by setting data-staged; it
 *     never creates content. A crawler and a reader with a failed
 *     bundle both get the whole conversation.
 *
 *  2. ZERO LAYOUT SHIFT. Every bubble occupies its final space from
 *     first paint — staging animates opacity and 6px of transform,
 *     nothing else. The typing indicator is absolutely positioned
 *     inside its bubble's slot, so it costs no height when it appears
 *     or disappears. Nothing is appended to the DOM, ever.
 *
 *  3. 3.55s CEILING, PLAYS ONCE. No loop, no IntersectionObserver, no
 *     animation library. Under prefers-reduced-motion the script
 *     returns before staging anything and the finished thread is what
 *     you get.
 *
 * The script is inlined immediately after the markup so it runs during
 * parse, before first paint — otherwise the complete thread would flash
 * before hiding itself.
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
                    data-at={thread.badge.at}
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
                      data-at={message.typingFrom}
                      data-until={message.at}
                      aria-hidden
                      className="bg-chat-in absolute top-0 left-0 hidden items-center gap-1 rounded-xl rounded-tl-[3px] px-3.5 py-3"
                    >
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                      <i className="bg-ink-faint inline-block h-1.5 w-1.5 rounded-full" />
                    </span>
                  ) : null}

                  <span
                    data-at={message.at}
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

      <script
        dangerouslySetInnerHTML={{
          __html: stagingScript(id),
        }}
      />
    </div>
  );
}

/**
 * Runs during parse, before first paint. Adds data-staged, which is the
 * only thing that hides anything — so if this never runs, the thread is
 * simply complete.
 */
function stagingScript(id: string): string {
  return `(function(){var r=document.getElementById(${JSON.stringify(id)});if(!r)return;try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return}catch(e){return}r.setAttribute("data-staged","");var n=r.querySelectorAll("[data-at]");for(var i=0;i<n.length;i++){(function(el){var a=+el.getAttribute("data-at");setTimeout(function(){el.setAttribute("data-shown","")},a);var u=el.getAttribute("data-until");if(u!==null){setTimeout(function(){el.removeAttribute("data-shown")},+u)}})(n[i])}})();`;
}
