"use client";

import { Clock, MessageCircleHeart } from "lucide-react";
import { SpeechControls } from "@/components/SpeechControls";
import { getTopicSpeechText } from "@/lib/search";
import type { PrayerTopic } from "@/types/topic";

type TopicCardProps = {
  topic: PrayerTopic;
};

export function TopicCard({ topic }: TopicCardProps) {
  const speechText = getTopicSpeechText(topic);

  return (
    <div className="space-y-6 px-3 pt-4 sm:px-4">
      <p className="max-w-3xl text-sm leading-7 text-theme-muted">
        {topic.description}
      </p>

      <div className="border-l-2 border-[var(--accent)] pl-4">
        <h3 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-theme-subtle">
          <MessageCircleHeart className="h-3.5 w-3.5" aria-hidden="true" />
          Sample prayer
        </h3>
        <p className="mt-3 font-serif text-base leading-7 text-theme">
          {topic.samplePrayer}
        </p>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-theme-subtle">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Where &amp; when
        </h3>
        <p className="mt-3 text-sm leading-7 text-theme-muted">
          {topic.whereWhen}
        </p>
      </div>

      <SpeechControls topic={topic} speechText={speechText} />
    </div>
  );
}
