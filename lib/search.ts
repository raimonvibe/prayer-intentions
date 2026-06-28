import type { PrayerTopic } from "@/types/topic";

function topicSearchText(topic: PrayerTopic): string {
  return [
    topic.title,
    topic.teaser,
    topic.description,
    topic.samplePrayer,
    topic.whereWhen,
    ...(topic.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterTopics(
  topics: PrayerTopic[],
  query: string
): PrayerTopic[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return topics;

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return topics.filter((topic) => {
    const haystack = topicSearchText(topic);
    return terms.every((term) => haystack.includes(term));
  });
}

export function getTopicSpeechText(topic: PrayerTopic): string {
  return [
    topic.title,
    topic.description,
    "Sample prayer.",
    topic.samplePrayer,
    "Where and when to pray.",
    topic.whereWhen,
  ].join(". ");
}
