"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — CTA */}
      <div className="relative flex items-center justify-center bg-linear-to-br from-slate-100 via-slate-200 to-blue-100 overflow-hidden min-h-screen">
        {/* Background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.85, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 px-8 sm:px-12 lg:px-16 xl:px-20 py-28 w-full">
          <div className="max-w-xl space-y-6">
            <motion.p
              className="text-primary font-semibold tracking-widest uppercase text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to TechSynergy
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Building Digital{" "}
              <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-600 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              TechSynergy delivers end-to-end software development services that
              empower businesses to scale, innovate, and lead in the digital age.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Link
                href="/contact"
                className="px-7 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors text-base text-center shadow-lg shadow-primary/25"
              >
                Get Started
              </Link>
              <Link
                href="/portfolio"
                className="px-7 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-primary hover:text-primary transition-colors text-base text-center"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right — Hero image (edge to edge) */}
      <motion.div
        className="relative hidden lg:block min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src="/coding_Image_2.webp"
          alt="Software development"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
