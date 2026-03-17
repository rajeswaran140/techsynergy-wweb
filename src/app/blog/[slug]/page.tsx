import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  getTagColor,
} from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt,
    };
  });
}

/** Safe markdown-like renderer */
function renderContent(raw: string) {
  return raw
    .trim()
    .split("\n\n")
    .map((block, i) => {
      const trimmed = block.trim();

      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="mb-4 mt-12 text-2xl font-bold text-slate-900 dark:text-white"
          >
            {trimmed.slice(3)}
          </h2>
        );
      }

      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .map((line) => line.replace(/^- /, ""));
        return (
          <ul
            key={i}
            className="mb-6 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300"
          >
            {items.map((item, j) => {
              const parts = item.split(/\*\*(.*?)\*\*/g);
              return (
                <li key={j}>
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong
                        key={k}
                        className="text-slate-900 dark:text-white"
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <p
          key={i}
          className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {trimmed}
        </p>
      );
    });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.dateISO,
    publisher: {
      "@type": "Organization",
      name: "TechSynergy",
      url: "https://techsynergy.ca",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary py-16 sm:py-22 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Category badge */}
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-6 bg-white/20 text-white">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {post.author.charAt(0)}
                </span>
              </div>
              <span className="text-white/90 font-medium">{post.author}</span>
            </div>
            <span className="hidden sm:inline text-white/40">&middot;</span>
            <time dateTime={post.dateISO}>{post.date}</time>
            <span className="hidden sm:inline text-white/40">&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Tags bar */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => {
            const tc = getTagColor(tag);
            return (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-medium ${tc.bg} ${tc.text}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          {renderContent(post.content)}
        </article>
      </section>

      {/* Author card */}
      <section className="border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-primary">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {post.author}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                TechSynergy Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-14 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => {
                const relColor = getTagColor(rel.tags[0]);
                return (
                  <article key={rel.slug}>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-semibold mb-3 ${relColor.bg} ${relColor.text}`}
                      >
                        {rel.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                        <div>
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {rel.author}
                          </span>
                          <span className="mx-1.5">&middot;</span>
                          <time dateTime={rel.dateISO}>{rel.date}</time>
                        </div>
                        <span>{rel.readTime}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                All Posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
