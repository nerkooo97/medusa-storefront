"use client"

import React, { useState, useTransition } from "react"
import { Heart, Plus, Check, Loader2 } from "lucide-react"
import { addToCart } from "@lib/data/cart"
import { useParams, useRouter } from "next/navigation"

export function WishlistButton({
  productId: _productId,
  className = "",
}: {
  productId: string
  className?: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isFavorite ? "Ukloni iz liste želja" : "Dodaj u listu želja"}
      className={`size-7 sm:size-8 flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer z-20 ${className}`}
    >
      <Heart
        className={`size-5 transition-colors ${
          isFavorite
            ? "text-red-500 fill-red-500 stroke-red-500"
            : "text-neutral-500 hover:text-red-500 stroke-[1.6]"
        }`}
      />
    </button>
  )
}

export function QuickAddButton({
  variantId,
  productHandle,
  hasMultipleVariants,
  className = "",
}: {
  variantId?: string
  productHandle: string
  hasMultipleVariants?: boolean
  className?: string
}) {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const params = useParams()
  const router = useRouter()
  const countryCode = (params?.countryCode as string) || "ba"

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Ako proizvod ima više varijanti ili nema definisan ID varijante, otvori stranicu artikla
    if (hasMultipleVariants || !variantId) {
      router.push(`/${countryCode}/products/${productHandle}`)
      return
    }

    startTransition(async () => {
      try {
        await addToCart({
          variantId,
          quantity: 1,
          countryCode,
        })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 1600)
      } catch (err) {
        console.error("Greška pri dodavanju u korpu:", err)
        router.push(`/${countryCode}/products/${productHandle}`)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleQuickAdd}
      disabled={isPending}
      aria-label="Dodaj u korpu"
      className={`size-9 sm:size-10 rounded-full bg-[#EDEDF0] text-[#16140F] hover:bg-[#FFC915] active:scale-95 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer z-10 ${className}`}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin text-[#16140F]" />
      ) : isSuccess ? (
        <Check className="size-4.5 text-emerald-600 stroke-[3]" />
      ) : (
        <Plus className="size-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
      )}
    </button>
  )
}
