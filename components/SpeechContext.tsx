"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isSpeechSupported, speakText, stopSpeech } from "@/lib/speech";

type SpeechContextValue = {
  speechModeEnabled: boolean;
  toggleSpeechMode: () => void;
  isSpeaking: boolean;
  activeTopicId: string | null;
  speakTopic: (topicId: string, text: string) => void;
  stopSpeaking: () => void;
  speechSupported: boolean;
};

const SpeechContext = createContext<SpeechContextValue | null>(null);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [speechModeEnabled, setSpeechModeEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported(isSpeechSupported());
  }, []);

  const stopSpeaking = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
    setActiveTopicId(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stopSpeaking();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stopSpeaking]);

  const speakTopic = useCallback(
    (topicId: string, text: string) => {
      if (!isSpeechSupported()) return;

      setActiveTopicId(topicId);
      setIsSpeaking(true);

      speakText(
        text,
        () => {
          setIsSpeaking(false);
          setActiveTopicId(null);
        },
        () => {
          setIsSpeaking(false);
          setActiveTopicId(null);
        }
      );
    },
    []
  );

  const toggleSpeechMode = useCallback(() => {
    setSpeechModeEnabled((prev) => {
      if (prev) stopSpeaking();
      return !prev;
    });
  }, [stopSpeaking]);

  const value = useMemo(
    () => ({
      speechModeEnabled,
      toggleSpeechMode,
      isSpeaking,
      activeTopicId,
      speakTopic,
      stopSpeaking,
      speechSupported,
    }),
    [
      speechModeEnabled,
      toggleSpeechMode,
      isSpeaking,
      activeTopicId,
      speakTopic,
      stopSpeaking,
      speechSupported,
    ]
  );

  return (
    <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
  );
}

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeech must be used within SpeechProvider");
  }
  return context;
}
