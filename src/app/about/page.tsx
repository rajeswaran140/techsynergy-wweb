import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TechSynergy | Canadian Software Development",
  description:
    "TechSynergy Corp — founded in 2023 in Markham, Ontario by Raj. 25+ years of experience building privacy-first SaaS products for Canadian businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About TechSynergy | Canadian Software Development",
    description:
      "A Canadian software company building privacy-first SaaS products from Markham, Ontario.",
    url: "https://techsynergy.ca/about",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "About TechSynergy Corp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | TechSynergy Corp",
    description: "Canadian software company building privacy-first SaaS products.",
    images: ["/og-default.png"],
  },
};

const values = [
  {
    title: "Privacy First",
    description:
      "Every product I build is designed with data privacy at its core — PIPEDA compliant, Canadian-hosted, and zero data resale.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Canadian Built",
    description:
      "My infrastructure and data all live in Canada. I believe Canadian businesses deserve Canadian-built software.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ship & Iterate",
    description:
      "I favour working software over perfect plans. Launch fast, measure what matters, and improve continuously.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description:
      "No black boxes. I communicate openly about timelines, trade-offs, and costs — so you always know where things stand.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero — dark navy to match site header */}
      <section className="bg-[#071237] py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About TechSynergy Corp
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2023 by Raj, a self-taught software developer with 25+
            years of experience — building privacy-first SaaS products for
            Canadian businesses.
          </p>
        </div>
      </section>

      {/* Card 1 — Our Story (product screenshots, text right) */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Product showcase instead of stock team photo */}
            <div className="relative h-56 sm:h-72 lg:h-auto lg:min-h-100 bg-linear-to-br from-[#071237] to-slate-800 flex items-center justify-center p-8 sm:p-12">
              <div className="space-y-6 w-full max-w-sm">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
                  <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                    Product
                  </p>
                  <p className="text-lg font-bold text-white mb-1">Mobily.ca</p>
                  <p className="text-sm text-slate-300">
                    Canadian URL shortener with analytics & QR codes
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
                  <p className="text-xs font-medium text-violet-400 uppercase tracking-widest mb-2">
                    Product
                  </p>
                  <p className="text-lg font-bold text-white mb-1">SeoSync.ca</p>
                  <p className="text-sm text-slate-300">
                    AI-powered SEO audits with 34 automated checks
                  </p>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Built, hosted, and operated in Canada
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                My Story
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-5">
                Founded in 2023. Backed by 25+ Years of Experience.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  I&apos;m Raj, and I founded TechSynergy Corp in 2023 in
                  Markham, Ontario. I&apos;m a self-taught software developer
                  with over 25 years of hands-on experience building
                  applications across the full stack.
                </p>
                <p>
                  The mission was clear from day one: build software that
                  respects user privacy and serves Canadian businesses. Today, I
                  ship my own SaaS products —{" "}
                  <a href="https://mobily.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    Mobily.ca
                  </a>{" "}
                  and{" "}
                  <a href="https://seosync.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    SeoSync.ca
                  </a>
                  . Every product is Canadian-hosted and PIPEDA compliant
                  from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card 2 — My Approach (text left, stat right) */}
      <section className="pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                My Approach
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-5">
                One Developer. Full Ownership.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  I believe great software comes from deep ownership — one
                  person who knows every line of code, every deployment, and
                  every business decision behind the product. No handoffs, no
                  miscommunication.
                </p>
                <p>
                  From SaaS product development and cloud infrastructure to API
                  integrations and automation, I handle the full stack so
                  you can focus on growing your business.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Self-Taught
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Privacy-First
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Canadian-Built
                </span>
              </div>
            </div>
            <div className="relative h-56 sm:h-72 lg:h-auto lg:min-h-100 order-1 lg:order-2">
              <div className="absolute inset-0 bg-linear-to-br from-[#071237] to-slate-800 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-2">
                    25+
                  </p>
                  <p className="text-lg sm:text-xl text-slate-300 font-medium">
                    Years of Experience
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Markham, Ontario
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              My Values
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              What I Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Want to Work Together?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
            Whether you need a SaaS product built, a cloud migration, or a
            custom API — let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
