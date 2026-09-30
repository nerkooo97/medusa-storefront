import React from "react"

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#F5F6F8] min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-border/50 shadow-xs p-6 sm:p-10 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}
