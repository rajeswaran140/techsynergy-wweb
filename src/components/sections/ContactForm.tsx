"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { services as canonicalServices } from "@/lib/services-data";
import { glassCard } from "@/lib/ui-tokens";

const CONTACT_API =
  "https://d0xd30uqf9.execute-api.us-east-1.amazonaws.com/prod/contact";

/** 15s ceiling so a cold-starting Lambda doesn't leave the form spinning. */
const REQUEST_TIMEOUT_MS = 15_000;

/**
 * Service dropdown options — sourced from the canonical catalogue so the form
 * can never drift from the rest of the site. "Other" appended as a catch-all.
 */
const serviceOptions = [
  ...canonicalServices.map((s) => s.title),
  "Other",
];

export default function ContactForm({
  variant = "landing",
}: {
  variant?: "landing" | "standalone";
}) {
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 8000);
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
    if (!form.service.trim()) errs.service = "Please select a service.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.length < 10)
      errs.message = "Message must be at least 10 characters.";
    else if (form.message.length > 2000)
      errs.message = "Message is too long (max 2000 characters).";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._honey) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    setErrorMessage("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _honey, ...payload } = form;

      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const responseData = await res.json().catch(() => ({}));
        throw new Error(responseData.error || "Failed to send message.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        _honey: "",
      });
    } catch (error) {
      clearTimeout(timeoutId);
      const msg =
        error instanceof DOMException && error.name === "AbortError"
          ? "Request timed out. Please try again or reach us on LinkedIn."
          : error instanceof Error
          ? error.message
          : "Something went wrong.";
      setErrorMessage(msg);
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

  /**
   * Native focus:ring handles the focus state — no need for a parallel React
   * state machine tracking what the browser already tracks.
   */
  const inputClass = (field: string) =>
    `w-full rounded-xl border-2 bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm px-4 py-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
      errors[field]
        ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20"
        : "border-slate-200 dark:border-white/10 hover:border-slate-300 focus:border-primary"
    }`;

  // Form card uses the shared glassCard token so it inherits the mobile
  // blur tiering (backdrop-blur-md on phone, backdrop-blur-xl from md+) —
  // this is the largest blur surface on the site, so tiering matters here.
  const formCard = (
    <div className={`${glassCard} p-6 sm:p-8 lg:p-10`}>
      {/* Live region — single source for screen-reader status announcements. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "loading" && "Sending message..."}
        {status === "success" && "Message sent successfully."}
        {status === "error" && errorMessage}
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="mb-6 rounded-xl border border-green-600/30 bg-green-50 p-4 text-sm text-green-700 text-center flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Message sent successfully! We&apos;ll be in touch soon.
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 rounded-xl border border-red-600/30 bg-red-50 p-4 text-sm text-red-700 text-center flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage || "Something went wrong. Please try again."}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot — off-screen, hidden from users and bots. */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <label htmlFor="website_url">Website</label>
          <input
            type="text"
            id="website_url"
            name="_honey"
            value={form._honey}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            placeholder=""
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Name <span className="text-primary" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="text"
              id="cf-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass("name")}
              placeholder="Your name"
              maxLength={100}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
            />
            {errors.name && (
              <p id="cf-name-error" className="mt-1.5 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email <span className="text-primary" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="email"
              id="cf-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="you@company.com"
              maxLength={254}
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
            />
            {errors.email && (
              <p id="cf-email-error" className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-phone" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Phone
            </label>
            <input
              type="tel"
              id="cf-phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass("phone")}
              placeholder="+1 (555) 000-0000"
              maxLength={30}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            />
            {errors.phone && (
              <p id="cf-phone-error" className="mt-1.5 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-company" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Company
            </label>
            <input
              type="text"
              id="cf-company"
              name="company"
              value={form.company}
              onChange={handleChange}
              className={inputClass("company")}
              placeholder="Your company"
              maxLength={100}
              autoComplete="organization"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "cf-company-error" : undefined}
            />
            {errors.company && (
              <p id="cf-company-error" className="mt-1.5 text-xs text-red-600">
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cf-service" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Service Interested In <span className="text-primary" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="cf-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputClass("service")} ${!form.service ? "text-slate-400" : "text-slate-900 dark:text-slate-100"}`}
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "cf-service-error" : undefined}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="cf-service-error" className="mt-1.5 text-xs text-red-600">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Message <span className="text-primary" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass("message")} resize-none`}
            placeholder="Tell us about your project..."
            maxLength={2000}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={`cf-message-counter${errors.message ? " cf-message-error" : ""}`}
          />
          <div className="flex justify-between mt-1.5">
            {errors.message ? (
              <p id="cf-message-error" className="text-xs text-red-600">
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <p
              id="cf-message-counter"
              className={`text-xs transition-colors ${
                form.message.length > 1800 ? "text-amber-600" : "text-slate-400"
              }`}
            >
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
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Get a Free Quote"
            )}
          </button>
        </div>
      </form>
    </div>
  );

  if (variant === "standalone") {
    return (
      <div>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Tell Us About Your Project
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Send us a
            message and we&apos;ll respond within one business day.
          </p>
        </div>
        {formCard}
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-[#0f172a] scroll-mt-16">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Send us a
            message and we&apos;ll get back to you within 24 hours.
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
