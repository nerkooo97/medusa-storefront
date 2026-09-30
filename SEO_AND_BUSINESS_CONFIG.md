# Uputstvo za AI Agente: Upravljanje Poslovnim Podacima i SEO Konfiguracijom

Ovaj dokument služi kao obavezni vodič za sve AI agente (i programere) kada je potrebno izmijeniti poslovne podatke trgovine kao što su **radno vrijeme, kontakt telefon, email, troškovi dostave, prag besplatne dostave, garancija ili uslovi povrata**.

---

## 1. Centralni izvor istine (Single Source of Truth)

Svi kontakt, poslovni, dostavni i pravni podaci nalaze se u samo jednom konfiguracijskom fajlu:
👉 **[`src/config/business.ts`](./src/config/business.ts)**

> ⚠️ **ZLATNO PRAVILO ZA AGENTE:**  
> **NIKADA** ne upisivati fiksne (hardkodirane) brojeve telefona, emailove, radno vrijeme, cijene dostave ili dane povrata direktno u `.tsx` stranice! Sve se mora čitati iz `businessConfig`.

---

## 2. Struktura `src/config/business.ts`

```typescript
export interface BusinessConfig {
  name: string            // Naziv brenda (npr. "pıko")
  legalName: string       // Puni pravni naziv firme (npr. "pıko d.o.o.")
  domain: string          // Primarna domena (npr. "piko.ba")

  contact: {
    phone: string         // Prikazni format broja (npr. "080 020 261")
    phoneTel: string      // Format za tel: linkove bez razmaka (npr. "080020261")
    email: string         // Glavni email (npr. "info@piko.ba")
    supportEmail: string  // Email korisničke podrške (npr. "podrska@piko.ba")
    privacyEmail: string  // Email za zaštitu podataka (npr. "podrska@piko.ba")
    workingHours: string  // Tekstualno radno vrijeme (npr. "Pon - Sub: 08:00 - 18:00")
    openingHours: {
      opens: string       // "08:00" (za Schema.org Google Search)
      closes: string      // "18:00" (za Schema.org Google Search)
      days: string[]      // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  }

  shipping: {
    deliveryTime: string                   // "24 do 48 radnih sati"
    freeDeliveryThreshold: number          // 100 (u KM, koristi se za kalkulaciju besplatne dostave)
    freeDeliveryThresholdFormatted: string // "100,00 KM"
    cost: number                           // 9 (u KM, standardna cijena dostave)
    costFormatted: string                  // "9,00 KM"
    minDeliveryDays: number                 // 1 (za Google Merchant shippingDetails)
    maxDeliveryDays: number                 // 2 (za Google Merchant shippingDetails)
  }

  warranty: {
    durationText: string  // "12 do 36 mjeseci"
    maxYearsText: string  // "do 3 godine"
  }

  returns: {
    days: number          // 14 (broj dana za povrat, koristi se u Schema.org)
    daysText: string      // "14 dana"
    refundDays: number    // 7 (broj dana za povrat novca)
    refundDaysText: string// "7 radnih dana"
  }

  legal: {
    vatRate: string       // "17%"
  }
}
```

---

## 3. Kako izmijeniti podatke (Primjeri)

### A. Izmjena broja telefona
Ukoliko se promijeni broj telefona (npr. u `033 123 456`):
1. Otvori [`src/config/business.ts`](./src/config/business.ts).
2. Promijeni:
   ```typescript
   phone: "033 123 456",
   phoneTel: "033123456",
   ```
3. Ažuriraj i liniju u [`public/llms.txt`](./public/llms.txt).
4. **Sve stranice** (Česta pitanja, Podrška, Footer, Google Organization Schema, tel: pozivni linkovi) automatski preuzimaju novi broj!

---

### B. Izmjena radnog vremena
Ukoliko se radno vrijeme promijeni (npr. radnim danom 08:00 - 20:00, subotom do 16:00):
1. U [`src/config/business.ts`](./src/config/business.ts) promijeni `workingHours` i `openingHours`:
   ```typescript
   workingHours: "Pon - Pet: 08:00 - 20:00, Sub: 08:00 - 16:00",
   openingHours: {
     opens: "08:00",
     closes: "20:00",
     days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
   },
   ```
2. Ažuriraj liniju u [`public/llms.txt`](./public/llms.txt).
3. Google Search Schema automatski šalje novo radno vrijeme Googlebotu.

---

### C. Izmjena cijene dostave i praga besplatne dostave
Ukoliko se prag besplatne dostave promijeni sa 100 KM na 150 KM, a cijena dostave na 10 KM:
1. U [`src/config/business.ts`](./src/config/business.ts):
   ```typescript
   shipping: {
     deliveryTime: "24 do 48 radnih sati",
     freeDeliveryThreshold: 150,
     freeDeliveryThresholdFormatted: "150,00 KM",
     cost: 10,
     costFormatted: "10,00 KM",
     minDeliveryDays: 1,
     maxDeliveryDays: 2,
   },
   ```
2. Ažuriraj liniju u [`public/llms.txt`](./public/llms.txt).
3. Automatski se ažuriraju:
   - Tekst na stranici Česta pitanja (`/ba/cesta-pitanja`)
   - Tekst na stranici Kako naručiti (`/ba/kako-naruciti`)
   - Footer informacije
   - Google Shopping `Product` Offer `ShippingDetails` schema (gdje se automatski računa `shippingRate: 0.00` iznad novog praga).

---

### D. Izmjena garantnog roka ili roka za povrat
Ukoliko se zakonski rok povrata promijeni ili se nudi produženi povrat (npr. 30 dana):
1. U [`src/config/business.ts`](./src/config/business.ts):
   ```typescript
   returns: {
     days: 30,
     daysText: "30 dana",
     refundDays: 7,
     refundDaysText: "7 radnih dana",
   },
   ```
2. Ažuriraj liniju u [`public/llms.txt`](./public/llms.txt).
3. Automatski se ažuriraju:
   - FAQ sekcija o povratu
   - Uslovi korištenja (`/ba/uslovi-koristenja`)
   - Schema.org `MerchantReturnPolicy` (`merchantReturnDays: 30`) na svim pojedinačnim artiklima.

---

## 4. Mapa Fajlova: Gdje se podaci propagiraju

| Fajl | Uloga | Kako koristi konfiguraciju |
| :--- | :--- | :--- |
| **`src/config/business.ts`** | **Izvor svih podataka** | Centralna definicija |
| **`src/lib/util/seo-schema.ts`** | Google Search Schema generator | Generiše `Organization`, `WebSite`, `Product`, `Offer`, `FAQPage`, `HowTo`, `ContactPage` |
| **`src/modules/common/components/json-ld/`** | Render komponenta | Ubacuje `<script type="application/ld+json">` |
| **`src/app/[countryCode]/(main)/layout.tsx`** | Globalni layout | Prikazuje globalni `Organization` + `WebSite` Sitelinks Searchbox |
| **`src/app/[countryCode]/(main)/(pages)/cesta-pitanja/page.tsx`** | Stranica Česta pitanja | Dinamički generiše FAQ tekst i `FAQPage` JSON-LD iz `businessConfig` |
| **`src/app/[countryCode]/(main)/(pages)/kako-naruciti/page.tsx`** | Stranica Kako naručiti | Prikazuje korake i `HowTo` JSON-LD |
| **`src/app/[countryCode]/(main)/(pages)/podrska/page.tsx`** | Stranica Podrška | Prikazuje kontakte i `ContactPage` JSON-LD |
| **`src/app/[countryCode]/(main)/(pages)/sigurnost/page.tsx`** | Stranica Sigurnost | Prikazuje uslove sigurnosti i `BreadcrumbList` |
| **`src/app/[countryCode]/(main)/(pages)/uslovi-koristenja/page.tsx`** | Uslovi poslovanja | Prikazuje garancije, povrate i pravne stavke |
| **`src/app/[countryCode]/(main)/(pages)/politika-privatnosti/page.tsx`** | Politika privatnosti | Prikazuje email za privatnost i pravni naziv |
| **`src/config/footer.ts`** | Konfiguracija footera | Prikazuje radno vrijeme, telefon i email u podnožju |
| **`public/llms.txt`** | LLM sažetak za AI pretraživače | Statički sažetak (ChatGPT Search, Perplexity, Claude) |
| **`public/robots.txt`** | Pravila za crawlera | Pravila pristupa i link na sitemap |
| **`public/.well-known/ard.json`** | Agent Resource Directory | Mašinski katalog za AI agente |

---

## 5. Kontrolna lista za AI Agente (Checklist)

Nakon što napravite izmjenu podataka o firmi:
- [ ] Izmijeniti podatke u [`src/config/business.ts`](./src/config/business.ts).
- [ ] Provjeriti da li je potrebno sinhronizovati odgovarajuću liniju u [`public/llms.txt`](./public/llms.txt).
- [ ] Pokrenuti provjeru tipova u terminalu:
  ```bash
  pnpm exec tsc --noEmit
  ```
- [ ] Pokrenuti testni `curl` zahtjev kako bi se uvjerili da JSON-LD skripte sadrže nove vrijednosti:
  ```bash
  curl -s http://localhost:8000/ba | grep -o '<script type="application/ld+json">[^<]*</script>'
  curl -s http://localhost:8000/ba/cesta-pitanja | grep -o '<script type="application/ld+json">[^<]*</script>'
  ```
