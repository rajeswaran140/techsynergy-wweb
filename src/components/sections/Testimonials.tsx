"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border flex flex-col items-center justify-center min-h-[200px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <p className="text-muted-foreground text-sm">
                Testimonial coming soon
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
