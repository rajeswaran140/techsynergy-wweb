import type { Metadata } from "next";
import Link from "next/link";
import LegalAccordion from "@/components/ui/LegalAccordion";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import {
  COMPANY,
  LEGAL_LAST_UPDATED_DISPLAY,
} from "@/lib/legal-info";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "TechSynergy Corp terms of service — the terms and conditions governing your use of our website and services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | TechSynergy",
    description:
      "Terms and conditions governing your use of TechSynergy services.",
    url: "https://techsynergy.ca/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | TechSynergy",
    description:
      "Terms and conditions governing your use of TechSynergy services.",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using the {COMPANY.name} website (techsynergy.ca) and
        any services provided by {COMPANY.name} (&ldquo;we,&rdquo;
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
        {COMPANY.name} provides software development, cloud infrastructure,
        AI and Model Context Protocol (MCP) integration, mobile app
        development, API integration, and related technology services.
        Specific project scope, deliverables, timelines, and pricing are
        defined in individual service agreements executed between{" "}
        {COMPANY.name} and the client. These Terms of Service apply in
        addition to any such agreement.
      </p>
    ),
  },
  {
    title: "3. Intellectual Property",
    content: (
      <>
        <p>
          All content on this website — including text, graphics, logos,
          images, and source code — is the property of {COMPANY.name} or its
          licensors and is protected by Canadian and international
          intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, or create derivative
          works from any content on this website without prior written
          permission from {COMPANY.name}.
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
        {COMPANY.name} provides this website and its content on an &ldquo;as
        is&rdquo; and &ldquo;as available&rdquo; basis. We make no
        representations or warranties of any kind — express or implied —
        regarding the accuracy, completeness, reliability, or suitability of
        the content for any particular purpose. Your use of the website is at
        your sole risk.
      </p>
    ),
  },
  {
    title: "6. Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by applicable law, {COMPANY.name}{" "}
        shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages — including but not limited to
        loss of profits, data, or business opportunities — arising from or
        related to your use of, or inability to use, this website or our
        services. Nothing in these Terms limits any liability that cannot be
        excluded under applicable law.
      </p>
    ),
  },
  {
    title: "7. External Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services
        that are not owned or controlled by {COMPANY.name}. We have no
        control over, and assume no responsibility for, the content, privacy
        policies, or practices of any third-party sites. We encourage you to
        review the terms and privacy policies of any external sites you visit.
      </p>
    ),
  },
  {
    title: "8. Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify and hold harmless {COMPANY.name}, its
          officers, directors, employees, and agents from any third-party
          claims, damages, losses, or expenses (including reasonable legal
          fees) arising from:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Your violation of these Terms;</li>
          <li>
            Your unlawful use of our website or services, or use in breach of
            Section 4 (User Conduct);
          </li>
          <li>Your infringement of any third-party rights.</li>
        </ul>
        <p className="mt-2">
          This indemnification does not apply to claims arising from our own
          negligence, willful misconduct, or breach of these Terms.
        </p>
      </>
    ),
  },
  {
    title: "9. Governing Law and Jurisdiction",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws
        of the Province of {COMPANY.province} and the federal laws of{" "}
        {COMPANY.country} applicable therein, without regard to conflict-of-
        law principles. Any disputes arising under these Terms shall be
        subject to the exclusive jurisdiction of the courts located in the
        Province of {COMPANY.province}.
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
        changes constitutes your acceptance of the revised Terms. We
        encourage you to review this page periodically.
      </p>
    ),
  },
  {
    title: "11. Contact",
    content: (
      <p>
        If you have any questions about these Terms of Service, please
        contact us through{" "}
        <Link href="/contact" className="text-primary hover:underline font-medium">
          our contact form
        </Link>
        . {COMPANY.name} is located in {COMPANY.city}, {COMPANY.province},{" "}
        {COMPANY.country}.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-glow py-14 sm:py-18 md:py-22 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Terms of Service
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
            Please read these terms carefully before using our website or
            services. Click any section below to expand it.
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
              href="/privacy"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View Privacy Policy
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
