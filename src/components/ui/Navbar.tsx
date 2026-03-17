"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-sm border-b border-slate-800"
          : "bg-[#0f172a] backdrop-blur-md"
      }`}
    >
      <div className="flex justify-center items-center h-16">
        <Link href="/" aria-label="TechSynergy Home">
          <Image
            src="/logo-light.svg"
            alt="TechSynergy"
            width={180}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </nav>
  );
}
