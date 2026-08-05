import { AUDIT, type Audit } from "@/lib/site";

/**
 * What the free audit is: three findings and a response-speed test,
 * read from AUDIT in src/lib/site.ts so the description cannot drift
 * between the home page, /pricing and the answer pages.
 *
 * A stepped vertical line with dots, not a grid of cards. The four
 * steps are sequential — they happen in an order and produce one
 * document — and a grid would claim they are parallel options.
 *
 * The line and the dots are --gf-rule and --gf-accent as borders and
 * fills only. The test is the last step and carries the filled dot,
 * because it is the part nobody else does.
 */
export function AuditPanel({
  audit = AUDIT,
  locale = "en",
  className = "",
}: {
  audit?: Audit;
  locale?: "en" | "id";
  className?: string;
}) {
  const t = copy[locale];
  const steps = [...audit.findings, audit.test];

  return (
    <div className={className}>
      <ol className="border-rule ml-[5px] border-l">
        {steps.map((step, i) => {
          const isTest = i === steps.length - 1;

          return (
            <li key={step.title} className="relative pb-9 pl-7 last:pb-0">
              <span
                aria-hidden
                className={[
                  "absolute top-[0.45rem] left-[-6px] block h-[11px] w-[11px] rounded-full",
                  isTest
                    ? "bg-[var(--gf-accent)]"
                    : "bg-surface border-[var(--gf-accent)] border-2",
                ].join(" ")}
              />
              <h3 className="font-display text-display-s text-ink">
                {step.title}
              </h3>
              <p className="text-body-s text-ink-soft mt-1.5 max-w-[var(--gf-measure)]">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>

      <p className="text-note text-ink-soft border-rule mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t pt-4 font-mono uppercase">
        <span>
          {t.turnaround} {audit.turnaround}
        </span>
        <span>{audit.cost}</span>
      </p>
    </div>
  );
}

const copy = {
  en: { turnaround: "Turnaround" },
  id: { turnaround: "Waktu pengerjaan" },
} as const;
