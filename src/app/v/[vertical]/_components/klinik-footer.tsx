import { Container } from "@/components/container";

/**
 * Page-local footer. The site footer is not used here: /v/* pages carry
 * no nav, no site chrome and no second CTA. Colours are the deep-section
 * tokens, so this is plum on the klinik skin and ink on the house skin
 * with no change to this file.
 */
export function KlinikFooter() {
  return (
    <footer className="bg-deep text-on-dark/70">
      <Container className="flex flex-wrap items-end justify-between gap-6 py-14">
        <div>
          <p className="font-display text-on-dark text-[1.9rem] leading-none">
            Gra<span className="text-accent-wash">fynt</span>
          </p>
          <p className="mt-2 max-w-[34ch] text-[0.92rem]">
            Otomasi WhatsApp AI untuk bisnis Indonesia — dibangun dalam Bahasa,
            untuk cara Anda melayani pelanggan.
          </p>
        </div>
        <p className="text-data text-right font-mono">
          grafynt.com
          <br />
          Jakarta · Tangerang
        </p>
      </Container>
    </footer>
  );
}
