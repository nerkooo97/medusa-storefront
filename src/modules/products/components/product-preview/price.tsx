import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  const isSale = price.price_type === "sale"

  return (
    <div className="flex flex-col" data-testid="product-price">
      {/* 1. Glavna cijena: Crna (#16140F) standardno, a crvena (#E11D48) ako je sniženje */}
      <span
        className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-none ${
          isSale ? "text-[#E11D48]" : "text-[#16140F]"
        }`}
        data-testid="price"
      >
        {price.calculated_price}
      </span>

      {/* 2. UVP i popust linija ispod cijene */}
      {isSale && price.original_price ? (
        <div className="flex flex-wrap items-baseline gap-1 text-xs sm:text-[13px] font-semibold text-neutral-800 tracking-tight mt-1">
          <span className="text-neutral-500 font-normal">UVP:</span>
          <span className="line-through text-neutral-500 font-normal" data-testid="original-price">
            {price.original_price}
          </span>
          {price.percentage_diff && (
            <span className="text-[#E11D48] font-bold ml-0.5">
              {price.percentage_diff}% Rabatt
            </span>
          )}
        </div>
      ) : (
        <span className="text-[11px] text-neutral-500 font-medium mt-1">
          PDV uključen
        </span>
      )}
    </div>
  )
}
