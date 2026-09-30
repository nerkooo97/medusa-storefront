import React from "react"
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react"

export const TRUST_FEATURES = [
  {
    title: "Brza dostava",
    description: "Besplatna dostava za sve narudžbe preko 100,00 KM.",
    icon: Truck,
  },
  {
    title: "Ovlaštena garancija",
    description: "Do 3 godine tvorničke garancije uz osiguran servis.",
    icon: ShieldCheck,
  },
  {
    title: "Fleksibilno plaćanje",
    description: "Gotovinom pouzećem, karticama ili virmanom.",
    icon: CreditCard,
  },
  {
    title: "Korisnička podrška",
    description: "Stručni savjeti našeg tima pri odabiru opreme.",
    icon: Headphones,
  },
]

export default function TrustBar() {
  return (
    <section className="content-container py-3 sm:py-5 overflow-hidden">
      {/* Horizontalni Carousel na mobitelima/manjim ekranima (swipe sa snap poravnanjem) | Grid na desktopu (lg+) */}
      <div
        className="flex lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4.5 overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory pb-2 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {TRUST_FEATURES.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-[#16140F] border border-white/10 p-5 sm:p-6 shadow-sm hover:border-[#FFC915] hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[150px] sm:min-h-[170px] shrink-0 w-[84vw] max-w-[320px] sm:w-[320px] lg:w-auto snap-start"
            >
              {/* 1. Tekstualni sadržaj (gore i lijevo u svijetloj boji) */}
              <div className="relative z-10 pr-16 sm:pr-22">
                <h4 className="font-heading font-bold text-sm sm:text-base text-[#FAF6EC] tracking-tight leading-snug">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-[#FAF6EC]/70 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* 2. Znatno veća ikona u donjem desnom uglu - cijela unutar carda */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 pointer-events-none select-none text-[#FFC915] transition-all duration-300 group-hover:scale-105">
                <Icon className="size-16 sm:size-20 stroke-[1.6] opacity-85 group-hover:opacity-100" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
