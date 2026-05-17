/**
 * Canonical TechSynergy services catalogue.
 *
 * Single source for:
 *   - landing-page preview (`components/sections/ServicesPreview.tsx`)
 *   - main services index   (`app/services/page.tsx`)
 *   - detail-page generator (`app/services/[slug]/page.tsx`)
 *
 * Adding a service here automatically:
 *   1. Surfaces it on the index page.
 *   2. Generates a static `/services/<slug>` detail route at build time.
 *   3. Includes it on the landing preview if `featured: true`.
 */

import {
  HiChip,
  HiCloud,
  HiCode,
  HiSupport,
  HiSparkles,
  HiDeviceMobile,
} from "react-icons/hi";
import type { IconType } from "react-icons";

export type Service = {
  slug: string;
  title: string;
  /** Short blurb used by the landing preview and detail-page hero. */
  description: string;
  /** Tagline for use as an OG / Twitter / meta description. */
  shortDescription: string;
  /** 6 detailed bullet points shown on the detail page + index page. */
  features: readonly string[];
  /** 3 short tags shown on the landing preview card. */
  highlights: readonly string[];
  /** ~6 capability tags shown on the detail page. */
  technologies: readonly string[];
  /** Hero / accent gradient (Tailwind `from-... to-...` fragment). */
  color: string;
  icon: IconType;
  /** If true, surfaces on the landing preview grid. */
  featured: boolean;
};

export const services: readonly Service[] = [
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    description:
      "End-to-end design, build, and launch of privacy-first SaaS products. We take your idea from MVP to production-ready — with Canadian data residency baked in.",
    shortDescription:
      "Privacy-first SaaS products built from MVP to production with Canadian data residency.",
    features: [
      "Full-stack product development",
      "MVP scoping and rapid prototyping",
      "Multi-tenant architecture",
      "Subscription billing integration",
      "PIPEDA-compliant data handling",
      "Ongoing maintenance and support",
    ],
    highlights: ["Full-stack development", "Multi-tenant architecture", "PIPEDA compliant"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Stripe Billing",
      "Auth & SSO",
    ],
    color: "from-primary to-blue-400",
    icon: HiChip,
    featured: true,
  },
  {
    slug: "ai-mcp-integration",
    title: "AI & MCP Integration",
    description:
      "Production-grade AI features and Model Context Protocol (MCP) servers that expose your APIs and data to Claude, Cursor, Windsurf, and ChatGPT. We design schema-validated tools, retrieval pipelines, and agentic workflows that hold up under real load.",
    shortDescription:
      "Custom MCP servers and Claude/GPT feature integration — schema-validated, prompt-cached, production-grade.",
    features: [
      "Custom MCP server design and implementation",
      "Tool authoring with JSON-schema validation",
      "Claude / OpenAI / Gemini SDK integration",
      "Prompt caching and token-cost optimization",
      "Retrieval-Augmented Generation (RAG) pipelines",
      "Agentic tool-use loops with guardrails",
    ],
    highlights: ["Custom MCP servers", "Claude / GPT integration", "Schema-validated tools"],
    technologies: [
      "Model Context Protocol",
      "Anthropic SDK",
      "OpenAI SDK",
      "Prompt Caching",
      "RAG",
      "Tool Use",
    ],
    color: "from-violet-500 to-purple-500",
    icon: HiSparkles,
    featured: true,
  },
  {
    slug: "cloud-data-residency",
    title: "Cloud & Canadian Data Residency",
    description:
      "Canadian-resident cloud architecture and migration services. We move workloads off us-east-1 / EU regions onto ca-central-1, Azure Canada Central, or northern.tech infrastructure — without downtime — so you can meet PIPEDA, Bill C-27, and federal-procurement residency requirements.",
    shortDescription:
      "Canadian-resident cloud architecture and zero-downtime migrations for PIPEDA / Bill C-27 compliance.",
    features: [
      "Canadian-hosted infrastructure (AWS ca-central, Azure Canada Central)",
      "Zero-downtime migration from US / EU regions",
      "Infrastructure as Code (Terraform, CDK)",
      "Auto-scaling and load balancing",
      "Cost optimization and monitoring",
      "Disaster recovery and runbooks",
    ],
    highlights: ["Canadian-hosted", "PIPEDA / C-27 ready", "Zero-downtime migration"],
    technologies: [
      "AWS ca-central-1",
      "Azure Canada Central",
      "Terraform",
      "Serverless",
      "Auto-scaling",
      "Observability",
    ],
    color: "from-cyan-500 to-blue-500",
    icon: HiCloud,
    featured: true,
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps (iOS + Android)",
    description:
      "Native-feeling mobile apps from a single React Native + Expo codebase. We ship to both App Store and Play Store, share state with your existing web backend, and handle the full release pipeline including EAS builds, OTA updates, and crash reporting.",
    shortDescription:
      "iOS and Android apps from one React Native + Expo codebase, with shared backend and full release pipeline.",
    features: [
      "iOS and Android from one Expo codebase",
      "App Store and Play Store delivery",
      "EAS build pipeline and OTA updates",
      "Push notifications and deep linking",
      "Offline-first sync with the web backend",
      "Crash reporting and analytics integration",
    ],
    highlights: ["React Native + Expo", "iOS + Android", "Shared web backend"],
    technologies: [
      "React Native",
      "Expo",
      "EAS",
      "TypeScript",
      "Push Notifications",
      "App Store / Play Store",
    ],
    color: "from-rose-500 to-pink-500",
    icon: HiDeviceMobile,
    featured: true,
  },
  {
    slug: "api-integrations",
    title: "API & Integrations",
    description:
      "RESTful APIs and third-party integrations that connect your systems and automate workflows. We build clean, well-documented APIs that developers love.",
    shortDescription:
      "Well-documented REST and webhook APIs, plus third-party integrations that automate your workflows.",
    features: [
      "RESTful API design and development",
      "Third-party API integration",
      "Webhook and event-driven systems",
      "API documentation (OpenAPI / Swagger)",
      "Authentication and rate limiting",
      "Data transformation pipelines",
    ],
    highlights: ["REST API design", "Webhook systems", "OpenAPI documentation"],
    technologies: [
      "REST",
      "OpenAPI",
      "Webhooks",
      "OAuth 2.0",
      "Rate Limiting",
      "Event Streaming",
    ],
    color: "from-emerald-500 to-teal-500",
    icon: HiCode,
    featured: true,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance, updates, and technical support to keep your applications running smoothly and securely. Retainer-based, with monitoring and SLA-backed response.",
    shortDescription:
      "Retainer-based maintenance, monitoring, and SLA-backed support for your production applications.",
    features: [
      "24/7 monitoring and alerting",
      "Security patches and dependency updates",
      "Performance optimization",
      "Bug fixes with SLA response times",
      "Incident postmortems",
      "Quarterly architecture reviews",
    ],
    highlights: ["24/7 monitoring", "Bug fixes & updates", "SLA-backed response"],
    technologies: [
      "Monitoring",
      "Alerting",
      "On-call",
      "Patch Management",
      "Postmortems",
      "SRE Practices",
    ],
    color: "from-slate-500 to-slate-700",
    icon: HiSupport,
    featured: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
