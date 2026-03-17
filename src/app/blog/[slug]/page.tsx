import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  getTagColor,
} from "@/lib/blog-data";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import PostIllustration from "@/components/blog/PostIllustration";

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
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  });
}

/** Extract ## headings for ToC */
function extractHeadings(content: string) {
  const headings: { id: string; text: string }[] = [];
  for (const line of content.split("\n")) {
    const match = line.match(/^## (.+)$/);
    if (match) {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text });
    }
  }
  return headings;
}

/** Render markdown-like content with IDs on h2s */
function renderContent(raw: string) {
  return raw
    .trim()
    .split("\n\n")
    .map((block, i) => {
      const trimmed = block.trim();

      if (trimmed.startsWith("## ")) {
        const text = trimmed.slice(3).trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <h2
            key={i}
            id={id}
            className="mb-4 mt-14 text-2xl sm:text-3xl font-bold font-(family-name:--font-display) text-slate-900 scroll-mt-24"
          >
            {text}
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
            className="mb-6 space-y-2.5 pl-5 text-blog-muted list-none"
          >
            {items.map((item, j) => {
              const parts = item.split(/\*\*(.*?)\*\*/g);
              return (
                <li
                  key={j}
                  className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blog-accent/60"
                >
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong key={k} className="text-slate-900 font-semibold">
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
          className="mb-6 text-lg leading-[1.8] text-blog-muted"
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
  const headings = extractHeadings(post.content);

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
    <div className="bg-blog-base min-h-screen font-(family-name:--font-blog-body) text-slate-900">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-blog-muted font-(family-name:--font-blog-mono)">
          <Link href="/blog" className="hover:text-blog-accent transition-colors">
            Blog
          </Link>
          <span className="text-slate-900/20">/</span>
          <span className="text-slate-900/50 truncate max-w-xs">
            {post.title}
          </span>
        </nav>
      </div>

      {/* Hero */}
      <header className="pb-12 sm:pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostIllustration slug={post.slug} className="w-full h-auto rounded-lg mb-8 sm:mb-10" priority={true} />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="rounded-full bg-blog-accent/15 px-3 py-1 text-xs font-semibold text-blog-accent">
                {post.category}
              </span>
              <span className="text-xs text-blog-muted font-(family-name:--font-blog-mono)">
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-(family-name:--font-display) leading-[1.1] tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-blog-muted leading-relaxed mb-8 max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author + date */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blog-accent/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-blog-accent">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {post.author}
                  </p>
                  <p className="text-xs text-blog-muted">TechSynergy</p>
                </div>
              </div>
              <span className="text-slate-900/10">|</span>
              <time
                dateTime={post.dateISO}
                className="text-sm text-blog-muted font-(family-name:--font-blog-mono)"
              >
                {post.date}
              </time>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => {
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
        </div>
      </header>

      {/* Content + ToC */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Article — centered 720px */}
            <article className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
              {renderContent(post.content)}
            </article>

            {/* ToC sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
                <TableOfContents headings={headings} />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Author card */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-5 rounded-lg bg-blog-surface border border-white/5 p-6 sm:p-8">
            <div className="w-16 h-16 rounded-full bg-blog-accent/15 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-blog-accent">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-bold font-(family-name:--font-display) text-slate-900">
                {post.author}
              </p>
              <p className="text-sm text-blog-muted leading-relaxed mt-1">
                Founder &amp; Developer at TechSynergy. Helping Canadian businesses
                grow through technology and strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-white/5 py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-(family-name:--font-display) mb-10">
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <article key={rel.slug}>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col h-full rounded-lg bg-blog-surface border border-white/5 overflow-hidden transition-all duration-300 hover:border-blog-accent/20"
                  >
                    <PostIllustration slug={rel.slug} className="w-full h-auto" />
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <span className="self-start rounded-full bg-blog-accent/15 px-2.5 py-0.5 text-xs font-semibold text-blog-accent mb-3">
                        {rel.category}
                      </span>
                      <h3 className="text-lg font-bold font-(family-name:--font-display) leading-snug mb-2 group-hover:text-blog-accent transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-blog-muted leading-relaxed flex-1 mb-4">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blog-muted pt-3 border-t border-white/5">
                        <span className="text-slate-900/70 font-medium">
                          {rel.author}
                        </span>
                        <span className="text-slate-900/20">&middot;</span>
                        <time dateTime={rel.dateISO}>{rel.date}</time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-blog-accent/10 px-6 py-2.5 text-sm font-semibold text-blog-accent hover:bg-blog-accent/20 transition-colors"
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
    </div>
  );
}
