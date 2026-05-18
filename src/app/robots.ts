import type { MetadataRoute } from "next";
import { AI_BOTS, SITE_URL } from "@/lib/site";

/**
 * robots.txt for techsynergy.ca.
 *
 * Strategy:
 *   - Search-index crawlers (default *) are allowed everywhere except admin,
 *     api, and the immigration-brief one-off resource page.
 *   - AI training / model-retrieval crawlers (see AI_BOTS in lib/site.ts)
 *     are fully blocked. This preserves the site's content as training-data
 *     leverage rather than letting every AI vendor ingest it for free.
 */
export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    "/admin",
    "/admin/",
    "/api",
    "/api/",
    "/immigration-brief",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      // Explicit opt-out for AI / model-training crawlers.
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
