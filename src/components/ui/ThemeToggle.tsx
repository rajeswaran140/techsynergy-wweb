"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon, HiDesktopComputer } from "react-icons/hi";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "system";
    setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "system") {
      localStorage.removeItem("theme");
      applyTheme("system");
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => applyTheme("system");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  function cycle() {
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));
  }

  const Icon =
    theme === "light" ? HiSun : theme === "dark" ? HiMoon : HiDesktopComputer;
  const next =
    theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const label = mounted
    ? `Theme: ${theme}. Switch to ${next}.`
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={`p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors ${className}`}
    >
      {mounted ? <Icon className="w-5 h-5" /> : <span className="block w-5 h-5" />}
    </button>
  );
}
