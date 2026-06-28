"use client";

import { Headphones, Square } from "lucide-react";
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

  if (!speechSupported) return null;

  return (
    <div>
      {isThisTopicSpeaking ? (
        <button
          type="button"
          onClick={stopSpeaking}
          className="inline-flex items-center gap-2 text-sm text-theme-muted transition hover:text-theme focus:outline-none focus-visible:underline"
        >
          <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Stop reading
        </button>
      ) : (
        <button
          type="button"
          onClick={() => speakTopic(topic.id, speechText)}
          className="inline-flex items-center gap-2 text-sm text-accent transition hover:text-theme focus:outline-none focus-visible:underline"
        >
          <Headphones className="h-4 w-4" aria-hidden="true" />
          Listen
        </button>
      )}
    </div>
  );
}
