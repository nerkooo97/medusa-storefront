import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"
import JsonLd from "@modules/common/components/json-ld"
import {
  getProductSchema,
  getBreadcrumbSchema,
  getCanonicalSiteUrl,
} from "@lib/util/seo-schema"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export const dynamic = "force-dynamic"

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images!.map((i) => [i.id, true]))
  return product.images?.filter((i) => imageIdsMap.has(i.id)) ?? null
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  try {
    const region = await getRegion(params.countryCode)

    if (!region) {
      return {
        title: "Proizvod",
      }
    }

    const product = await listProducts({
      countryCode: params.countryCode,
      queryParams: { handle },
    }).then(({ response }) => response.products?.[0])

    if (!product) {
      return {
        title: "Proizvod",
      }
    }

    return {
      title: product.title,
      description: `${product.title}`,
      openGraph: {
        title: `${product.title} | pıko`,
        description: `${product.title}`,
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    }
  } catch {
    return {
      title: "Proizvod",
    }
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)
  const siteUrl = getCanonicalSiteUrl()

  const productSchema = getProductSchema({
    product: pricedProduct,
    region,
    countryCode: params.countryCode,
    siteUrl,
  })

  const breadcrumbItems: { name: string; url: string }[] = [
    { name: "Naslovna", url: `${siteUrl}/${params.countryCode}` },
  ]

  const primaryCategory = pricedProduct.categories?.[0]
  if (primaryCategory) {
    breadcrumbItems.push({
      name: primaryCategory.name,
      url: `${siteUrl}/${params.countryCode}/categories/${primaryCategory.handle}`,
    })
  } else if (pricedProduct.collection) {
    breadcrumbItems.push({
      name: pricedProduct.collection.title,
      url: `${siteUrl}/${params.countryCode}/collections/${pricedProduct.collection.handle}`,
    })
  }

  breadcrumbItems.push({
    name: pricedProduct.title,
    url: `${siteUrl}/${params.countryCode}/products/${pricedProduct.handle}`,
  })

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images ?? []}
      />
    </>
  )
}
