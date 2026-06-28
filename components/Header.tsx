"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useSpeech } from "@/components/SpeechContext";

export function Header() {
  const { speechModeEnabled, toggleSpeechMode, speechSupported } = useSpeech();

  return (
    <header className="sticky top-0 z-20 border-b border-stone-300/50 bg-[#f7f3eb]/85 backdrop-blur-md dark:border-stone-700/50 dark:bg-[#1c1c1c]/85">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="font-serif text-xl font-semibold tracking-tight text-stone-800 dark:text-stone-100 sm:text-2xl">
            Prayer Intentions
          </h1>
          <p className="hidden text-sm text-stone-600 dark:text-stone-400 sm:block">
            Who and what we lift up in prayer
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSpeechMode}
            disabled={!speechSupported}
            title={
              speechSupported
                ? speechModeEnabled
                  ? "Speech mode on"
                  : "Speech mode off"
                : "Speech not supported in this browser"
            }
            className={`rounded-full border px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 disabled:cursor-not-allowed disabled:opacity-50 ${
              speechModeEnabled
                ? "border-stone-600 bg-stone-700 text-stone-100 dark:border-stone-400 dark:bg-stone-300 dark:text-stone-900"
                : "border-stone-300/70 bg-stone-100/90 text-stone-700 hover:bg-stone-200/90 dark:border-stone-600 dark:bg-stone-800/90 dark:text-stone-200 dark:hover:bg-stone-700/90"
            }`}
            aria-label={
              speechModeEnabled ? "Disable speech mode" : "Enable speech mode"
            }
            aria-pressed={speechModeEnabled}
          >
            <i className="fas fa-volume-high" aria-hidden="true" />
            <span className="ml-2 hidden sm:inline">
              {speechModeEnabled ? "Speech on" : "Speech off"}
            </span>
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
