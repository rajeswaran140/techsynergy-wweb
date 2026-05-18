import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services-data";
import { glassCard, glassChip, glassIconOrb } from "@/lib/ui-tokens";
import PageCta from "@/components/ui/PageCta";

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://techsynergy.ca";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service)
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
    };

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | TechSynergy`,
      description: service.shortDescription,
      type: "website",
      url: `${BASE_URL}/services/${slug}`,
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: `${service.title} Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | TechSynergy`,
      description: service.shortDescription,
      images: ["/og-default.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const serviceUrl = `${BASE_URL}/services/${slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "TechSynergy Corp",
      url: BASE_URL,
    },
    areaServed: { "@type": "Country", name: "Canada" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Capabilities`,
      itemListElement: service.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: feature },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${BASE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: serviceUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero — glass over a tinted ambient gradient */}
      <section className="section-glow relative overflow-hidden py-20 sm:py-24 text-center">
        <div className="relative mx-auto max-w-4xl px-6 z-10">
          <div className={`mx-auto mb-6 ${glassIconOrb(service.color)} w-16 h-16`}>
            <Icon className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="section-glow section-glow-alt py-20 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6">
          {/* Visible breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Description */}
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {service.description}
          </p>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What We Offer
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className={`${glassCard} flex items-start gap-3 p-4`}
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-linear-to-br ${service.color}`}
                    aria-hidden="true"
                  />
                  <span className="text-slate-700 dark:text-slate-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Key Capabilities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span key={tech} className={`${glassChip} px-4 py-2 text-sm`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to get started?"
        body={`Let's discuss how our ${service.title.toLowerCase()} services can help your business grow.`}
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </div>
  );
}
