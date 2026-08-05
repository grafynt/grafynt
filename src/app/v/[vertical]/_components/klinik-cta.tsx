import { Container } from "@/components/container";
import { CtaButton } from "@/components/cta-button";

/**
 * The closing band, and the ONLY CtaButton on this page.
 *
 * Not <ClosingCta>: that component fills with --gf-deep and sets its
 * copy left. The klinik page already spends --gf-deep on the feature
 * band and the footer, so its closing band is the accent fill, centred —
 * a layout difference, not a token difference. Every colour below is
 * still a token.
 */
export function KlinikCta() {
  return (
    <section id="kontak" className="bg-accent scroll-mt-16">
      <Container className="py-18 lg:py-section text-center">
        <h2 className="font-display text-display-l text-on-dark mx-auto max-w-[16ch]">
          Berhenti kehilangan booking.{" "}
          <em className="italic">Mulai dari audit gratis.</em>
        </h2>
        <p className="text-lead text-on-dark/85 mx-auto mt-5 max-w-[44ch]">
          Kami tunjukkan di mana klinik Anda bocor — lalu Anda putuskan langkah
          berikutnya.
        </p>
        <div className="mt-9 flex justify-center">
          <CtaButton
            locale="id"
            channel="whatsapp"
            label="Chat Grafynt via WhatsApp"
            className="bg-surface text-ink border-b-[var(--gf-deep)]"
          />
        </div>
      </Container>
    </section>
  );
}
