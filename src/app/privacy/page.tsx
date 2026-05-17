import type { Metadata } from "next";
import Link from "next/link";
import LegalAccordion from "@/components/ui/LegalAccordion";
import {
  COMPANY,
  LEGAL_LAST_UPDATED_DISPLAY,
} from "@/lib/legal-info";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TechSynergy Corp privacy policy — how we collect, use, and protect your personal information under PIPEDA.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | TechSynergy",
    description:
      "How TechSynergy collects, uses, and protects your data under PIPEDA.",
    url: "https://techsynergy.ca/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | TechSynergy",
    description:
      "How TechSynergy collects, uses, and protects your data under PIPEDA.",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <p>
        {COMPANY.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) is committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your personal information when you visit our website at techsynergy.ca
        or use our services. We comply with Canada&apos;s{" "}
        <em>Personal Information Protection and Electronic Documents Act</em>{" "}
        (PIPEDA) and applicable provincial privacy legislation.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Contact details
            </strong>{" "}
            — name, email address, and phone number submitted through our
            contact form.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Project information
            </strong>{" "}
            — company name and project details you choose to share with us.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Technical data
            </strong>{" "}
            — IP address, browser type, operating system, and device
            information collected automatically via server logs.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Analytics data
            </strong>{" "}
            — page views, session duration, and aggregated usage metrics
            collected via Google Analytics 4 as described in Section 8.
          </li>
        </ul>
        <p className="mt-2">
          We do not collect sensitive personal information such as financial
          data, government-issued identification numbers, or health records
          through this website.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Respond to your inquiries and provide requested services.</li>
          <li>
            Improve and maintain the functionality of our website and services.
          </li>
          <li>
            Send relevant communications about our services, but only with your
            explicit consent.
          </li>
          <li>Comply with applicable legal and regulatory obligations.</li>
          <li>Protect against fraud, abuse, or unauthorized access.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Data Storage and Security",
    content: (
      <>
        <p>
          The marketing site itself and the data we collect through it
          (contact-form submissions, account data, and server logs) are stored
          on infrastructure located in Canada — specifically AWS
          ca-central-1 (Toronto).
        </p>
        <p>
          Analytics data is processed by Google as described in Sections 6 and
          8. Google may process this data on servers located outside of
          Canada, including in the United States.
        </p>
        <p>We implement industry-standard security measures, including:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Encryption in transit via TLS 1.2 or higher.</li>
          <li>Encryption at rest for stored data.</li>
          <li>
            Access controls limited to authorized personnel on a
            need-to-know basis.
          </li>
          <li>Regular security reviews and infrastructure monitoring.</li>
        </ul>
        <p className="mt-2">
          We do not sell, trade, or rent your personal information to third
          parties under any circumstances.
        </p>
      </>
    ),
  },
  {
    title: "5. Data Retention",
    content: (
      <p>
        We retain personal information only for as long as necessary to fulfil
        the purposes for which it was collected, or as required by law.
        Contact-form submissions are retained for up to 24 months unless you
        request earlier deletion. Technical log data is retained for up to 90
        days. Analytics data retention follows Google Analytics 4&apos;s
        configured retention period (default 14 months).
      </p>
    ),
  },
  {
    title: "6. Third-Party Service Providers",
    content: (
      <>
        <p>
          We use the following third-party service providers to operate our
          website and services:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Amazon Web Services (AWS)
            </strong>{" "}
            — hosting (ca-central-1, Canada), transactional email via Amazon
            SES, and database storage via Amazon DynamoDB.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Google LLC
            </strong>{" "}
            — website analytics via Google Tag Manager and Google Analytics 4,
            as detailed in Section 8. Google may process this data in the
            United States.
          </li>
        </ul>
        <p className="mt-2">
          These providers are contractually obligated to protect your
          information and process it only for the purposes we specify. Each
          provider maintains its own privacy policy governing how it handles
          data on our behalf.
        </p>
      </>
    ),
  },
  {
    title: "7. Your Rights Under PIPEDA",
    content: (
      <>
        <p>Under PIPEDA, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Access
            </strong>{" "}
            the personal information we hold about you.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Correct
            </strong>{" "}
            any inaccurate or incomplete information.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Withdraw consent
            </strong>{" "}
            for the processing of your personal data at any time.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Request deletion
            </strong>{" "}
            of your personal data, subject to legal retention requirements.
          </li>
        </ul>
        <p className="mt-2">
          To exercise any of these rights, please contact us using the details
          in Section 10 below.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies and Analytics",
    content: (
      <>
        <p>Our website uses the following categories of cookies:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Essential cookies
            </strong>{" "}
            — required for proper site functionality, such as session
            management and security. These cookies do not require consent.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              Analytics cookies
            </strong>{" "}
            — we use Google Analytics 4, loaded via Google Tag Manager, to
            understand how visitors use our site. These cookies collect IP
            addresses, page views, session duration, and device / browser
            metadata. Data is processed by Google and may be transferred to
            and stored in the United States.
          </li>
        </ul>
        <p className="mt-2">
          We do not use third-party advertising cookies, retargeting pixels,
          or social-media tracking trackers.
        </p>
        <p className="mt-2">
          <strong className="text-slate-800 dark:text-slate-100">
            Opting out of analytics:
          </strong>{" "}
          you can opt out of Google Analytics at any time by installing
          Google&apos;s opt-out browser add-on
          (tools.google.com/dlpage/gaoptout), using your browser&apos;s
          built-in cookie controls, or using a browser extension that blocks
          analytics scripts.
        </p>
      </>
    ),
  },
  {
    title: "9. International Visitors",
    content: (
      <>
        <p>
          Our services are operated from Canada. We welcome visitors from any
          jurisdiction; however, depending on where you are located,
          additional privacy laws may apply:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              EEA, UK, and Switzerland
            </strong>{" "}
            — where we process personal data of individuals in these
            jurisdictions, our legal basis is your consent (for analytics) or
            our legitimate interest in responding to your inquiry (for
            contact-form submissions). Cross-border transfers to Google in the
            United States rely on Google&apos;s applicable transfer mechanisms,
            including the EU–US Data Privacy Framework and Standard
            Contractual Clauses.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-100">
              All visitors
            </strong>{" "}
            — regardless of your location, you may exercise access,
            correction, and deletion rights as described in Section 7.
          </li>
        </ul>
        <p className="mt-2">
          If you are an EEA, UK, or Swiss resident and have a complaint about
          our handling of your data, you may also lodge a complaint with your
          local data-protection authority.
        </p>
      </>
    ),
  },
  {
    title: "10. Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy, wish to exercise your
        privacy rights, or would like to file a complaint, please contact us
        through{" "}
        <Link href="/contact" className="text-primary hover:underline font-medium">
          our contact form
        </Link>
        . We will respond to all privacy-related inquiries within 30 business
        days. {COMPANY.name} is located in {COMPANY.city}, {COMPANY.province},{" "}
        {COMPANY.country}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-glow py-14 sm:py-18 md:py-22 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Last updated: {LEGAL_LAST_UPDATED_DISPLAY}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-glow section-glow-alt py-12 sm:py-18 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            This policy describes how {COMPANY.name} collects, uses, and
            protects your personal information in compliance with PIPEDA.
            Click any section below to expand it.
          </p>

          <LegalAccordion sections={sections} />

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Questions? Reach us through{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact form
              </Link>
              .
            </p>
            <Link
              href="/terms"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View Terms of Service
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
    </div>
  );
}
