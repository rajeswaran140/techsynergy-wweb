import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Portfolio | Canadian Client Success Stories",
  description:
    "See the products and projects TechSynergy has built — from SaaS platforms to cloud infrastructure.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Our Portfolio | Canadian Client Success Stories",
    description: "Products and projects built by TechSynergy Corp.",
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
    description: "Products and projects built by TechSynergy Corp.",
    images: ["/og-default.png"],
  },
};

const projects = [
  {
    name: "TalkyMobile.ca",
    category: "SaaS Product",
    description:
      "International mobile credit transfer service sending prepaid airtime and data bundles to 150+ countries. Instant delivery in 5-30 seconds with transparent pricing, bank-level security, and 99.9% uptime.",
    tech: ["Payment Processing", "API Integration", "Multi-Currency", "Global Network"],
    href: "https://talkymobile.ca",
    color: "from-orange-600 to-amber-500",
  },
  {
    name: "WebCore.ca",
    category: "SaaS Product",
    description:
      "Canadian managed WordPress hosting with automated 6-minute setup, enterprise security, and PIPEDA compliance. Plans from $9/month with 24/7 support, free SSL, and WooCommerce optimization.",
    tech: ["WordPress Hosting", "Enterprise Security", "Canadian Data Centers", "Managed Infrastructure"],
    href: "https://webcore.ca",
    color: "from-emerald-600 to-teal-500",
  },
  {
    name: "Mobily.ca",
    category: "SaaS Product",
    description:
      "A Canadian URL shortener with custom branded links, real-time analytics, QR code generation, and password-protected links. PIPEDA compliant, Canadian-hosted.",
    tech: ["Web App", "Analytics", "QR Generation", "CDN"],
    href: "https://mobily.ca",
    color: "from-blue-600 to-cyan-500",
  },
  {
    name: "SeoSync.ca",
    category: "SaaS Product",
    description:
      "An AI-powered SEO audit platform running 34 automated checks per audit, with daily SERP tracking, competitor analysis, and AI-generated fix suggestions. Canadian-hosted.",
    tech: ["Web App", "AI-Powered", "Cloud Infrastructure", "SEO Analytics"],
    href: "https://seosync.ca",
    color: "from-violet-600 to-purple-500",
  },
  {
    name: "TechSynergy.ca",
    category: "Company Website",
    description:
      "This website — a modern web application with server-side rendering, lazy-loaded animations, and responsive design. Canadian-hosted.",
    tech: ["Modern Web Stack", "SSR", "Responsive Design", "Cloud Hosting"],
    href: "https://techsynergy.ca",
    color: "from-primary to-blue-400",
  },
];

export default function PortfolioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 py-14 sm:py-18 md:py-22 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/coding_4.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-blue-900/60 to-slate-900/80" />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Portfolio
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Products and projects we&apos;ve designed, built, and shipped.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project) => (
              <div
                key={project.name}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 lg:p-10 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${project.color}`}
                />

                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
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
