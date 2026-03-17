"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-primary py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="container relative mx-auto px-4 text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white transition-all duration-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Pricing Plans
          </h1>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/80 transition-all duration-600 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Transparent pricing for every stage of your business.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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
        </div>
      </section>
    </main>
  );
}
