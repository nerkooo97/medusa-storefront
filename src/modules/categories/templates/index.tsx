import { notFound } from "next/navigation"
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { ChevronRight } from "lucide-react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }

  getParents(category)
  parents.reverse()

  return (
    <div
      className="py-6 sm:py-8 content-container"
      data-testid="category-container"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
        <LocalizedClientLink
          href="/"
          className="hover:text-foreground transition-colors"
        >
          Naslovna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
        <LocalizedClientLink
          href="/store"
          className="hover:text-foreground transition-colors"
        >
          Svi proizvodi
        </LocalizedClientLink>
        {parents.map((parent) => (
          <div key={parent.id} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
            <LocalizedClientLink
              href={`/categories/${parent.handle}`}
              className="hover:text-foreground transition-colors"
            >
              {parent.name}
            </LocalizedClientLink>
          </div>
        ))}
        <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Page Title & Description banner */}
      <div className="mb-6 sm:mb-8 pb-4 border-b border-border/60">
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading"
          data-testid="category-page-title"
        >
          {category.name}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {category.description ||
            `Istražite našu cjelokupnu ponudu u kategoriji ${category.name} uz brzu dostavu i garanciju.`}
        </p>
      </div>

      {/* Subcategories quick badges (if any) */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {category.category_children.map((child) => (
            <LocalizedClientLink
              key={child.id}
              href={`/categories/${child.handle}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/10 text-xs font-semibold text-foreground transition-all shadow-2xs whitespace-nowrap shrink-0"
            >
              <span>{child.name}</span>
            </LocalizedClientLink>
          ))}
        </div>
      )}

      {/* Main Content Layout with PaginatedProducts */}
      <div className="w-full">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
          />
        </Suspense>
      </div>
    </div>
  )
}
