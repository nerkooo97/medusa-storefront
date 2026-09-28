import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { ChevronRight } from "lucide-react"

export default function StoreTemplate({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="py-6 sm:py-8 content-container" data-testid="store-container">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Naslovna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-medium">Svi proizvodi</span>
      </nav>

      {/* Page Title & Description */}
      <div className="mb-6 sm:mb-8 pb-4 border-b border-border/60">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground" data-testid="store-page-title">
          Svi proizvodi
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Istražite našu cjelokupnu ponudu alata, mašina i profesionalne opreme uz brzu dostavu i garanciju.
        </p>
      </div>

      <div className="w-full">
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
