import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import {
  getHowToSchema,
  getBreadcrumbSchema,
  getCanonicalSiteUrl,
} from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Kako da naručite? | ${businessConfig.name}`,
  description:
    "Jednostavan i detaljan vodič kroz proces kupovine na web shopu: odabir artikala, plaćanje i dostava.",
}

export default function KakoNarucitiPage() {
  const { name, shipping, contact } = businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const steps = [
    {
      number: "1",
      title: "Pronađite i odaberite željene artikle",
      description:
        "Koristite brzu pretragu na vrhu stranice ili pregledajte artikle kroz katalog i kategorije. Kada pronađete odgovarajući artikal, odaberite željenu količinu i kliknite na dugme 'Dodaj u korpu'.",
    },
    {
      number: "2",
      title: "Pregledajte sadržaj vaše korpe",
      description:
        "Klikom na ikonicu 'Korpa' u gornjem desnom uglu provjerite odabrane proizvode, korigujte količine ili unesite promotivni kupon. Nakon pregleda kliknite 'Nastavi na narudžbu'.",
    },
    {
      number: "3",
      title: "Unesite podatke za dostavu",
      description:
        "Upišite vaše ime i prezime, adresu isporuke (ulica, broj, grad, poštanski broj), kontakt telefon i e-mail adresu. Za pravna lica unesite naziv firme i ID/PDV broj za izdavanje R1 fakture.",
    },
    {
      number: "4",
      title: "Odaberite način plaćanja",
      description:
        "Odaberite željenu opciju plaćanja: gotovinom kuriru pri preuzimanju (pouzećem), online platnim karticama (Visa, Mastercard), ili virmanski po predračunu.",
    },
    {
      number: "5",
      title: "Potvrda narudžbe i isporuka",
      description: `Nakon potvrde, na vašu e-mail adresu stiže specifikacija. Paket se priprema i dostavlja na vaša vrata unutar ${shipping.deliveryTime}.`,
    },
  ]

  const howToSchema = getHowToSchema({
    name: `Kako naručiti na ${name} web shopu`,
    description:
      "Vodič kroz jednostavan proces naručivanja: odabir artikala, pregled korpe, unos podataka, odabir plaćanja i dostava.",
    steps: steps.map((s) => ({ title: s.title, description: s.description })),
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Kako da naručite", url: `${siteUrl}/ba/kako-naruciti` },
  ])

  return (
    <div>
      {/* Schema.org HowTo & BreadcrumbList za Google Search */}
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Početna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Kako da naručite</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Kako da naručite?
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Kupovina na {name} web shopu je jednostavna, sigurna i brza. Pratite korake u nastavku za
          uspješno kreiranje vaše narudžbe.
        </p>
      </div>

      {/* Step by step guide */}
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4 items-start">
            <span className="size-8 rounded-full bg-[#16140F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              {step.number}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#16140F] mb-1.5">
                {step.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery and payment notes */}
      <div className="mt-12 pt-8 border-t border-border/50 space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
        <h2 className="text-base font-bold text-[#16140F]">
          Važne napomene o dostavi
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Besplatna dostava:</strong> Za sve narudžbe iznad {shipping.freeDeliveryThresholdFormatted} troškovi
            dostave su u potpunosti besplatni.
          </li>
          <li>
            <strong>Standardna dostava:</strong> Za narudžbe ispod {shipping.freeDeliveryThresholdFormatted}, trošak
            dostave iznosi {shipping.costFormatted} i jasno je iskazan u korpi prije potvrde.
          </li>
          <li>
            <strong>Rok isporuke:</strong> Vrijeme dostave na bilo koju adresu u BiH je {shipping.deliveryTime}.
          </li>
          <li>
            <strong>Pregled prije preuzimanja:</strong> Imate pravo otvoriti i vizuelno pregledati pošiljku
            prije plaćanja kurirskoj službi.
          </li>
        </ul>
      </div>

      {/* CTA Button and Support Contact */}
      <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <LocalizedClientLink
          href="/store"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16140F] text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors w-fit"
        >
          <span>Pregledaj katalog proizvoda</span>
          <span>&rarr;</span>
        </LocalizedClientLink>

        <p className="text-xs text-muted-foreground">
          Pomoć pri naručivanju:{" "}
          <a href={`tel:${contact.phoneTel}`} className="text-primary font-bold hover:underline">
            {contact.phone}
          </a>
        </p>
      </div>
    </div>
  )
}
