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

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <ContactForm variant="standalone" />
      </div>
    </div>
  );
}
