"use client";

import { useEffect, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import { CategorySection } from "@/components/CategorySection";
import { SiteImage } from "@/components/SiteImage";
import { useSpeech } from "@/components/SpeechContext";
import { ALL_CATEGORY_ID } from "@/data/categories";
import { siteImages } from "@/lib/images";
import { getTopicSpeechText } from "@/lib/search";
import type { PrayerCategory } from "@/data/categories";
import type { PrayerTopic } from "@/types/topic";

type CategoryBrowserProps = {
  groups: { category: PrayerCategory; topics: PrayerTopic[] }[];
  searchQuery: string;
  activeCategory: string;
};

export function CategoryBrowser({
  groups,
  searchQuery,
  activeCategory,
}: CategoryBrowserProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const { speechModeEnabled, speakTopic } = useSpeech();
  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    if (searchQuery.trim() && searchQuery !== prevSearchRef.current) {
      setExpandedIds(new Set(groups.flatMap((group) => group.topics.map((t) => t.id))));
    }
    if (!searchQuery.trim()) {
      setExpandedIds(new Set());
    }
    prevSearchRef.current = searchQuery;
  }, [searchQuery, groups]);

  const visibleGroups =
    activeCategory === ALL_CATEGORY_ID
      ? groups
      : groups.filter((group) => group.category.id === activeCategory);

  const toggleTopic = (topic: PrayerTopic) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      const willExpand = !next.has(topic.id);

      if (willExpand) {
        next.add(topic.id);
        if (speechModeEnabled) {
          speakTopic(topic.id, getTopicSpeechText(topic));
        }
      } else {
        next.delete(topic.id);
      }

      return next;
    });
  };

  if (visibleGroups.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-line">
        <div className="relative h-32">
          <SiteImage
            src={siteImages.searchEmpty}
            alt=""
            fill
            sizes="896px"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[var(--background)]/70" />
        </div>
        <div className="px-4 py-10 text-center sm:px-6">
          <SearchX
            className="mx-auto mb-3 h-7 w-7 text-theme-subtle"
            aria-hidden="true"
          />
          <p className="text-sm text-theme">
            No topics match &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-2 text-sm text-theme-muted">
            Try another word or clear your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {visibleGroups.map((group) => (
        <CategorySection
          key={group.category.id}
          category={group.category}
          topics={group.topics}
          expandedIds={expandedIds}
          onToggleTopic={toggleTopic}
        />
      ))}
    </div>
  );
}
