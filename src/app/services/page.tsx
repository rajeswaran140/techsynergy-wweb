import type { Metadata } from "next";
import Link from "next/link";
import {
  HiChip,
  HiCloud,
  HiCode,
  HiCog,
} from "react-icons/hi";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TechSynergy services — SaaS product development, cloud infrastructure, API integrations, and DevOps for Canadian businesses.",
  openGraph: {
    title: "Services | TechSynergy",
    description:
      "End-to-end software services from a Canadian company with 25+ years of experience.",
  },
};

const services = [
  {
    icon: HiChip,
    title: "SaaS Product Development",
    description:
      "End-to-end design, build, and launch of privacy-first SaaS products. We take your idea from MVP to production-ready — with Canadian data residency baked in.",
    features: [
      "Full-stack product development",
      "MVP scoping and rapid prototyping",
      "Multi-tenant architecture",
      "Subscription billing integration",
      "PIPEDA-compliant data handling",
      "Ongoing maintenance and support",
    ],
  },
  {
    icon: HiCloud,
    title: "Cloud Infrastructure",
    description:
      "Canadian-resident cloud architecture built for reliability, compliance, and performance. We design infrastructure that scales with your business.",
    features: [
      "Canadian-hosted infrastructure",
      "Serverless architecture",
      "Infrastructure as Code (Terraform, CDK)",
      "Auto-scaling and load balancing",
      "Cost optimization and monitoring",
      "Disaster recovery planning",
    ],
  },
  {
    icon: HiCode,
    title: "API & Integrations",
    description:
      "RESTful APIs and third-party integrations that connect your systems and automate workflows. We build clean, well-documented APIs that developers love.",
    features: [
      "RESTful API design and development",
      "Third-party API integration",
      "Webhook and event-driven systems",
      "API documentation (OpenAPI/Swagger)",
      "Authentication and rate limiting",
      "Data transformation pipelines",
    ],
  },
  {
    icon: HiCog,
    title: "DevOps & CI/CD",
    description:
      "Automated build, test, and deploy pipelines so your team ships faster with fewer surprises. We set up the infrastructure that lets you focus on code.",
    features: [
      "CI/CD pipeline setup and automation",
      "Docker containerization",
      "Automated testing integration",
      "Environment management (staging, prod)",
      "Monitoring and alerting",
      "Security scanning in pipeline",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end software services for Canadian businesses — from first
            commit to production.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 lg:p-10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <svg
                        className="w-4 h-4 text-primary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
