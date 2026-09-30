# Pravila i Uputstva za AI Agente (AGENTS.md)

Ovaj repozitorij (`medusa-storefront`) je Next.js 15+ (App Router) storefront za Medusa v2.

## 1. Upravljanje Poslovnim i SEO Podacima
- **NIKADA nemoj hardkodirati** broj telefona, radno vrijeme, kontakt emailove, pragove besplatne dostave, troškove brze pošte, garantne rokove ili dane povrata unutar stranica (`.tsx`).
- Svi ovi podaci se nalaze u centralnom konfiguracijskom fajlu:
  👉 **`src/config/business.ts`**
- Detaljan vodič sa primjerima izmjena i mapom fajlova nalazi se u:
  👉 **`SEO_AND_BUSINESS_CONFIG.md`**

## 2. Sinhronizacija sa Statičkim Datotekama
Kada mijenjaš podatke u `src/config/business.ts` (npr. telefon, radno vrijeme, cijenu dostave), obavezno sinhronizuj i tekstualni sažetak u:
- `public/llms.txt`

## 3. Google Search & Schema.org JSON-LD
- Generator strukturiranih podataka nalazi se u `src/lib/util/seo-schema.ts`.
- Koristi komponentu `<JsonLd data={schema} />` iz `@modules/common/components/json-ld`.
- Uvijek osiguraj da podaci budu usklađeni sa Google Rich Results i Merchant Center specifikacijom (valute BAM/EUR, dostupnost `InStock`, povrat robe, shipping tarife).

## 4. Provjera Koda
Nakon svake izmjene obavezno pokreni:
```bash
pnpm exec tsc --noEmit
```
i potvrdi da nema grešaka u tipovima prije nego što zaključiš zadatak.
