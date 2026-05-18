import Link from "next/link";
import { HiBriefcase, HiClock, HiCalendar } from "react-icons/hi";
import type { IconType } from "react-icons";
import { glassCard, glassCardHover, glassChip, glassIconOrb } from "@/lib/ui-tokens";
import { SITE_URL } from "@/lib/site";
import PageCta from "@/components/ui/PageCta";

const BASE_URL = SITE_URL;

type EngagementModel = {
  slug: string;
  title: string;
  bestFor: string;
  description: string;
  range: string;
  cadence: string;
  highlights: readonly string[];
  color: string;
  icon: IconType;
};

const engagementModels: readonly EngagementModel[] = [
  {
    slug: "project",
    title: "Project-Based",
    bestFor: "Defined scope and deliverables",
    description:
      "Fixed scope, fixed price, written proposal. Best when you know what you need built — MVP, single integration, migration with a clear endpoint.",
    range: "$5,000 – $150,000+ CAD",
    cadence: "Weekly demos, milestone payments",
    highlights: ["Fixed price", "Written proposal", "Milestone-based"],
    color: "from-primary to-blue-400",
    icon: HiBriefcase,
  },
  {
    slug: "retainer",
    title: "Retainer",
    bestFor: "Ongoing capacity and roadmap execution",
    description:
      "Monthly retainer with capped hours and flexible scope. Best for post-launch products, multi-month roadmaps, or ongoing maintenance and feature work.",
    range: "$3,000 – $15,000 CAD / month",
    cadence: "Weekly stand-ups, monthly priority reviews",
    highlights: ["Flexible scope", "Capped hours", "Long-term partnership"],
    color: "from-violet-500 to-purple-500",
    icon: HiCalendar,
  },
  {
    slug: "hourly",
    title: "Hourly",
    bestFor: "Small jobs and advisory work",
    description:
      "Hourly billing, no minimum, no commitment. Best for ad-hoc work — bug fixes, code audits, architecture reviews, or short consulting engagements.",
    range: "$150 – $250 CAD / hour",
    cadence: "As-needed, billed monthly",
    highlights: ["No minimum", "Pay as you go", "Quick turnaround"],
    color: "from-emerald-500 to-teal-500",
    icon: HiClock,
  },
];

const budgetRanges = [
  { service: "MVP SaaS build", range: "$30K – $80K CAD" },
  { service: "Production-ready SaaS platform", range: "$80K – $200K+ CAD" },
  { service: "Custom MCP server / AI integration", range: "$15K – $50K CAD" },
  { service: "Cloud migration to ca-central-1", range: "$20K – $80K CAD" },
  { service: "Mobile app (iOS + Android via Expo)", range: "$25K – $100K CAD" },
  { service: "API or webhook integration", range: "$5K – $25K CAD" },
  { service: "Maintenance retainer", range: "$1.5K – $10K CAD / month" },
];

const included = [
  "Weekly demos and async progress updates",
  "Canadian data residency by default (AWS ca-central-1 / Azure Canada Central)",
  "Code ownership transferred to you at the end of the engagement",
  "Documentation written alongside the code, not after",
  "Change orders in writing — no surprise scope creep",
];

const notAGoodFit = [
  "You need a 24/7 staffed support contract — talk to a managed services provider instead",
  "You need on-site presence — we operate remotely from Markham, Ontario",
  "You need more than 5 developers in parallel — we're a focused shop, not an agency",
];

export default function PricingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: `${BASE_URL}/pricing`,
      },
    ],
  };

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "TechSynergy Engagement Models",
    url: `${BASE_URL}/pricing`,
    provider: {
      "@type": "Organization",
      name: "TechSynergy Corp",
      url: BASE_URL,
    },
    itemListElement: engagementModels.map((m, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: m.title,
      description: m.description,
      priceCurrency: "CAD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "CAD",
        description: m.range,
      },
      eligibleRegion: { "@type": "Country", name: "Canada" },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />

      {/* Hero */}
      <section className="section-glow py-14 sm:py-18 md:py-22 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How We Engage
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Three engagement models, transparent process, and example budget
            ranges — so you know what to expect before we hop on a call.
          </p>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section-glow section-glow-alt py-14 sm:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">
                Pricing
              </li>
            </ol>
          </nav>

          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              Engagement Models
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Three ways to work together
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Project, retainer, or hourly — chosen by how defined your scope
              is, not by sales pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {engagementModels.map((model) => {
              const Icon = model.icon;
              return (
                <div
                  key={model.slug}
                  className={`${glassCard} ${glassCardHover} p-6 sm:p-8 flex flex-col`}
                >
                  <div className={glassIconOrb(model.color) + " mb-5"}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {model.title}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-4">
                    {model.bestFor}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 flex-1">
                    {model.description}
                  </p>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Typical range
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {model.range}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Cadence
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {model.cadence}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {model.highlights.map((h) => (
                      <span key={h} className={glassChip}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example budget ranges */}
      <section className="section-glow py-14 sm:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              What Things Cost
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Example budget ranges
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Real engagement ranges from work we&apos;ve scoped. Final
              pricing depends on scope, integrations, and timeline — every
              engagement gets a written proposal with a fixed number.
            </p>
          </div>

          <div className={`${glassCard} divide-y divide-slate-200/60 dark:divide-white/10`}>
            {budgetRanges.map((b) => (
              <div
                key={b.service}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 sm:px-8 sm:py-5 gap-2"
              >
                <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
                  {b.service}
                </span>
                <span className="text-sm sm:text-base font-bold text-primary font-mono">
                  {b.range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included + Not a good fit (two-column) */}
      <section className="section-glow section-glow-alt py-14 sm:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className={`${glassCard} p-6 sm:p-8`}>
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                Always Included
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5">
                What every engagement comes with
              </h2>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <svg
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${glassCard} p-6 sm:p-8`}>
              <p className="text-rose-500 font-semibold tracking-widest uppercase text-xs mb-3">
                Honest About Fit
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5">
                When we&apos;re not a good fit
              </h2>
              <ul className="space-y-3">
                {notAGoodFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <svg
                      className="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-glow py-14 sm:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              How Scoping Works
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              From inquiry to written proposal
            </h2>
          </div>

          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Discovery call (free, 30 min)",
                body: "We listen, ask questions, and figure out whether we're the right fit — no slide deck, no pitch.",
              },
              {
                step: "2",
                title: "Written proposal (2–5 business days)",
                body: "Fixed scope, fixed price (for project work) or capped hours (for retainer). Timeline, deliverables, and what's explicitly out of scope.",
              },
              {
                step: "3",
                title: "Engagement kickoff",
                body: "Contract signed, first milestone scheduled. Most projects kick off within two weeks of the proposal.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className={`${glassCard} p-5 sm:p-6 flex items-start gap-4`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 font-bold text-primary">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageCta
        title="Want a real number?"
        body="Tell us about your project and we'll come back with a written proposal — fixed scope, fixed price — within five business days."
        primaryCta={{ label: "Start a Conversation", href: "/contact" }}
        secondaryCta={{ label: "See Our Services", href: "/services" }}
      />
    </div>
  );
}
