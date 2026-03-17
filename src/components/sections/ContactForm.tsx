"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CONTACT_API = "/api/contact";

const services = [
  "Web Development",
  "Mobile App Development",
  "Cloud Solutions",
  "UI/UX Design",
  "Other",
];

export default function ContactForm({ variant = "landing" }: { variant?: "landing" | "standalone" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    _honey: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 6000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    else if (form.name.length > 100) errs.name = "Name is too long.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    else if (form.email.length > 254) errs.email = "Email is too long.";
    if (form.phone.length > 30) errs.phone = "Phone is too long.";
    if (form.company.length > 100) errs.company = "Company name is too long.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.length > 2000) errs.message = "Message is too long (max 2000 characters).";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._honey) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const { _honey, ...payload } = form;
      void _honey;
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send message.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "", _honey: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border-2 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
        : focused === field
        ? "border-primary focus:ring-2 focus:ring-primary/20"
        : "border-slate-200 hover:border-slate-300"
    }`;

  const formCard = (
    <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 sm:p-8 lg:p-10">
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-green-600/30 bg-green-50 p-4 text-sm text-green-700 text-center flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Message sent successfully! We&apos;ll be in touch soon.
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-red-600/30 bg-red-50 p-4 text-sm text-red-700 text-center flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Something went wrong. Please try again.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot */}
        <div className="absolute opacity-0 -z-10" aria-hidden="true">
          <input
            type="text"
            name="_honey"
            value={form._honey}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-slate-700">
              Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="cf-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              className={inputClass("name")}
              placeholder="Your name"
              maxLength={100}
              autoComplete="name"
            />
            {errors.name && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-slate-700">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="cf-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              className={inputClass("email")}
              placeholder="you@company.com"
              maxLength={254}
              autoComplete="email"
            />
            {errors.email && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="cf-phone" className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              id="cf-phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              className={inputClass("phone")}
              placeholder="+1 (555) 000-0000"
              maxLength={30}
              autoComplete="tel"
            />
            {errors.phone && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs text-red-400">
                {errors.phone}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="cf-company" className="mb-2 block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              type="text"
              id="cf-company"
              name="company"
              value={form.company}
              onChange={handleChange}
              onFocus={() => setFocused("company")}
              onBlur={() => setFocused(null)}
              className={inputClass("company")}
              placeholder="Your company"
              maxLength={100}
              autoComplete="organization"
            />
            {errors.company && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs text-red-400">
                {errors.company}
              </motion.p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cf-service" className="mb-2 block text-sm font-medium text-slate-700">
            Service Interested In
          </label>
          <select
            id="cf-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            onFocus={() => setFocused("service")}
            onBlur={() => setFocused(null)}
            className={`${inputClass("service")} ${!form.service ? "text-slate-400" : "text-slate-900"}`}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-slate-700">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            className={`${inputClass("message")} resize-none`}
            placeholder="Tell us about your project..."
            maxLength={2000}
          />
          <div className="flex justify-between mt-1.5">
            {errors.message ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400">
                {errors.message}
              </motion.p>
            ) : (
              <span />
            )}
            <p className={`text-xs transition-colors ${form.message.length > 1800 ? "text-amber-500" : "text-slate-400"}`}>
              {form.message.length}/2000
            </p>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto rounded-xl bg-primary px-12 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 active:scale-[0.98]"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </div>
  );

  if (variant === "standalone") {
    return formCard;
  }

  return (
    <section id="contact" className="py-24 bg-[#0f172a] scroll-mt-16">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Send us
            a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {formCard}
        </motion.div>
      </div>
    </section>
  );
}
