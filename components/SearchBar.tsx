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
          className="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
          aria-hidden="true"
        />
        <input
          id="topic-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search titles, words, prayers..."
          className="w-full rounded-2xl border border-stone-300/70 bg-[#faf7f2]/90 py-3.5 pl-11 pr-11 text-stone-800 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400/40 dark:border-stone-600 dark:bg-[#252525]/90 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-400 dark:focus:ring-stone-500/30"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-stone-500 transition hover:bg-stone-200/80 hover:text-stone-700 dark:hover:bg-stone-700 dark:hover:text-stone-200"
            aria-label="Clear search"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        {value.trim()
          ? `${resultCount} of ${totalCount} topics match`
          : `${totalCount} topics to explore`}
      </p>
    </div>
  );
}
