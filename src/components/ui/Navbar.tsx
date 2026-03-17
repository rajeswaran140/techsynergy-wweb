"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-slate-800/60"
          : "bg-[#0f172a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" aria-label="TechSynergy Home" className="relative z-50">
          <Image
            src="/logo-light.svg"
            alt="TechSynergy"
            width={180}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}

          {/* CTA button */}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-primary/20"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-50 md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                mobileOpen ? "translate-y-1.75 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                mobileOpen ? "-translate-y-1.75 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 z-40 md:hidden bg-[#0f172a] overflow-y-auto">

        <div className="px-6 pt-6 pb-8 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3.5 px-4 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              href="/contact"
              className="block w-full text-center py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/25"
            >
              Get a Quote
            </Link>
          </div>
        </div>
        </div>
      )}
    </nav>
  );
}
