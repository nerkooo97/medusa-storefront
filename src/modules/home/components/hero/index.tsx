"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

/**
 * =======================================================================
 * KONFIGURACIJA HERO SEKCIJE (pıko.ba)
 * =======================================================================
 * Ovdje možete direktno promijeniti slike, tekstove, bedževe i linkove.
 *
 * DODAVANJE NOVIH KARTICA:
 * - U listu `secondaryCards` možete dodati neograničen broj novih kartica!
 * - Svaka nova kartica se automatski slaže u horizontalni canvas (2 reda po koloni)
 *   i omogućava horizontalno skrolovanje/povlačenje mišem.
 *
 * UPUTSTVO ZA SLIKE:
 * - Unesite URL slike u `imageUrl` (npr. "/hero/aku-alati.jpg" ili https:// URL).
 * - Ako ostavite `imageUrl: null` ili `""`, prikazuje se elegantni tamni placeholder.
 * =======================================================================
 */

export interface HeroCardItem {
  id: string
  title: string
  subtitle: string
  href: string
  imageUrl?: string | null
  imageAlt?: string
  badge?: string | null
  ctaText?: string | null
  placeholderLabel?: string
}

export interface HeroSectionConfig {
  /** Glavna velika kartica s lijeve strane */
  mainCard: HeroCardItem
  /** Manje kartice koje se horizontalno skroluju u 2 reda (kvadratni oblik) */
  secondaryCards: HeroCardItem[]
}

export const HERO_CONFIG: HeroSectionConfig = {
  // 1. GLAVNI VELIKI BANER (Lijeva strana)
  mainCard: {
    id: "main-banner",
    title: "Pıko Dani Alata i Mašina!",
    subtitle: "Uštedite do 25% na odabrani asortiman uz kupone i brzu dostavu.",
    href: "/store",
    imageUrl: "/images/homepage/hero/media-piko-dostava.webp", // <-- OVDJE UNESITE URL SLIKE (npr. "/hero/main-banner.jpg")
    imageAlt: "Pıko Dani Alata",
    badge: "POSEBNA PONUDA",
    ctaText: "Kupi odmah",
    placeholderLabel: "Glavni baner (800x900px)",
  },

  // 2. KARTICE SA DESNE STRANE (Kvadratni oblik 1:1, 2 reda)
  secondaryCards: [
    // Kolona 1 - Gore (Kvadrat 1)
    {
      id: "card-1",
      title: "Dobrodošli u pıko",
      subtitle: "Brza i sigurna dostava alata i mašina na vaša vrata širom BiH.",
      href: "/customer-service",
      imageUrl: "/images/homepage/hero/media-piko-uredenje.webp",
      imageAlt: "Dobrodošli u pıko",
      badge: "NOVI KORISNICI",
      ctaText: "Saznaj više",
      placeholderLabel: "Kartica 1 (Kvadrat)",
    },
    // Kolona 1 - Dolje (Kvadrat 2)
    {
      id: "card-2",
      title: "Napunite vašu korpu",
      subtitle: "Besplatna dostava za sve narudžbe iznad 100 KM.",
      href: "/store",
      imageUrl: "https://placehold.co/600x400",
      imageAlt: "Besplatna dostava",
      badge: "BESPLATNA DOSTAVA",
      ctaText: null,
      placeholderLabel: "Kartica 2 (Kvadrat)",
    },

    // Kolona 2 - Gore (Kvadrat 3)
    {
      id: "card-3",
      title: "Akcijske ponude",
      subtitle: "Iskoristite sezonska sniženja na električne mašine i pribor.",
      href: "/store",
      imageUrl: "/images/homepage/hero/media-generation-piko-akcijske.webp",
      imageAlt: "Akcijske ponude",
      badge: "-20% POPUST",
      ctaText: null,
      placeholderLabel: "Kartica 3 (Kvadrat)",
    },
    // Kolona 2 - Dolje (Kvadrat 4)
    {
      id: "card-4",
      title: "Sve za radionicu",
      subtitle: "Praktični pomagači i setovi za majstore i hobiste.",
      href: "/categories/radionica",
      imageUrl: "/images/homepage/hero/media-generation-piko-radionica.webp",
      imageAlt: "Sve za radionicu",
      badge: null,
      ctaText: null,
      placeholderLabel: "Kartica 4 (Kvadrat)",
    },

    // Kolona 3 - Gore (Kvadrat 5)
    {
      id: "card-5",
      title: "Novo u ponudi",
      subtitle: "Najnoviji modeli akumulatorskih alata profesionalne serije.",
      href: "/categories/aku-alati",
      imageUrl: "https://placehold.co/600x400",
      imageAlt: "Novo u ponudi",
      badge: "NOVO",
      ctaText: null,
      placeholderLabel: "Kartica 5 (Kvadrat)",
    },
    // Kolona 3 - Dolje (Kvadrat 6)
    {
      id: "card-6",
      title: "Pıko Klub pogodnosti",
      subtitle: "Ekskluzivni popusti i produžena garancija za vjerne kupce.",
      href: "/content/terms-of-use",
      imageUrl: "https://placehold.co/600x400",
      imageAlt: "Pıko Klub",
      badge: "PIKO KLUB",
      ctaText: null,
      placeholderLabel: "Kartica 6 (Kvadrat)",
    },

    // Kolona 4 - Gore (Kvadrat 7 - otkriva se povlačenjem mišem)
    {
      id: "card-7",
      title: "Profesionalni pribor",
      subtitle: "Burgije, rezne ploče i setovi potrošnog materijala.",
      href: "/categories/pribor",
      imageUrl: "https://placehold.co/600x400",
      imageAlt: "Profesionalni pribor",
      badge: "PRIBOR",
      ctaText: null,
      placeholderLabel: "Kartica 7 (Kvadrat)",
    },
    // Kolona 4 - Dolje (Kvadrat 8 - otkriva se povlačenjem mišem)
    {
      id: "card-8",
      title: "Vrt i okućnica",
      subtitle: "Kosilice, trimeri i perači pod pritiskom za vaš dom.",
      href: "/categories/vrt-i-basta",
      imageUrl: "https://placehold.co/600x400",
      imageAlt: "Vrt i okućnica",
      badge: "SEZONA",
      ctaText: null,
      placeholderLabel: "Kartica 8 (Kvadrat)",
    },
  ],
}

/**
 * Prikaz pojedinačne kartice
 */
const HeroCard = ({
  item,
  isMain = false,
}: {
  item: HeroCardItem
  isMain?: boolean
}) => {
  return (
    <LocalizedClientLink
      href={item.href}
      draggable={false}
      className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-[#16140F] text-[#FAF6EC] flex flex-col justify-end transition-all duration-300 hover:border-primary/80 hover:shadow-xl select-none shrink-0 aspect-square ${isMain
        ? "w-[348px] sm:w-[470px] lg:w-[662px] h-[348px] sm:h-[470px] lg:h-[662px]"
        : "w-[170px] sm:w-[230px] lg:w-[325px] h-[170px] sm:h-[230px] lg:h-[325px]"
        }`}
    >
      {/* 1. Pozadinska slika ili stilizovani placeholder */}
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.imageAlt || item.title}
          fill
          draggable={false}
          sizes={
            isMain
              ? "(max-width: 1024px) 80vw, 460px"
              : "(max-width: 640px) 70vw, 290px"
          }
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#211E18] via-[#1A1813] to-[#12100C] flex flex-col items-center justify-center p-5 text-center transition-transform duration-500 ease-out group-hover:scale-102 pointer-events-none">
          {/* Suptilna mrežna tekstura */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FAF6EC_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-0 flex flex-col items-center gap-2 mb-6">
            <div className="size-11 sm:size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FAF6EC]/60 group-hover:text-primary group-hover:border-primary/30 transition-colors">
              <ImageIcon className="size-5 sm:size-6 stroke-[1.8]" />
            </div>
            <span className="text-[11px] font-semibold text-[#FAF6EC]/50 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 max-w-[200px] truncate">
              {item.placeholderLabel || "Placeholder"}
            </span>
          </div>
        </div>
      )}

      {/* 2. Zatamnjeni gradijent na dnu za čitljivost */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16140F] via-[#16140F]/65 to-transparent pointer-events-none z-10" />

      {/* 3. Bedž (opcionalno na vrhu kartice) */}
      {item.badge && (
        <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-[#FFC915] text-[#16140F] shadow-2xs font-sans">
            {item.badge}
          </span>
        </div>
      )}

      {/* 4. Tekstualni sadržaj (na dnu kartice) */}
      <div
        className={`relative z-20 flex flex-col justify-end pointer-events-none ${isMain ? "p-6 sm:p-8" : "p-4 sm:p-5"
          }`}
      >
        {isMain ? (
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#FAF6EC] tracking-tight leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h2>
        ) : (
          <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#FAF6EC] tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>
        )}

        <p
          className={`text-[#FAF6EC]/80 mt-1 leading-snug line-clamp-2 font-sans ${isMain
            ? "text-sm sm:text-base max-w-md mt-2"
            : "text-xs mt-0.5"
            }`}
        >
          {item.subtitle}
        </p>

        {/* 5. Dugme za poziv na akciju (CTA) ako postoji */}
        {item.ctaText && (
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 font-black rounded-lg transition-all duration-150 active:scale-[0.98] ${isMain
                ? "px-5 py-2.5 bg-[#FFC915] hover:bg-[#FFC915]/90 text-[#16140F] text-xs sm:text-sm shadow-xs"
                : "px-3 py-1 bg-white text-[#16140F] hover:bg-[#FFC915] text-xs shadow-2xs font-bold"
                }`}
            >
              <span>{item.ctaText}</span>
              <ArrowRight className="size-3.5 stroke-[2.5]" />
            </span>
          </div>
        )}
      </div>
    </LocalizedClientLink>
  )
}

export default function Hero() {
  const { mainCard, secondaryCards } = HERO_CONFIG
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // Drag-to-scroll stanje
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 20)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = Math.max(320, scrollRef.current.clientWidth * 0.6)
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Mouse Drag Handlers za jednostavno povlačenje mišem
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollRef.current) return
    isDragging.current = true
    hasDragged.current = false
    setIsMouseDown(true)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.3
    if (Math.abs(walk) > 6) {
      hasDragged.current = true
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
    setIsMouseDown(false)
    setTimeout(() => {
      hasDragged.current = false
    }, 60)
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    setIsMouseDown(false)
    setTimeout(() => {
      hasDragged.current = false
    }, 60)
  }

  // Spriječi klik na link ako je korisnik samo prevlačio mišem
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section className="w-full relative py-2 sm:py-5 overflow-hidden group/hero">
      {/* Lijevo navigacijsko dugme */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Skroluj lijevo"
          className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-[#16140F]/90 backdrop-blur-md border border-white/20 text-[#FAF6EC] items-center justify-center shadow-2xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 active:scale-95"
        >
          <ChevronLeft className="size-7 stroke-[2.5]" />
        </button>
      )}

      {/* Desno navigacijsko dugme */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Skroluj desno"
          className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-[#16140F]/90 backdrop-blur-md border border-white/20 text-[#FAF6EC] items-center justify-center shadow-2xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 active:scale-95"
        >
          <ChevronRight className="size-7 stroke-[2.5]" />
        </button>
      )}

      {/* Horizontalni Canvas Track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClickCapture}
        className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex items-stretch gap-2 sm:gap-2.5 lg:gap-3 px-4 sm:px-6 lg:px-8 ${isMouseDown ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* 1. Glavna velika kartica: KVADRAT (aspect-square 1:1) */}
        <HeroCard item={mainCard} isMain={true} />

        {/* 2. Sporedne kartice: KVADRATI (2 reda x aspect-square 1:1 sa manjim razmakom) */}
        <div
          className="grid grid-rows-2 grid-flow-col gap-2 sm:gap-2.5 lg:gap-3 auto-cols-[170px] sm:auto-cols-[230px] lg:auto-cols-[325px] shrink-0 h-[348px] sm:h-[470px] lg:h-[662px]"
        >
          {secondaryCards.map((card) => (
            <HeroCard key={card.id} item={card} isMain={false} />
          ))}
        </div>
      </div>
    </section>
  )
}
