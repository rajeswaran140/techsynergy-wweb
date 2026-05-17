import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy-First SaaS Products | Built in Canada",
  description:
    "Privacy-first SaaS products built and hosted in Canada by TechSynergy — agentic developer tools, enterprise messaging, and link analytics.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Privacy-First SaaS Products | Built in Canada",
    description:
      "Privacy-first SaaS products built and hosted in Canada by TechSynergy.",
    url: "https://techsynergy.ca/products",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | TechSynergy",
    description: "Privacy-first SaaS products built and hosted in Canada.",
    images: ["/og-default.png"],
  },
};

const products = [
  {
    name: "Crowvault.ai",
    tagline: "Built for Developers Who Ship",
    description:
      "API-first code generation platform with 327 production-ready tools for scaffolding microservices, databases, APIs, CI/CD pipelines, and DDD patterns. Schema-validated generators produce deterministic, AI-enhanced output — same input, same result, every time.",
    features: [
      "327 production-ready dev tools",
      "Microservices, DB schemas, K8s configs",
      "OpenAPI / GraphQL / gRPC specs",
      "CI/CD pipelines & DDD patterns",
      "9 specialized MCP servers",
      "REST API + optional CLI/SDKs",
    ],
    pricing: "Contact for access.",
    href: "https://crowvault.ai",
    color: "from-indigo-600 to-violet-500",
  },
  {
    name: "Talky.ca",
    tagline: "Enterprise SMS & SMPP Reseller Platform",
    description:
      "Canadian-hosted SMS gateway with SMPP support and reseller-ready APIs. Built for businesses and resellers delivering transactional and marketing messages at carrier-grade reliability.",
    features: [
      "Enterprise SMS API",
      "SMPP gateway support",
      "Reseller-friendly platform",
      "Carrier-grade delivery",
      "Canadian-hosted infrastructure",
      "Transactional & marketing messaging",
    ],
    pricing: "Contact for volume pricing.",
    href: "https://talky.ca",
    color: "from-rose-600 to-pink-500",
  },
  {
    name: "TalkyMobile.ca",
    tagline: "Send Mobile Credit & Data In Seconds",
    description:
      "International mobile top-up and eSIM service delivering prepaid airtime and data bundles to 150+ countries. Instant delivery in 5-30 seconds with transparent pricing, bank-level security, and multi-provider reliability.",
    features: [
      "Mobile top-ups to 150+ countries",
      "Data bundles in 80+ countries",
      "eSIM plans & digital SIM cards",
      "Instant 5-30 second delivery",
      "PCI DSS compliant & SSL encrypted",
      "99.9% uptime guarantee",
    ],
    pricing: "Transparent pricing. No subscriptions or hidden fees.",
    href: "https://talkymobile.ca",
    color: "from-orange-600 to-amber-500",
    disabled: true,
  },
  {
    name: "WebCore.ca",
    tagline: "Launch Your WordPress Site in 6 Minutes",
    description:
      "Canadian managed WordPress hosting with automated setup, enterprise-grade security, and PIPEDA compliance. Built for Canadian businesses who need reliable hosting without the complexity.",
    features: [
      "6-minute automated site setup",
      "Enterprise security & SSL included",
      "Canadian data centers (PIPEDA compliant)",
      "WooCommerce optimization",
      "24/7 phone & email support",
      "30-day money-back guarantee",
    ],
    pricing: "Plans from $9 CAD/mo. Free migration included.",
    href: "https://webcore.ca",
    color: "from-emerald-600 to-teal-500",
    disabled: true,
  },
  {
    name: "Mobily.ca",
    tagline: "Shorten Links Without Compromising Privacy",
    description:
      "A Canadian URL shortener with custom branded links, real-time click analytics, and QR code generation. All data hosted in Canada and PIPEDA compliant from day one — no data sold to third parties.",
    features: [
      "Custom branded short links",
      "Real-time click & device analytics",
      "QR code generation",
      "Password protection & auto-expiration",
      "REST API for automation",
      "PIPEDA compliant, Canadian-hosted",
    ],
    pricing: "Free — 50 links forever. Plans from $19 CAD/mo.",
    href: "https://mobily.ca",
    color: "from-blue-600 to-cyan-500",
  },
  {
    name: "SeoSync.ca",
    tagline: "AI-Powered SEO Audits, Built in Canada",
    description:
      "The first Canadian-built SEO audit platform. Run 34 automated checks across meta tags, content, links, and Core Web Vitals — then get AI-powered fixes you can copy-paste into your site.",
    features: [
      "34 automated SEO checks per audit",
      "Daily SERP position tracking",
      "AI-generated fix suggestions",
      "Competitor gap analysis",
      "Core Web Vitals monitoring",
      "Canadian data residency",
    ],
    pricing: "Free — 3 audits/mo. Pro from $49 CAD/mo.",
    href: "https://seosync.ca",
    color: "from-violet-600 to-purple-500",
    disabled: true,
  },
  {
    name: "Telexier.com",
    tagline: "Coming Soon",
    description:
      "Next-generation telecom and messaging platform — details coming soon.",
    features: [],
    pricing: "",
    href: "",
    color: "from-amber-600 to-yellow-500",
    comingSoon: true,
  },
];

export default function ProductsPage() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Our Products
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy-First SaaS,{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Built in Canada
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            We don&apos;t just build software for clients — we ship our own
            products. Each one is designed, developed, and hosted in Canada.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2">
          {products.filter((product) => !product.disabled).map((product) => (
            <div
              key={product.name}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 lg:p-10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${product.color}`}
              />

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-primary mb-3 sm:mb-4">
                {product.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                {product.description}
              </p>

              {product.pricing && (
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 mb-5 sm:mb-6 inline-block">
                  {product.pricing}
                </p>
              )}

              {product.features.length > 0 && (
                <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
                  {product.features.map((feature) => (
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
              )}

              {product.comingSoon ? (
                <span
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-linear-to-r ${product.color} text-white font-semibold text-sm shadow-lg w-full sm:w-auto justify-center sm:justify-start cursor-default`}
                >
                  Coming Soon
                </span>
              ) : (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-linear-to-r ${product.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto justify-center sm:justify-start`}
                >
                  Visit {product.name}
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Want to learn how our products can help your business?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
