import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import { getBreadcrumbSchema, getCanonicalSiteUrl } from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Politika privatnosti i zaštita podataka | ${businessConfig.name}`,
  description:
    `Pravila prikupljanja, obrade i zaštite ličnih podataka kupaca na ${businessConfig.domain} u skladu sa važećim zakonskim propisima.`,
}

export default function PolitikaPrivatnostiPage() {
  const { name, legalName, domain, contact } = businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Politika privatnosti", url: `${siteUrl}/ba/politika-privatnosti` },
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
        <span className="text-foreground font-medium">Politika privatnosti</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Politika privatnosti
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Upoznajte se sa načinom na koji {name} ({domain}) štiti vašu privatnost, prikuplja i koristi
          podatke prilikom posjete i kupovine na našem web shopu.
        </p>
      </div>

      {/* Text Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-neutral-600 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            1. Osnovna načela zaštite privatnosti
          </h2>
          <p>
            {legalName} se obavezuje da će čuvati privatnost svih svojih posjetilaca i kupaca na internet
            stranici {domain}. Prikupljamo isključivo one lične podatke koji su nužni za ispunjavanje
            naših zakonskih i ugovornih obaveza u vezi sa obradom narudžbi i isporukom proizvoda.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            2. Podaci koje prikupljamo
          </h2>
          <p className="mb-2">
            Prilikom kreiranja narudžbe i registracije korisničkog računa prikupljamo sljedeće
            podatke:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>Ime i prezime (radi identifikacije i adresiranja pošiljke)</li>
            <li>Adresa za dostavu (ulica, broj, grad, poštanski broj)</li>
            <li>Kontakt telefon (isključivo radi najave i koordinacije kurirske službe)</li>
            <li>E-mail adresa (za slanje potvrde narudžbe, računa i statusa pošiljke)</li>
            <li>Podaci o pravnom licu (naziv, sjedište i ID/PDV broj za R1 račune)</li>
          </ul>
          <p>
            Podaci o platnim karticama se ne prikupljaju i ne čuvaju na našim serverima, već se
            obrađuju direktno u zaštićenom sistemu kartičnog procesora.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            3. Dijeljenje podataka sa trećim licima
          </h2>
          <p>
            Vaše podatke dijelimo isključivo sa ovlaštenim partnerima neophodnim za realizaciju
            kupoprodaje: ugovorenom kurirskom službom radi dostave na vašu kućnu adresu, te
            procesorom za kartično plaćanje. Vaši podaci se ni pod kojim uslovima ne prodaju, ne
            ustupaju niti dijele sa trećim licima u komercijalne svrhe.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            4. Upotreba kolačića (Cookies)
          </h2>
          <p>
            Web stranica {domain} koristi funkcionalne kolačiće radi pravilnog rada stranice (npr.
            čuvanje artikala u korpi tokom sesije) i anonimne analitičke kolačiće za praćenje
            posjećenosti. Postavke kolačića možete u svakom trenutku prilagoditi ili isključiti u vašem
            internet pregledniku.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            5. Prava korisnika i kontakt za zaštitu podataka
          </h2>
          <p className="mb-2">Kao korisnik imate pravo na:</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>Uvid u sve vaše podatke koje posjedujemo</li>
            <li>Ispravku netačnih ili nepotpunih informacija</li>
            <li>Trajno brisanje vašeg korisničkog računa i pratećih ličnih podataka ("pravo na zaborav")</li>
          </ul>
          <p>
            Za sve upite ili zahtjeve vezane za privatnost podataka obratite se našem službeniku za
            zaštitu podataka putem e-maila na{" "}
            <a href={`mailto:${contact.privacyEmail}`} className="text-primary font-bold hover:underline">
              {contact.privacyEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
