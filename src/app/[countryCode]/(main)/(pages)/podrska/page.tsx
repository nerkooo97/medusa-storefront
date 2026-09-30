import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { businessConfig } from "@/config/business"
import JsonLd from "@modules/common/components/json-ld"
import {
  getContactPageSchema,
  getBreadcrumbSchema,
  getCanonicalSiteUrl,
} from "@lib/util/seo-schema"

export const metadata: Metadata = {
  title: `Korisnička podrška | ${businessConfig.name}`,
  description:
    "Kontaktirajte naš tim za podršku pri kupovini, savjete oko odabira alata i sve servisne informacije.",
}

const helpfulLinks = [
  {
    title: "Česta pitanja (FAQ)",
    description: "Brzi odgovori na najčešća pitanja o naručivanju, plaćanju i garanciji.",
    href: "/cesta-pitanja",
  },
  {
    title: "Kako da naručite?",
    description: "Korak po korak uputstvo za jednostavnu kupovinu i brzu dostavu.",
    href: "/kako-naruciti",
  },
  {
    title: "Sigurnost i plaćanje",
    description: "Informacije o SSL enkripciji, 3D Secure sistemu i zaštiti podataka.",
    href: "/sigurnost",
  },
  {
    title: "Uslovi poslovanja",
    description: "Opšti uslovi kupovine na daljinu, pravo na povrat robe i garantni rokovi.",
    href: "/uslovi-koristenja",
  },
]

export default function PodrskaPage() {
  const { name, contact } = businessConfig
  const siteUrl = getCanonicalSiteUrl()

  const contactSchema = getContactPageSchema(siteUrl)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Naslovna", url: `${siteUrl}/ba` },
    { name: "Korisnička podrška", url: `${siteUrl}/ba/podrska` },
  ])

  return (
    <div>
      {/* Schema.org ContactPage & BreadcrumbList za Google Search */}
      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Početna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Korisnička podrška</span>
      </nav>

      {/* Title Header */}
      <div className="border-b border-border/50 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16140F] tracking-tight font-heading mb-2">
          Korisnička podrška
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Dobrodošli u centar za podršku {name} web trgovine. Ovdje možete pronaći uputstva za
          kupovinu, uslove poslovanja ili direktno kontaktirati naš tim.
        </p>
      </div>

      {/* Helpful Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {helpfulLinks.map((link, idx) => (
          <LocalizedClientLink
            key={idx}
            href={link.href}
            className="p-5 rounded-2xl bg-[#F5F6F8] hover:bg-neutral-200/60 transition-colors flex flex-col justify-between group"
          >
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#16140F] mb-1 group-hover:text-primary transition-colors">
                {link.title}
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {link.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#16140F] mt-4 group-hover:text-primary transition-colors">
              <span>Otvori stranicu</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </LocalizedClientLink>
        ))}
      </div>

      {/* Contact Details */}
      <div className="border-t border-border/50 pt-8">
        <h2 className="text-base font-bold text-[#16140F] mb-4">
          Direktni kontakt
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-neutral-600">
          <div className="p-4 rounded-xl border border-border/60 flex items-start gap-3">
            <Phone className="size-5 text-[#16140F] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted-foreground block uppercase font-medium">
                Besplatni telefon
              </span>
              <a href={`tel:${contact.phoneTel}`} className="font-bold text-[#16140F] hover:underline">
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/60 flex items-start gap-3">
            <Mail className="size-5 text-[#16140F] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted-foreground block uppercase font-medium">
                Email podrška
              </span>
              <a href={`mailto:${contact.supportEmail}`} className="font-bold text-[#16140F] hover:underline truncate block">
                {contact.supportEmail}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/60 flex items-start gap-3">
            <Clock className="size-5 text-[#16140F] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted-foreground block uppercase font-medium">
                Radno vrijeme
              </span>
              <span className="font-bold text-[#16140F]">
                {contact.workingHours}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
