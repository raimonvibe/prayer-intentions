import {
  ALL_CATEGORY_ID,
  prayerCategories,
  type PrayerCategory,
} from "@/data/categories";
import { prayerTopics } from "@/data/topics";
import type { PrayerTopic } from "@/types/topic";

const topicMap = new Map(prayerTopics.map((topic) => [topic.id, topic]));

export function getTopicsForCategory(categoryId: string): PrayerTopic[] {
  const category = prayerCategories.find((item) => item.id === categoryId);
  if (!category) return [];

  return category.topicIds
    .map((id) => topicMap.get(id))
    .filter((topic): topic is PrayerTopic => Boolean(topic));
}

export function getCategoryForTopic(topicId: string): PrayerCategory | undefined {
  return prayerCategories.find((category) =>
    category.topicIds.includes(topicId)
  );
}

export function groupTopicsByCategory(
  topics: PrayerTopic[]
): { category: PrayerCategory; topics: PrayerTopic[] }[] {
  const topicIds = new Set(topics.map((topic) => topic.id));

  return prayerCategories
    .map((category) => ({
      category,
      topics: category.topicIds
        .map((id) => topicMap.get(id))
        .filter((topic): topic is PrayerTopic => {
          if (!topic) return false;
          return topicIds.has(topic.id);
        }),
    }))
    .filter((group) => group.topics.length > 0);
}

export function getCategoryCounts(
  topics: PrayerTopic[]
): Record<string, number> {
  const counts: Record<string, number> = { [ALL_CATEGORY_ID]: topics.length };

  for (const category of prayerCategories) {
    counts[category.id] = category.topicIds.filter((id) =>
      topics.some((topic) => topic.id === id)
    ).length;
  }

  return counts;
}

export { ALL_CATEGORY_ID, prayerCategories };
