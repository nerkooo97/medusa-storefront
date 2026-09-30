import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import {
  getFaqSchema,
  getBreadcrumbSchema,
  getCanonicalSiteUrl,
} from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Česta pitanja (FAQ) | ${businessConfig.name}`,
  description:
    "Odgovori na najčešća pitanja vezana za narudžbe, dostavu, načine plaćanja, garanciju i povrat robe.",
}

export default function CestaPitanjaPage() {
  const { name, contact, shipping, warranty, returns } = businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const faqSections = [
    {
      title: "1. Narudžbe i kupovina",
      items: [
        {
          question: `Kako mogu naručiti artikle na ${name} web shopu?`,
          answer:
            "Naručivanje se vrši jednostavnim dodavanjem željenih artikala u korpu. Nakon toga prelazite na blagajnu gdje unosite podatke za dostavu i birate način plaćanja. Narudžbu možete zaključiti kao gost ili se registrovati za lakše praćenje.",
        },
        {
          question: "Mogu li naručiti telefonom ili putem e-maila?",
          answer: `Da, naš tim vam stoji na raspolaganju radnim danima (${contact.workingHours}) na telefon ${contact.phone} ili putem e-maila na ${contact.supportEmail}.`,
        },
        {
          question: "Mogu li dobiti R1 / fakturu za pravno lice (firmu ili obrt)?",
          answer:
            "Apsolutno. Prilikom unosa podataka u korpi odaberite opciju 'Kupovina za pravno lice' i unesite naziv firme i ID/PDV broj. Originalni fiskalni i virmanski račun stižu u paketu uz pošiljku.",
        },
      ],
    },
    {
      title: "2. Dostava i preuzimanje",
      items: [
        {
          question: "Koliko traje dostava?",
          answer: `Standardni rok isporuke za područje cijele Bosne i Hercegovine je ${shipping.deliveryTime} od momenta potvrde narudžbe.`,
        },
        {
          question: "Koliki su troškovi dostave?",
          answer: `Za sve narudžbe iznad ${shipping.freeDeliveryThresholdFormatted} dostava je POTPUNO BESPLATNA. Za narudžbe manje vrijednosti, trošak dostave brzom poštom iznosi ${shipping.costFormatted}.`,
        },
        {
          question: "Mogu li pregledati paket prije plaćanja kuriru?",
          answer:
            "Da, kod plaćanja pouzećem gotovinom omogućena je opcija otvaranja transportnog paketa u prisustvu kurira radi vizuelnog pregleda ispravnosti pošiljke prije plaćanja.",
        },
      ],
    },
    {
      title: "3. Načini plaćanja",
      items: [
        {
          question: "Koji su podržani načini plaćanja?",
          answer:
            "Podržavamo plaćanje gotovinom prilikom preuzimanja od kurira (pouzećem), online plaćanje platnim karticama (Mastercard, Visa, Maestro), te žiralno / virmansko plaćanje putem predračuna.",
        },
        {
          question: "Da li je plaćanje karticom sigurno?",
          answer:
            "Da, online plaćanje se odvija putem certificiranog procesora uz 256-bitnu enkripciju i 3D Secure zaštitu. Podaci o vašoj kartici se nikada ne pohranjuju na našem sistemu.",
        },
      ],
    },
    {
      title: "4. Garancija, reklamacije i povrat",
      items: [
        {
          question: "Koji je garantni rok na kupljene uređaje?",
          answer: `Svi tehnički, električni i motorni uređaji dolaze sa tvorničkom garancijom u trajanju od ${warranty.durationText} (${warranty.maxYearsText}). Uredno ovjeren garantni list i fiskalni račun stižu uz pošiljku.`,
        },
        {
          question: "Kakav je postupak povrata robe?",
          answer: `Kupac ima zakonsko pravo na jednostrani raskid ugovora i povrat robe u roku od ${returns.daysText} od dana prijema, uz uslov da je artikal nekorišten, neoštećen i u originalnom pakovanju. Povrat novca se vrši u roku od ${returns.refundDaysText}.`,
        },
        {
          question: "Kako postupiti u slučaju kvara ili reklamacije?",
          answer: `U slučaju potrebe za servisom ili reklamacijom, kontaktirajte našu službu na ${contact.supportEmail} ili telefon ${contact.phone}. Naš tim će organizovati preuzimanje uređaja i servis u ovlaštenom centru.`,
        },
      ],
    },
  ]

  const allFaqItems = faqSections.flatMap((section) => section.items)
  const faqSchema = getFaqSchema(allFaqItems)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Česta pitanja", url: `${siteUrl}/ba/cesta-pitanja` },
  ])

  return (
    <div>
      {/* Schema.org FAQPage & BreadcrumbList za Google Search */}
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Početna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Česta pitanja</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Česta pitanja (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Pronađite brze i jasne odgovore na najčešća pitanja o naručivanju, plaćanju, dostavi i garanciji.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {faqSections.map((section, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-base sm:text-lg font-bold text-[#16140F] mb-4 pb-2 border-b border-border/40">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="p-4 rounded-xl bg-[#F5F6F8]">
                  <h3 className="text-xs sm:text-sm font-bold text-[#16140F] mb-1.5 leading-snug">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom info */}
      <div className="mt-12 pt-6 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          Niste pronašli odgovor na vaše pitanje? Naša korisnička podrška vam stoji na raspolaganju
          putem emaila{" "}
          <a href={`mailto:${contact.supportEmail}`} className="text-primary font-bold hover:underline">
            {contact.supportEmail}
          </a>{" "}
          ili pozivom na{" "}
          <a href={`tel:${contact.phoneTel}`} className="text-primary font-bold hover:underline">
            {contact.phone}
          </a>{" "}
          ({contact.workingHours}).
        </p>
      </div>
    </div>
  )
}
