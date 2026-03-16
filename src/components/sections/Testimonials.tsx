"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Sarah Mitchell",
    company: "Greenfield Logistics",
    role: "CTO",
    quote:
      "TechSynergy transformed our outdated supply chain system into a streamlined digital platform. Their team was responsive, technically excellent, and always a step ahead of our needs.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    company: "NovaPay Financial",
    role: "VP of Engineering",
    quote:
      "We partnered with TechSynergy to build our mobile banking app from scratch. The result exceeded every expectation — our user engagement increased by 140% within three months of launch.",
    rating: 5,
  },
  {
    name: "Rachel Hernandez",
    company: "BrightPath Education",
    role: "Founder & CEO",
    quote:
      "Working with TechSynergy felt like having an in-house team. They understood our vision for an ed-tech platform and delivered a product that our students and educators genuinely love.",
    rating: 5,
  },
];

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
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <HiStar key={idx} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
