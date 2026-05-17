import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services-data";

type Props = {
  params: Promise<{ slug: string }>;
};

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
      url: `https://techsynergy.ca/services/${slug}`,
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

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Description */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            {service.description}
          </p>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary">What We Offer</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl bg-muted p-4"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary">
              Key Capabilities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-muted p-10 text-center">
            <h2 className="text-2xl font-bold text-primary">
              Ready to get started?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Let&apos;s discuss how our {service.title.toLowerCase()} services
              can help your business grow.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
