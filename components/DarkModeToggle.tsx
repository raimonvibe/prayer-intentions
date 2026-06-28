"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type DarkModeToggleProps = {
  sticky?: boolean;
};

export function DarkModeToggle({ sticky = false }: DarkModeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const baseClass =
    "rounded-full border border-line p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  const idleClass = sticky
    ? "bg-accent-soft text-accent shadow-sm hover:border-[var(--accent-glow)] hover:bg-[var(--surface)]"
    : "text-theme-muted hover:bg-surface-muted hover:text-theme";

  if (!mounted) {
    return (
      <button
        type="button"
        className={`${baseClass} ${idleClass}`}
        aria-label="Toggle dark mode"
        disabled
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${baseClass} ${idleClass}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[var(--accent-glow)]" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-accent" aria-hidden="true" />
      )}
    </button>
  );
}
