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
        className="rounded-full border border-stone-300/60 bg-stone-100/80 px-3 py-2 text-sm dark:border-stone-600 dark:bg-stone-800/80"
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
      className="rounded-full border border-stone-300/70 bg-stone-100/90 px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-200/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:border-stone-600 dark:bg-stone-800/90 dark:text-stone-200 dark:hover:bg-stone-700/90"
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
