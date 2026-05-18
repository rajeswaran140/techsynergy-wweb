import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-12 sm:py-24 bg-linear-to-r from-primary to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up">
          Let&apos;s Build Something Together
        </h2>

        <p
          className="text-blue-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          Whether you need a SaaS product, cloud migration, or custom API —
          we&apos;re ready to help your Canadian business grow.
        </p>

        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg bg-white text-primary font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
