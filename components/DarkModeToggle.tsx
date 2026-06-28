"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-surface bg-surface-elevated px-3 py-2 text-sm text-theme"
        aria-label="Toggle dark mode"
        disabled
      >
        <i className="fas fa-circle-half-stroke" aria-hidden="true" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-surface bg-surface-elevated px-3 py-2 text-sm text-theme transition hover:bg-stone-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:hover:bg-stone-700/70"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <i
        className={isDark ? "fas fa-sun" : "fas fa-moon"}
        aria-hidden="true"
      />
    </button>
  );
}
