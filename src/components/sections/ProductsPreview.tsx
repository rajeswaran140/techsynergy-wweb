import Link from "next/link";
import { featuredProducts } from "@/lib/products-data";
import { glassCard, glassCardHover } from "@/lib/ui-tokens";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export default function ProductsPreview() {
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
          {featuredProducts.map((product, i) => (
            <div
              key={product.slug}
              className={`group ${glassCard} ${glassCardHover} p-6 sm:p-8 animate-fade-in-up overflow-hidden`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
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
                {product.shortDescription}
              </p>
              {product.href && (
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
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            See all products
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
