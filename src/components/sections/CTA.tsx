"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-linear-to-r from-primary to-blue-700">
      <div className="px-8 sm:px-12 lg:px-16 xl:px-20 text-center lg:text-left">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Transform Your Business?
        </motion.h2>

        <motion.p
          className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Let&apos;s discuss how TechSynergy can help you build innovative
          software solutions that drive growth and give you a competitive edge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg bg-white text-primary font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
