import Link from "next/link";

/**
 * Shared "contact us" CTA section used at the end of /services, /portfolio,
 * /about, and /services/[slug]. Same visual treatment everywhere with
 * page-specific copy.
 */
export default function PageCta({
  title,
  body,
  primaryCta = { label: "Get a Free Quote", href: "/contact" },
  secondaryCta,
}: {
  title: string;
  body: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section-glow section-glow-alt py-12 sm:py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
          {body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href={primaryCta.href}
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-block px-8 py-3.5 rounded-lg text-primary font-semibold hover:underline"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
