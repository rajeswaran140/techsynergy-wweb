import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TechSynergy Corp terms of service — the rules governing use of our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div>
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Last updated: March 17, 2026
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            By accessing or using the TechSynergy Corp website
            (techsynergy.ca) and any services provided by TechSynergy Corp
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use our
            website or services.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            2. Services
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            TechSynergy Corp provides software development, cloud
            infrastructure, and related technology services. Specific project
            terms, deliverables, timelines, and pricing are defined in
            individual service agreements between TechSynergy Corp and the
            client.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            All content on this website — including text, graphics, logos, and
            code — is the property of TechSynergy Corp and is protected by
            Canadian intellectual property laws. You may not reproduce,
            distribute, or create derivative works from our content without
            written permission.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            4. User Conduct
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-1 mb-6">
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Transmit malicious code or interfere with website functionality</li>
            <li>Impersonate any person or entity</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            TechSynergy Corp provides this website and its content on an
            &ldquo;as is&rdquo; basis. We make no warranties, express or implied,
            regarding the accuracy, completeness, or reliability of the
            content. To the fullest extent permitted by law, TechSynergy Corp
            shall not be liable for any indirect, incidental, or consequential
            damages arising from your use of the website.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            6. External Links
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Our website may contain links to third-party websites. We are not
            responsible for the content or practices of these external sites
            and encourage you to review their terms and privacy policies.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            7. Governing Law
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            These Terms are governed by and construed in accordance with the
            laws of the Province of Ontario and the federal laws of Canada
            applicable therein. Any disputes shall be resolved in the courts
            of Ontario.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            We may update these Terms from time to time. Changes will be posted
            on this page with an updated &ldquo;Last updated&rdquo; date. Continued use
            of the website after changes constitutes acceptance of the revised
            terms.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            9. Contact
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Questions about these Terms? Contact us at{" "}
            <a href="mailto:hello@techsynergy.ca" className="text-primary hover:underline">
              hello@techsynergy.ca
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
