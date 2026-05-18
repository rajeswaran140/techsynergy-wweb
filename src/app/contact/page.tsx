import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaLinkedin } from "react-icons/fa";
import { SITE_URL } from "@/lib/site";
import { COMPANY } from "@/lib/legal-info";
import { glassCard } from "@/lib/ui-tokens";

const ContactForm = dynamic(
  () => import("@/components/sections/ContactForm"),
  {
    loading: () => (
      <div
        className="animate-pulse rounded-2xl bg-white/40 dark:bg-white/[0.03] border border-white/40 dark:border-white/10 backdrop-blur-xl h-150"
        aria-label="Loading contact form"
      />
    ),
  }
);

export const metadata: Metadata = {
  title: "Contact Us | Get Your Project Quote | TechSynergy",
  description:
    "Get in touch with TechSynergy Corp. Based in Markham, Ontario — we'd love to hear about your project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Get Your Project Quote | TechSynergy",
    description:
      "Get in touch with TechSynergy Corp. Based in Markham, Ontario.",
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Contact TechSynergy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact | TechSynergy",
    description: "Get in touch with TechSynergy Corp.",
    images: ["/og-default.png"],
  },
};

const LINKEDIN_URL = "https://www.linkedin.com/in/rajwaran/";

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_URL}/contact`,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact TechSynergy",
    url: `${SITE_URL}/contact`,
    description:
      "Contact form and channels for getting in touch with TechSynergy Corp about custom software development, AI integration, Canadian-hosted cloud, and related services.",
    mainEntity: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.province,
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${SITE_URL}/contact`,
        areaServed: "CA",
        availableLanguage: ["English"],
      },
      sameAs: [LINKEDIN_URL],
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* Hero */}
      <section className="section-glow py-14 sm:py-18 md:py-22 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Contact TechSynergy
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Based in Markham, Ontario. We respond to every inquiry within one
            business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-glow section-glow-alt py-10 sm:py-14 lg:py-18 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">
                Contact
              </li>
            </ol>
          </nav>

          <ContactForm variant="standalone" />

          {/* Fallback contact channel — for when the form fails or visitor
              prefers a different surface. LinkedIn only for now; email is
              intentionally omitted until a public mailbox (e.g.
              contact@techsynergy.ca) is wired up. */}
          <div className={`${glassCard} mt-10 p-6 sm:p-8`}>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Prefer a different channel?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              If you&apos;d rather reach out on social, connect with our
              founder on LinkedIn — we read and respond to every message.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
            >
              <FaLinkedin className="w-4 h-4" aria-hidden="true" />
              Message on LinkedIn
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
