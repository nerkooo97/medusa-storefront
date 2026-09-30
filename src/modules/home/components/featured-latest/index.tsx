import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ArrowRight } from "lucide-react"
import { homeConfig } from "@/config/home"

export default async function FeaturedLatestProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const { featuredSection } = homeConfig
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 10,
      fields: "*variants.calculated_price",
    },
  }).catch(() => ({ response: { products: [] } }))

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="content-container py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-border/60">
        <div>
          {featuredSection.badge && (
            <span className="inline-block bg-[#FFC915] text-[#16140F] font-black text-xs uppercase tracking-wider px-2.5 py-0.5 rounded shadow-2xs mb-2">
              {featuredSection.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
            {featuredSection.title}
          </h2>
        </div>
        <LocalizedClientLink
          href={featuredSection.viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:underline"
        >
          <span>{featuredSection.viewAllText}</span>
          <ArrowRight className="size-4" />
        </LocalizedClientLink>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </section>
  )
}
