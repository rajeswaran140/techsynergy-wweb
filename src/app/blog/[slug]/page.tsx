import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";

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

/** Safe markdown-like renderer — no dangerouslySetInnerHTML for content */
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
            className="mb-4 mt-10 text-2xl font-bold text-slate-900 dark:text-white"
          >
            {trimmed.slice(3)}
          </h2>
        );
      }

      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
        return (
          <ul
            key={i}
            className="mb-4 list-disc space-y-1 pl-6 text-slate-600 dark:text-slate-300"
          >
            {items.map((item, j) => {
              // Parse **bold** safely via React elements
              const parts = item.split(/\*\*(.*?)\*\*/g);
              return (
                <li key={j}>
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong key={k} className="text-slate-900 dark:text-white">
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
          className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300"
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
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary py-14 sm:py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/70">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.dateISO}>{post.date}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 text-base leading-relaxed">
          {renderContent(post.content)}
        </article>
      </section>

      {/* Related Posts */}
      <section className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
            Related Posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <article key={rel.slug}>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col h-full"
                >
                  <div className="mb-2 flex gap-2">
                    {rel.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white transition-colors group-hover:text-primary">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">
                    {rel.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    {rel.author} &middot;{" "}
                    <time dateTime={rel.dateISO}>{rel.date}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
