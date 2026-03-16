"use client";

import { motion } from "framer-motion";
import {
  HiCode,
  HiDeviceMobile,
  HiCloud,
  HiTemplate,
  HiDatabase,
  HiShieldCheck,
} from "react-icons/hi";

const services = [
  {
    icon: HiCode,
    title: "Custom Software Development",
    description:
      "Tailored software solutions built to match your unique business requirements and workflows.",
  },
  {
    icon: HiDeviceMobile,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver seamless user experiences on every device.",
  },
  {
    icon: HiCloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services to modernize your technology stack.",
  },
  {
    icon: HiTemplate,
    title: "UI/UX Design",
    description:
      "Intuitive, beautiful interfaces designed with a focus on usability and conversion.",
  },
  {
    icon: HiDatabase,
    title: "Data Engineering",
    description:
      "Robust data pipelines and analytics platforms that turn raw data into actionable insights.",
  },
  {
    icon: HiShieldCheck,
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, penetration testing, and compliance solutions to protect your assets.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">
            What We Do
          </p>
          <h2 className="text-4xl font-bold text-foreground">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
