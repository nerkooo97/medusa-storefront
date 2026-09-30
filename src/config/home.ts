/**
 * Konfiguracija za početnu stranicu (Homepage).
 *
 * Ovdje možete mijenjati tekstove, naslove, linkove, kontakt podatke i slike
 * za sve sekcije na početnoj stranici (Hero, Trust bar, Promo baner, Brendovi itd.).
 *
 * Ako je 'imageUrl' null ili undefined, na tom mjestu se automatski prikazuje
 * jednostavan placeholder.
 */

export interface HomeConfig {
  hero: {
    badge?: string
    title: string
    subtitle: string
    primaryCta: {
      text: string
      link: string
    }
    secondaryCta?: {
      text: string
      link: string
    }
    imageUrl?: string | null
    imageAlt?: string
    placeholderLabel?: string
    sideCards?: {
      badge?: string
      title: string
      description: string
      linkText: string
      link: string
      imageUrl?: string | null
      placeholderLabel?: string
    }[]
  }

  trustBar: {
    title: string
    description: string
    icon: "truck" | "shield" | "creditCard" | "headphones"
  }[]

  categoriesSection: {
    badge?: string
    title: string
    viewAllText: string
    viewAllLink: string
    /**
     * Lista popularnih kategorija.
     * Svaka kategorija ima naziv (title), link (link) i sliku (imageUrl).
     */
    items: {
      title: string
      link: string
      imageUrl?: string | null
      imageAlt?: string
      handle?: string
      description?: string
      icon?: string
    }[]
  }

  featuredSection: {
    badge: string
    title: string
    viewAllText: string
    viewAllLink: string
  }

  promoBanner: {
    badge: string
    title: string
    description: string
    bulletPoints: string[]
    primaryCta: {
      text: string
      link: string
    }
    phone?: string
    imageUrl?: string | null
    placeholderLabel?: string
  }

  brands: {
    title: string
    list: string[]
  }
}

export const homeConfig: HomeConfig = {
  hero: {
    badge: "pıko.ba — Mašine i alati",
    title: "Sve za dom, na jednom mjestu.",
    subtitle:
      "Vrhunske mašine, profesionalni i ručni alati, oprema za radionicu i vrt uz brzu dostavu i garanciju.",
    primaryCta: {
      text: "Pregledaj ponudu",
      link: "/store",
    },
    secondaryCta: {
      text: "Svi artikli",
      link: "/store",
    },
    imageUrl: null,
    imageAlt: "pıko — Mašine i alati. Sve za dom, na jednom mjestu.",
    placeholderLabel: "pıko — Mašine i alati",
    sideCards: [
      {
        badge: "18V & 36V Pro",
        title: "Akumulatorski alati",
        description: "Maksimalna mobilnost i snaga bez kablova.",
        linkText: "Istraži aku alate",
        link: "/store",
        imageUrl: null,
        placeholderLabel: "Placeholder: Aku bušilice i setovi",
      },
      {
        badge: "Radionica & Garaža",
        title: "Kompletni setovi alata",
        description: "Koferi i garniture alata za servis i radionicu.",
        linkText: "Pregledaj setove",
        link: "/store",
        imageUrl: null,
        placeholderLabel: "Placeholder: Setovi alata u koferu",
      },
    ],
  },

  trustBar: [
    {
      title: "Brza dostava",
      description: "Besplatna dostava za sve narudžbe preko 100,00 KM.",
      icon: "truck",
    },
    {
      title: "Ovlaštena garancija",
      description: "Do 3 godine tvorničke garancije uz osiguran servis.",
      icon: "shield",
    },
    {
      title: "Fleksibilno plaćanje",
      description: "Gotovinom pouzećem, karticama ili virmanom.",
      icon: "creditCard",
    },
    {
      title: "Korisnička podrška",
      description: "Stručni savjeti našeg tima pri odabiru opreme.",
      icon: "headphones",
    },
  ],

  categoriesSection: {
    badge: "Katalog",
    title: "Popularne kategorije",
    viewAllText: "Pogledaj sve kategorije",
    viewAllLink: "/store",
    /**
     * Konfiguracija popularnih kategorija na početnoj stranici:
     * - title: Naziv kategorije koji se prikazuje na kartici
     * - link: Relativna putanja (npr. "/categories/akumulatorski-alati" ili "/store")
     * - imageUrl: Link slike (npr. "https://placehold.co/600x400" ili lokalna slika)
     * - imageAlt: Alt opis slike za SEO i pristupačnost
     */
    items: [
      {
        title: "Akumulatorski alati",
        link: "/categories/akumulatorski-alati",
        imageUrl: "https://placehold.co/1080x1920?text=Akumulatorski+alati",
        imageAlt: "Akumulatorski alati",
      },
      {
        title: "Električni alati",
        link: "/categories/elektricni-alati",
        imageUrl: "https://placehold.co/1080x1920?text=Električni+alati",
        imageAlt: "Električni alati",
      },
      {
        title: "Ručni alati",
        link: "/categories/rucni-alati",
        imageUrl: "https://placehold.co/1080x1920?text=Ručni+alati",
        imageAlt: "Ručni alati",
      },
      {
        title: "Radionica i garaža",
        link: "/categories/radionica-i-garaza",
        imageUrl: "https://placehold.co/1080x1920?text=Radionica+i+garaža",
        imageAlt: "Radionica i garaža",
      },
      {
        title: "Vrt i bašta",
        link: "/categories/vrt-i-basta",
        imageUrl: "https://placehold.co/1080x1920?text=Vrt+i+bašta",
        imageAlt: "Vrt i bašta",
      },
      {
        title: "Zaštitna oprema",
        link: "/categories/zastitna-oprema",
        imageUrl: "https://placehold.co/1080x1920?text=Zaštitna+oprema",
        imageAlt: "Zaštitna oprema",
      },
    ],
  },

  featuredSection: {
    badge: "Aktuelna ponuda",
    title: "Izdvojeni alati i mašine",
    viewAllText: "Pregledaj sve artikle",
    viewAllLink: "/store",
  },

  promoBanner: {
    badge: "B2B & Majstori",
    title: "Kompletno opremanje radionica i gradilišta",
    description:
      "Za pravna lica i majstore obezbjeđujemo posebne veleprodajne pogodnosti, odgođeno plaćanje i prioritetnu isporuku.",
    bulletPoints: [
      "R1 računi za firme i obrte",
      "Količinski popusti i rabati",
      "Osigurani rezervni dijelovi",
      "Brza isporuka na adresu",
    ],
    primaryCta: {
      text: "Zatražite ponudu",
      link: "/customer-service",
    },
    phone: "080 020 261",
    imageUrl: null,
    placeholderLabel: "Placeholder: Industrijska oprema i radionica",
  },

  brands: {
    title: "Vodeći svjetski brendovi alata",
    list: [
      "BOSCH Professional",
      "MAKITA",
      "DEWALT",
      "MILWAUKEE",
      "METABO",
      "EINHELL",
      "UNIOR",
    ],
  },
}

export default homeConfig
