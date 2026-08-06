# grafynt.com

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · MDX · static everywhere · deployed on Vercel.

This site has two jobs. It explains what Grafynt does to a human, and it is written to be the source an AI answer engine cites when someone asks who can automate their business. Machine retrieval first, human persuasion second. Retrieval wins ties.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass with zero errors before anything ships
```

---

## Add an answer page in under 5 minutes

Answer pages are the retrieval surface. Every `/answers/*` and `/id/jawaban/*` page follows one template, and **the build enforces it**, see `validateAnswerMeta` in [`src/lib/answers.ts`](src/lib/answers.ts).

**1. Write the file.** English goes in `src/content/answers/<slug>.mdx`, Bahasa in `src/content/jawaban/<slug>.mdx`. Copy `how-to-automate-whatsapp-customer-service.mdx` as the reference.

```mdx
export const meta = {
  question: "How do you do the thing?",   // the H1, verbatim, ends with "?"
  title: "How to do the thing",           // <title>; layout appends " · Grafynt"
  description: "…",                       // 70–165 chars, a real sentence
  lead: "…",                              // 40–60 words. See below.
  published: "2026-08-06",
  updated: "2026-08-06",
  faqs: [                                 // 3–5 pairs, carries FAQPage schema
    { question: "…", answer: "…" },
  ],
};

## The short version
## <substantive section>
## What it costs
## <comparison table, if the question has a comparative dimension>
## When this is a bad idea
```

**2. Register it.** Add one line to `ANSWERS` in [`src/lib/answers.ts`](src/lib/answers.ts), under `en` or `id`:

```ts
"your-slug": () => import("@/content/answers/your-slug.mdx"),
```

Explicit imports rather than a directory scan, deliberately: the build stays statically analysable, nothing traces the whole source tree into the deployment, and the order of this object is the order the index page renders in.

**3. Build.** `npm run build`. That's it, the route, sitemap entry, JSON-LD, byline and FAQ section all follow from the registry.

### Things the validator will fail you on

| Rule | Why |
|---|---|
| `lead` is 40–60 words | It is the paragraph a model lifts. It must answer the question completely with zero surrounding context, no preamble, no "it depends" |
| `question` ends with `?` | The H1 must match the query shape |
| 3–5 `faqs` | Fewer is thin, more dilutes |
| `description` 70–165 chars | Anything longer truncates |
| ISO dates | Freshness is a ranking input |

### Things it can't check, that still matter

- **Do not write an `<h1>` or a "Common questions" section in the body.** The layout owns both. FAQs render from `meta.faqs`, so the visible text and the FAQPage schema physically cannot drift apart.
- **Every number comes from [`src/lib/site.ts`](src/lib/site.ts).** No invented percentages, no "studies show", no competitor plan prices.
- **The vertical is never named on a public route.** See below.
- Automation *reduces the time operations take*. It never *replaces* people. In Bahasa: `meringankan`, never `menggantikan`.

---

## Add a vertical skin

A vertical offer page is a **skin, not a fork**. No component is duplicated and no component knows a skin exists, they all read the `--gf-*` contract, and a wrapper element rebinds it for its subtree.

`/v/*` pages are `noindex`, excluded from the sitemap, and never linked from navigation. They are sent to a prospect after an audit.

**1. Rebind the tokens.** Add a block to [`src/styles/skins.css`](src/styles/skins.css):

```css
[data-skin="your-vertical"] {
  --gf-surface: …;   --gf-text: …;      --gf-accent: …;
  --gf-rule: …;      --gf-deep: …;      --gf-radius: …;
  --gf-font-display: var(--font-your-face), serif;
  /* …the full contract. Copy the klinik block and change the values. */
}
```

**2. Load its faces** in `src/app/v/[vertical]/layout.tsx`, and nowhere else, that keeps them out of the public site's bundle.

**3. Register the slug** in `VERTICALS` in `src/app/v/[vertical]/page.tsx` and render your page component.

**4. Build the page out of the shared components.** `WhatsAppThread`, `CtaButton`, `ClosingCta`, `SectionHead`, `Container` and `Eyebrow` all re-skin automatically. If you are writing a hex value, you are doing it wrong, find the token instead.

`src/app/v/[vertical]/_components/klinik.tsx` is the worked example: a completely different palette, three different typefaces and 18px radii, sharing every component with the English site and containing zero hex values.

**CTA note:** `/v/*` uses `<CtaButton channel="whatsapp" />`. The public site uses Cal.com. One CTA per page, chosen by how that audience arrived, never two.

---

## The rules the code enforces for you

**Pricing reduces to root 8.** Every client-facing price must sum to 8 by full digit sum: `5.300.000 → 5+3 = 8`. `assertRootEight` runs at module load in [`src/lib/site.ts`](src/lib/site.ts), so a bad price fails the build rather than shipping. Internal costs are exempt and do not live in that file.

**One CTA.** `CAL_URL` on public routes, `WHATSAPP.url` on `/v/*`. Both come from `src/lib/site.ts`. Never render two.

**The accent is not a text colour.** `#ff0a0a` measures 3.70:1 on paper, below the 4.5:1 floor. It is rules, marks, borders and left edges. The single exception is a numeric price cell. `--ink-faint` (2.92:1) is decorative only, ghost numerals and hairlines. Anything readable uses `--ink-soft`.

**Motion budget.** One page entrance under 600ms. Exactly one scroll reveal on the whole site, on `Ladder`, done with a CSS `view()` timeline behind two guards. The hero thread is the one named exception, at a 3.55s ceiling. CSS transitions and transforms only, no animation library, ever. Everything renders complete under `prefers-reduced-motion` and with JavaScript disabled.

**Static everywhere. No client JS of our own.** There is no `"use client"` anywhere in this repo and there should never be one. If a component seems to need client JS, the design is wrong, the answer is a different design, not a directive.

The only exception is the ~700-byte inline script that stages the hero thread, in [`src/components/whatsapp-thread.tsx`](src/components/whatsapp-thread.tsx). It adds no content and the page is complete without it.

For the record, since the original brief set a hard budget of 80kb gzipped: the site ships **133.6kb gzipped** on a first load, and none of it is ours. That is the React 19 + Next.js App Router client runtime, hydration and the router, which loads whether or not anything uses it. (A further 38.5kb `noModule` polyfill bundle exists but no modern browser downloads it.) Closing a 53kb gap would mean leaving App Router entirely, and the trade was judged not worth it, because every page renders complete with JavaScript disabled: the bytes carry hydration and prefetching, not content and not LCP.

So the rule this repo actually holds itself to is **zero client JS of our own**, verified by the absence of `"use client"`. If you ever find yourself adding one, that is the line being crossed, not the byte count.

**Do not `Disallow: /v/` in robots.txt.** Those pages carry a `noindex` meta tag. A robots disallow would stop crawlers reading that tag, which is exactly how a noindexed URL ends up indexed anyway. [`src/app/robots.ts`](src/app/robots.ts) deliberately says nothing about `/v/`.

---

## Layout

```
src/
  app/
    layout.tsx              root: fonts, Organization + WebSite schema
    globals.css             the --gf-* token contract + Tailwind @theme
    (en)/                   English public surface
    (id)/                   Bahasa surface, not a mirror, the split is by query
    v/[vertical]/           offer pages, noindex, skinned
    robots.ts sitemap.ts llms.txt/
  components/               skin-agnostic, server-only
  content/answers/          English MDX
  content/jawaban/          Bahasa MDX
  lib/
    site.ts                 CTA, ladder, prices, the root-8 assertion
    seo.ts                  metadata + JSON-LD builders
    answers.ts              the answer registry and its validator
    threads.tsx             WhatsApp thread scripts
  styles/skins.css          vertical token overrides
```
