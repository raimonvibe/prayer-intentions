export type SpeechVoiceOption = {
  name: string;
  lang: string;
  voiceURI: string;
  isNetwork: boolean;
};

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeech(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

function mapVoices(voices: SpeechSynthesisVoice[]): SpeechVoiceOption[] {
  return voices.map((voice) => ({
    name: voice.name,
    lang: voice.lang,
    voiceURI: voice.voiceURI,
    isNetwork: !voice.localService,
  }));
}

export function sortVoicesPreferNetwork(
  voices: SpeechVoiceOption[]
): SpeechVoiceOption[] {
  return [...voices].sort((a, b) => {
    if (a.isNetwork !== b.isNetwork) return a.isNetwork ? -1 : 1;

    const aEnglish = a.lang.toLowerCase().startsWith("en");
    const bEnglish = b.lang.toLowerCase().startsWith("en");
    if (aEnglish !== bEnglish) return aEnglish ? -1 : 1;

    return a.name.localeCompare(b.name);
  });
}

export function loadVoices(): Promise<SpeechVoiceOption[]> {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;

    const readVoices = () => sortVoicesPreferNetwork(mapVoices(synth.getVoices()));

    const initial = readVoices();
    if (initial.length > 0) {
      resolve(initial);
      return;
    }

    const finish = () => {
      resolve(readVoices());
    };

    synth.addEventListener("voiceschanged", finish, { once: true });

    window.setTimeout(() => {
      const delayed = readVoices();
      if (delayed.length > 0) resolve(delayed);
    }, 300);
  });
}

export function getDefaultVoiceURI(voices: SpeechVoiceOption[]): string | null {
  const networkEnglish = voices.find(
    (voice) => voice.isNetwork && voice.lang.toLowerCase().startsWith("en")
  );
  if (networkEnglish) return networkEnglish.voiceURI;

  const anyNetwork = voices.find((voice) => voice.isNetwork);
  if (anyNetwork) return anyNetwork.voiceURI;

  const localEnglish = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("en")
  );
  if (localEnglish) return localEnglish.voiceURI;

  return voices[0]?.voiceURI ?? null;
}

export function speakText(
  text: string,
  options?: {
    voiceURI?: string | null;
    onEnd?: () => void;
    onError?: () => void;
  }
): SpeechSynthesisUtterance | null {
  if (!isSpeechSupported()) return null;

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    (options?.voiceURI
      ? voices.find((voice) => voice.voiceURI === options.voiceURI)
      : null) ??
    voices.find((voice) => !voice.localService && voice.lang.startsWith("en")) ??
    voices.find((voice) => !voice.localService) ??
    voices.find((voice) => voice.lang.startsWith("en")) ??
    voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}
