import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tutorials, and thought leadership from the TechSynergy team on software development, cloud architecture, and DevOps.",
  openGraph: {
    title: "Blog | TechSynergy",
    description:
      "Technical articles from TechSynergy — software, cloud, DevOps, and more.",
  },
};

const posts = [
  {
    slug: "future-of-ai-in-software-development",
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is reshaping the way we build software.",
    author: "Sarah Chen",
    date: "March 10, 2026",
    tags: ["AI", "Software Development"],
    readTime: "6 min read",
  },
  {
    slug: "building-scalable-cloud-architectures",
    title: "Building Scalable Cloud Architectures",
    excerpt:
      "Learn the key principles for designing cloud-native applications that scale seamlessly.",
    author: "James Rodriguez",
    date: "March 5, 2026",
    tags: ["Cloud", "Architecture"],
    readTime: "8 min read",
  },
  {
    slug: "ux-design-trends-2026",
    title: "UX Design Trends to Watch in 2026",
    excerpt: "Discover the design trends defining user experiences this year.",
    author: "Emily Park",
    date: "February 28, 2026",
    tags: ["Design", "UX"],
    readTime: "5 min read",
  },
  {
    slug: "cybersecurity-best-practices-for-startups",
    title: "Cybersecurity Best Practices for Startups",
    excerpt:
      "Essential security strategies every startup founder should implement.",
    author: "Michael Torres",
    date: "February 20, 2026",
    tags: ["Security", "Startups"],
    readTime: "7 min read",
  },
  {
    slug: "guide-to-headless-cms",
    title: "The Complete Guide to Headless CMS",
    excerpt:
      "Understand decoupled content management and its benefits for developers.",
    author: "Sarah Chen",
    date: "February 14, 2026",
    tags: ["CMS", "Web Development"],
    readTime: "9 min read",
  },
  {
    slug: "devops-pipeline-optimization",
    title: "Optimizing Your DevOps Pipeline",
    excerpt: "Proven techniques to reduce build times and ship faster.",
    author: "James Rodriguez",
    date: "February 7, 2026",
    tags: ["DevOps", "CI/CD"],
    readTime: "6 min read",
  },
];

export default function BlogPage() {
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

      {/* Posts */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
