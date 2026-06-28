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
    <div className="space-y-5 border-t border-surface px-4 pb-5 pt-4 sm:px-5">
      <p className="leading-relaxed text-theme-muted">{topic.description}</p>

      <div className="rounded-xl border border-surface bg-surface p-4">
        <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wide text-theme-subtle">
          Sample Prayer
        </h3>
        <p className="font-serif italic leading-relaxed text-theme">
          {topic.samplePrayer}
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wide text-theme-subtle">
          Where &amp; When to Pray
        </h3>
        <p className="leading-relaxed text-theme-muted">{topic.whereWhen}</p>
      </div>

      <SpeechControls topic={topic} speechText={speechText} />
    </div>
  );
}
