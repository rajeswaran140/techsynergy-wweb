export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  tags: string[];
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-ai-in-software-development",
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is reshaping the way we build software.",
    author: "Raj",
    date: "March 10, 2026",
    dateISO: "2026-03-10",
    tags: ["AI", "Software Development"],
    readTime: "6 min read",
    content: `This post is coming soon. Check back for insights on how AI is transforming the software development lifecycle — from code generation to automated testing and intelligent DevOps.`,
  },
  {
    slug: "building-scalable-cloud-architectures",
    title: "Building Scalable Cloud Architectures",
    excerpt:
      "Learn the key principles for designing cloud-native applications that scale seamlessly.",
    author: "Raj",
    date: "March 5, 2026",
    dateISO: "2026-03-05",
    tags: ["Cloud", "Architecture"],
    readTime: "8 min read",
    content: `This post is coming soon. We'll cover the core principles behind cloud architectures that grow gracefully with demand — from designing for failure to embracing managed services.`,
  },
  {
    slug: "ux-design-trends-2026",
    title: "UX Design Trends to Watch in 2026",
    excerpt:
      "Discover the design trends defining user experiences this year.",
    author: "Raj",
    date: "February 28, 2026",
    dateISO: "2026-02-28",
    tags: ["Design", "UX"],
    readTime: "5 min read",
    content: `This post is coming soon. We'll explore the trends shaping digital product design in 2026 — from spatial interfaces to inclusive design as a default.`,
  },
  {
    slug: "cybersecurity-best-practices-for-startups",
    title: "Cybersecurity Best Practices for Startups",
    excerpt:
      "Essential security strategies every startup founder should implement.",
    author: "Raj",
    date: "February 20, 2026",
    dateISO: "2026-02-20",
    tags: ["Security", "Startups"],
    readTime: "7 min read",
    content: `This post is coming soon. We'll cover essential security strategies for startups — from strong authentication and supply chain security to incident response planning.`,
  },
  {
    slug: "guide-to-headless-cms",
    title: "The Complete Guide to Headless CMS",
    excerpt:
      "Understand decoupled content management and its benefits for developers.",
    author: "Raj",
    date: "February 14, 2026",
    dateISO: "2026-02-14",
    tags: ["CMS", "Web Development"],
    readTime: "9 min read",
    content: `This post is coming soon. We'll break down what makes a CMS headless, the benefits for developers and content teams, and when to choose a headless approach.`,
  },
  {
    slug: "devops-pipeline-optimization",
    title: "Optimizing Your DevOps Pipeline",
    excerpt:
      "Proven techniques to reduce build times and ship faster.",
    author: "Raj",
    date: "February 7, 2026",
    dateISO: "2026-02-07",
    tags: ["DevOps", "CI/CD"],
    readTime: "6 min read",
    content: `This post is coming soon. We'll share proven techniques for optimizing your CI/CD pipeline — from parallelizing builds to shifting left on security.`,
  },
];

/** Lookup a post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Get related posts by shared tags, excluding the current slug */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.filter((p) => p.slug !== slug).slice(0, limit);

  const currentTags = new Set(current.tags);
  const others = blogPosts.filter((p) => p.slug !== slug);

  // Score by number of shared tags
  const scored = others.map((p) => ({
    post: p,
    score: p.tags.filter((t) => currentTags.has(t)).length,
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
