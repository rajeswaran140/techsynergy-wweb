import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services-data";
import { glassCard, glassIconOrb } from "@/lib/ui-tokens";

export const metadata: Metadata = {
  title: "Custom Software Development Services | TechSynergy",
  description:
    "Full-stack SaaS development, AI & MCP integration, Canadian-hosted cloud, mobile apps, and API integrations. 25+ years experience, PIPEDA-compliant.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Custom Software Development Services | TechSynergy",
    description:
      "End-to-end software services from a Canadian company with 25+ years of experience.",
    url: "https://techsynergy.ca/services",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | TechSynergy",
    description:
      "Full-stack SaaS development, AI integration, and cloud infrastructure services.",
    images: ["/og-default.png"],
  },
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary py-14 sm:py-18 md:py-22 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/robot_1.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/70 via-blue-900/65 to-slate-900/75" />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            End-to-end software services for Canadian businesses — from first
            commit to production.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-glow py-14 sm:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className={`${glassCard} p-6 sm:p-8 lg:p-10 scroll-mt-20`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={glassIconOrb(service.color)}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-1">
                    {service.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <svg
                        className="w-4 h-4 text-primary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Learn more about {service.title}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-glow section-glow-alt py-14 sm:py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
