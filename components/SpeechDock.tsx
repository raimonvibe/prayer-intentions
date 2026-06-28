"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Cloud,
  Mic,
  Square,
  TextSelect,
  ToggleLeft,
  ToggleRight,
  Volume2,
} from "lucide-react";
import { useSpeech } from "@/components/SpeechContext";

const MINIMIZED_STORAGE_KEY = "prayer-intentions-speech-dock-minimized";

export function SpeechDock() {
  const {
    speechModeEnabled,
    toggleSpeechMode,
    isSpeaking,
    isReadingSelection,
    stopSpeaking,
    speechSupported,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    voicesLoading,
    selectionText,
    speakSelection,
  } = useSpeech();

  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMinimized(localStorage.getItem(MINIMIZED_STORAGE_KEY) === "true");
  }, []);

  const toggleMinimized = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      localStorage.setItem(MINIMIZED_STORAGE_KEY, String(next));
      return next;
    });
  };

  if (!speechSupported) return null;

  const networkCount = voices.filter((voice) => voice.isNetwork).length;
  const hasSelection = selectionText.length > 0;
  const selectionPreview =
    selectionText.length > 72
      ? `${selectionText.slice(0, 72).trim()}…`
      : selectionText;

  if (mounted && isMinimized) {
    return (
      <aside
        data-speech-ui="true"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-30"
        aria-label="Speech controls"
      >
        <button
          type="button"
          onClick={toggleMinimized}
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-theme shadow-sm transition hover:bg-surface-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
            isSpeaking ? "ring-1 ring-[var(--accent)]" : ""
          }`}
          aria-label="Expand speech controls"
          title="Open speech controls"
        >
          <Volume2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      data-speech-ui="true"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-30 w-[min(calc(100vw-2rem),18rem)] rounded-lg border border-line bg-surface p-3 shadow-sm"
      aria-label="Speech controls"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Volume2
            className="h-4 w-4 text-theme-subtle"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-theme">
            Speech
          </span>
        </div>
        <button
          type="button"
          onClick={toggleMinimized}
          className="rounded-md p-1 text-theme-subtle transition hover:bg-surface-muted hover:text-theme"
          aria-label="Minimize speech controls"
          title="Minimize"
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-theme-subtle">
            <Mic className="h-3.5 w-3.5" aria-hidden="true" />
            Voice
          </span>
          <select
            value={selectedVoiceURI ?? ""}
            onChange={(event) => setSelectedVoiceURI(event.target.value)}
            disabled={voicesLoading || voices.length === 0}
            className="w-full rounded-md border border-line bg-[var(--input-bg)] px-2.5 py-2 text-sm text-theme focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            {voicesLoading && <option value="">Loading...</option>}
            {!voicesLoading && voices.length === 0 && (
              <option value="">No voices</option>
            )}
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.isNetwork ? "☁ " : "💻 "}
                {voice.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <button
            type="button"
            onClick={speakSelection}
            disabled={!hasSelection}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] enabled:text-theme enabled:hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Read selected text aloud"
          >
            <TextSelect className="h-4 w-4 shrink-0" aria-hidden="true" />
            Read selection
          </button>
          <p className="mt-1.5 text-[11px] leading-relaxed text-theme-subtle">
            {hasSelection ? (
              <>
                Selected: &ldquo;{selectionPreview}&rdquo;
              </>
            ) : (
              "Highlight any text on the page, then tap read selection."
            )}
          </p>
          {isSpeaking && isReadingSelection && (
            <p className="mt-1 text-[11px] text-accent">Reading your selection…</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleSpeechMode}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
              speechModeEnabled
                ? "bg-accent-soft text-theme"
                : "border border-line text-theme-muted hover:text-theme"
            }`}
            aria-pressed={speechModeEnabled}
          >
            {speechModeEnabled ? (
              <ToggleRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ToggleLeft className="h-4 w-4" aria-hidden="true" />
            )}
            Auto-read
          </button>

          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm text-theme-muted hover:text-theme"
            >
              <Square className="h-3 w-3 fill-current" aria-hidden="true" />
              Stop
            </button>
          )}
        </div>

        {networkCount > 0 && (
          <p className="flex items-center gap-1.5 text-[11px] text-theme-subtle">
            <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
            {networkCount} network voice{networkCount === 1 ? "" : "s"}
          </p>
        )}
      </div>
    </aside>
  );
}
