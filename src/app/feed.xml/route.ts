import { publishedPosts as blogPosts } from "@/lib/blog-data";
import { SITE_URL as BASE_URL } from "@/lib/site";

/**
 * RSS 2.0 feed for the blog. Linked from /blog metadata
 * (`alternates.types["application/rss+xml"]`) and from <head> on every page
 * via the same metadata mechanism, so feed readers can auto-discover it.
 */
export async function GET() {
  const sorted = [...blogPosts].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO)
  );

  const lastBuild = sorted[0]?.dateISO ?? new Date().toISOString();

  const items = sorted
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.dateISO).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>noreply@techsynergy.ca (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TechSynergy Tech Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Insights and thought leadership from TechSynergy on digital transformation, business strategy, and growth for Canadian businesses.</description>
    <language>en-CA</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
