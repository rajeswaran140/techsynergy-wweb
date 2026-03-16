"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Web", "Mobile", "Cloud", "Design"] as const;

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, payment processing, and an admin dashboard.",
    category: "Web",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Fitness Tracking App",
    description:
      "A cross-platform mobile app for tracking workouts, nutrition, and personal health goals.",
    category: "Mobile",
    technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
  },
  {
    title: "Cloud Migration Portal",
    description:
      "An enterprise dashboard for managing multi-cloud infrastructure migration and monitoring.",
    category: "Cloud",
    technologies: ["AWS", "Terraform", "Docker", "React"],
  },
  {
    title: "Banking App Redesign",
    description:
      "A complete UX overhaul of a mobile banking application, improving usability and accessibility.",
    category: "Design",
    technologies: ["Figma", "Framer", "Design Systems", "WCAG"],
  },
  {
    title: "Real Estate Marketplace",
    description:
      "A property listing platform with interactive maps, virtual tours, and mortgage calculators.",
    category: "Web",
    technologies: ["React", "Node.js", "MongoDB", "Mapbox"],
  },
  {
    title: "Logistics Tracker",
    description:
      "A mobile app for real-time shipment tracking, route optimization, and delivery management.",
    category: "Mobile",
    technologies: ["Kotlin", "Google Maps", "Firebase", "REST APIs"],
  },
];

export default function PortfolioPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Our Portfolio
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of projects that showcase our expertise and creativity.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <motion.div
            layout
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
