import type { Thread } from "@/components/whatsapp-thread";

/**
 * The /v/* hero thread.
 *
 * It is Grafynt's own inbox, not a customer's. A WhatsApp thread is
 * right here and only here: that audience arrives from a DM, on a
 * phone, and WhatsApp is the page's one CTA. The public home page shows
 * the problem instead, via EngineAnswer, because a visitor who arrived
 * from a search result has not opened a chat with anyone.
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
 * The klinik offer page thread. Bahasa, and the register is warmer than
 * the English home page on purpose: that audience arrived from a DM,
 * not from a search result. It is a clinic owner asking the question
 * the audit answers, which is also the page's one CTA.
 */
export function klinikThread(): Thread {
  return {
    title: "Grafynt",
    status: "online · Jakarta",
    mark: "G",
    badge: { text: "Audit diminta", at: 700 },
    caption: "Percakapan · 21:47",
    messages: [
      {
        from: "in",
        at: 200,
        time: "21:47",
        body: "Kak, kalau orang tanya ChatGPT atau Google soal klinik kecantikan di kota saya, yang muncul kompetitor terus. Klinik saya nggak pernah disebut. Itu kenapa ya?",
      },
      {
        from: "out",
        at: 1500,
        typingFrom: 1000,
        time: "21:47",
        body: (
          <>
            Biasanya karena yang bisa ditarik soal klinik Kakak beda-beda di
            tiap tempat. Website bilang satu istilah,{" "}
            <strong>Google Bisnis Profil</strong> bilang istilah lain, listing
            di tempat lain lain lagi. Kalau tidak konsisten, mesinnya memilih
            klinik yang lebih jelas.
          </>
        ),
      },
      {
        from: "in",
        at: 2300,
        time: "21:48",
        body: "Cara tahunya gimana?",
      },
      {
        from: "out",
        at: 3050,
        typingFrom: 2600,
        time: "21:48",
        body: (
          <>
            Kami cek dulu lewat audit: tiga temuan dan satu tes, di ChatGPT,
            Gemini, Perplexity dan AI Overviews Google. Termasuk nama klinik
            mana yang justru disebut. <strong>Rp 710.000</strong>, sekitar 3
            hari, dan gratis kalau sekalian ambil website.
          </>
        ),
      },
      {
        from: "out",
        at: 3550,
        time: "21:48",
        body: "Kirim nama klinik dan kotanya, saya jalankan auditnya.",
      },
    ],
  };
}
