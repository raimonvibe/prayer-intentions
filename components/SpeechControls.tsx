"use client";

import { useSpeech } from "@/components/SpeechContext";
import type { PrayerTopic } from "@/types/topic";

type SpeechControlsProps = {
  topic: PrayerTopic;
  speechText: string;
};

export function SpeechControls({ topic, speechText }: SpeechControlsProps) {
  const {
    speakTopic,
    stopSpeaking,
    isSpeaking,
    activeTopicId,
    speechSupported,
  } = useSpeech();

  const isThisTopicSpeaking = isSpeaking && activeTopicId === topic.id;

  if (!speechSupported) {
    return (
      <p className="text-xs text-theme-subtle">
        Read-aloud is not available in this browser.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isThisTopicSpeaking ? (
        <button
          type="button"
          onClick={stopSpeaking}
          className="inline-flex items-center gap-2 rounded-full bg-stone-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-100"
        >
          <i className="fas fa-stop" aria-hidden="true" />
          Stop
        </button>
      ) : (
        <button
          type="button"
          onClick={() => speakTopic(topic.id, speechText)}
          className="inline-flex items-center gap-2 rounded-full border border-surface bg-surface-elevated px-4 py-2 text-sm font-medium text-theme transition hover:bg-stone-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:hover:bg-stone-700/70"
        >
          <i className="fas fa-play" aria-hidden="true" />
          Listen
        </button>
      )}
    </div>
  );
}
