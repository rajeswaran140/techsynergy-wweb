import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const services = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "We build fast, responsive, and scalable web applications using modern frameworks and best practices. Our team delivers custom solutions that align with your business goals, from single-page applications to complex enterprise platforms.",
    features: [
      "Custom web application development",
      "Progressive Web Apps (PWAs)",
      "E-commerce platforms",
      "API development and integration",
      "Performance optimization",
      "SEO-friendly architecture",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on every device. We guide you from concept to launch, ensuring your app stands out in the marketplace.",
    features: [
      "iOS and Android native apps",
      "Cross-platform with React Native",
      "App Store optimization",
      "Push notifications and analytics",
      "Offline-first capabilities",
      "In-app purchase integration",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Expo", "Firebase", "Redux"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services to power your business growth. We help you leverage the cloud to reduce costs, improve reliability, and accelerate innovation.",
    features: [
      "AWS, Azure, and GCP deployment",
      "Cloud migration strategies",
      "Serverless architecture",
      "Auto-scaling and load balancing",
      "Infrastructure as Code",
      "Cost optimization and monitoring",
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Docker", "Kubernetes"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User-centered design that creates intuitive, engaging, and visually stunning digital experiences. We combine research, strategy, and creativity to craft interfaces that users love.",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Design systems and style guides",
      "Usability testing",
      "Responsive design",
      "Accessibility compliance (WCAG)",
    ],
    technologies: ["Figma", "Adobe XD", "Framer", "Storybook", "Tailwind CSS", "CSS Animations"],
  },
  {
    slug: "database-architecture",
    title: "Database Architecture",
    description:
      "Robust database design and optimization for high-performance, data-driven applications. We architect data solutions that scale with your business and keep your information secure.",
    features: [
      "Relational and NoSQL databases",
      "Data modeling and schema design",
      "Performance tuning and indexing",
      "Database migration and scaling",
      "Backup and disaster recovery",
      "Real-time data streaming",
    ],
    technologies: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch", "Apache Kafka"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure regulatory compliance. We identify vulnerabilities, implement defenses, and prepare your organization for emerging threats.",
    features: [
      "Security audits and assessments",
      "Penetration testing",
      "Compliance consulting (GDPR, SOC 2)",
      "Incident response planning",
      "Identity and access management",
      "Security awareness training",
    ],
    technologies: ["OWASP", "OAuth 2.0", "JWT", "AWS IAM", "Cloudflare", "Vault"],
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.title };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Description */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            {service.description}
          </p>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary">What We Offer</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl bg-muted p-4"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary">
              Related Technologies
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-muted p-10 text-center">
            <h2 className="text-2xl font-bold text-primary">
              Ready to get started?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Let&apos;s discuss how our {service.title.toLowerCase()} services
              can help your business grow.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
