import { businessConfig } from "@/config/business"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

/**
 * Vraća kanonsku baznu adresu za Schema.org.
 * U produkciji uvijek preferira službenu domenu https://piko.ba
 * kako bi Google ispravno indeksirao produkcijske URL-ove.
 */
export function getCanonicalSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/+$/, "")
  }
  return `https://${businessConfig.domain}`
}

/**
 * Schema.org Global Organization & WebSite (sa Sitelinks Searchbox)
 * Prikazuje se u globalnom layoutu za Google Search i Knowledge Graph.
 */
export function getOrganizationAndWebsiteSchema(siteUrl = getCanonicalSiteUrl()) {
  const orgId = `${siteUrl}/#organization`
  const webSiteId = `${siteUrl}/#website`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["OnlineStore", "Organization"],
        "@id": orgId,
        name: businessConfig.name,
        legalName: businessConfig.legalName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/piko-logo-dark.png`,
          caption: businessConfig.name,
        },
        image: `${siteUrl}/piko-logo-dark.png`,
        description: `${businessConfig.name} (${businessConfig.domain}) — Vaša online trgovina mašina i alata. Sve za dom, radionicu i vrt na jednom mjestu.`,
        email: businessConfig.contact.email,
        telephone: businessConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressCountry: "BA",
        },
        priceRange: "$$",
        currenciesAccepted: "BAM",
        paymentAccepted: "Cash on delivery, Credit Card, Bank Transfer",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: businessConfig.contact.phone,
            contactType: "customer service",
            email: businessConfig.contact.supportEmail,
            areaServed: "BA",
            availableLanguage: ["Bosnian", "Croatian", "Serbian"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: businessConfig.contact.openingHours.days,
              opens: businessConfig.contact.openingHours.opens,
              closes: businessConfig.contact.openingHours.closes,
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": webSiteId,
        url: siteUrl,
        name: businessConfig.name,
        alternateName: [
          "pıko",
          "piko.ba",
          "pıko trgovina",
          "pıko online shop",
          "pıko alati",
        ],
        publisher: {
          "@id": orgId,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/ba/store?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }
}

/**
 * Schema.org BreadcrumbList za hijerarhiju stranica u Google SERP-u
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Schema.org HowTo za vodiče korak-po-korak
 */
export function getHowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { title: string; description: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: s.title,
      text: s.description,
    })),
  }
}

/**
 * Schema.org ContactPage za stranicu za podršku i kontakt
 */
export function getContactPageSchema(siteUrl = getCanonicalSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Korisnička podrška i kontakt | ${businessConfig.name}`,
    description: `Kontaktirajte ${businessConfig.name} tim za sva pitanja o narudžbama, asortimanu i reklamacijama.`,
    url: `${siteUrl}/ba/podrska`,
    mainEntity: {
      "@type": "Organization",
      name: businessConfig.name,
      telephone: businessConfig.contact.phone,
      email: businessConfig.contact.supportEmail,
    },
  }
}

/**
 * Schema.org FAQPage za Google Rich Snippets na stranici Česta Pitanja
 */
export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/**
 * Schema.org Product sa kompletnim Offer, MerchantReturnPolicy i ShippingDetails
 * Usklađeno sa Google Rich Results i Merchant Center zahtjevima.
 */
export function getProductSchema({
  product,
  region,
  countryCode,
  siteUrl = getCanonicalSiteUrl(),
}: {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
  countryCode: string
  siteUrl?: string
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const priceNumber = cheapestPrice?.calculated_price_number ?? 0
  const currencyCode = (
    cheapestPrice?.currency_code ||
    region?.currency_code ||
    "BAM"
  ).toUpperCase()

  const productUrl = `${siteUrl}/${countryCode}/products/${product.handle}`

  // Slike artikla
  const images = (product.images?.map((img) => img.url).filter(Boolean) as string[]) || []
  if (images.length === 0 && product.thumbnail) {
    images.push(product.thumbnail)
  }

  // Provjera dostupnosti (zaliha)
  const isAvailable =
    !product.variants ||
    product.variants.length === 0 ||
    product.variants.some((v) => !v.manage_inventory || (v.inventory_quantity ?? 0) > 0)

  const sku =
    product.variants?.[0]?.sku ||
    product.variants?.[0]?.barcode ||
    product.id

  // Brand: koristi materijal/brand iz meduse ili zadani naziv brenda
  const brandName =
    (product as any).brand?.name ||
    product.material ||
    product.collection?.title ||
    businessConfig.name

  // Godina dana validnosti cijene za Google Merchant
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  const priceValidUntil = nextYear.toISOString().split("T")[0]

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description:
      product.description ||
      product.subtitle ||
      `${product.title} po najpovoljnijoj cijeni na ${businessConfig.name}. Brza dostava i garancija.`,
    image: images,
    sku,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: currencyCode,
      price: priceNumber.toFixed(2),
      priceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: businessConfig.name,
        url: siteUrl,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BA",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: businessConfig.returns.days,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value:
            priceNumber >= businessConfig.shipping.freeDeliveryThreshold
              ? "0.00"
              : businessConfig.shipping.cost.toFixed(2),
          currency: currencyCode,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "BA",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: businessConfig.shipping.minDeliveryDays,
            maxValue: businessConfig.shipping.maxDeliveryDays,
            unitCode: "DAY",
          },
        },
      },
    },
  }
}
