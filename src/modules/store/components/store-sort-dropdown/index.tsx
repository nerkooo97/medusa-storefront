"use client"

import { useState, useRef, useEffect } from "react"
import { useSortBy } from "react-instantsearch"
import { ArrowUpDown, Check, ChevronDown } from "lucide-react"
import { clx } from "@modules/common/components/ui"
import { getSortOptions } from "../store-refinements/attributes"

type StoreSortDropdownProps = {
  currencyCode: string
}

const StoreSortDropdown = ({ currencyCode }: StoreSortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const items = getSortOptions(currencyCode)
  const { currentRefinement, refine } = useSortBy({ items })

  const activeOption =
    items.find((item) => item.value === currentRefinement) || items[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Small trigger icon button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clx(
          "inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-card border text-xs sm:text-sm font-medium transition-all shadow-2xs hover:border-primary hover:bg-muted/40",
          isOpen
            ? "border-primary ring-1 ring-primary/30 text-foreground"
            : "border-border text-foreground"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sortiraj proizvode"
        title="Sortiraj proizvode"
        data-testid="store-sort-dropdown-trigger"
      >
        <div className="size-6 rounded-md bg-primary/20 text-foreground flex items-center justify-center shrink-0">
          <ArrowUpDown className="size-3.5 stroke-[2.2]" />
        </div>
        <span className="font-medium text-foreground text-xs sm:text-sm">
          {activeOption?.label || "Relevantnost"}
        </span>
        <ChevronDown
          className={clx(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            {
              "rotate-180 text-foreground": isOpen,
            }
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Opcije sortiranja"
          className="absolute right-0 top-full mt-2 z-40 min-w-[220px] w-max max-w-[90vw] bg-card border border-border rounded-xl shadow-lg p-1.5 animate-in fade-in zoom-in-95 duration-100"
          data-testid="store-sort-dropdown-menu"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
            Sortiraj po
          </div>
          <div className="flex flex-col gap-0.5">
            {items.map((item) => {
              const isSelected = item.value === currentRefinement
              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    refine(item.value)
                    setIsOpen(false)
                  }}
                  className={clx(
                    "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left",
                    isSelected
                      ? "bg-primary/20 text-foreground font-bold"
                      : "text-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <span>{item.label}</span>
                  {isSelected && (
                    <Check className="size-3.5 text-foreground shrink-0 stroke-[2.5]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreSortDropdown
