"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { homeConfig } from "@/config/home"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export default function CategoryShowcase() {
  const { categoriesSection } = homeConfig
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 6)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const firstCard = container.querySelector("a")
    const cardWidth = firstCard?.clientWidth || 240
    // Pomak za jednu ili dvije kartice
    const scrollAmount = (cardWidth + 16) * (direction === "left" ? -1 : 1)
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="content-container py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-border/60">
        <div>
          {categoriesSection.badge && (
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {categoriesSection.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1 font-heading">
            {categoriesSection.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <LocalizedClientLink
            href={categoriesSection.viewAllLink}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:underline mr-1"
          >
            <span>{categoriesSection.viewAllText}</span>
            <ArrowRight className="size-4" />
          </LocalizedClientLink>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Prethodne kategorije"
              className="size-9 rounded-full border border-border bg-white text-foreground hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Sljedeće kategorije"
              className="size-9 rounded-full border border-border bg-white text-foreground hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row of Category Cards: Max 5 on desktop, Carousel everywhere, +30% height, full cover image */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {categoriesSection.items.map((cat, idx) => {
          const destination =
            cat.link || (cat.handle ? `/categories/${cat.handle}` : "/store")
          const imageSrc =
            cat.imageUrl ||
            `https://placehold.co/600x400?text=${encodeURIComponent(cat.title)}`

          return (
            <LocalizedClientLink
              key={idx}
              href={destination}
              className="group relative shrink-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 hover:border-primary/60 hover:shadow-xl transition-all duration-300 w-[180px] xs:w-[210px] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)] h-[360px] sm:h-[420px] lg:h-[450px] snap-start"
            >
              {/* Full Cover Background Image */}
              <div className="absolute inset-0 size-full overflow-hidden bg-neutral-900">
                <Image
                  src={imageSrc}
                  alt={cat.imageAlt || cat.title}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 20vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  unoptimized
                />
                {/* Gradient overlay to ensure text contrast and premium feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/60 group-hover:from-black/80 group-hover:to-black/70 transition-colors" />
              </div>

              {/* Top: Category Title */}
              <div className="relative z-10 p-4 sm:p-5">
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-primary mb-1 drop-shadow-xs">
                  Kategorija
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md line-clamp-2 leading-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Bottom: Action hint */}
              <div className="relative z-10 p-4 sm:p-5 pt-0 mt-auto flex items-center justify-between">
                <span className="text-xs font-semibold text-white/90 group-hover:text-primary transition-colors drop-shadow-xs">
                  Pregledaj
                </span>
                <div className="size-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1 transition-all shadow-2xs">
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
