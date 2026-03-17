import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TechSynergy Corp privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Last updated: March 17, 2026
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0 mb-4">
            1. Introduction
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            TechSynergy Corp (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, and safeguard your personal information when you visit
            our website at techsynergy.ca or use our services. We comply with
            Canada&apos;s Personal Information Protection and Electronic
            Documents Act (PIPEDA).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            2. Information We Collect
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
            We may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-1 mb-6">
            <li>Name, email address, and phone number when you submit our contact form</li>
            <li>Company name and project details you provide voluntarily</li>
            <li>Technical data such as IP address, browser type, and device information collected automatically via server logs</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-1 mb-6">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To improve our website and user experience</li>
            <li>To send relevant communications (only with your consent)</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            4. Data Storage and Security
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            All data is stored on servers located in Canada (AWS ca-central-1).
            We implement industry-standard security measures including
            encryption in transit (TLS) and at rest. We do not sell, trade, or
            rent your personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            5. Third-Party Services
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            We may use third-party services (such as AWS, analytics tools) that
            process data on our behalf. These providers are contractually
            obligated to protect your information and only use it for the
            purposes we specify.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            6. Your Rights
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
            Under PIPEDA, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-1 mb-6">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Withdraw consent for data processing</li>
            <li>Request deletion of your personal data</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            7. Cookies
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Our website may use essential cookies to ensure proper functionality.
            We do not use tracking cookies or third-party advertising cookies.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            8. Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            If you have questions about this Privacy Policy or wish to exercise
            your rights, please contact us at{" "}
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
