import { CAL_URL, WHATSAPP } from "@/lib/site";

/**
 * THE call to action. There is one per page and it is this.
 *
 *   public routes   -> Cal.com. Track B arrives on a laptop and
 *                      expects a booking link.
 *   /v/* verticals  -> WhatsApp. Track A arrives already in a DM,
 *                      on a phone, having read an audit. A calendar
 *                      adds three decisions at the warmest moment.
 *
 * Never render two of these on one page, and never pair one with a
 * second competing action.
 */
export function CtaButton({
  locale = "en",
  channel = "cal",
  label,
  className = "",
}: {
  locale?: "en" | "id";
  channel?: "cal" | "whatsapp";
  label?: string;
  className?: string;
}) {
  const isWa = channel === "whatsapp";
  const href = isWa ? WHATSAPP.url : CAL_URL;
  const text = label ?? defaultLabel[locale][channel];

  return (
    <a
      href={href}
      {...(isWa ? { rel: "noopener noreferrer", target: "_blank" } : {})}
      className={[
        "bg-ink text-on-dark inline-flex items-center gap-2.5",
        "rounded-[var(--gf-radius-btn)] px-6 py-3.5",
        "font-body text-body-s font-semibold",
        "border-b-2 border-b-[var(--gf-accent)]",
        "transition-opacity duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)]",
        "hover:opacity-90",
        className,
      ].join(" ")}
    >
      {isWa ? <WhatsAppMark /> : null}
      {text}
      <span aria-hidden>&rarr;</span>
    </a>
  );
}

const defaultLabel = {
  en: { cal: "Book the free audit", whatsapp: "Message us on WhatsApp" },
  id: { cal: "Minta audit gratis", whatsapp: "Chat via WhatsApp" },
} as const;

function WhatsAppMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      className="shrink-0"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1 12.8-10.17 8.19 8.19 0 0 1 2.42 5.84c0 4.54-3.7 8.24-8.24 8.24Z" />
    </svg>
  );
}
