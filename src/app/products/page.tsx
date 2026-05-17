import type { Metadata } from "next";
import Link from "next/link";
import { enabledProducts } from "@/lib/products-data";
import { glassCard, glassCardHover } from "@/lib/ui-tokens";

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

export default function ProductsPage() {
  return (
    <section className="section-glow py-16 sm:py-24 lg:py-28 overflow-hidden">
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
          {enabledProducts.map((product) => (
            <div
              key={product.slug}
              className={`group ${glassCard} ${glassCardHover} p-6 sm:p-8 lg:p-10 overflow-hidden`}
            >
              <div
                className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${product.color}`}
                aria-hidden="true"
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
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-white/[0.04] border border-white/40 dark:border-white/10 rounded-lg px-3 py-2 mb-5 sm:mb-6 inline-block">
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
              ) : product.href ? (
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
              ) : null}
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
