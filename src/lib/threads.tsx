import type { Thread } from "@/components/whatsapp-thread";
import { LADDER } from "@/lib/site";

/**
 * The English home thread.
 *
 * It is Grafynt's own inbox, not a customer's, and that is deliberate:
 * a named business would either invent a client or narrow the site
 * toward one industry, and the public site stays broad. Showing our own
 * agent answering with the real ladder prices is the honest version and
 * it ends on the one CTA.
 *
 * Timing, ms from load. Ceiling is 3.55s and this lands on it exactly.
 *   200   first message in
 *   700   badge
 *  1000   typing  -> 1500 reply out
 *  2300   second message in
 *  2600   typing  -> 3050 reply out
 *  3550   closing message with the booking link
 */
/**
 * The klinik offer page thread, preserved verbatim from the source
 * page — including its emoji and its one exclamation mark. That
 * audience and that register are correct there; the English home page
 * deliberately carries neither.
 */
export function klinikThread(): Thread {
  return {
    title: "Klinik Glow Aesthetic",
    status: "online · dibalas otomatis",
    mark: "G",
    badge: { text: "Asisten AI membalas", at: 700 },
    caption: "Percakapan · 21:47",
    messages: [
      {
        from: "in",
        at: 200,
        time: "21:47",
        body: "Halo, treatment buat bekas jerawat yang bagus apa ya kak? Masih ada slot weekend ini?",
      },
      {
        from: "out",
        at: 1500,
        typingFrom: 1000,
        time: "21:47",
        body: (
          <>
            Halo Kak 🌸 Untuk bekas jerawat, kami rekomendasikan{" "}
            <strong>Acne Scar Laser</strong> atau{" "}
            <strong>Chemical Peeling</strong>. Sabtu ini slot tersedia jam 13.00
            &amp; 15.30. Mau saya bookingkan yang mana?
          </>
        ),
      },
      {
        from: "in",
        at: 2300,
        time: "21:48",
        body: "Yang jam 1 aja deh",
      },
      {
        from: "out",
        at: 3050,
        typingFrom: 2600,
        time: "21:48",
        body: (
          <>
            Siap Kak! Booking <strong>Sabtu, 13.00 — Acne Scar Laser</strong>{" "}
            sudah saya catat ✅ Nanti H-1 saya kirim reminder ya. Ditunggu
            kedatangannya 💕
          </>
        ),
      },
    ],
  };
}

export function homeThread(): Thread {
  const automation = LADDER.find((r) => r.name === "Automation build")!;

  return {
    title: "Grafynt",
    status: "online · replies automatically",
    mark: "G",
    badge: { text: "Answered automatically", at: 700 },
    caption: "Transcript · 21:47",
    messages: [
      {
        from: "in",
        at: 200,
        time: "21:47",
        body: "Do you handle bookings over WhatsApp? Most of our enquiries come in at night and nobody is on to answer them.",
      },
      {
        from: "out",
        at: 1500,
        typingFrom: 1000,
        time: "21:47",
        body: "Yes — that is most of what we build. An agent on your own number that answers questions, checks availability and books the slot, in whatever language your customers write in. Your team stops re-typing the same six answers.",
      },
      {
        from: "in",
        at: 2300,
        time: "21:48",
        body: "How much, and how long?",
      },
      {
        from: "out",
        at: 3050,
        typingFrom: 2600,
        time: "21:48",
        body: (
          <>
            <strong>{automation.price}</strong> one-time to build it,{" "}
            {automation.timeline}. Before any of that there is a free audit —
            about three days, no cost, no pitch.
          </>
        ),
      },
      {
        from: "out",
        at: 3550,
        time: "21:48",
        body: "I can put a time on Jonathan's calendar now.",
      },
    ],
  };
}
