"use client";

import { useSpeech } from "@/components/SpeechContext";

export function SpeechDock() {
  const {
    speechModeEnabled,
    toggleSpeechMode,
    isSpeaking,
    stopSpeaking,
    speechSupported,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    voicesLoading,
  } = useSpeech();

  if (!speechSupported) {
    return (
      <aside
        className="fixed bottom-4 left-4 z-30 max-w-[calc(100vw-2rem)] rounded-2xl border border-surface bg-surface-elevated px-4 py-3 shadow-lg"
        aria-label="Speech controls"
      >
        <p className="text-sm text-theme-muted">
          Read-aloud is not supported in this browser.
        </p>
      </aside>
    );
  }

  const networkCount = voices.filter((voice) => voice.isNetwork).length;

  return (
    <aside
      className="fixed bottom-4 left-4 z-30 w-[min(100vw-2rem,20rem)] rounded-2xl border border-surface bg-surface-elevated p-3 shadow-lg"
      aria-label="Speech controls"
    >
      <div className="mb-2 flex items-center gap-2">
        <i
          className="fas fa-volume-high text-theme-subtle"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-theme">Speech</span>
      </div>

      <div className="space-y-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-theme-muted">
            Voice {networkCount > 0 ? "(network preferred)" : ""}
          </span>
          <select
            value={selectedVoiceURI ?? ""}
            onChange={(event) => setSelectedVoiceURI(event.target.value)}
            disabled={voicesLoading || voices.length === 0}
            className="w-full rounded-xl border border-surface bg-[var(--input-bg)] px-3 py-2 text-sm text-theme focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400/40 dark:focus:ring-stone-500/40"
          >
            {voicesLoading && <option value="">Loading voices...</option>}
            {!voicesLoading && voices.length === 0 && (
              <option value="">No voices available</option>
            )}
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.isNetwork ? "☁ " : "💻 "}
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleSpeechMode}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 ${
              speechModeEnabled
                ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900"
                : "border border-surface bg-surface text-theme hover:bg-stone-200/60 dark:hover:bg-stone-700/60"
            }`}
            aria-pressed={speechModeEnabled}
          >
            <i
              className={speechModeEnabled ? "fas fa-toggle-on" : "fas fa-toggle-off"}
              aria-hidden="true"
            />
            {speechModeEnabled ? "On" : "Off"}
          </button>

          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500"
            >
              <i className="fas fa-stop" aria-hidden="true" />
              Stop
            </button>
          )}
        </div>

        <p className="text-xs leading-relaxed text-theme-subtle">
          {speechModeEnabled
            ? "Auto-read when you expand a topic."
            : "Use Listen on any topic, or turn speech on."}
          {" "}Press Escape to stop.
        </p>
      </div>
    </aside>
  );
}
