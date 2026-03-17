"use client";

import { motion } from "framer-motion";

export default function PortfolioPage() {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            <p>Portfolio projects coming soon.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
