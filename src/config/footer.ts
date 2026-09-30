import { businessConfig } from "./business"

export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterPaymentBadge {
  id: string
  name: string
  imageUrl?: string | null
}

export interface FooterConfig {
  columns: FooterColumn[]
  newsletter: {
    title: string
    placeholder: string
    buttonAriaLabel: string
    disclaimer: string
    termsText: string
    termsHref: string
  }
  paymentBadges: FooterPaymentBadge[]
  disclaimer: {
    storeName: string
    contactEmail: string
    textBeforeEmail: string
    textAfterEmail: string
  }
  copyright: {
    year: number
    companyName: string
    credits: string
  }
  supportPill: {
    label: string
    phoneNumber: string
    phoneTel: string
  }
}

export const footerConfig: FooterConfig = {
  columns: [
    {
      title: "Kupovina",
      links: [
        { label: "Česta pitanja", href: "/cesta-pitanja" },
        { label: "Registracija", href: "/account?mode=register" },
        { label: "Kako da naručite?", href: "/kako-naruciti" },
        { label: "Sigurnost", href: "/sigurnost" },
        { label: "Uslovi korištenja", href: "/uslovi-koristenja" },
        { label: "Politika privatnosti", href: "/politika-privatnosti" },
      ],
    },
    {
      title: "Servisi",
      links: [
        { label: "Sigurno plaćanje", href: "/sigurnost" },
        { label: "Garancija kvalitete", href: "/cesta-pitanja" },
        { label: "Reklamacije i povrat", href: "/uslovi-koristenja" },
        { label: "Dostava", href: "/kako-naruciti" },
        { label: "Načini plaćanja", href: "/kako-naruciti" },
      ],
    },
    {
      title: "Informacije",
      links: [
        { label: "Korisnička podrška", href: "/podrska" },
        { label: "Kategorije", href: "/store" },
        { label: "Novo u ponudi", href: "/store" },
        { label: "Svi proizvodi", href: "/store" },
      ],
    },
    {
      title: "Povežite se",
      links: [
        { label: "Facebook", href: "https://facebook.com", isExternal: true },
        { label: "Linkedin", href: "https://linkedin.com", isExternal: true },
        { label: "Twitter", href: "https://twitter.com", isExternal: true },
        { label: "Instagram", href: "https://instagram.com", isExternal: true },
      ],
    },
  ],

  newsletter: {
    title: "Newsletter",
    placeholder: "Vaša e-mail adresa",
    buttonAriaLabel: "Prijavite se na newsletter",
    disclaimer:
      "Prijavom pristajete da vam povremeno šaljemo akcijske cijene i novitete iz naše ponude. Možete se odjaviti u bilo kojem trenutku. Informacije o načinu korištenja ličnih podataka dostupne su u ",
    termsText: "uslovima korištenja",
    termsHref: "/uslovi-koristenja",
  },

  paymentBadges: [
    { id: "monri", name: "Monri" },
    { id: "mastercard", name: "Mastercard" },
    { id: "maestro", name: "Maestro" },
    { id: "visa", name: "VISA" },
    { id: "mastercard-securecode", name: "Mastercard SecureCode" },
    { id: "verified-by-visa", name: "Verified by VISA" },
    { id: "diners", name: "Diners Club" },
    { id: "discover", name: "Discover" },
  ],

  disclaimer: {
    storeName: businessConfig.name,
    contactEmail: businessConfig.contact.supportEmail,
    textBeforeEmail:
      `${businessConfig.name} (${businessConfig.domain}) nastoji objavljivati samo provjerene i tačne podatke. Ako na našoj stranici otkrijete neadekvatne informacije, molimo vas da nam javite na`,
    textAfterEmail: ".",
  },

  copyright: {
    year: 2026,
    companyName: businessConfig.legalName,
    credits: "Sve za dom, na jednom mjestu. Sva prava zadržana.",
  },

  supportPill: {
    label: "Besplatna korisnička podrška:",
    phoneNumber: businessConfig.contact.phone,
    phoneTel: `tel:${businessConfig.contact.phoneTel}`,
  },
}

export default footerConfig
