import Link from "next/link";
import { glassCard, glassCardHover } from "@/lib/ui-tokens";

const products = [
  {
    name: "Crowvault.ai",
    tagline: "API-First Code Generation Platform",
    description:
      "327 production-ready developer tools for scaffolding microservices, databases, APIs, and CI/CD pipelines. Schema-validated, deterministic output — built on MCP.",
    href: "https://crowvault.ai",
    color: "from-indigo-600 to-violet-500",
  },
  {
    name: "Talky.ca",
    tagline: "Enterprise SMS & SMPP Reseller Platform",
    description:
      "Canadian-hosted SMS gateway with SMPP support and reseller-ready APIs for transactional and marketing messages at carrier-grade reliability.",
    href: "https://talky.ca",
    color: "from-rose-600 to-pink-500",
    disabled: true,
  },
  {
    name: "Mobily.ca",
    tagline: "Canadian URL Shortener & Analytics",
    description:
      "Custom branded short links, real-time click analytics, and QR codes — all PIPEDA compliant and hosted in Canada.",
    href: "https://mobily.ca",
    color: "from-blue-600 to-cyan-500",
  },
  {
    name: "SeoSync.ca",
    tagline: "AI-Powered SEO Audit Platform",
    description:
      "34 automated SEO checks, daily SERP tracking, and AI-generated fix suggestions — Canadian-hosted.",
    href: "https://seosync.ca",
    color: "from-violet-600 to-purple-500",
    disabled: true,
  },
];

export default function ProductsPreview() {
  const visibleProducts = products.filter((p) => !p.disabled);

  return (
    <section className="section-glow section-glow-alt py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Our Products
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Privacy-First SaaS,{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Built in Canada
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We don&apos;t just build software for clients — we ship our own
            products, designed and hosted in Canada.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {visibleProducts.map((product, i) => (
            <div
              key={product.name}
              className={`group ${glassCard} ${glassCardHover} p-6 sm:p-8 animate-fade-in-up overflow-hidden`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Gradient top accent — pinned to the inner card edge, not the section */}
              <div
                className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${product.color}`}
                aria-hidden="true"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-primary mb-3">
                {product.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {product.description}
              </p>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r ${product.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-black/10`}
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
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            See all products
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
      </div>
    </section>
  );
}
