# Google Business Profile, the spec

The profile is a surface of the same business as this repo, so it is
held to the same rule the repo holds itself to: **one service, one
phrase, everywhere.** Every string below is copied from
[`src/lib/services.ts`](../src/lib/services.ts) and
[`src/lib/site.ts`](../src/lib/site.ts). If one of those files changes,
this profile changes in the same working session or the two stop
corroborating each other, which is the exact failure we are paid to fix
for clients.

This is not a checklist to complete once. See **Maintenance** at the
bottom: the profile is the only recurring line on the price list because
profiles decay, and ours decays like everyone else's.

---

## The language decision, first

The site is bilingual. A Google Business Profile is not: there is one
profile, and its services are written once.

**Write the profile in Bahasa Indonesia**, matching `/id/layanan/*`
exactly. Three reasons:

1. The profile earns its keep on local buying intent, and local buying
   intent in Jakarta is typed in Bahasa.
2. The English surface targets six markets with no local component, so
   a Jakarta map pin does nothing for it.
3. Mixing languages inside the profile is the inconsistency this
   document exists to prevent.

The English service names stay where they are, on `/services/*`. They
are not wrong; they are a different surface for a different query.

---

## Identity

| Field | Value | Why |
|---|---|---|
| Business name | `Grafynt` | Exactly this. No suffix, no city, no keywords. See the warning below. |
| Primary category | see **Categories** | |
| Service areas | Jakarta, DKI Jakarta, Indonesia | |
| Phone | `+62 813-1919-0388` | Same number and formatting as `WHATSAPP.display`. |
| Website | `https://grafynt.com` | Same as `SITE.url`, no tracking parameters, no trailing slash. |
| Address | **do not publish one** | See below. |

### Never put keywords in the business name

Not `Grafynt - Jasa SEO AEO GEO Jakarta`. It violates Google's naming
guidelines, it is one of the commonest causes of suspension, and a
competitor can report it in two clicks. The service language belongs in
categories, service entries and the website, which is where it works
anyway.

This matters more than usual for us: the brand name is already contested
by two unrelated companies with near-identical names, so a suspension
would cost the one query we should win easily.

### Service-area business, no address

Grafynt is one person, not a storefront anyone visits. Set it up as a
**service-area business** and hide the address. Publishing a home
address to claim a map pin trades a permanent privacy problem for a
listing that converts nobody.

Service area: Jakarta first, then DKI Jakarta. Resist adding every city
in Java. A service area that claims everywhere is a service area that
ranks nowhere.

---

## Categories

Categories behave more like keywords than labels, so they are chosen
against the words buyers use, not the ones that sound most impressive.

Pick the **primary** from Google's own picker — the exact strings are
Google's and change between locales, so choose from the list rather than
pasting from here:

- **Primary**: the closest available to *internet marketing service* /
  *layanan pemasaran internet*. This is the one that matters; it carries
  most of the weight.
- **Secondary**, at most three, only if genuinely offered: *marketing
  consultant*, *website designer*, *marketing agency*.

Do not add a category for something not on the price list. A category
you cannot deliver is a mismatch between the profile and the site, which
is the thing we are trying to avoid.

---

## Services

**These strings are the whole point of this document.** They must match
`SERVICES_ID` in [`src/lib/services.ts`](../src/lib/services.ts)
character for character. Not a synonym, not a tidier phrasing, not a
version with the city appended.

| Service name (verbatim) | Price | Description source |
|---|---|---|
| `Audit visibilitas` | Rp 710.000 | `summary` of `audit-visibilitas-ai` |
| `Analisis kompetitor` | Rp 1.250.000 | `summary` of `analisis-kompetitor` |
| `Optimasi Google Bisnis Profil` | Rp 1.520.000 / bulan | `summary` of `optimasi-google-bisnis-profil` |
| `Otomatisasi alur kerja` | Dihitung per proyek | `summary` of `otomatisasi-alur-kerja` |
| `Pembuatan atau perombakan website` | mulai Rp 7.550.000 | `summary` of `jasa-pembuatan-website` |

For each service description, use that service's `summary` field. Do not
rewrite it for the profile. Two differently-worded descriptions of one
service is precisely the inconsistency that makes a business unquotable.

Prices: publish them. They are already public on `/id/harga`, and a
profile that hides what the site shows is another disagreement between
surfaces.

**Note the ordering difference.** The site lists the audit first because
it is where a client starts. The profile should lead with
`Optimasi Google Bisnis Profil` and `Audit visibilitas`, because those
match what someone searching from a map is actually looking for. Order
is presentation; the strings are the contract.

---

## Description

Derive it from `SITE.description` and `POSITIONING.line`, in Bahasa,
under 750 characters. It must say the same thing as `/id`:

> Grafynt mengurus visibilitas bisnis kecil dan menengah di mesin
> pencari dan di asisten AI seperti ChatGPT, Gemini dan Perplexity. Kami
> tidak membuat orang jadi ingin beli; kami memastikan yang sudah ingin
> beli menemukan Anda, bukan kompetitor. Layanan: audit visibilitas,
> analisis kompetitor, optimasi Google Bisnis Profil, otomatisasi alur
> kerja, dan pembuatan atau perombakan website. Harga ditulis terbuka di
> grafynt.com.

No keyword stuffing, no list of every city. The description is read by
people deciding, and by machines checking whether it agrees with the
site.

---

## Hours

Publish real ones and keep them true. Hours are the single detail
assistants most often state wrongly, because they are the detail most
often stale somewhere.

If the honest answer is "whenever a message arrives", do not publish
24/7 to look responsive. Publish working hours and let the response time
speak for itself. A profile claiming 24/7 against a site that says
nothing of the kind is a contradiction a model can see.

---

## Q&A and reviews

Both are retrievable text attached to the business, and both are text we
do not fully control. Influence them:

- **Seed the Q&A yourself.** Google allows the owner to post and answer
  questions. Use the real buying-intent questions, answered in the same
  words as the site. Start with the ones already written as answer
  pages: what GEO/AEO/SEO actually differ on, why ChatGPT does not
  mention a business, why profile keyword consistency matters.
- **Answer every review** in the service language above. A reply is
  retrievable text with our phrasing in it.
- Never incentivise reviews. One suspension costs more than any number
  of reviews returns.

---

## Posts

Low effort, genuinely retrievable. One post per answer page already
published, linking to it, written in Bahasa with the same service
phrase. This is the cheapest way to make the profile and the site
corroborate each other in Google's own index.

---

## Maintenance

This is why the service is sold monthly and why ours cannot be a
one-off either.

| Interval | Check |
|---|---|
| Monthly | Categories have not been reshuffled by Google |
| Monthly | No third-party "suggested edit" has been accepted silently |
| Monthly | Hours still true, including holidays |
| Monthly | New reviews and questions answered in the service language |
| On every `site.ts` or `services.ts` change | Service names and prices still match this document |
| Quarterly | NAP identical across the profile, the site and every third-party listing |

---

## Third-party listings

The profile is necessary and not sufficient. Corroboration needs more
than one independent source saying the same thing, so the same strings
go everywhere Grafynt is listed: directories, social profiles, any
marketplace or community listing.

Same name. Same number, formatted identically. Same URL. Same five
service phrases. An abbreviation on one listing and the full phrase on
another is a weaker match than either alone.

---

## Before anything here is done

**The profile does not exist yet.** Creating and verifying it is step
one, and verification takes days, so start it before the content work it
is supposed to support.

Until it exists, the day-zero baseline in
[`src/lib/work.ts`](../src/lib/work.ts) stands as written: we sell
Google Business Profile optimisation and do not have a Google Business
Profile.
