import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    tags: string[];
    readTime: string;
    content: string;
  }
> = {
  "future-of-ai-in-software-development": {
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is reshaping the way we build software.",
    author: "Sarah Chen",
    date: "March 10, 2026",
    tags: ["AI", "Software Development"],
    readTime: "6 min read",
    content: `
Artificial intelligence is no longer a distant promise — it is transforming the software development lifecycle right now. From intelligent code completion to fully automated test generation, AI-powered tools are enabling developers to ship higher-quality software faster than ever before.

## AI-Powered Code Generation

Tools like GitHub Copilot and newer LLM-based assistants can generate entire functions, suggest refactors, and even write unit tests from natural-language descriptions. While these tools are not a replacement for engineering judgment, they dramatically reduce the time spent on boilerplate code and routine tasks.

## Automated Testing and QA

AI is also revolutionizing quality assurance. Machine learning models can analyze historical bug data to predict the most likely failure points in a codebase, allowing teams to focus testing efforts where they matter most. Visual regression testing powered by computer vision can detect subtle UI changes that traditional snapshot tests would miss.

## Intelligent DevOps

On the operations side, AI-driven observability platforms can detect anomalies in real time, correlate events across distributed systems, and even suggest root causes. This dramatically reduces mean time to resolution and helps teams maintain uptime at scale.

## The Human Element

Despite these advances, software development remains fundamentally a creative, human endeavor. The most effective teams will be those that leverage AI as a force multiplier — automating the tedious and repetitive so that engineers can focus on architecture, design, and solving novel problems.

## Looking Ahead

As models continue to improve and tooling matures, we expect AI to become an indispensable part of every developer's workflow. The key is to adopt these tools thoughtfully, with a clear understanding of their strengths and limitations.
    `,
  },
  "building-scalable-cloud-architectures": {
    title: "Building Scalable Cloud Architectures",
    excerpt:
      "Learn the key principles for designing cloud-native applications that scale seamlessly.",
    author: "James Rodriguez",
    date: "March 5, 2026",
    tags: ["Cloud", "Architecture"],
    readTime: "8 min read",
    content: `
Scalability is not something you bolt on after launch — it must be designed into the foundation of your application. In this post, we explore the core principles behind cloud architectures that grow gracefully with demand.

## Design for Failure

In distributed systems, failure is inevitable. Architect your services so that any single component can fail without bringing down the entire system. Use circuit breakers, retries with exponential backoff, and health checks to build resilience into every layer.

## Decouple Everything

Tightly coupled systems are the enemy of scalability. Use message queues, event buses, and well-defined API contracts to ensure that services can evolve and scale independently. This also simplifies deployments and reduces blast radius.

## Embrace Managed Services

Cloud providers offer battle-tested managed services for databases, caching, messaging, and more. Leveraging these services lets your team focus on business logic rather than infrastructure management, while benefiting from built-in scalability and redundancy.

## Observability is Non-Negotiable

You cannot scale what you cannot measure. Implement comprehensive logging, distributed tracing, and metrics collection from the start. Dashboards and alerts should provide real-time visibility into system health and performance.

## Start Simple, Scale Intentionally

Premature optimization is still the root of all evil. Start with the simplest architecture that meets your current requirements, but design with clear extension points so you can scale individual components as demand dictates.
    `,
  },
  "ux-design-trends-2026": {
    title: "UX Design Trends to Watch in 2026",
    excerpt:
      "Discover the design trends defining user experiences this year.",
    author: "Emily Park",
    date: "February 28, 2026",
    tags: ["Design", "UX"],
    readTime: "5 min read",
    content: `
User experience design is evolving rapidly. Here are the trends shaping how we design digital products in 2026.

## Spatial and 3D Interfaces

With the maturation of AR/VR hardware, spatial UI patterns are moving from novelty to necessity. Designers are learning to create interfaces that exist in three-dimensional space, requiring new mental models for navigation and interaction.

## Adaptive Personalization

AI-driven personalization is becoming more sophisticated. Interfaces now adapt not just to user preferences but to context — time of day, device, location, and even emotional state inferred from interaction patterns.

## Micro-Interactions with Purpose

Every animation and transition should serve a purpose. The best designs use micro-interactions to provide feedback, guide attention, and create a sense of continuity. Gratuitous animation is out; purposeful motion is in.

## Inclusive Design as Default

Accessibility is no longer an afterthought. Leading teams are embedding inclusive design practices into every phase of the design process, from research to testing. This includes designing for neurodiversity, low-bandwidth environments, and a wide range of input modalities.

## Design Systems at Scale

Mature design systems are enabling teams to move faster while maintaining consistency. The trend is toward tokenized, theme-aware systems that can power multiple brands and platforms from a single source of truth.
    `,
  },
  "cybersecurity-best-practices-for-startups": {
    title: "Cybersecurity Best Practices for Startups",
    excerpt:
      "Essential security strategies every startup founder should implement.",
    author: "Michael Torres",
    date: "February 20, 2026",
    tags: ["Security", "Startups"],
    readTime: "7 min read",
    content: `
Startups are prime targets for cyberattacks. Limited resources and rapid growth often mean security takes a back seat. Here is how to protect your business from day one.

## Enforce Strong Authentication

Implement multi-factor authentication across all systems. Use SSO providers and avoid storing passwords directly. Enforce strong password policies and rotate credentials regularly.

## Secure Your Supply Chain

Third-party dependencies are a major attack vector. Audit your npm, pip, and other package dependencies regularly. Use tools like Dependabot or Snyk to automatically detect and patch vulnerabilities.

## Encrypt Everything

Data should be encrypted at rest and in transit. Use TLS for all network communication, encrypt database volumes, and never store sensitive data in plaintext — including logs.

## Implement Least Privilege

Every user and service should have the minimum permissions necessary to perform their function. Review IAM policies regularly and remove unused accounts and roles promptly.

## Plan for Incidents

Have a documented incident response plan before you need one. Know who to contact, how to contain a breach, and how to communicate with affected parties. Conduct regular tabletop exercises to keep your team prepared.
    `,
  },
  "guide-to-headless-cms": {
    title: "The Complete Guide to Headless CMS",
    excerpt:
      "Understand decoupled content management and its benefits for developers.",
    author: "Sarah Chen",
    date: "February 14, 2026",
    tags: ["CMS", "Web Development"],
    readTime: "9 min read",
    content: `
A headless CMS decouples content management from content presentation, giving developers full control over how and where content is displayed.

## What Makes a CMS "Headless"?

Traditional CMS platforms like WordPress bundle the content management backend with a rendering frontend. A headless CMS provides only the backend — content is delivered via APIs and can be consumed by any frontend: web, mobile, IoT, or even print.

## Benefits for Developers

Developers can use their preferred frameworks and tools. A React, Next.js, or Svelte frontend can pull content from the same API that powers a mobile app. This decoupling also enables better caching, faster page loads, and more flexible deployment strategies.

## Benefits for Content Teams

Content authors get a clean, focused editing experience without worrying about layout or code. Structured content models ensure consistency, and preview features let editors see how content will appear before publishing.

## Popular Headless CMS Options

- **Sanity** — Highly customizable with real-time collaboration
- **Contentful** — Enterprise-grade with a rich ecosystem
- **Strapi** — Open-source and self-hosted
- **Payload** — TypeScript-first with a modern developer experience

## When to Go Headless

A headless CMS is ideal when you need to deliver content across multiple channels, want full control over the frontend, or need to integrate content into a custom application. For simple blogs or marketing sites, a traditional CMS may still be the simpler choice.
    `,
  },
  "devops-pipeline-optimization": {
    title: "Optimizing Your DevOps Pipeline",
    excerpt:
      "Proven techniques to reduce build times and ship faster.",
    author: "James Rodriguez",
    date: "February 7, 2026",
    tags: ["DevOps", "CI/CD"],
    readTime: "6 min read",
    content: `
A fast, reliable CI/CD pipeline is the backbone of modern software delivery. Here is how to optimize yours.

## Parallelize Your Builds

Identify independent steps in your pipeline and run them concurrently. Most CI platforms support parallel jobs — use them to run linting, unit tests, and integration tests simultaneously rather than sequentially.

## Cache Aggressively

Cache dependencies, build artifacts, and Docker layers between runs. A well-configured cache can reduce build times by 50% or more. Make sure to invalidate caches appropriately when dependencies change.

## Use Incremental Builds

Tools like Nx, Turborepo, and Bazel can detect which parts of a monorepo have changed and only build and test the affected projects. This is a game-changer for large codebases.

## Optimize Docker Images

Use multi-stage builds to keep images small. Order Dockerfile instructions from least to most frequently changing to maximize layer caching. Consider using distroless or Alpine base images for production.

## Monitor Pipeline Health

Track key metrics: build duration, success rate, flaky test frequency, and time to deploy. Set up alerts for regressions so you can address issues before they slow down the entire team.

## Shift Left on Security

Integrate security scanning into your pipeline early. SAST, DAST, and dependency vulnerability checks should run on every pull request, not just before release.
    `,
  },
};

const allSlugs = Object.keys(blogPosts);

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = blogPosts[slug];
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) notFound();

  const relatedSlugs = allSlugs.filter((s) => s !== slug).slice(0, 3);

  // Simple markdown-like rendering: headings and paragraphs
  const renderContent = (raw: string) => {
    return raw
      .trim()
      .split("\n\n")
      .map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mb-4 mt-10 text-2xl font-bold text-foreground"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
          return (
            <ul key={i} className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground">
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
            {trimmed}
          </p>
        );
      });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
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
          <h1 className="mx-auto max-w-3xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <article className="mx-auto max-w-3xl text-base leading-relaxed">
          {renderContent(post.content)}
        </article>
      </section>

      {/* Related Posts */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Related Posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSlugs.map((relSlug) => {
              const rel = blogPosts[relSlug];
              return (
                <Link
                  key={relSlug}
                  href={`/blog/${relSlug}`}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
                  <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{rel.excerpt}</p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    {rel.author} · {rel.date}
                  </div>
                </Link>
              );
            })}
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
