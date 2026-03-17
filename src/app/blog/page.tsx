import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { blogPosts, getTagColor } from "@/lib/blog-data";
import CategoryFilter from "@/components/blog/CategoryFilter";
import PostIllustration from "@/components/blog/PostIllustration";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and thought leadership from TechSynergy on digital transformation, business strategy, and growth for Canadian businesses.",
  openGraph: {
    title: "Blog | TechSynergy",
    description:
      "Business insights from TechSynergy — strategy, growth, and digital transformation.",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  const filtered = category
    ? blogPosts.filter((p) => p.category === category)
    : blogPosts;

  const [featured, ...rest] = filtered;

  return (
    <div className="bg-blog-base min-h-screen font-(family-name:--font-blog-body) text-slate-900">
      {/* Hero — featured post */}
      {featured && (
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-14">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-(family-name:--font-display) tracking-tight mb-3">
                Blog
              </h1>
              <p className="text-blog-muted text-lg max-w-xl">
                Insights on strategy, growth, and digital transformation for
                Canadian businesses.
              </p>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-lg bg-blog-surface overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-blog-accent/30"
            >
              <PostIllustration slug={featured.slug} className="w-full h-auto" priority={true} />

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-blog-accent/15 px-3 py-1 text-xs font-semibold text-blog-accent">
                    {featured.category}
                  </span>
                  <span className="text-xs text-blog-muted font-(family-name:--font-blog-mono)">
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-(family-name:--font-display) leading-tight mb-4 group-hover:text-blog-accent transition-colors">
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
                  <span className="text-white font-medium">
                    {featured.author}
                  </span>
                  <span className="text-white/20">&middot;</span>
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
            <Suspense fallback={null}>
              <CategoryFilter categories={allCategories} />
            </Suspense>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Main grid — 70% */}
            <div className="flex-1 min-w-0">
              {rest.length === 0 && !featured && (
                <p className="text-blog-muted text-center py-20">
                  No posts found.
                </p>
              )}
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((post) => {
                  const catColor = getTagColor(post.tags[0]);
                  return (
                    <article key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full rounded-lg bg-blog-surface border border-white/5 overflow-hidden transition-all duration-300 hover:border-blog-accent/20 hover:shadow-lg hover:shadow-blog-accent/5"
                      >
                        <PostIllustration slug={post.slug} className="w-full h-auto" />

                        <div className="flex flex-col flex-1 p-5 sm:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="rounded-full bg-blog-accent/15 px-2.5 py-0.5 text-xs font-semibold text-blog-accent">
                              {post.category}
                            </span>
                            <span className="text-xs text-blog-muted font-(family-name:--font-blog-mono)">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-(family-name:--font-display) leading-snug mb-2 group-hover:text-blog-accent transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-blog-muted leading-relaxed flex-1 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-blog-muted pt-3 border-t border-white/5">
                            <span className="text-white/70 font-medium">
                              {post.author}
                            </span>
                            <span className="text-white/20">&middot;</span>
                            <time dateTime={post.dateISO}>{post.date}</time>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Sidebar — 30% */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-10">
              {/* Tag Cloud */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-blog-muted mb-4 font-(family-name:--font-blog-mono)">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const tc = getTagColor(tag);
                    return (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs font-medium cursor-default ${tc.bg} ${tc.text}`}
                      >
                        #{tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="rounded-lg bg-blog-surface border border-white/5 p-6">
                <h3 className="text-lg font-bold font-(family-name:--font-display) mb-2">
                  Stay in the loop
                </h3>
                <p className="text-sm text-blog-muted mb-4 leading-relaxed">
                  Get the latest insights on strategy and growth delivered to
                  your inbox.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center rounded-lg bg-blog-accent px-4 py-2.5 text-sm font-semibold text-blog-base hover:bg-blog-accent/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
