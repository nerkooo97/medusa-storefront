import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google"
import "styles/globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "pıko | Sve za dom, na jednom mjestu.",
    template: "%s | pıko",
  },
  description:
    "pıko (piko.ba) — Vaša online trgovina mašina i alata. Sve za dom, na jednom mjestu.",
  icons: {
    icon: [
      { url: "/piko-favicon.png" },
      { url: "/piko-favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/piko-favicon.png",
    apple: "/piko-favicon.png",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="bs"
      data-mode="light"
      className={`${plusJakartaSans.variable} ${bricolageGrotesque.variable}`}
    >
      <body className="font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}

