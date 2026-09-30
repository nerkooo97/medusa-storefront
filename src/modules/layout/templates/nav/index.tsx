import { Suspense } from "react"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeaderSearch from "@modules/layout/components/header-search"
import HeaderLocation from "@modules/layout/components/header-location"
import HeaderCart from "@modules/layout/components/header-cart"
import HeaderAccount from "@modules/layout/components/header-account"
import HeaderSubnav from "@modules/layout/components/header-subnav"
import HeaderCategoriesMenu from "@modules/layout/components/header-categories-menu"
import Logo from "@modules/layout/components/logo"
import { ShoppingCart, CircleUser } from "lucide-react"

import { activeShop } from "@/config/shop"

export default async function Nav() {
  const categories = await listCategories().catch(() => [])

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-[#16140F] border-b border-white/10 shadow-sm">
      {/* Top Row: Main Header */}
      <header className="bg-[#16140F] text-[#FAF6EC]">
        <div className="content-container flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-6">
          {/* Left: pıko Brand Logo + Sve kategorije (odvojeno sa više razmaka) */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0">
            <Logo data-testid="nav-store-link" variant="dark" />
            <HeaderCategoriesMenu categories={categories} />
          </div>

          {/* Search Bar: popunjava sav slobodan prostor do unosa adrese */}
          <div className="flex-1 flex items-center min-w-0 mx-2 sm:mx-4 lg:mx-6">
            <HeaderSearch />
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1 sm:gap-2.5 lg:gap-3.5 shrink-0 text-white">
            {/* Delivery Location Widget (unos adrese) */}
            <div className="hidden md:flex">
              <HeaderLocation />
            </div>

            {/* Shopping Cart */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2 px-2.5 py-1.5 text-white/80">
                  <ShoppingCart className="size-6 text-white" />
                  <span className="hidden sm:inline text-sm font-semibold text-white">Korpa</span>
                </div>
              }
            >
              <HeaderCart />
            </Suspense>

            {/* User Account / Sign In */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2 px-2.5 py-1.5 text-white/80">
                  <CircleUser className="size-6 text-white" />
                  <span className="hidden sm:inline text-sm font-semibold text-white">Prijava</span>
                </div>
              }
            >
              <HeaderAccount />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Bottom Row: Sub-navigation Categories & Special Deals */}
      <HeaderSubnav categories={categories} />
    </div>
  )
}

