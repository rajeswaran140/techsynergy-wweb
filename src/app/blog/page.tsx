import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getTagColor } from "@/lib/blog-data";

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

export default function BlogPage() {
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-14 sm:py-18 md:py-22">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and thought leadership from the TechSynergy
            team.
          </p>
        </div>
      </section>

      {/* Posts — single-column feed */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {blogPosts.map((post) => {
              const catColor = getTagColor(post.tags[0]);
              return (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Top row: category + read time */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${catColor.bg} ${catColor.text}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag) => {
                        const tc = getTagColor(tag);
                        return (
                          <span
                            key={tag}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tc.bg} ${tc.text}`}
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Bottom row: author, date, read link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {post.author}
                          </span>
                          <span className="mx-2 text-slate-300 dark:text-slate-600">
                            &middot;
                          </span>
                          <time
                            dateTime={post.dateISO}
                            className="text-slate-500 dark:text-slate-400"
                          >
                            {post.date}
                          </time>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary group-hover:underline flex items-center gap-1">
                        Read
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 sm:py-16 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
            Popular Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => {
              const tc = getTagColor(tag);
              return (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${tc.bg} ${tc.text}`}
                >
                  #{tag}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
