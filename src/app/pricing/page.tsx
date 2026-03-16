"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Starter",
    price: "$2,999",
    period: "per project",
    description:
      "Perfect for small businesses and startups looking to establish their digital presence.",
    features: [
      "Custom website design (up to 5 pages)",
      "Mobile-responsive development",
      "Basic SEO setup",
      "Contact form integration",
      "1 month of post-launch support",
      "Performance optimization",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$7,999",
    period: "per project",
    description:
      "Ideal for growing companies that need a robust digital platform with advanced features.",
    features: [
      "Custom web application development",
      "Up to 15 pages or views",
      "Advanced UI/UX design",
      "CMS integration",
      "API development & integration",
      "3 months of post-launch support",
      "Analytics & reporting setup",
      "Performance & security audit",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored quote",
    description:
      "For organizations requiring complex, scalable solutions with dedicated support and SLAs.",
    features: [
      "Full-stack custom development",
      "Unlimited pages & features",
      "Cloud architecture & DevOps",
      "Dedicated project manager",
      "24/7 priority support",
      "12 months of maintenance",
      "Security compliance (SOC 2, HIPAA)",
      "Team training & documentation",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "What is included in post-launch support?",
    answer:
      "Post-launch support includes bug fixes, minor content updates, performance monitoring, and technical assistance. It does not cover major feature additions or redesigns, which can be scoped as separate projects.",
  },
  {
    question: "Can I upgrade my plan after the project starts?",
    answer:
      "Absolutely. If your needs grow during the project, we can adjust the scope and pricing accordingly. We will provide a revised estimate before any additional work begins.",
  },
  {
    question: "Do you offer ongoing retainer agreements?",
    answer:
      "Yes. Many of our clients choose a monthly retainer for continuous development, maintenance, and feature enhancements. Retainer rates are customized based on the number of hours and services required.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Starter projects typically take 3-4 weeks, Professional projects 6-10 weeks, and Enterprise engagements vary based on scope. We provide a detailed timeline during the discovery phase.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-primary py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Pricing Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Transparent pricing for every stage of your business. No hidden
            fees.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-lg ${
                tier.highlighted
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-foreground">
                  {tier.price}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {tier.period}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl font-bold text-foreground"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {faq.question}
                  <svg
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
