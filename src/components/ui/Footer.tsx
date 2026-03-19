import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Services: [
    { href: "/services#saas-development", label: "SaaS Development" },
    { href: "/services#cloud-infrastructure", label: "Cloud Infrastructure" },
    { href: "/services#api-integrations", label: "API & Integrations" },
  ],
  Products: [
    { href: "https://mobily.ca", label: "Mobily.ca", external: true },
    { href: "https://seosync.ca", label: "SeoSync.ca", external: true },
    { href: "/products", label: "All Products", external: false },
  ],
  Company: [
    { href: "/about", label: "About Us", external: false },
    { href: "/portfolio", label: "Portfolio", external: false },
    { href: "/blog", label: "Blog", external: false },
    { href: "/contact", label: "Contact", external: false },
  ],
};

const socialLinks = [
  { href: "https://www.linkedin.com/in/rajwaran/", icon: FaLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071237] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-4" aria-label="TechSynergy Home">
              <Image
                src="/logo-light.svg"
                alt="TechSynergy"
                width={180}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-sm text-sm leading-relaxed">
              A Canadian software company building privacy-first SaaS products
              from Markham, Ontario.
            </p>
            <p className="text-gray-500 text-xs mb-6 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Markham, Ontario, Canada
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 transition-colors"
                  aria-label={`${social.label} (opens in new tab)`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-sm">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} TechSynergy Corp. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
