"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon, HiDesktopComputer } from "react-icons/hi";
import type { IconType } from "react-icons";

type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; icon: IconType; label: string }[] = [
  { value: "light", icon: HiSun, label: "Light" },
  { value: "dark", icon: HiMoon, label: "Dark" },
  { value: "system", icon: HiDesktopComputer, label: "System" },
];

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
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

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`inline-flex items-center gap-0.5 rounded-lg bg-white/5 p-0.5 border border-white/10 ${className}`}
    >
      {themeOptions.map(({ value, icon: Icon, label }) => {
        const isActive = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={`${label} theme${isActive ? " (selected)" : ""}`}
            aria-pressed={isActive}
            title={`${label} theme`}
            className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
              isActive
                ? "bg-white/15 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
