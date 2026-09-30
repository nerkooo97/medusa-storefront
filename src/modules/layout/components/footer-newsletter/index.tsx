"use client"

import React, { useState } from "react"
import { Mail, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { footerConfig } from "@/config/footer"

export default function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const config = footerConfig.newsletter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#211E18] p-6 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header: Mail icon + Title */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex items-center justify-center size-6 rounded-md text-primary">
            <Mail className="size-5 stroke-[2]" />
          </div>
          <h3 className="text-base font-bold text-[#FAF6EC] tracking-tight">
            {config.title}
          </h3>
        </div>

        {/* Input Form with Arrow Submit */}
        {isSubmitted ? (
          <div className="py-3 px-3 bg-white/10 rounded-lg text-xs text-[#FAF6EC] font-medium mb-4">
            Hvala vam na prijavi na naš newsletter!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="relative flex items-center border-b border-white/20 pb-1.5 focus-within:border-primary transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.placeholder}
                className="w-full bg-transparent text-xs text-[#FAF6EC] placeholder:text-[#FAF6EC]/50 outline-none pr-8 py-1"
              />
              <button
                type="submit"
                aria-label={config.buttonAriaLabel}
                className="absolute right-0 text-primary hover:opacity-80 transition-opacity p-1 cursor-pointer"
              >
                <ChevronRight className="size-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}

        {/* Disclaimer / Privacy Text */}
        <p className="text-[11px] text-[#FAF6EC]/60 leading-relaxed">
          {config.disclaimer}
          <LocalizedClientLink
            href={config.termsHref}
            className="text-[#FAF6EC] underline underline-offset-2 hover:text-primary transition-colors ml-1"
          >
            {config.termsText}
          </LocalizedClientLink>
          .
        </p>
      </div>
    </div>
  )
}
