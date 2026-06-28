"use client";

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
      <div className="relative">
        <i
          className="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-theme-subtle"
          aria-hidden="true"
        />
        <input
          id="topic-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search titles, words, prayers..."
          className="w-full rounded-2xl border border-surface bg-[var(--input-bg)] py-3.5 pl-11 pr-11 text-theme placeholder:text-theme-subtle focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400/50 dark:focus:ring-stone-500/40"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-theme-muted transition hover:bg-stone-200/80 hover:text-theme dark:hover:bg-stone-700/80"
            aria-label="Clear search"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-theme-muted">
        {value.trim()
          ? `${resultCount} of ${totalCount} topics match`
          : `${totalCount} topics to explore`}
      </p>
    </div>
  );
}
