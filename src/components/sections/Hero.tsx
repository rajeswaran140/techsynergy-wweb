"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <section
      className="min-h-[calc(100dvh-4rem)] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2"
      aria-labelledby="hero-heading"
    >
      {/* Left — CTA */}
      <div className="relative flex items-center justify-center bg-linear-to-br from-slate-100 via-slate-200 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 overflow-hidden">
        {/* Background orbs — decorative */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl hidden md:block animate-[orb1_12s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl hidden md:block animate-[orb2_15s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        <div className="relative z-10 px-6 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-28 w-full">
          <div className="max-w-xl space-y-5 sm:space-y-6">
            <p
              className={`text-primary font-semibold tracking-widest uppercase text-xs transition-all duration-600 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Markham, Ontario &bull; Founded 2023 &bull; 25+ Years Experience
            </p>

            <h1
              id="hero-heading"
              className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] transition-all duration-700 delay-150 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Canadian Software.{" "}
              <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Built to Last.
              </span>
            </h1>

            <p
              className={`text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed transition-all duration-700 delay-300 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A Markham-based software company building privacy-first SaaS
              products for Canadian businesses — including Mobily.ca and
              SeoSync.ca.
            </p>

            {/* Trust signals */}
            <div
              className={`flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 transition-all duration-600 delay-350 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CheckIcon />
                25+ Years Experience
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon />
                Privacy-First
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon />
                Canadian-Built
              </span>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 pt-2 transition-all duration-700 delay-[450ms] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/services"
                className="px-7 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors text-base text-center shadow-lg shadow-primary/25"
              >
                See Our Services
              </Link>
              <Link
                href="/portfolio"
                className="px-7 py-3.5 rounded-lg border-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary hover:text-primary transition-colors text-base text-center"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Hero image */}
      <div
        className={`relative h-64 sm:h-80 lg:h-auto lg:min-h-screen transition-opacity duration-800 delay-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/coding_Image_2.webp"
          alt="TechSynergy software development workspace with code on screen"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
