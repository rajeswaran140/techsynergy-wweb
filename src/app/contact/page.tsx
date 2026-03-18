import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

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
    url: "https://techsynergy.ca/contact",
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

export default function ContactPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Get in Touch
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        <ContactForm variant="standalone" />
      </div>
    </div>
  );
}
