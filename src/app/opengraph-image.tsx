import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The sitewide Open Graph image, generated at build time.
 *
 * Next applies the nearest `opengraph-image` to every route, so this
 * one file covers the whole site, and it fills both og:image and
 * twitter:image. Before this existed, `buildMetadata` declared
 * `twitter.card = "summary_large_image"` with no image anywhere, so
 * every shared link rendered as a blank card.
 *
 * It is the ClosingCta band, which is the one dark contrast event on a
 * page, at 1200x630: --gf-deep ground, an accent hairline, the display
 * face, and the home h1 as the line. A shared link should look like the
 * site it opens.
 *
 * THE ONE PLACE LITERAL HEX IS CORRECT. Everywhere else in this repo a
 * colour resolves through the `--gf-*` contract and writing a hex value
 * means you missed the token. This renders through Satori, which has no
 * CSS custom properties and no stylesheet, so the values have to be
 * inlined. They are listed with their token names below and MUST be
 * updated together with src/app/globals.css. Nothing else may import
 * them: a component reading hex from here would be the exact leak the
 * token contract exists to prevent.
 */
const COLOR = {
  /** --gf-deep */
  deep: "#141852",
  /** --gf-accent */
  accent: "#ff0a0a",
  /** --gf-text-on-dark */
  onDark: "#ffffff",
} as const;

export const alt =
  "Grafynt, a GEO/AEO/SEO agency for demand capture. Someone is searching for what you sell right now.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/**
 * Read from disk rather than fetched, so a build never depends on the
 * network and cannot fail on someone else's outage. The file is
 * vendored at src/assets/fonts with its OFL licence beside it.
 */
const displayFont = await readFile(
  join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf"),
);

export default function Image() {
  return new ImageResponse(
    (
      // Satori needs an explicit display on anything with children, and
      // supports a subset of flexbox only. Keep this to flex, padding
      // and colour; no grid, no custom properties, no stylesheet.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: COLOR.deep,
          color: COLOR.onDark,
          padding: "72px 80px",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The accent as a rule, never as a text colour: #ff0a0a
              measures 3.70:1 on paper and fails the 4.5:1 floor. */}
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: COLOR.accent,
              marginBottom: 44,
            }}
          />
          <div style={{ display: "flex", fontSize: 44, letterSpacing: "0.01em" }}>
            Grafynt
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.12,
            maxWidth: 940,
          }}
        >
          Someone is searching for what you sell right now. They are being shown
          a competitor.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            opacity: 0.75,
          }}
        >
          <div style={{ display: "flex", letterSpacing: "0.18em" }}>
            GEO · AEO · SEO
          </div>
          <div style={{ display: "flex", letterSpacing: "0.08em" }}>
            grafynt.com · Jakarta
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: displayFont,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
