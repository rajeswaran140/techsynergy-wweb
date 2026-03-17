"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false }
);

export default function CTA() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-r from-primary to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Let&apos;s Build Something Together
          </h2>
        </MotionDiv>

        <MotionDiv
          className="text-blue-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Whether you need a SaaS product, cloud migration, or custom API —
          we&apos;re ready to help your Canadian business grow.
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg bg-white text-primary font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get a Free Quote
          </Link>
        </MotionDiv>
      </div>
    </section>
  );
}
