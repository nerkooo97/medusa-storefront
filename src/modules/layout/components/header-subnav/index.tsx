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
import { Separator } from "@/components/ui/separator"
import { CategoryIcon } from "@/components/category-icon"
import { activeShop, getAllShopRootHandles } from "@/config/shop"

export default function HeaderSubnav({
  categories = [],
}: {
  categories?: HttpTypes.StoreProductCategory[]
}) {
  const rootHandles = getAllShopRootHandles()

  const displayCategories = categories.length > 0
    ? categories
        .filter((c) => !rootHandles.includes(c.handle))
        .map((c) => ({
          name: c.name,
          handle: c.handle,
          icon: (c.metadata as Record<string, any> | undefined)?.icon as string | undefined,
        }))
    : activeShop.categories

  return (
    <div className="border-t border-white/10 bg-black/25">
      <div className="content-container flex items-center justify-between h-12 sm:h-[50px] text-sm text-[#FAF6EC]">
        {/* Quick Category Links */}
        <nav className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 w-full">
          {displayCategories.slice(0, 12).map((cat) => (
            <LocalizedClientLink
              key={cat.handle}
              href={`/categories/${cat.handle}`}
              className="flex items-center gap-2 text-xs sm:text-[13.5px] font-semibold text-[#FAF6EC] hover:text-primary px-2.5 sm:px-3 py-1.5 transition-colors whitespace-nowrap shrink-0 group"
            >
              <CategoryIcon
                name={cat.icon}
                className="size-4 sm:size-[18px] shrink-0 text-[#FAF6EC]/80 group-hover:text-primary transition-colors"
              />
              <span>{cat.name}</span>
            </LocalizedClientLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
