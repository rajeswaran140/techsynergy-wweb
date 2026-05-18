"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon, HiDesktopComputer } from "react-icons/hi";
import type { IconType } from "react-icons";

type Theme = "light" | "dark" | "system";

const cycleOrder: Theme[] = ["light", "dark", "system"];

const themeMeta: Record<Theme, { icon: IconType; label: string }> = {
  light: { icon: HiSun, label: "Light" },
  dark: { icon: HiMoon, label: "Dark" },
  system: { icon: HiDesktopComputer, label: "System" },
};

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

  const current = mounted ? theme : "system";
  const { icon: Icon, label } = themeMeta[current];
  const nextTheme = cycleOrder[(cycleOrder.indexOf(current) + 1) % cycleOrder.length];
  const nextLabel = themeMeta[nextTheme].label;

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Theme: ${label}. Switch to ${nextLabel}.`}
      title={`Theme: ${label} (click for ${nextLabel})`}
      className={`flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${className}`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
