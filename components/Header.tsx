"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";

export function Header() {
  return (
    <header className="border-b border-line bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-theme-subtle">
            Prayer Intentions
          </p>
          <h1 className="mt-1 truncate text-base font-medium text-theme sm:text-xl sm:whitespace-normal">
            Who we lift up in prayer
          </h1>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
}
