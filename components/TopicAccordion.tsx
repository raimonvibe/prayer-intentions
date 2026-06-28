"use client";

import { useEffect, useRef, useState } from "react";
import { TopicCard } from "@/components/TopicCard";
import { useSpeech } from "@/components/SpeechContext";
import { getTopicSpeechText } from "@/lib/search";
import type { PrayerTopic } from "@/types/topic";

type TopicAccordionProps = {
  topics: PrayerTopic[];
  searchQuery: string;
  expandAllOnSearch?: boolean;
};

export function TopicAccordion({
  topics,
  searchQuery,
  expandAllOnSearch = true,
}: TopicAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const { speechModeEnabled, speakTopic } = useSpeech();
  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    if (
      expandAllOnSearch &&
      searchQuery.trim() &&
      searchQuery !== prevSearchRef.current
    ) {
      setExpandedIds(new Set(topics.map((topic) => topic.id)));
    }
    prevSearchRef.current = searchQuery;
  }, [searchQuery, topics, expandAllOnSearch]);

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

  if (topics.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-surface bg-surface px-6 py-12 text-center">
        <p className="font-serif text-lg text-theme">
          No topics match &ldquo;{searchQuery}&rdquo;
        </p>
        <p className="mt-2 text-sm text-theme-muted">
          Try different words or clear your search to see all intentions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => {
        const isExpanded = expandedIds.has(topic.id);

        return (
          <section
            key={topic.id}
            id={`topic-${topic.id}`}
            className="overflow-hidden rounded-2xl border border-surface bg-surface-elevated shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggleTopic(topic)}
              aria-expanded={isExpanded}
              aria-controls={`topic-panel-${topic.id}`}
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-stone-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stone-500 dark:hover:bg-stone-700/40 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-lg font-semibold text-theme sm:text-xl">
                  {topic.title}
                </h2>
                {!isExpanded && (
                  <p className="mt-1 line-clamp-2 text-sm text-theme-muted">
                    {topic.teaser}
                  </p>
                )}
              </div>
              <span
                className={`mt-1 shrink-0 text-theme-subtle transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <i className="fas fa-chevron-down" />
              </span>
            </button>

            {isExpanded && (
              <div id={`topic-panel-${topic.id}`}>
                <TopicCard topic={topic} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
