import Link from "next/link";
import { featuredServices } from "@/lib/services-data";
import { glassCard, glassCardHover, glassChip, glassIconOrb } from "@/lib/ui-tokens";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export default function ServicesPreview() {
  return (
    <section className="section-glow py-12 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Full-Stack Services,{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              End to End
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From first commit to production — we handle the full stack so you
            can focus on growing your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredServices.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`group ${glassCard} ${glassCardHover} p-6 sm:p-7 animate-fade-in-up flex flex-col`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={glassIconOrb(service.color) + " mb-5"}>
                <service.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5 flex-1">
                {service.description.length > 140
                  ? service.description.slice(0, 137) + "…"
                  : service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <span key={h} className={glassChip}>
                    {h}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            View All Services
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
