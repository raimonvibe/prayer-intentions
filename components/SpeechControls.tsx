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
    speechModeEnabled,
  } = useSpeech();

  const isThisTopicSpeaking = isSpeaking && activeTopicId === topic.id;

  if (!speechSupported) {
    return (
      <p className="text-xs text-stone-500 dark:text-stone-400">
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
          className="inline-flex items-center gap-2 rounded-full bg-stone-700 px-4 py-2 text-sm text-stone-100 transition hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:bg-stone-300 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          <i className="fas fa-stop" aria-hidden="true" />
          Stop
        </button>
      ) : (
        <button
          type="button"
          onClick={() => speakTopic(topic.id, speechText)}
          className="inline-flex items-center gap-2 rounded-full border border-stone-400/60 bg-stone-100/80 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-200/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:border-stone-500 dark:bg-stone-800/80 dark:text-stone-200 dark:hover:bg-stone-700/90"
        >
          <i className="fas fa-play" aria-hidden="true" />
          Listen
        </button>
      )}
      {speechModeEnabled && !isThisTopicSpeaking && (
        <span className="text-xs text-stone-500 dark:text-stone-400">
          Speech mode is on — expand topics to listen
        </span>
      )}
    </div>
  );
}
