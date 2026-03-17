import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Services: [
    { href: "/services", label: "Web Development" },
    { href: "/services", label: "Mobile Apps" },
    { href: "/services", label: "Cloud Solutions" },
    { href: "/services", label: "UI/UX Design" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Articles" },
    { href: "/contact", label: "Support" },
  ],
};

const socialLinks = [
  { href: "#", icon: FaLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#030712] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4" aria-label="TechSynergy Home">
              <Image
                src="/logo-light.svg"
                alt="TechSynergy"
                width={180}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering businesses with cutting-edge software solutions and
              modern web development services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TechSynergy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
