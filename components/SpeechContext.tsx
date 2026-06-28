"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getBrowserSelectionText,
  getDefaultVoiceURI,
  isSpeechSupported,
  loadVoices,
  speakText,
  stopSpeech,
  type SpeechVoiceOption,
} from "@/lib/speech";

const VOICE_STORAGE_KEY = "prayer-intentions-voice";

type SpeechContextValue = {
  speechModeEnabled: boolean;
  toggleSpeechMode: () => void;
  isSpeaking: boolean;
  isReadingSelection: boolean;
  activeTopicId: string | null;
  selectionText: string;
  speakTopic: (topicId: string, text: string) => void;
  speakSelection: () => void;
  stopSpeaking: () => void;
  speechSupported: boolean;
  voices: SpeechVoiceOption[];
  selectedVoiceURI: string | null;
  setSelectedVoiceURI: (voiceURI: string) => void;
  voicesLoading: boolean;
};

const SpeechContext = createContext<SpeechContextValue | null>(null);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [speechModeEnabled, setSpeechModeEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReadingSelection, setIsReadingSelection] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [selectionText, setSelectionText] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechVoiceOption[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURIState] = useState<string | null>(
    null
  );
  const [voicesLoading, setVoicesLoading] = useState(true);

  useEffect(() => {
    setSpeechSupported(isSpeechSupported());
  }, []);

  useEffect(() => {
    if (!isSpeechSupported()) {
      setVoicesLoading(false);
      return;
    }

    let active = true;

    loadVoices().then((loadedVoices) => {
      if (!active) return;

      setVoices(loadedVoices);

      const storedVoice = localStorage.getItem(VOICE_STORAGE_KEY);
      const storedIsValid = loadedVoices.some(
        (voice) => voice.voiceURI === storedVoice
      );

      setSelectedVoiceURIState(
        storedIsValid && storedVoice
          ? storedVoice
          : getDefaultVoiceURI(loadedVoices)
      );
      setVoicesLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const updateSelection = () => {
      setSelectionText(getBrowserSelectionText());
    };

    document.addEventListener("selectionchange", updateSelection);
    return () => document.removeEventListener("selectionchange", updateSelection);
  }, []);

  const setSelectedVoiceURI = useCallback((voiceURI: string) => {
    setSelectedVoiceURIState(voiceURI);
    localStorage.setItem(VOICE_STORAGE_KEY, voiceURI);
  }, []);

  const stopSpeaking = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
    setIsReadingSelection(false);
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
      setIsReadingSelection(false);
      setIsSpeaking(true);

      speakText(text, {
        voiceURI: selectedVoiceURI,
        onEnd: () => {
          setIsSpeaking(false);
          setActiveTopicId(null);
        },
        onError: () => {
          setIsSpeaking(false);
          setActiveTopicId(null);
        },
      });
    },
    [selectedVoiceURI]
  );

  const speakSelection = useCallback(() => {
    const text = getBrowserSelectionText();
    if (!text || !isSpeechSupported()) return;

    setActiveTopicId(null);
    setIsReadingSelection(true);
    setIsSpeaking(true);

    speakText(text, {
      voiceURI: selectedVoiceURI,
      onEnd: () => {
        setIsSpeaking(false);
        setIsReadingSelection(false);
      },
      onError: () => {
        setIsSpeaking(false);
        setIsReadingSelection(false);
      },
    });
  }, [selectedVoiceURI]);

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
      isReadingSelection,
      activeTopicId,
      selectionText,
      speakTopic,
      speakSelection,
      stopSpeaking,
      speechSupported,
      voices,
      selectedVoiceURI,
      setSelectedVoiceURI,
      voicesLoading,
    }),
    [
      speechModeEnabled,
      toggleSpeechMode,
      isSpeaking,
      isReadingSelection,
      activeTopicId,
      selectionText,
      speakTopic,
      speakSelection,
      stopSpeaking,
      speechSupported,
      voices,
      selectedVoiceURI,
      setSelectedVoiceURI,
      voicesLoading,
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
