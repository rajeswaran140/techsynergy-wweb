import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/legal-info";
import { enabledProducts } from "@/lib/products-data";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

const servicesLinks = [
  { href: "/services#saas-product-development", label: "SaaS Development" },
  { href: "/services#ai-mcp-integration", label: "AI & MCP Integration" },
  { href: "/services#cloud-data-residency", label: "Cloud & Data Residency" },
  { href: "/services#mobile-apps", label: "Mobile Apps" },
  { href: "/services#api-integrations", label: "API & Integrations" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "How We Engage" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Derived product list — only live (not coming-soon) enabled products with an
// external href. Single source of truth so the footer can't drift from
// products-data the way it used to.
const liveProducts = enabledProducts
  .filter((p) => !p.comingSoon && p.href)
  .slice(0, 4);

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/rajwaran/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/rajeswaran140",
    icon: FaGithub,
    label: "GitHub",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#071237] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Stacked on phone; full 5-col layout from md+ where there's room for
            brand (col-span-2) + Services + Products + Company without leaving
            an orphan column. */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block mb-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071237]"
              aria-label="TechSynergy Home"
            >
              <Image
                src="/logo-light.svg"
                alt=""
                width={180}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-slate-400 mb-4 max-w-sm text-sm leading-relaxed">
              A Canadian software company building privacy-first SaaS products
              from {COMPANY.city}, {COMPANY.province}.
            </p>

            <address className="not-italic text-slate-500 text-xs mb-3 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {COMPANY.city}, {COMPANY.province}, {COMPANY.country}
            </address>

            <p className="text-slate-500 text-xs mb-6">
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Get in touch →
              </Link>
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071237]"
                  aria-label={`${social.label} (opens in new tab)`}
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-sm">Services</h2>
            <ul className="space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products — driven by canonical products-data */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-sm">Products</h2>
            <ul className="space-y-2.5">
              {liveProducts.map((product) => (
                <li key={product.slug}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {product.name}
                    <ArrowRightIcon className="w-3 h-3 -rotate-45" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/portfolio"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-white font-semibold mb-4 text-sm">Company</h2>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
