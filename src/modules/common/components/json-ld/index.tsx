import React from "react"

type JsonLdProps = {
  data: Record<string, any> | Array<Record<string, any>>
}

/**
 * Komponenta za ubacivanje Schema.org Structured Data (JSON-LD)
 * prema Google Search i Schema.org specifikaciji.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
