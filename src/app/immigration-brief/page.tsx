"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ImmigrationBriefPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `Immigration Brief Trial Signup - RCIC: ${name}`,
          service: "Immigration Brief Trial",
          phone: "",
          company: "RCIC Practice"
        })
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              TechSynergy Immigration Intelligence
            </h2>
            <a href="/" className="text-gray-600 hover:text-gray-900">
              ← Back to TechSynergy
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            For Regulated Canadian Immigration Consultants
          </span>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Never Miss an IRCC Policy Change Again
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stay ahead of IRCC changes with our weekly intelligence brief.<br />
            Policy updates • Processing times • Actionable insights.<br />
            <span className="font-semibold text-gray-900">Every Monday at 7 AM.</span>
          </p>

          <div className="flex items-center justify-center gap-8 mb-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              5-minute read
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Written for RCICs
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pain Points */}
      <section className="bg-white py-16 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">As an RCIC, You Know the Pain</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Policy Changes with 24-48 Hours Notice</h3>
              <p className="text-gray-600 text-sm">IRCC announces major changes last minute</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Processing Times Change Weekly</h3>
              <p className="text-gray-600 text-sm">No central source, scattered across IRCC website</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="font-semibold mb-2">Missing One Update = Lost Client</h3>
              <p className="text-gray-600 text-sm">Rejected applications because you didn't see the change</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Brief */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">See This Week's Brief</h2>
          <p className="text-center text-gray-600 mb-8">April 20, 2026 Edition</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-8 mb-12 border-2 border-blue-100"
          >
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-red-600 mb-4">🚨 URGENT THIS WEEK</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="font-semibold">Express Entry CEC Draw Reaches Record High</p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>April 14:</strong> CRS <strong>515</strong> (highest of 2026) - 2,000 ITAs issued<br />
                  <strong>Your action:</strong> Clients with 507-514 scores NO LONGER COMPETITIVE
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <p className="font-semibold">French Language Draw - Lower Cutoff</p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>April 15:</strong> CRS <strong>419</strong> - 4,000 ITAs (2x more than CEC)<br />
                  <strong>Your action:</strong> Assess all clients for TEF/TCF eligibility NOW
                </p>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">📊 CRITICAL PROCESSING TIME UPDATES</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-semibold text-green-700">✅ IMPROVEMENTS</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li><strong>FSWP:</strong> DOWN to 6 months</li>
                    <li><strong>Citizenship:</strong> DOWN to 12 months</li>
                    <li><strong>Visitor Visa (India):</strong> DOWN to 23 days!</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <p className="font-semibold text-red-700">⚠️ DELAYS</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li><strong>AIP:</strong> UP to 40 months (+7 months!)</li>
                    <li><strong>Visitor Extensions:</strong> 325 days (11 months)</li>
                    <li><strong>QC PGP:</strong> +21 months in ONE update</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">🔨 NEW LMIA RULES (April 1, 2026)</h3>
              <ul className="text-sm space-y-2">
                <li>✅ <strong>Advertising Period DOUBLED:</strong> Now 8 weeks (was 4)</li>
                <li>✅ <strong>Youth Recruitment MANDATORY:</strong> Must target ages 15-30</li>
                <li>✅ <strong>Timeline Impact:</strong> 12-16 weeks total (vs 8-12 before)</li>
              </ul>

              <div className="mt-8 text-center text-gray-500 text-sm border-t pt-4">
                ... and much more in the full brief
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="bg-gradient-to-br from-blue-600 to-emerald-600 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Start Your Free 2-Week Trial</h2>
              <p className="text-gray-600 mb-2">
                No credit card required • Cancel anytime
              </p>
              <div className="inline-flex items-center gap-2 text-sm">
                <span className="text-gray-500 line-through">$149/month</span>
                <span className="text-2xl font-bold text-blue-600">$99/month</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                  EARLY ADOPTER OFFER
                </span>
              </div>
            </div>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Welcome aboard!</h3>
                <p className="text-gray-600">
                  Check your email - your first brief arrives Monday at 7 AM.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name (RCIC)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jane@yourfirm.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Processing..." : "START FREE TRIAL →"}
                </button>

                {status === "error" && (
                  <p className="text-red-600 text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center">
                  You'll receive your first brief on Monday, April 27 at 7 AM EST.<br />
                  Cancel anytime before trial ends (no charge).
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-8">Trusted by RCICs across the GTA</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <p className="text-gray-600 text-sm">RCICs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <p className="text-gray-600 text-sm">Email Open Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">5 min</div>
              <p className="text-gray-600 text-sm">Average Read Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="mb-2">
            <strong>TechSynergy Immigration Intelligence</strong> | Markham, ON
          </p>
          <p>
            For licensed RCICs and regulated immigration practitioners | <a href="mailto:intelligence@techsynergy.ca" className="text-blue-600 hover:underline">Contact Us</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
