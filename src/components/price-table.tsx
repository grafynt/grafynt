import { LADDER, type Rung } from "@/lib/site";

/**
 * /pricing. Every figure comes from LADDER — no number is typed into
 * this file, and a rung with `price: null` renders an em dash and its
 * role instead, because Catalyst is named on the public site and not
 * sold on it.
 *
 * A real <table> with a real <caption> and scope-d headers: this is
 * tabular data, models read it as tabular data, and a div grid would
 * throw that away for nothing.
 *
 * The accent appears on exactly one thing here — the numeric price
 * cell. That is the single documented exception to "the accent is
 * never a text colour", and the figures are mono at --gf-t-data, where
 * the weight carries.
 */
export function PriceTable({
  rungs = LADDER,
  locale = "en",
  className = "",
}: {
  rungs?: readonly Rung[];
  locale?: "en" | "id";
  className?: string;
}) {
  const t = copy[locale];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="text-note text-ink-soft mb-5 text-left font-mono uppercase">
          {t.caption}
        </caption>
        <thead>
          <tr className="border-rule border-b">
            <th
              scope="col"
              className="text-meta text-ink-soft py-3 pr-4 font-mono font-normal uppercase"
            >
              {t.item}
            </th>
            <th
              scope="col"
              className="text-meta text-ink-soft py-3 pr-4 font-mono font-normal uppercase"
            >
              {t.price}
            </th>
            <th
              scope="col"
              className="text-meta text-ink-soft py-3 font-mono font-normal uppercase"
            >
              {t.timeline}
            </th>
          </tr>
        </thead>
        <tbody>
          {rungs.map((rung) => (
            <tr key={rung.n} className="border-rule border-b align-baseline">
              <th scope="row" className="py-6 pr-4 font-normal">
                <span className="text-meta text-ink-faint block font-mono">
                  {rung.n}
                </span>
                <span className="font-display text-display-s text-ink mt-1 block">
                  {rung.name}
                </span>
                <span className="text-body-s text-ink-soft mt-1 block max-w-[38ch]">
                  {rung.role}
                </span>
              </th>

              <td className="py-6 pr-4">
                {rung.price ? (
                  <>
                    <span className="text-data block font-mono text-[var(--gf-accent)]">
                      {rung.price}
                    </span>
                    {rung.priceNote ? (
                      <span className="text-note text-ink-soft mt-1 block max-w-[24ch] font-mono">
                        {rung.priceNote}
                      </span>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span aria-hidden className="text-data text-ink-faint font-mono">
                      &mdash;
                    </span>
                    <span className="text-note text-ink-soft mt-1 block max-w-[24ch] font-mono uppercase">
                      {t.unpriced}
                    </span>
                  </>
                )}
              </td>

              <td className="text-data text-ink-soft py-6 font-mono">
                {rung.timeline ?? (
                  <span aria-hidden className="text-ink-faint">
                    &mdash;
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const copy = {
  en: {
    caption: "All prices one-time unless noted",
    item: "What",
    price: "Price",
    timeline: "Timeline",
    unpriced: "Not sold yet",
  },
  id: {
    caption: "Semua harga sekali bayar kecuali disebutkan lain",
    item: "Layanan",
    price: "Harga",
    timeline: "Waktu",
    unpriced: "Belum dijual",
  },
} as const;
