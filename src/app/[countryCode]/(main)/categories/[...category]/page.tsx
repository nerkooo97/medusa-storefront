import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { getRegion, listRegions } from "@lib/data/regions"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import JsonLd from "@modules/common/components/json-ld"
import { getBreadcrumbSchema, getCanonicalSiteUrl } from "@lib/util/seo-schema"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      sortBy?: SortOptions
      page?: string
      optionValueIds?: string | string[]
    }
  >
}

export const dynamic = "force-dynamic"

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    if (!productCategory) {
      return {
        title: "Kategorija",
      }
    }

    const title = productCategory.name
    const description = productCategory.description ?? `${title} kategorija.`

    return {
      title,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch {
    return {
      title: "Kategorija",
    }
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  const parents: HttpTypes.StoreProductCategory[] = []
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }
  getParents(productCategory)
  parents.reverse()

  const siteUrl = getCanonicalSiteUrl()
  const breadcrumbItems = [
    { name: "Naslovna", url: `${siteUrl}/${params.countryCode}` },
    { name: "Svi proizvodi", url: `${siteUrl}/${params.countryCode}/store` },
    ...parents.map((p) => ({
      name: p.name,
      url: `${siteUrl}/${params.countryCode}/categories/${p.handle}`,
    })),
    {
      name: productCategory.name,
      url: `${siteUrl}/${params.countryCode}/categories/${productCategory.handle}`,
    },
  ]

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CategoryTemplate
        category={productCategory}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        optionValueIds={optionValueIds}
      />
    </>
  )
}
