import type { Metadata } from "next";
import Link from "next/link";
import {
  HiCode,
  HiDeviceMobile,
  HiCloud,
  HiColorSwatch,
  HiDatabase,
  HiShieldCheck,
} from "react-icons/hi";

export const metadata: Metadata = {
  title: "Services",
};

const services = [
  {
    slug: "web-development",
    icon: HiCode,
    title: "Web Development",
    description:
      "We build fast, responsive, and scalable web applications using modern frameworks and best practices.",
    features: [
      "Custom web application development",
      "Progressive Web Apps (PWAs)",
      "E-commerce platforms",
      "API development and integration",
    ],
  },
  {
    slug: "mobile-app-development",
    icon: HiDeviceMobile,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on every device.",
    features: [
      "iOS and Android native apps",
      "Cross-platform with React Native",
      "App Store optimization",
      "Push notifications and analytics",
    ],
  },
  {
    slug: "cloud-solutions",
    icon: HiCloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services to power your business growth.",
    features: [
      "AWS, Azure, and GCP deployment",
      "Cloud migration strategies",
      "Serverless architecture",
      "Auto-scaling and load balancing",
    ],
  },
  {
    slug: "ui-ux-design",
    icon: HiColorSwatch,
    title: "UI/UX Design",
    description:
      "User-centered design that creates intuitive, engaging, and visually stunning digital experiences.",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Design systems and style guides",
      "Usability testing",
    ],
  },
  {
    slug: "database-architecture",
    icon: HiDatabase,
    title: "Database Architecture",
    description:
      "Robust database design and optimization for high-performance, data-driven applications.",
    features: [
      "Relational and NoSQL databases",
      "Data modeling and schema design",
      "Performance tuning and indexing",
      "Database migration and scaling",
    ],
  },
  {
    slug: "cybersecurity",
    icon: HiShieldCheck,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure regulatory compliance.",
    features: [
      "Security audits and assessments",
      "Penetration testing",
      "Compliance consulting (GDPR, SOC 2)",
      "Incident response planning",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            End-to-end digital solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Learn More
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
