import type { Metadata } from "next";
import Link from "next/link";
import LegalAccordion from "@/components/ui/LegalAccordion";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "TechSynergy Corp terms of service — the terms and conditions governing your use of our website and services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using the TechSynergy Corp website (techsynergy.ca) and
        any services provided by TechSynergy Corp (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by
        these Terms of Service. If you do not agree to these terms, please do
        not use our website or services.
      </p>
    ),
  },
  {
    title: "2. Description of Services",
    content: (
      <p>
        TechSynergy Corp provides software development, cloud infrastructure,
        API integration, and related technology services. Specific project
        scope, deliverables, timelines, and pricing are defined in individual
        service agreements executed between TechSynergy Corp and the client.
        These Terms of Service apply in addition to any such agreement.
      </p>
    ),
  },
  {
    title: "3. Intellectual Property",
    content: (
      <>
        <p>
          All content on this website — including text, graphics, logos, images,
          and source code — is the property of TechSynergy Corp or its
          licensors and is protected by Canadian and international intellectual
          property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, or create derivative works
          from any content on this website without prior written permission from
          TechSynergy Corp.
        </p>
      </>
    ),
  },
  {
    title: "4. User Conduct",
    content: (
      <>
        <p>When using our website and services, you agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Use the website for any unlawful or prohibited purpose.</li>
          <li>
            Attempt to gain unauthorized access to our systems, networks, or
            data.
          </li>
          <li>
            Transmit any malicious code, viruses, or material that could
            interfere with the website&apos;s functionality.
          </li>
          <li>Impersonate any person, entity, or organization.</li>
          <li>
            Collect or harvest personal information from other users without
            their consent.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Disclaimer of Warranties",
    content: (
      <p>
        TechSynergy Corp provides this website and its content on an &ldquo;as
        is&rdquo; and &ldquo;as available&rdquo; basis. We make no
        representations or warranties of any kind — express or implied —
        regarding the accuracy, completeness, reliability, or suitability of the
        content for any particular purpose. Your use of the website is at your
        sole risk.
      </p>
    ),
  },
  {
    title: "6. Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by applicable law, TechSynergy Corp
        shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages — including but not limited to loss
        of profits, data, or business opportunities — arising from or related
        to your use of, or inability to use, this website or our services.
      </p>
    ),
  },
  {
    title: "7. External Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services that
        are not owned or controlled by TechSynergy Corp. We have no control
        over, and assume no responsibility for, the content, privacy policies,
        or practices of any third-party sites. We encourage you to review the
        terms and privacy policies of any external sites you visit.
      </p>
    ),
  },
  {
    title: "8. Indemnification",
    content: (
      <p>
        You agree to indemnify, defend, and hold harmless TechSynergy Corp, its
        officers, directors, employees, and agents from any claims, damages,
        losses, or expenses (including reasonable legal fees) arising from your
        violation of these Terms or your use of our website or services.
      </p>
    ),
  },
  {
    title: "9. Governing Law and Jurisdiction",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of
        the Province of Ontario and the federal laws of Canada applicable
        therein, without regard to conflict-of-law principles. Any disputes
        arising under these Terms shall be subject to the exclusive jurisdiction
        of the courts located in the Province of Ontario.
      </p>
    ),
  },
  {
    title: "10. Changes to These Terms",
    content: (
      <p>
        We reserve the right to update or modify these Terms at any time.
        Changes will be posted on this page with an updated &ldquo;Last
        updated&rdquo; date. Your continued use of the website following any
        changes constitutes your acceptance of the revised Terms. We encourage
        you to review this page periodically.
      </p>
    ),
  },
  {
    title: "11. Contact",
    content: (
      <p>
        If you have any questions about these Terms of Service, please contact
        us at{" "}
        <a
          href="/contact"
          className="text-primary hover:underline font-medium"
        >
          our contact form
        </a>
        .
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Terms of Service
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
            Please read these terms carefully before using our website or
            services. Click any section below to expand it.
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
              href="/privacy"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View Privacy Policy
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
