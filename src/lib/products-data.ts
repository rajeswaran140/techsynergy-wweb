/**
 * Canonical TechSynergy product catalogue.
 *
 * Single source for:
 *   - landing-page preview (`components/sections/ProductsPreview.tsx`)
 *   - /products index       (`app/products/page.tsx`)
 *   - /about showcase       (`app/about/page.tsx`)
 *
 * Visibility flags:
 *   - `enabled: false` → hidden from every surface (in-progress / unannounced)
 *   - `featured: true` → surfaced on the landing-page preview row
 *   - `comingSoon: true` → shown on /products with a "Coming Soon" CTA instead
 *     of an external link
 */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  /** Short blurb for landing-preview cards. */
  shortDescription: string;
  /** Full description for /products. */
  description: string;
  features: readonly string[];
  pricing?: string;
  /** Live URL. Omit when `comingSoon` is true. */
  href?: string;
  /** Tailwind gradient fragment, e.g. "from-indigo-600 to-violet-500". */
  color: string;
  enabled: boolean;
  featured: boolean;
  comingSoon?: boolean;
};

export const products: readonly Product[] = [
  {
    slug: "crowvault-ai",
    name: "Crowvault.ai",
    tagline: "Built for Developers Who Ship",
    shortDescription:
      "327 production-ready developer tools for scaffolding microservices, databases, APIs, and CI/CD pipelines. Schema-validated, deterministic output — built on MCP.",
    description:
      "API-first code generation platform with 327 production-ready tools for scaffolding microservices, databases, APIs, CI/CD pipelines, and DDD patterns. Schema-validated generators produce deterministic, AI-enhanced output — same input, same result, every time.",
    features: [
      "327 production-ready dev tools",
      "Microservices, DB schemas, K8s configs",
      "OpenAPI / GraphQL / gRPC specs",
      "CI/CD pipelines & DDD patterns",
      "9 specialized MCP servers",
      "REST API + optional CLI/SDKs",
    ],
    pricing: "Contact for access.",
    href: "https://crowvault.ai",
    color: "from-indigo-600 to-violet-500",
    enabled: true,
    featured: true,
  },
  {
    slug: "mobily-ca",
    name: "Mobily.ca",
    tagline: "Shorten Links Without Compromising Privacy",
    shortDescription:
      "Canadian URL shortener with custom branded short links, real-time analytics, and QR codes — PIPEDA compliant and hosted in Canada.",
    description:
      "A Canadian URL shortener with custom branded links, real-time click analytics, and QR code generation. All data hosted in Canada and PIPEDA compliant from day one — no data sold to third parties.",
    features: [
      "Custom branded short links",
      "Real-time click & device analytics",
      "QR code generation",
      "Password protection & auto-expiration",
      "REST API for automation",
      "PIPEDA compliant, Canadian-hosted",
    ],
    pricing: "Free — 50 links forever. Plans from $19 CAD/mo.",
    href: "https://mobily.ca",
    color: "from-blue-600 to-cyan-500",
    enabled: true,
    featured: true,
  },
  {
    slug: "talky-ca",
    name: "Talky.ca",
    tagline: "Enterprise SMS & SMPP Reseller Platform",
    shortDescription:
      "Canadian-hosted SMS gateway with SMPP support and reseller-ready APIs for carrier-grade messaging.",
    description:
      "Canadian-hosted SMS gateway with SMPP support and reseller-ready APIs. Built for businesses and resellers delivering transactional and marketing messages at carrier-grade reliability.",
    features: [
      "Enterprise SMS API",
      "SMPP gateway support",
      "Reseller-friendly platform",
      "Carrier-grade delivery",
      "Canadian-hosted infrastructure",
      "Transactional & marketing messaging",
    ],
    pricing: "Contact for volume pricing.",
    href: "https://talky.ca",
    color: "from-rose-600 to-pink-500",
    // Shown on /products but not promoted on the landing preview yet.
    enabled: true,
    featured: false,
  },
  {
    slug: "crowvault-ca",
    name: "Crowvault.ca",
    tagline: "Code from Anywhere",
    shortDescription:
      "Cloud-native IDE — a full VS Code experience in the browser, with integrated AI and persistent workspaces.",
    description:
      "Cloud-native IDE running a full VS Code experience securely in the browser. Open your browser, log in, and start building — no local setup, no machine to configure. Backed by integrated AI assistance and dedicated hardened infrastructure.",
    features: [
      "Full VS Code in the browser",
      "Integrated AI coding assistance",
      "TLS + SSH hardening defaults",
      "Persistent workspaces across sessions",
      "Browser terminal + full file system",
      "Azure-hosted, dedicated VM",
    ],
    color: "from-purple-600 to-fuchsia-500",
    enabled: true,
    featured: false,
    comingSoon: true,
  },
  {
    slug: "telexier",
    name: "Telexier.com",
    tagline: "Coming Soon",
    shortDescription:
      "Next-generation telecom and messaging platform — details coming soon.",
    description:
      "Next-generation telecom and messaging platform — details coming soon.",
    features: [],
    color: "from-amber-600 to-yellow-500",
    enabled: true,
    featured: false,
    comingSoon: true,
  },
  // ---- In-progress / not yet announced ----
  {
    slug: "talkymobile-ca",
    name: "TalkyMobile.ca",
    tagline: "Send Mobile Credit & Data In Seconds",
    shortDescription:
      "International mobile top-up and eSIM service delivering airtime and data bundles to 150+ countries.",
    description:
      "International mobile top-up and eSIM service delivering prepaid airtime and data bundles to 150+ countries. Instant delivery in 5-30 seconds with transparent pricing, bank-level security, and multi-provider reliability.",
    features: [
      "Mobile top-ups to 150+ countries",
      "Data bundles in 80+ countries",
      "eSIM plans & digital SIM cards",
      "Instant 5-30 second delivery",
      "PCI DSS compliant & SSL encrypted",
      "99.9% uptime guarantee",
    ],
    pricing: "Transparent pricing. No subscriptions or hidden fees.",
    href: "https://talkymobile.ca",
    color: "from-orange-600 to-amber-500",
    enabled: false,
    featured: false,
  },
  {
    slug: "webcore-ca",
    name: "WebCore.ca",
    tagline: "Launch Your WordPress Site in 6 Minutes",
    shortDescription:
      "Canadian managed WordPress hosting with automated setup, enterprise security, and PIPEDA compliance.",
    description:
      "Canadian managed WordPress hosting with automated setup, enterprise-grade security, and PIPEDA compliance. Built for Canadian businesses who need reliable hosting without the complexity.",
    features: [
      "6-minute automated site setup",
      "Enterprise security & SSL included",
      "Canadian data centers (PIPEDA compliant)",
      "WooCommerce optimization",
      "24/7 phone & email support",
      "30-day money-back guarantee",
    ],
    pricing: "Plans from $9 CAD/mo. Free migration included.",
    href: "https://webcore.ca",
    color: "from-emerald-600 to-teal-500",
    enabled: false,
    featured: false,
  },
  {
    slug: "seosync-ca",
    name: "SeoSync.ca",
    tagline: "AI-Powered SEO Audits, Built in Canada",
    shortDescription:
      "Canadian-built SEO audit platform — 34 automated checks plus AI-powered fix suggestions.",
    description:
      "The first Canadian-built SEO audit platform. Run 34 automated checks across meta tags, content, links, and Core Web Vitals — then get AI-powered fixes you can copy-paste into your site.",
    features: [
      "34 automated SEO checks per audit",
      "Daily SERP position tracking",
      "AI-generated fix suggestions",
      "Competitor gap analysis",
      "Core Web Vitals monitoring",
      "Canadian data residency",
    ],
    pricing: "Free — 3 audits/mo. Pro from $49 CAD/mo.",
    href: "https://seosync.ca",
    color: "from-violet-600 to-purple-500",
    enabled: false,
    featured: false,
  },
];

export const enabledProducts = products.filter((p) => p.enabled);
export const featuredProducts = enabledProducts.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
