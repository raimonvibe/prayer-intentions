"use client";

import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <label htmlFor="topic-search" className="sr-only">
        Search prayer topics
      </label>
      <div className="relative border-b border-line">
        <Search
          className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-subtle"
          aria-hidden="true"
        />
        <input
          id="topic-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search topics, prayers, words..."
          className="w-full bg-transparent py-3 pl-7 pr-8 text-theme placeholder:text-theme-subtle focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-theme-subtle transition hover:text-theme"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-theme-subtle">
        {value.trim()
          ? `${resultCount} of ${totalCount} matches`
          : `${totalCount} intentions across 5 categories`}
      </p>
    </div>
  );
}
