import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";

const REASONS = [
  {
    k: "01",
    h: "WhatsApp-native, bukan chatbot web",
    p: "Pasien Anda hidup di WhatsApp, bukan di widget pojok website yang diabaikan. Kami pasang di kanal tempat mereka benar-benar bertanya dan booking.",
  },
  {
    k: "02",
    h: "Paham konteks & bahasa lokal",
    p: "Bukan terjemahan kaku dari template luar. Nuansa, sopan-santun, dan istilah treatment terasa natural buat pasien Indonesia.",
  },
  {
    k: "03",
    h: "Data pasien tetap milik Anda",
    p: "Percakapan dan data tersimpan di infrastruktur privat klinik Anda — aman, dan menjadi aset yang makin bernilai seiring waktu.",
  },
];

export function KlinikWhy() {
  return (
    <section>
      <Container className="py-18 lg:py-section">
        <div className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <SectionHead
            eyebrow="Kenapa Grafynt"
            title={
              <>
                Dibuat untuk cara Indonesia berbelanja — lewat{" "}
                <em className="text-accent italic">WhatsApp,</em> dalam Bahasa.
              </>
            }
          />

          <div>
            {REASONS.map((r, i) => (
              <div
                key={r.k}
                className={`border-rule flex gap-4 border-b py-6 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="text-data text-decor w-8 shrink-0 pt-1 font-mono"
                >
                  {r.k}
                </span>
                <div>
                  <h3 className="font-display text-display-s text-deep">
                    {r.h}
                  </h3>
                  <p className="text-body-s text-ink-soft mt-1.5">{r.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
