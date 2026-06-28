"use client";

import { ChevronDown } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { TopicCard } from "@/components/TopicCard";
import { getCategoryImage } from "@/lib/images";
import { getTopicIcon } from "@/lib/topicIcons";
import type { PrayerCategory } from "@/data/categories";
import type { PrayerTopic } from "@/types/topic";

type CategorySectionProps = {
  category: PrayerCategory;
  topics: PrayerTopic[];
  expandedIds: Set<string>;
  onToggleTopic: (topic: PrayerTopic) => void;
};

export function CategorySection({
  category,
  topics,
  expandedIds,
  onToggleTopic,
}: CategorySectionProps) {
  const Icon = category.icon;
  const imageSrc = getCategoryImage(category.id);

  if (topics.length === 0) return null;

  return (
    <section
      id={`category-${category.id}`}
      aria-labelledby={`category-title-${category.id}`}
      className="scroll-mt-32 sm:scroll-mt-36"
    >
      <div className="mb-4 overflow-hidden rounded-lg border border-line">
        {imageSrc && (
          <div className="relative h-32 overflow-hidden sm:h-40 md:h-44">
            <SiteImage
              src={imageSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-accent">
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                <p className="text-[11px] font-medium uppercase tracking-[0.24em]">
                  Category
                </p>
              </div>
              <h2
                id={`category-title-${category.id}`}
                className="mt-2 text-lg font-medium text-theme"
              >
                {category.title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-theme-muted">
                {category.summary}
              </p>
            </div>
          </div>
        )}

        {!imageSrc && (
          <div className="border-b border-line p-4 sm:p-5">
            <div className="flex items-center gap-2 text-accent">
              <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-[11px] font-medium uppercase tracking-[0.24em]">
                Category
              </p>
            </div>
            <h2
              id={`category-title-${category.id}`}
              className="mt-2 text-lg font-medium text-theme"
            >
              {category.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-theme-muted">
              {category.summary}
            </p>
          </div>
        )}
      </div>

      <ul className="divide-y divide-[var(--line)] border-y border-line">
        {topics.map((topic) => {
          const isExpanded = expandedIds.has(topic.id);
          const TopicIcon = getTopicIcon(topic.id);

          return (
            <li key={topic.id} id={`topic-${topic.id}`} className="scroll-mt-36">
              <button
                type="button"
                onClick={() => onToggleTopic(topic)}
                aria-expanded={isExpanded}
                aria-controls={`topic-panel-${topic.id}`}
          className="flex w-full items-start gap-2 px-1 py-4 text-left transition hover:bg-surface-muted focus:outline-none focus-visible:bg-surface-muted sm:gap-3 sm:px-2 sm:py-4"
              >
                <TopicIcon
                  className="mt-0.5 h-4 w-4 shrink-0 text-theme-subtle"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-theme">
                    {topic.title}
                  </span>
                  {!isExpanded && (
                    <span className="mt-1 block text-sm leading-relaxed text-theme-muted">
                      {topic.teaser}
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-4 w-4 shrink-0 text-theme-subtle transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isExpanded && (
                <div
                  id={`topic-panel-${topic.id}`}
                  className="border-t border-line bg-surface-muted/40 px-1 pb-5 pt-1"
                >
                  <TopicCard topic={topic} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
