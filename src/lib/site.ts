/**
 * Site-wide constants — origin, AI-bot opt-out list, etc.
 *
 * Single source so robots.ts, sitemap.ts, feed.xml/route.ts, JSON-LD blocks,
 * and metadataBase can't drift apart. Override the origin per-environment by
 * setting NEXT_PUBLIC_SITE_URL (or NEXTAUTH_URL as a fallback for parity with
 * what layout.tsx already reads).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://techsynergy.ca";

/**
 * User-agents we explicitly opt out of via robots.txt. Covers training
 * crawlers, live-retrieval bots used by AI products, and the major archives
 * (Common Crawl) that feed downstream model trainers.
 *
 * Search-index crawlers (Googlebot, Bingbot, DuckDuckBot, etc.) are
 * intentionally NOT in this list — we still want to be findable in search.
 */
export const AI_BOTS: readonly string[] = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Google Bard / Gemini training (separate from Googlebot search)
  "Google-Extended",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Common Crawl (feeds many downstream trainers)
  "CCBot",
  // Apple Intelligence training (separate from Applebot search)
  "Applebot-Extended",
  // Amazon Bedrock / Alexa
  "Amazonbot",
  // ByteDance
  "Bytespider",
  // Meta
  "FacebookBot",
  "Meta-ExternalAgent",
  // Cohere
  "cohere-ai",
  "cohere-training-data-crawler",
];
