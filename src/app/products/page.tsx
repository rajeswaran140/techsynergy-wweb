import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Privacy-first SaaS products built by TechSynergy — Mobily.ca for Canadian link shortening and analytics, and SeoSync.ca for AI-powered SEO audits.",
};

const products = [
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
      "Canadian data residency (AWS Canada)",
    ],
    pricing: "Free — 3 audits/mo. Pro from $49 CAD/mo.",
    href: "https://seosync.ca",
    color: "from-violet-600 to-purple-500",
  },
];

export default function ProductsPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Our Products
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy-First SaaS,{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Built in Canada
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We don&apos;t just build software for clients — we ship our own
            products. Each one is designed, developed, and hosted in Canada.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8 sm:p-10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-linear-to-r ${product.color}`}
              />

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-primary mb-4">
                {product.tagline}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {product.description}
              </p>

              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 mb-6 inline-block">
                {product.pricing}
              </p>

              <ul className="space-y-2.5 mb-8">
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

              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r ${product.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg`}
              >
                Visit {product.name}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Have an idea for a product? Let&apos;s talk.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
