"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { HiCode, HiCloud, HiChip, HiSupport } from "react-icons/hi";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false }
);

const services = [
  {
    icon: HiChip,
    title: "SaaS Product Development",
    description:
      "I design, build, and launch privacy-first SaaS products — from initial MVP to production-ready platform.",
    highlights: ["Full-stack development", "Multi-tenant architecture", "PIPEDA compliant"],
    color: "from-primary to-blue-400",
  },
  {
    icon: HiCloud,
    title: "Cloud Infrastructure",
    description:
      "Canadian-resident cloud architecture built for reliability, compliance, and cost efficiency.",
    highlights: ["Canadian-hosted infrastructure", "Infrastructure as Code", "Auto-scaling"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: HiCode,
    title: "API & Integrations",
    description:
      "Clean, well-documented RESTful APIs and third-party integrations that connect your systems and automate workflows.",
    highlights: ["REST API design", "Webhook systems", "OpenAPI documentation"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: HiSupport,
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance, updates, and technical support to keep your applications running smoothly and securely.",
    highlights: ["24/7 monitoring", "Bug fixes & updates", "Performance optimization"],
    color: "from-emerald-500 to-teal-500",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            What I Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Full-Stack Services,{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              One Developer
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From first commit to production — I handle the full stack so you can
            focus on growing your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <MotionDiv
              key={service.title}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1 rounded-b-full bg-linear-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            View All Services
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
