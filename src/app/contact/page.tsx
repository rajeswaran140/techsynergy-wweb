import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TechSynergy Corp. Based in Markham, Ontario — we'd love to hear about your project.",
  openGraph: {
    title: "Contact | TechSynergy",
    description:
      "Get in touch with TechSynergy Corp. Based in Markham, Ontario.",
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative bg-primary py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? Send us a message and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact info + form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Sidebar — contact details */}
          <div className="space-y-6 lg:order-last">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Email</p>
                  <a
                    href="mailto:hello@techsynergy.com"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                  >
                    hello@techsynergy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Location</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Markham, Ontario<br />Canada
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Business Hours</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Mon – Fri: 9:00 AM – 6:00 PM EST<br />
                    Sat – Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form — takes 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm variant="standalone" />
          </div>
        </div>
      </div>
    </div>
  );
}
