"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[calc(100dvh-4rem)] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — CTA */}
      <div className="relative flex items-center justify-center bg-linear-to-br from-slate-100 via-slate-200 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 overflow-hidden">
        {/* Background orbs — hidden on mobile to save battery */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl hidden md:block"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl hidden md:block"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.85, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 px-6 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-28 w-full">
          <div className="max-w-xl space-y-5 sm:space-y-6">
            <motion.p
              className="text-primary font-semibold tracking-widest uppercase text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Markham, Ontario &bull; 25+ Years in Software
            </motion.p>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Canadian Software.{" "}
              <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Built to Last.
              </span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A Markham-based software company building privacy-first SaaS
              products for Canadian businesses — including Mobily.ca and
              SeoSync.ca.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                25+ Years Experience
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Privacy-First
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Canadian-Built
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Link
                href="/services"
                className="px-7 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors text-base text-center shadow-lg shadow-primary/25"
              >
                See Our Products
              </Link>
              <Link
                href="/portfolio"
                className="px-7 py-3.5 rounded-lg border-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary hover:text-primary transition-colors text-base text-center"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right — Hero image */}
      <motion.div
        className="relative h-64 sm:h-80 lg:h-auto lg:min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src="/coding_Image_2.webp"
          alt="Software development workspace"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
