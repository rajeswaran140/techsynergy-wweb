import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

const values = [
  {
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and creative solutions to solve complex problems and drive progress.",
  },
  {
    title: "Quality",
    description:
      "Every line of code, every design decision, and every deliverable meets the highest standards of excellence.",
  },
  {
    title: "Collaboration",
    description:
      "We work closely with our clients and each other, believing that the best results come from teamwork.",
  },
  {
    title: "Integrity",
    description:
      "Transparency, honesty, and ethical practices guide every interaction and business decision we make.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            About TechSynergy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Building the future of digital experiences, one project at a time.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-primary">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              TechSynergy was founded with a simple yet powerful mission: to
              empower businesses through technology. Our team combines deep
              technical expertise with a genuine understanding of business needs
              to create solutions that drive real results.
            </p>
            <p>
              We partner with organizations at every stage of their digital
              journey, staying at the forefront of web development, cloud
              computing, and design innovation. Our commitment to excellence and
              our client-first approach have made us a trusted partner for
              businesses looking to thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-primary">
            Our Values
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            The principles that guide everything we do.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-primary">
            Meet Our Team
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            The talented people behind TechSynergy.
          </p>
          <div className="mt-12 text-center text-muted-foreground">
            <p>Team details coming soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
