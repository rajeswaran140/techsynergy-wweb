import type { MetadataRoute } from "next";
import { publishedPosts as blogPosts } from "@/lib/blog-data";
import { services } from "@/lib/services-data";
import { LEGAL_LAST_UPDATED } from "@/lib/legal-info";
import { SITE_URL } from "@/lib/site";

/**
 * sitemap.xml for techsynergy.ca.
 *
 * Design notes:
 *   - /immigration-brief is intentionally OMITTED (and also blocked in
 *     robots.ts). It's a one-off resource page, not a discoverable surface.
 *   - lastModified values come from the actual content source where one
 *     exists (LEGAL_LAST_UPDATED, blog post dateISO, newest post for /blog
 *     index) instead of `new Date()`, which would falsely signal that every
 *     page changed on every Amplify rebuild.
 *   - Service detail URLs are driven off the canonical services-data list so
 *     the sitemap can never drift from the actual generated routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const legalDate = new Date(LEGAL_LAST_UPDATED);

  // Newest blog post dateISO → /blog index's effective lastmod.
  const newestPostDate =
    blogPosts.length > 0
      ? new Date(
          [...blogPosts]
            .map((p) => p.dateISO)
            .sort()
            .reverse()[0]
        )
      : buildDate;

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: buildDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: newestPostDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: legalDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: legalDate, changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
