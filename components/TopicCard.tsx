"use client";

import { SpeechControls } from "@/components/SpeechControls";
import { getTopicSpeechText } from "@/lib/search";
import type { PrayerTopic } from "@/types/topic";

type TopicCardProps = {
  topic: PrayerTopic;
};

export function TopicCard({ topic }: TopicCardProps) {
  const speechText = getTopicSpeechText(topic);

  return (
    <div className="space-y-5 border-t border-stone-300/50 px-4 pb-5 pt-4 dark:border-stone-600/50 sm:px-5">
      <p className="leading-relaxed text-stone-700 dark:text-stone-300">
        {topic.description}
      </p>

      <div className="rounded-xl bg-stone-100/80 p-4 dark:bg-stone-900/60">
        <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
          Sample Prayer
        </h3>
        <p className="font-serif italic leading-relaxed text-stone-800 dark:text-stone-200">
          {topic.samplePrayer}
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
          Where &amp; When to Pray
        </h3>
        <p className="leading-relaxed text-stone-700 dark:text-stone-300">
          {topic.whereWhen}
        </p>
      </div>

      <SpeechControls topic={topic} speechText={speechText} />
    </div>
  );
}
