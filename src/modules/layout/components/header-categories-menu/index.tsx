"use client"

import { LayoutGrid, ChevronDown } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CategoryIcon } from "@/components/category-icon"
import { activeShop, getAllShopRootHandles } from "@/config/shop"

export default function HeaderCategoriesMenu({
  categories = [],
}: {
  categories?: HttpTypes.StoreProductCategory[]
}) {
  const rootHandles = getAllShopRootHandles()

  const displayCategories =
    categories.length > 0
      ? categories
          .filter((c) => !rootHandles.includes(c.handle))
          .map((c) => ({
            name: c.name,
            handle: c.handle,
            icon: (c.metadata as Record<string, any> | undefined)?.icon as
              | string
              | undefined,
          }))
      : activeShop.categories

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 h-10 sm:h-11 px-3 sm:px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 hover:border-white/30 transition-all shrink-0 outline-none cursor-pointer shadow-2xs select-none"
          data-testid="header-all-categories-button"
        >
          <LayoutGrid className="size-4.5 text-primary stroke-[2.2]" />
          <span className="hidden sm:inline tracking-tight whitespace-nowrap">
            Sve kategorije
          </span>
          <ChevronDown className="size-3.5 text-white/70 stroke-[2.2] hidden sm:inline" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-64 max-h-[75vh] overflow-y-auto py-2 bg-popover text-popover-foreground border border-border shadow-xl rounded-xl z-50"
      >
        <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3 py-1.5">
          {activeShop.branding.subnavLabel || "Katalog kategorija"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {displayCategories.map((cat) => (
          <DropdownMenuItem key={cat.handle} asChild>
            <LocalizedClientLink
              href={`/categories/${cat.handle}`}
              className="w-full cursor-pointer py-2.5 px-3 text-xs font-semibold text-foreground hover:text-primary hover:bg-muted/50 rounded-lg flex items-center gap-3 transition-colors"
            >
              <CategoryIcon
                name={cat.icon}
                className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
              />
              <span className="truncate">{cat.name}</span>
            </LocalizedClientLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LocalizedClientLink
            href="/store"
            className="w-full cursor-pointer font-bold text-xs text-primary py-2 px-3 hover:bg-primary/10 rounded-lg flex items-center justify-between"
          >
            <span>Pogledaj sve proizvode</span>
            <span>&rarr;</span>
          </LocalizedClientLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
