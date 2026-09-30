import React from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type LogoProps = {
  className?: string
  variant?: "dark" | "light" | "white"
  size?: "sm" | "md" | "lg"
  withSlogan?: boolean
  "data-testid"?: string
}

/**
 * Backward-compatible PikoCube component if needed elsewhere.
 */
export function PikoCube({
  className = "size-3.5",
  title = "pıko paket",
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
    >
      <g transform="rotate(14 12 12)">
        <polygon
          points="12,3 19,7 12,11 5,7"
          fill="#FFDF59"
          stroke="#16140F"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="5,7 12,11 12,20 5,16"
          fill="#FFC915"
          stroke="#16140F"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="12,11 19,7 19,16 12,20"
          fill="#E5B20D"
          stroke="#16140F"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function Logo({
  className = "",
  variant = "dark",
  size = "md",
  withSlogan = false,
  "data-testid": dataTestId = "store-logo",
}: LogoProps) {
  // variant="dark" or "white" -> white logo for dark surfaces (Ink #16140F)
  // variant="light" -> dark logo for light surfaces (Paper #FAF6EC or white)
  const isWhiteLogo = variant === "dark" || variant === "white"
  const logoSrc = isWhiteLogo ? "/piko-logo-white.png" : "/piko-logo-dark.png"

  const sizeConfig = {
    sm: {
      className: "h-7 sm:h-8",
      width: 180,
      height: 82,
      slogan: "text-[10px]",
    },
    md: {
      className: "h-10 sm:h-12 lg:h-14",
      width: 280,
      height: 126,
      slogan: "text-xs",
    },
    lg: {
      className: "h-[44px] sm:h-[52px] lg:h-[60px]",
      width: 300,
      height: 136,
      slogan: "text-xs sm:text-sm",
    },
  }[size]

  return (
    <LocalizedClientLink
      href="/"
      className={`inline-flex flex-col select-none group transition-opacity hover:opacity-95 shrink-0 ${className}`}
      data-testid={dataTestId}
      aria-label="pıko — Sve za dom, na jednom mjestu."
    >
      <div className="relative inline-flex items-center">
        <Image
          src={logoSrc}
          alt="pıko"
          width={sizeConfig.width}
          height={sizeConfig.height}
          priority
          className={`w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] ${sizeConfig.className}`}
        />
      </div>

      {withSlogan && (
        <span
          className={`mt-1.5 font-sans font-medium tracking-normal leading-tight ${
            isWhiteLogo ? "text-[#FAF6EC]/70" : "text-[#16140F]/70"
          } ${sizeConfig.slogan}`}
        >
          Sve za dom, na jednom mjestu.
        </span>
      )}
    </LocalizedClientLink>
  )
}
