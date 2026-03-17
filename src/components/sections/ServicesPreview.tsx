"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { HiCode, HiCloud, HiCog, HiChip } from "react-icons/hi";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false }
);

const services = [
  {
    icon: HiChip,
    title: "SaaS Product Development",
    description:
      "End-to-end design, build, and launch of privacy-first SaaS products — from MVP to scale.",
  },
  {
    icon: HiCloud,
    title: "Cloud Infrastructure",
    description:
      "AWS-hosted, Canadian-resident cloud architecture built for reliability, compliance, and performance.",
  },
  {
    icon: HiCode,
    title: "API & Integrations",
    description:
      "RESTful APIs and third-party integrations that connect your systems and automate workflows.",
  },
  {
    icon: HiCog,
    title: "DevOps & CI/CD",
    description:
      "Automated build, test, and deploy pipelines so your team ships faster with fewer surprises.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Our Services
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We build, deploy, and maintain software products for Canadian
            businesses — from first commit to production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <MotionDiv
              key={service.title}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>
            </MotionDiv>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            View all services
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
