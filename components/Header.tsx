"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-surface bg-surface-elevated/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="font-serif text-xl font-semibold tracking-tight text-theme sm:text-2xl">
            Prayer Intentions
          </h1>
          <p className="hidden text-sm text-theme-muted sm:block">
            Who and what we lift up in prayer
          </p>
        </div>

        <DarkModeToggle />
      </div>
    </header>
  );
}
