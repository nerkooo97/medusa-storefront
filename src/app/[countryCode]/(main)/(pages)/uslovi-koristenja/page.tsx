import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import { getBreadcrumbSchema, getCanonicalSiteUrl } from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Uslovi korištenja i poslovanja | ${businessConfig.name}`,
  description:
    `Opšti uslovi korištenja web shopa ${businessConfig.domain}, pravila kupovine na daljinu, prava potrošača, isporuka i reklamacije.`,
}

export default function UsloviKoristenjaPage() {
  const { name, legalName, domain, contact, shipping, warranty, returns, legal } =
    businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Uslovi korištenja", url: `${siteUrl}/ba/uslovi-koristenja` },
  ])

  return (
    <div>
      {/* Schema.org BreadcrumbList za Google Search */}
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Početna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Uslovi korištenja</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Uslovi korištenja i poslovanja
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Pravilnik o uslovima internet prodaje, pravima i obavezama kupaca i trgovca na web stranici{" "}
          {domain}.
        </p>
      </div>

      {/* Text Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-neutral-600 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            1. Opšte odredbe
          </h2>
          <p>
            Ovi opšti uslovi poslovanja uređuju način, uslove i postupak kupovine i prodaje putem
            internet prodavnice {domain}, u vlasništvu {legalName} (u daljem tekstu: Trgovac).
            Pristupanjem ovoj internet stranici i zaključivanjem ugovora o kupoprodaji na daljinu, kupac
            potvrđuje da je u cijelosti pročitao, razumio i prihvatio ove uslove.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            2. Cijene i porez
          </h2>
          <p>
            Sve cijene artikala na {name} web shopu izražene su u Konvertibilnim markama (BAM / KM) sa
            uračunatim porezom na dodatu vrijednost (PDV {legal.vatRate}). Cijene vrijede u trenutku
            kreiranja narudžbe i ne mogu se jednostrano mijenjati nakon što je kupcu poslana e-mail
            potvrda narudžbe.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            3. Postupak naručivanja
          </h2>
          <p>
            Kupac bira artikle, dodaje ih u korpu i prolazi kroz proceduru unosa podataka za isporuku.
            Nakon slanja narudžbe, kupac na unijetu e-mail adresu zaprima automatsku potvrdu sa
            detaljima specifikacije i cijenom. Ugovor o prodaji se smatra zaključenim u trenutku kada
            prodavac potvrdi narudžbu i otpremi pošiljku kurirskoj službi.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            4. Plaćanje i isporuka
          </h2>
          <p className="mb-2">
            Plaćanje se vrši gotovinski prilikom preuzimanja od kurira (pouzećem), virmanski po
            predračunu, ili platnim karticama putem zaštićenog sistema.
          </p>
          <p>
            Dostava se vrši na adresu kupca na teritoriji Bosne i Hercegovine u roku od{" "}
            {shipping.deliveryTime}. Za narudžbe preko {shipping.freeDeliveryThresholdFormatted} dostava
            je besplatna, dok za narudžbe ispod tog iznosa trošak iznosi {shipping.costFormatted}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            5. Pravo na odustanak od ugovora i povrat ({returns.daysText})
          </h2>
          <p className="mb-2">
            U skladu sa Zakonom o zaštiti potrošača, kupac ima pravo da odustane od kupovine u roku od{" "}
            {returns.daysText} od dana prijema pošiljke, bez navođenja razloga.
          </p>
          <p>
            Artikal koji se vraća mora biti nekorišten, neoštećen, u originalnoj fabričkoj ambalaži sa
            svim dijelovima, uputstvima i priloženim originalnim fiskalnim računom. Povrat uplaćenih
            sredstava vrši se u roku od {returns.refundDaysText} nakon prijema i inspekcije vraćene robe.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            6. Garancija i servis
          </h2>
          <p>
            Svi tehnički artikli, alati i mašine posjeduju garanciju u trajanju od {warranty.durationText}{" "}
            ({warranty.maxYearsText}), propisanu od strane proizvođača. Pravo na garanciju se ostvaruje
            podnošenjem garantnog lista i fiskalnog računa u ovlaštenim servisnim centrima.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            7. Kontakt za reklamacije i prigovore
          </h2>
          <p>
            Sve prigovore možete uputiti putem e-maila na{" "}
            <a href={`mailto:${contact.supportEmail}`} className="text-primary font-bold hover:underline">
              {contact.supportEmail}
            </a>{" "}
            ili telefonom na{" "}
            <a href={`tel:${contact.phoneTel}`} className="text-primary font-bold hover:underline">
              {contact.phone}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
