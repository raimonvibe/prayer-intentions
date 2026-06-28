"use client";

import { SiteImage } from "@/components/SiteImage";
import { getCategoryImage } from "@/lib/images";
import type { PrayerCategory } from "@/data/categories";

type CategoryOverviewProps = {
  categories: PrayerCategory[];
  counts: Record<string, number>;
  onSelectCategory: (categoryId: string) => void;
};

export function CategoryOverview({
  categories,
  counts,
  onSelectCategory,
}: CategoryOverviewProps) {
  return (
    <section aria-label="Category overview" className="mb-10">
      <div className="mb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-theme-subtle">
          Overview
        </p>
        <h2 className="mt-1 text-base font-medium text-theme">
          Browse by category
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = counts[category.id] ?? 0;
          const imageSrc = getCategoryImage(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className="group overflow-hidden rounded-lg border border-line bg-surface text-left transition hover:border-[var(--accent)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              {imageSrc && (
                <div className="relative h-24 overflow-hidden sm:h-28">
                  <SiteImage
                    src={imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[var(--background)]/25 transition group-hover:bg-[var(--background)]/15" />
                </div>
              )}

              <div className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-accent">
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-xs tabular-nums text-theme-subtle">
                    {count}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-medium text-theme">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-theme-muted">
                  {category.summary}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
