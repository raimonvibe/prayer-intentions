"use client";

import {
  ALL_CATEGORY_ID,
  prayerCategories,
} from "@/data/categories";

type CategoryNavProps = {
  activeCategory: string;
  counts: Record<string, number>;
  onChange: (categoryId: string) => void;
};

export function CategoryNav({
  activeCategory,
  counts,
  onChange,
}: CategoryNavProps) {
  const items = [
    {
      id: ALL_CATEGORY_ID,
      label: "All",
      shortLabel: "All",
      count: counts[ALL_CATEGORY_ID] ?? 0,
    },
    ...prayerCategories.map((category) => ({
      id: category.id,
      label: category.title,
      shortLabel: category.shortTitle,
      count: counts[category.id] ?? 0,
    })),
  ];

  return (
    <nav
      aria-label="Filter by category"
      className="sticky top-[var(--header-height)] z-20 -mx-4 border-b border-line bg-[var(--background)]/92 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/85 sm:-mx-8 sm:px-8"
    >
      <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto py-3 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = activeCategory === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-pressed={isActive}
              aria-label={`${item.label} (${item.count})`}
              className={`shrink-0 snap-start rounded-md px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] sm:py-1.5 ${
                isActive
                  ? "bg-accent-soft text-theme"
                  : "text-theme-muted hover:bg-surface-muted hover:text-theme"
              }`}
            >
              <span className="sm:hidden">{item.shortLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
              <span className="ml-1.5 text-xs tabular-nums text-theme-subtle">
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
