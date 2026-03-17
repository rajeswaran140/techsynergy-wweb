"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
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
            Pricing Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Transparent pricing for every stage of your business.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-muted-foreground mb-8">
            Pricing details coming soon. Contact us for a custom quote.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
