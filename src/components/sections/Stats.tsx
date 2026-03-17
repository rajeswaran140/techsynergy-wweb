"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Completed" },
  { label: "Happy Clients" },
  { label: "Team Members" },
  { label: "Client Satisfaction" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                &mdash;
              </p>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
