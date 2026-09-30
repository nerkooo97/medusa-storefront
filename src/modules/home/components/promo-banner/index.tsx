import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImagePlaceholder from "@modules/common/components/image-placeholder"
import { homeConfig } from "@/config/home"
import { PhoneCall, CheckCircle2, ArrowRight } from "lucide-react"

export default function PromoBanner() {
  const { promoBanner } = homeConfig

  return (
    <section className="content-container py-6 sm:py-10">
      <div className="bg-[#16140F] text-[#FAF6EC] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {promoBanner.badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FFC915] text-[#16140F] text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
                {promoBanner.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FAF6EC] tracking-tight leading-tight font-heading">
              {promoBanner.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#FAF6EC]/80 max-w-xl leading-relaxed">
              {promoBanner.description}
            </p>

            {/* Bullet points */}
            {promoBanner.bulletPoints && promoBanner.bulletPoints.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6 text-xs sm:text-sm text-[#FAF6EC]/85">
                {promoBanner.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#FFC915] shrink-0 stroke-[2.2]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {promoBanner.primaryCta && (
                <LocalizedClientLink
                  href={promoBanner.primaryCta.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFC915] hover:bg-[#FFC915]/90 text-[#16140F] font-bold text-sm shadow-xs transition-all active:scale-[0.98]"
                >
                  <span>{promoBanner.primaryCta.text}</span>
                  <ArrowRight className="size-4 stroke-[2.2]" />
                </LocalizedClientLink>
              )}

              {promoBanner.phone && (
                <a
                  href={`tel:${promoBanner.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF6EC] font-semibold text-sm transition-all"
                >
                  <PhoneCall className="size-4 text-[#FFC915]" />
                  <span>{promoBanner.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Image Placeholder Column */}
          <div className="lg:col-span-5">
            <ImagePlaceholder
              imageUrl={promoBanner.imageUrl}
              alt={promoBanner.title}
              label={
                promoBanner.placeholderLabel ||
                "Placeholder: Industrijska oprema i radionica"
              }
              aspectRatio="aspect-[4/3]"
              className="!bg-white/5 !border-white/20 !text-white/80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
