import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import { getBreadcrumbSchema, getCanonicalSiteUrl } from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Sigurnost kupovine i plaćanja | ${businessConfig.name}`,
  description:
    "Informacije o tehničkim i sigurnosnim mjerama zaštite kupaca, 256-bitnoj SSL enkripciji i ovlaštenoj distribuciji alata.",
}

export default function SigurnostPage() {
  const { name, warranty, contact } = businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Sigurnost", url: `${siteUrl}/ba/sigurnost` },
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
        <span className="text-foreground font-medium">Sigurnost</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Sigurnost kupovine i zaštita podataka
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Upoznajte se sa sigurnosnim standardima, protokolima zaštite transakcija i garancijom
          originalnosti na {name} web trgovini.
        </p>
      </div>

      {/* Text Content */}
      <div className="space-y-8 text-xs sm:text-sm text-neutral-600 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            1. Zaštita prenosa podataka (256-bitni SSL certifikat)
          </h2>
          <p>
            Cjelokupna komunikacija između vašeg internet pretraživača i servera {name} web shopa
            zaštićena je naprednim SSL/TLS enkripcijskim protokolom (HTTPS). Svi podaci koje unosite
            prilikom naručivanja automatski se kriptuju prije slanja, što onemogućava bilo kakvo
            neovlašteno presretanje ili zloupotrebu.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            2. Sigurnost kartičnog plaćanja (3D Secure 2.0)
          </h2>
          <p className="mb-2">
            Online plaćanje platnim karticama realizuje se u saradnji sa ovlaštenim procesorom plaćanja
            Monri Payment Gateway, u skladu sa međunarodnim PCI-DSS bezbjednosnim standardima najvišeg
            nivoa.
          </p>
          <p>
            Prilikom plaćanja karticom koristi se 3D Secure sistem provjere (Mastercard Identity Check i
            Visa Secure), gdje se transakcija autorizuje unosom jednokratnog koda koji vam banka šalje
            putem SMS-a ili mobilnog bankarstva.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            3. Princip nepohranjivanja brojeva kartica
          </h2>
          <p>
            {name} internet prodavnica u potpunosti posluje po principu "Zero Card Data Storage". To znači
            da brojevi vaših platnih kartica, datumi isteka i trocifreni CVV kodovi nikada ne prolaze kroz
            našu bazu podataka niti se na njoj pohranjuju. Unos i obrada se odvijaju isključivo unutar
            sigurnog okruženja procesora i kartičnih kuća.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            4. 100% Originalni artikli sa zvaničnom garancijom
          </h2>
          <p>
            Kao ovlašteni distributer i partner vodećih svjetskih proizvođača, garantujemo porijeklo i
            originalnost svakog prodatog artikla. Svi artikli posjeduju tvorničku garanciju ({warranty.durationText}, {warranty.maxYearsText})
            uz fiskalni račun i obezbijeđen ovlašteni servis sa originalnim rezervnim dijelovima.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#16140F] mb-2">
            5. Sigurnost pri preuzimanju i plaćanju pouzećem
          </h2>
          <p>
            Kupcima koji se odluče za plaćanje gotovinom pri preuzimanju omogućen je pregled paketa u
            prisustvu kurira prije plaćanja. Ukoliko primijetite bilo kakvo fizičko oštećenje transportne
            ambalaže ili sadržaja, pošiljku niste dužni preuzeti niti platiti.
          </p>
        </section>
      </div>

      {/* Support footer */}
      <div className="mt-12 pt-6 border-t border-border/50 text-xs text-muted-foreground">
        <p>
          Ukoliko imate bilo kakva pitanja o sigurnosti kupovine, slobodno nas kontaktirajte na{" "}
          <a href={`mailto:${contact.supportEmail}`} className="text-primary font-bold hover:underline">
            {contact.supportEmail}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
