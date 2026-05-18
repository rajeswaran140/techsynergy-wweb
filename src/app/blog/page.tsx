import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { blogPosts, getTagColor } from "@/lib/blog-data";
import CategoryFilter from "@/components/blog/CategoryFilter";
import PostIllustration from "@/components/blog/PostIllustration";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export const metadata: Metadata = {
  title: "Tech Blog | Software Development Insights | TechSynergy",
  description:
    "Insights and thought leadership from TechSynergy on digital transformation, business strategy, and growth for Canadian businesses.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Tech Blog | Software Development Insights | TechSynergy",
    description:
      "Business insights from TechSynergy — strategy, growth, and digital transformation.",
    url: "https://techsynergy.ca/blog",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | TechSynergy",
    description: "Business insights from TechSynergy.",
    images: ["/og-default.png"],
  },
};

const BASE_URL = "https://techsynergy.ca";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category, tag } = await searchParams;
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  // Featured = newest by dateISO, NOT array position.
  const sorted = [...blogPosts].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO)
  );

  const filtered = tag
    ? sorted.filter((p) => p.tags.includes(tag))
    : category
    ? sorted.filter((p) => p.category === category)
    : sorted;

  const activeFilter = tag ? `#${tag}` : category;
  const [featured, ...rest] = filtered;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TechSynergy Tech Blog",
    description:
      "Insights and thought leadership from TechSynergy on digital transformation, business strategy, and growth for Canadian businesses.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "TechSynergy Corp",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-light.svg`,
      },
    },
    blogPost: sorted.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.dateISO,
      author: { "@type": "Person", name: post.author },
      keywords: post.tags.join(", "),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  return (
    <div className="bg-blog-base min-h-screen font-(family-name:--font-blog-body) text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero — featured post */}
      {featured && (
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-14">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-(family-name:--font-display) tracking-tight mb-3 text-slate-900">
                {activeFilter ? `${activeFilter} Articles` : "Tech Blog"}
              </h1>
              <p className="text-blog-muted text-lg max-w-xl">
                {tag
                  ? `Posts tagged with #${tag}.`
                  : category
                  ? `Expert insights on ${category.toLowerCase()} for Canadian businesses.`
                  : "Insights on strategy, growth, and digital transformation for Canadian businesses."}
              </p>
              {activeFilter && (
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-blog-accent hover:underline"
                >
                  Clear filter
                  <ArrowRightIcon />
                </Link>
              )}
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-lg bg-blog-surface border border-slate-200 overflow-hidden transition-all duration-300 hover:border-blog-accent/40 hover:shadow-md"
            >
              <PostIllustration
                slug={featured.slug}
                className="w-full h-auto"
                priority={true}
              />

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-blog-accent/15 px-3 py-1 text-xs font-semibold text-blog-accent">
                    {featured.category}
                  </span>
                  <span className="text-xs text-blog-muted font-(family-name:--font-blog-mono)">
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-(family-name:--font-display) leading-tight mb-4 text-slate-900 group-hover:text-blog-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-blog-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm text-blog-muted">
                  <div className="w-8 h-8 rounded-full bg-blog-accent/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-blog-accent">
                      {featured.author.charAt(0)}
                    </span>
                  </div>
                  <span className="text-slate-700 font-medium">
                    {featured.author}
                  </span>
                  <span className="text-slate-300">&middot;</span>
                  <time dateTime={featured.dateISO}>{featured.date}</time>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + Grid + Sidebar — asymmetric 70/30 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="mb-10">
            <Suspense
              fallback={
                <div className="flex flex-wrap gap-2" aria-label="Loading filters">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 rounded-full bg-blog-surface animate-pulse"
                      style={{ width: `${60 + Math.random() * 40}px` }}
                    />
                  ))}
                </div>
              }
            >
              <CategoryFilter categories={allCategories} />
            </Suspense>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Main grid — 70% */}
            <div className="flex-1 min-w-0">
              {rest.length === 0 && !featured && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blog-accent/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blog-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-blog-muted text-lg mb-4">
                    {activeFilter
                      ? `No posts found for "${activeFilter}".`
                      : "No posts found."}
                  </p>
                  {activeFilter && (
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blog-accent hover:underline"
                    >
                      View all posts
                      <ArrowRightIcon />
                    </Link>
                  )}
                </div>
              )}
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((post) => (
                  <article key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full rounded-lg bg-blog-surface border border-slate-200 overflow-hidden transition-all duration-300 hover:border-blog-accent/40 hover:shadow-md"
                    >
                      <PostIllustration
                        slug={post.slug}
                        className="w-full h-auto"
                      />

                      <div className="flex flex-col flex-1 p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="rounded-full bg-blog-accent/15 px-2.5 py-0.5 text-xs font-semibold text-blog-accent">
                            {post.category}
                          </span>
                          <span className="text-xs text-blog-muted font-(family-name:--font-blog-mono)">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-(family-name:--font-display) leading-snug mb-2 text-slate-900 group-hover:text-blog-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-blog-muted leading-relaxed flex-1 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-blog-muted pt-3 border-t border-slate-200">
                          <span className="text-slate-700 font-medium">
                            {post.author}
                          </span>
                          <span className="text-slate-300">&middot;</span>
                          <time dateTime={post.dateISO}>{post.date}</time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar — 30% */}
            <aside
              aria-label="Topics and contact"
              className="w-full lg:w-72 xl:w-80 shrink-0 space-y-10"
            >
              {/* Tag Cloud — now clickable filters */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-blog-muted mb-4 font-(family-name:--font-blog-mono)">
                  Topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => {
                    const tc = getTagColor(t);
                    const isActive = tag === t;
                    return (
                      <Link
                        key={t}
                        href={
                          isActive ? "/blog" : `/blog?tag=${encodeURIComponent(t)}`
                        }
                        aria-current={isActive ? "true" : undefined}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80 ${tc.bg} ${tc.text} ${
                          isActive ? "ring-2 ring-blog-accent ring-offset-2 ring-offset-blog-base" : ""
                        }`}
                      >
                        #{t}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="rounded-lg bg-blog-surface border border-slate-200 p-6">
                <h2 className="text-lg font-bold font-(family-name:--font-display) mb-2 text-slate-900">
                  Need Expert Guidance?
                </h2>
                <p className="text-sm text-blog-muted mb-4 leading-relaxed">
                  Get personalized advice on software development, cloud
                  infrastructure, and digital transformation.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center rounded-lg bg-blog-accent px-4 py-2.5 text-sm font-semibold text-blog-base hover:bg-blog-accent/90 transition-colors"
                >
                  Contact Our Team
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
