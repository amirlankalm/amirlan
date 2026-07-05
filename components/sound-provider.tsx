"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SoundProvider as EngineProvider,
  usePatch,
} from "@web-kits/audio/react";
import type { PlayOptions } from "@web-kits/audio";
import { UI_PATCH, type UISoundName } from "@/lib/sounds";

const VOLUME = 0.58;
const STORAGE_KEY = "amirlan:sound";

type PlayFn = (name: UISoundName, opts?: PlayOptions) => void;

type Controls = {
  enabled: boolean;
  toggle: () => void;
  hydrated: boolean;
  /** True once the AudioContext has been unlocked by a user gesture. */
  audioReady: boolean;
};

const PlayContext = createContext<PlayFn>(() => {});
const ControlsContext = createContext<Controls>({
  enabled: true,
  toggle: () => {},
  hydrated: false,
  audioReady: false,
});

/**
 * Lives inside the engine provider so `usePatch` can read the shared
 * enabled/volume state and the user's reduced-motion preference. The patch is
 * in-memory (no network), so it's ready almost immediately; `play` no-ops
 * until then.
 */
function SoundRuntime({
  children,
  enabled,
  toggle,
  hydrated,
}: {
  children: React.ReactNode;
  enabled: boolean;
  toggle: () => void;
  hydrated: boolean;
}) {
  const patch = usePatch(UI_PATCH);
  const [audioReady, setAudioReady] = useState(false);
  const primed = useRef(false);

  const play = useCallback<PlayFn>(
    (name, opts) => {
      if (patch.ready) {
        patch.play(name, opts);
      }
    },
    [patch],
  );

  // Browsers won't start audio until a user gesture. The lib's /react entry
  // bundles its *own* AudioContext (separate from the core ensureReady), so we
  // unlock that one the only way we can reach it: a single muted play inside
  // the first real gesture, which resumes the context the hooks actually use.
  // Only then do we mount the analyser-backed waveform.
  useEffect(() => {
    function init() {
      if (primed.current) return;
      primed.current = true;
      // A real (near-silent) play — NOT volume:0, which the lib optimizes away
      // without ever creating/resuming its context. The "hover" tone is
      // sub-audible, but the play forces the React engine's AudioContext to be
      // created and resumed *inside* this gesture, so every later sound works.
      try {
        patch.play("hover");
      } catch {
        // ignore — context may not be ready on the very first frame
      }
      setAudioReady(true);
      window.removeEventListener("pointerdown", init);
      window.removeEventListener("keydown", init);
    }

    window.addEventListener("pointerdown", init);
    window.addEventListener("keydown", init);

    return () => {
      window.removeEventListener("pointerdown", init);
      window.removeEventListener("keydown", init);
    };
  }, [patch]);

  return (
    <PlayContext.Provider value={play}>
      <ControlsContext.Provider value={{ enabled, toggle, hydrated, audioReady }}>
        {children}
      </ControlsContext.Provider>
    </PlayContext.Provider>
  );
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setEnabled(saved === "1");
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  return (
    <EngineProvider enabled={enabled} volume={VOLUME}>
      <SoundRuntime enabled={enabled} toggle={toggle} hydrated={hydrated}>
        {children}
      </SoundRuntime>
    </EngineProvider>
  );
}

/** Returns a stable `play(name)` function. No-ops when muted or not ready. */
export function useUISound(): PlayFn {
  return useContext(PlayContext);
}

/** Mute state + toggle, for the footer control. */
export function useSoundControls(): Controls {
  return useContext(ControlsContext);
}
