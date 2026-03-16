"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const blogPosts = [
  {
    slug: "future-of-ai-in-software-development",
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is reshaping the way we build software, from code generation to automated testing and beyond.",
    author: "Sarah Chen",
    date: "March 10, 2026",
    tags: ["AI", "Software Development"],
    readTime: "6 min read",
    image: "/blog/ai-software.jpg",
  },
  {
    slug: "building-scalable-cloud-architectures",
    title: "Building Scalable Cloud Architectures",
    excerpt:
      "Learn the key principles and best practices for designing cloud-native applications that scale seamlessly with demand.",
    author: "James Rodriguez",
    date: "March 5, 2026",
    tags: ["Cloud", "Architecture"],
    readTime: "8 min read",
    image: "/blog/cloud-architecture.jpg",
  },
  {
    slug: "ux-design-trends-2026",
    title: "UX Design Trends to Watch in 2026",
    excerpt:
      "From spatial interfaces to adaptive personalization, discover the design trends that will define user experiences this year.",
    author: "Emily Park",
    date: "February 28, 2026",
    tags: ["Design", "UX"],
    readTime: "5 min read",
    image: "/blog/ux-trends.jpg",
  },
  {
    slug: "cybersecurity-best-practices-for-startups",
    title: "Cybersecurity Best Practices for Startups",
    excerpt:
      "Protect your growing business with these essential security strategies that every startup founder should implement from day one.",
    author: "Michael Torres",
    date: "February 20, 2026",
    tags: ["Security", "Startups"],
    readTime: "7 min read",
    image: "/blog/cybersecurity.jpg",
  },
  {
    slug: "guide-to-headless-cms",
    title: "The Complete Guide to Headless CMS",
    excerpt:
      "Understand the benefits of decoupled content management and how it empowers developers to build faster, more flexible websites.",
    author: "Sarah Chen",
    date: "February 14, 2026",
    tags: ["CMS", "Web Development"],
    readTime: "9 min read",
    image: "/blog/headless-cms.jpg",
  },
  {
    slug: "devops-pipeline-optimization",
    title: "Optimizing Your DevOps Pipeline",
    excerpt:
      "Streamline your CI/CD workflows with proven techniques to reduce build times, improve reliability, and ship faster.",
    author: "James Rodriguez",
    date: "February 7, 2026",
    tags: ["DevOps", "CI/CD"],
    readTime: "6 min read",
    image: "/blog/devops.jpg",
  },
];

// Metadata must be exported from a server component, but since we use "use client"
// we handle it via the layout or head. For static metadata with "use client",
// we export it before the component (Next.js will still pick it up).
// NOTE: In Next.js 15, metadata export from client components is not supported.
// Move metadata to a separate layout.tsx if needed, or remove "use client" and
// animate via CSS instead. For now, keeping as requested.

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-primary py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Insights, tutorials, and thought leadership from the TechSynergy
            team.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Image placeholder */}
                  <div className="aspect-video w-full bg-muted">
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <svg
                        className="h-12 w-12 opacity-30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {/* Tags */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>{post.date}</span>
                        <span className="text-muted-foreground/50">|</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
