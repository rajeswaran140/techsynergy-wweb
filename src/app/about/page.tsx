import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TechSynergy Corp is a Markham-based software company with 25+ years of experience building privacy-first SaaS products for Canadian businesses.",
  openGraph: {
    title: "About Us | TechSynergy",
    description:
      "A Canadian software company building privacy-first SaaS products from Markham, Ontario.",
  },
};

const values = [
  {
    title: "Privacy First",
    description:
      "Every product we build is designed with data privacy at its core — PIPEDA compliant, Canadian-hosted, and zero data resale.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Canadian Built",
    description:
      "Our team, infrastructure, and data all live in Canada. We believe Canadian businesses deserve Canadian-built software.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ship & Iterate",
    description:
      "We favour working software over perfect plans. Launch fast, measure what matters, and improve continuously.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description:
      "No black boxes. We communicate openly about timelines, trade-offs, and costs — so you always know where things stand.",
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
      {/* Hero */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About TechSynergy
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A Markham-based software company with 25+ years of experience
            building privacy-first SaaS products for Canadian businesses.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Our Story
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            25 Years of Building Software That Matters
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              TechSynergy Corp was founded in Markham, Ontario with a clear
              mission: build software that respects user privacy and serves
              Canadian businesses. Over two decades later, that mission hasn&apos;t
              changed.
            </p>
            <p>
              We started as a consulting firm helping enterprises modernize
              legacy systems. Today, we also ship our own SaaS products —
              including{" "}
              <a href="https://mobily.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Mobily.ca
              </a>{" "}
              (a Canadian URL shortener) and{" "}
              <a href="https://seosync.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                SeoSync.ca
              </a>{" "}
              (an AI-powered SEO audit platform). Every product we build is
              hosted on AWS Canada and designed to be PIPEDA compliant from
              day one.
            </p>
            <p>
              We believe great software is built by small, focused teams that
              care deeply about the craft. No offshore outsourcing, no bloated
              timelines — just experienced engineers shipping real products.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              Our Values
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              What We Stand For
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
            Want to Work With Us?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
            Whether you need a SaaS product built, a cloud migration, or a
            custom API — let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
