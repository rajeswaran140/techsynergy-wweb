import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services-data";
import { glassCard, glassCardHover, glassIconOrb } from "@/lib/ui-tokens";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import PageCta from "@/components/ui/PageCta";

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

const BASE_URL = "https://techsynergy.ca";

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${BASE_URL}/services`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TechSynergy Services",
    description:
      "Full-stack SaaS development, AI & MCP integration, Canadian-hosted cloud, mobile apps, and API integrations.",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        url: `${BASE_URL}/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: "TechSynergy Corp",
          url: BASE_URL,
        },
        areaServed: { "@type": "Country", name: "Canada" },
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-primary py-14 sm:py-18 md:py-22 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('/robot_1.jpg')" }}
          aria-hidden="true"
        />
        {/* Lightened overlay so the underlying image actually reads */}
        <div
          className="absolute inset-0 bg-linear-to-br from-primary/45 via-blue-900/40 to-slate-900/55"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Custom Software Development Services
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Privacy-first SaaS development, AI &amp; MCP integration, and
            Canadian-hosted cloud — backed by 25+ years of engineering
            experience.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-glow py-14 sm:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Visible breadcrumb (a11y + UX) */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">
                Services
              </li>
            </ol>
          </nav>

          <div className="space-y-6 sm:space-y-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  id={service.slug}
                  className={`group block ${glassCard} ${glassCardHover} p-6 sm:p-8 lg:p-10 scroll-mt-16`}
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
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                    Learn more about {service.title}
                    <ArrowRightIcon />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to Get Started?"
        body="Tell us about your project and we'll get back to you within one business day."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
      />
    </div>
  );
}
