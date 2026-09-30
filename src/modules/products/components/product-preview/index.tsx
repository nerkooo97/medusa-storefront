import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { WishlistButton, QuickAddButton } from "./actions"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
  index,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  index?: number
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isOnSale = cheapestPrice?.price_type === "sale"

  // Pronađi ID najpovoljnije varijante za brzi dodatak u korpu
  type VariantWithPrice = HttpTypes.StoreProductVariant & {
    calculated_price?: {
      calculated_amount?: number
    }
  }

  const cheapestVariant = product.variants?.length
    ? ([...product.variants] as VariantWithPrice[]).sort((a, b) => {
        const pA = a.calculated_price?.calculated_amount ?? 9999999
        const pB = b.calculated_price?.calculated_amount ?? 9999999
        return pA - pB
      })[0]
    : undefined

  const cheapestVariantId = cheapestVariant?.id || product.variants?.[0]?.id
  const hasMultipleVariants = (product.variants?.length ?? 0) > 1

  return (
    <div className="group relative flex flex-col h-full bg-transparent p-0 border-0 shadow-none select-none justify-between">
      {/* 1. Klikabilni link na stranicu artikla */}
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="flex flex-col flex-1 justify-between"
      >
        <div data-testid="product-wrapper" className="flex flex-col flex-1">
          {/* 2. SAMO SLIKA IMA CARD OKVIR (Zaobljeni sivi box, slika ga popunjava u potpunosti full) */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#EDEDF0] flex items-center justify-center p-0 transition-all duration-200">
            {/* Opcionalni redni broj (kao 1, 2, 3 na slici) */}
            {typeof index === "number" && (
              <span className="absolute top-2.5 left-2.5 z-10 size-6 sm:size-7 rounded-md bg-black/10 backdrop-blur-xs text-neutral-800 text-xs font-bold flex items-center justify-center pointer-events-none">
                {index + 1}
              </span>
            )}

            {/* Dugme za Listu želja (minimalističko srce u desnom uglu bez bijelog okvira) */}
            <WishlistButton
              productId={product.id}
              className="absolute top-2.5 right-2.5"
            />

            {/* Zeleni bedževi (A-30%, 10KG stil kao na slici) */}
            <div className="absolute bottom-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
              {isOnSale && cheapestPrice?.percentage_diff ? (
                <span className="bg-[#00A650] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded shadow-2xs uppercase tracking-wide">
                  A-{cheapestPrice.percentage_diff}%
                </span>
              ) : isOnSale ? (
                <span className="bg-[#00A650] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded shadow-2xs uppercase tracking-wide">
                  AKCIJA
                </span>
              ) : null}

              {product.weight ? (
                <span className="bg-[#00A650] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded shadow-2xs uppercase tracking-wide">
                  {product.weight}KG
                </span>
              ) : product.tags?.[0]?.value ? (
                <span className="bg-[#00A650] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded shadow-2xs uppercase tracking-wide">
                  {product.tags[0].value.toUpperCase()}
                </span>
              ) : null}
            </div>

            {/* Slika: popunjava komplet card (full cover) */}
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              fit="cover"
              className="!p-0 !rounded-none !shadow-none !border-none !bg-transparent w-full h-full"
            />
          </div>

          {/* 3. Naslov artikla (krupniji, ostaje crn na hover) */}
          <h3
            className="text-sm sm:text-[15px] font-bold text-[#16140F] line-clamp-2 leading-snug mt-2.5 sm:mt-3 mb-1 min-h-[2.5rem]"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </div>
      </LocalizedClientLink>

      {/* 4. Donji red: Cijena + Okrugli '+' (sve prozirno, bez bordera ili linija) */}
      <div className="mt-auto pt-1 flex items-end justify-between gap-2">
        <div className="flex flex-col">
          {cheapestPrice ? (
            <PreviewPrice price={cheapestPrice} />
          ) : (
            <span className="text-xs text-muted-foreground font-semibold">
              Cijena na upit
            </span>
          )}
        </div>

        {/* Okruglo dugme '+' */}
        <QuickAddButton
          variantId={cheapestVariantId}
          productHandle={product.handle}
          hasMultipleVariants={hasMultipleVariants}
        />
      </div>
    </div>
  )
}
