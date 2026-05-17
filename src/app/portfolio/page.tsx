import type { Metadata } from "next";
import Link from "next/link";
import { enabledProducts } from "@/lib/products-data";
import { glassCard, glassCardHover, glassChip } from "@/lib/ui-tokens";

export const metadata: Metadata = {
  title: "Our Portfolio | Products & Projects by TechSynergy",
  description:
    "Products and projects designed, built, and shipped by TechSynergy Corp — privacy-first SaaS, Canadian-hosted infrastructure, and the company website itself.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Our Portfolio | Products & Projects by TechSynergy",
    description:
      "Products and projects designed, built, and shipped by TechSynergy Corp.",
    url: "https://techsynergy.ca/portfolio",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | TechSynergy",
    description:
      "Products and projects designed, built, and shipped by TechSynergy Corp.",
    images: ["/og-default.png"],
  },
};

/**
 * Meta-entry for the company website itself — not a product so it doesn't
 * belong in products-data. Inline here because /portfolio is the only
 * surface that lists it.
 */
const metaEntry = {
  slug: "techsynergy-ca",
  name: "TechSynergy.ca",
  category: "Company Website",
  description:
    "This website — a modern Next.js 16 App Router application with React 19 server components, Tailwind 4 glass styling, statically generated routes, and Canadian-hosted infrastructure via AWS Amplify in ca-central-1.",
  portfolioTags: [
    "Next.js 16",
    "React 19",
    "Tailwind 4",
    "SSR + SSG",
    "AWS Amplify (ca-central-1)",
  ],
  href: "https://techsynergy.ca",
  color: "from-primary to-blue-400",
  comingSoon: false,
};

export default function PortfolioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 py-14 sm:py-18 md:py-22 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/coding_4.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-primary/70 via-blue-900/60 to-slate-900/80"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Portfolio
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Products and projects we&apos;ve designed, built, and shipped — each
            one Canadian-hosted and engineered for the long haul.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="section-glow py-14 sm:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {enabledProducts.map((project) => (
              <div
                key={project.slug}
                className={`${glassCard} ${glassCardHover} p-6 sm:p-8 lg:p-10 overflow-hidden`}
              >
                <div
                  className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${project.color}`}
                  aria-hidden="true"
                />

                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                  SaaS Product
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {project.portfolioTags && project.portfolioTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.portfolioTags.map((t) => (
                      <span key={t} className={glassChip}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {project.comingSoon ? (
                  <span
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r ${project.color} text-white font-semibold text-sm shadow-md cursor-default`}
                  >
                    Coming Soon
                  </span>
                ) : project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r ${project.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}
                  >
                    Visit {project.name}
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

            {/* Meta-entry — the company website itself */}
            <div
              className={`${glassCard} ${glassCardHover} p-6 sm:p-8 lg:p-10 overflow-hidden`}
            >
              <div
                className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${metaEntry.color}`}
                aria-hidden="true"
              />
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                {metaEntry.category}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {metaEntry.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {metaEntry.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {metaEntry.portfolioTags.map((t) => (
                  <span key={t} className={glassChip}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={metaEntry.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r ${metaEntry.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}
              >
                Visit {metaEntry.name}
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-glow section-glow-alt py-14 sm:py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
            We&apos;d love to hear about it. Let&apos;s discuss how we can
            bring your idea to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
