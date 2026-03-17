import type { Metadata } from "next";
import Link from "next/link";
import LegalAccordion from "@/components/ui/LegalAccordion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TechSynergy Corp privacy policy — how we collect, use, and protect your personal information under PIPEDA.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | TechSynergy",
    description: "How TechSynergy collects, uses, and protects your data under PIPEDA.",
    url: "https://techsynergy.ca/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | TechSynergy",
    description: "How TechSynergy collects, uses, and protects your data under PIPEDA.",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <p>
        TechSynergy Corp (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) is committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your personal information when you visit our website at techsynergy.ca
        or use our services. We comply with Canada&apos;s{" "}
        <em>
          Personal Information Protection and Electronic Documents Act
        </em>{" "}
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
          All personal data is stored on servers located in Canada. We implement industry-standard
          security measures, including:
        </p>
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
        days.
      </p>
    ),
  },
  {
    title: "6. Third-Party Services",
    content: (
      <p>
        We may use third-party service providers — such as cloud hosting
        and analytics tools — to help operate our website and deliver our
        services. These providers are contractually obligated to protect your
        information, process it only for the purposes we specify, and comply
        with applicable privacy laws.
      </p>
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
          in Section 9 below.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies",
    content: (
      <p>
        Our website uses only essential cookies required for proper site
        functionality (such as session management). We do not use tracking
        cookies, third-party advertising cookies, or analytics cookies that
        collect personally identifiable information.
      </p>
    ),
  },
  {
    title: "9. Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy, wish to exercise your
        privacy rights, or would like to file a complaint, please contact us
        at{" "}
        <a
          href="/contact"
          className="text-primary hover:underline font-medium"
        >
          our contact form
        </a>
        . We will respond to all privacy-related inquiries within 30 business
        days.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Last updated: March 17, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            This policy describes how TechSynergy Corp collects, uses, and
            protects your personal information in compliance with PIPEDA. Click
            any section below to expand it.
          </p>

          <LegalAccordion sections={sections} />

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Questions? Reach us at{" "}
              <a
                href="/contact"
                className="text-primary hover:underline"
              >
                our contact form
              </a>
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
