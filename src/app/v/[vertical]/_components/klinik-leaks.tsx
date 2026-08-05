import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";

/**
 * The three leaks.
 *
 * The source lifted these cards on hover — translateY(-4px) plus a
 * 44px shadow. Replaced with a border colour change: a card is a
 * surface, not an object, and lifting one costs a repaint and a
 * composite for no information. Hover is micro, or it is nothing.
 */

const LEAKS = [
  {
    tag: "Celah 01 — Kecepatan",
    h: "Balasan lambat",
    p: 'Calon pasien tanya "masih ada slot, Kak?" jam 9 malam. Dibalas besok siang. Dia sudah booking di klinik sebelah yang membalas duluan.',
  },
  {
    tag: "Celah 02 — Kehadiran",
    h: "No-show",
    p: "Pasien lupa jadwal, kursi tindakan kosong, jam terapis terbuang. Tanpa reminder otomatis, satu no-show sama dengan satu slot revenue hangus.",
  },
  {
    tag: "Celah 03 — Visibilitas",
    h: "Tak muncul saat dicari",
    p: 'Saat calon pasien tanya ChatGPT atau Google "klinik kecantikan terbaik di kota saya", nama Anda tak muncul. Yang muncul justru kompetitor.',
  },
];

export function KlinikLeaks() {
  return (
    <section id="cara" className="bg-surface-2 scroll-mt-8">
      <Container className="py-18 lg:py-section">
        <SectionHead
          eyebrow="Diagnosa"
          title="Di mana booking Anda bocor"
          lede="Bukan karena treatment kurang bagus. Biasanya karena tiga celah operasional yang diam-diam menggerus pendapatan setiap hari."
        />

        <div className="mt-13 grid gap-5 lg:grid-cols-3">
          {LEAKS.map((leak) => (
            <article
              key={leak.tag}
              className="rounded-card bg-surface border-rule border p-7 transition-colors duration-[var(--gf-dur-micro)] ease-[var(--ease-brand)] hover:border-[var(--gf-accent)]"
            >
              <p className="text-meta text-accent font-mono uppercase">
                {leak.tag}
              </p>
              <h3 className="font-display text-deep mt-3.5 text-[1.32rem] leading-tight">
                {leak.h}
              </h3>
              <p className="text-body-s text-ink-soft mt-2.5">{leak.p}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
