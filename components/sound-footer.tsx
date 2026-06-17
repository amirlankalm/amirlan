"use client";

import { useEffect, useRef } from "react";
import { useAnalyser } from "@web-kits/audio/react";
import { useSoundControls, useUISound } from "@/components/sound-provider";

const SAMPLES = 36;

/**
 * The signature detail: a tiny oscilloscope wired to the master bus. It's a
 * flat line in silence and only ripples when a real UI sound plays — so the
 * page literally draws its own voice. Reduced-motion users get a static line.
 */
function Waveform({ active }: { active: boolean }) {
  const analyser = useAnalyser({ fftSize: 256, smoothingTimeConstant: 0.78 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = 64;
    const cssH = 16;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    const draw = (flat: boolean) => {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.strokeStyle = "rgba(235, 231, 220, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();

      const mid = cssH / 2;
      if (flat) {
        ctx.moveTo(1, mid);
        ctx.lineTo(cssW - 1, mid);
      } else {
        const data = analyser.getFloatTimeDomainData();
        const step = Math.floor(data.length / SAMPLES) || 1;
        for (let i = 0; i < SAMPLES; i++) {
          const v = data[i * step] ?? 0;
          const x = 1 + (i / (SAMPLES - 1)) * (cssW - 2);
          // Display gain — the vibration tones are low-amplitude, so scale them
          // up for a visible ripple, clamped to the canvas.
          const y = Math.max(1, Math.min(cssH - 1, mid - v * (mid - 1) * 12));
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    if (!active || reduce) {
      draw(true);
      return;
    }

    let raf = 0;
    const loop = () => {
      draw(document.hidden);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [analyser, active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: 64, height: 16 }}
      className={active ? "opacity-90" : "opacity-40"}
    />
  );
}

const SOUND_ON = "M4 9v6h3l4 3V6L7 9zM15 9.5a3 3 0 0 1 0 5";
const SOUND_OFF = "M4 9v6h3l4 3V6L7 9zM15 9.5l4 5M19 9.5l-4 5";

/** A calm, static line shown before audio is unlocked (and as the SSR shape). */
function FlatLine() {
  return (
    <svg
      width="64"
      height="16"
      viewBox="0 0 64 16"
      fill="none"
      aria-hidden="true"
      className="opacity-40"
    >
      <line
        x1="1"
        y1="8"
        x2="63"
        y2="8"
        stroke="rgba(235, 231, 220, 0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundToggle() {
  const { enabled, toggle, hydrated, audioReady } = useSoundControls();
  const play = useUISound();

  function onClick() {
    const next = !enabled;
    if (next) {
      toggle();
      // Wait a frame so the engine sees `enabled` before we play.
      requestAnimationFrame(() => play("toggleOn"));
    } else {
      // Play the off cue while still audible, then mute.
      play("toggleOff");
      toggle();
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      aria-label={enabled ? "mute sound" : "unmute sound"}
      title={enabled ? "sound on" : "sound off"}
      className="press group flex items-center gap-2 rounded-md border border-transparent px-1.5 py-1 text-stone-500 transition-colors hover:text-stone-300"
      style={{ opacity: hydrated ? 1 : 0 }}
    >
      {audioReady ? <Waveform active={enabled} /> : <FlatLine />}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={enabled ? SOUND_ON : SOUND_OFF} />
      </svg>
    </button>
  );
}

function CommandHint() {
  const play = useUISound();
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("amirlan:command"))}
      onPointerEnter={() => play("hover")}
      aria-label="open command palette"
      className="press flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-stone-500 transition-colors hover:border-white/20 hover:text-stone-300"
    >
      <kbd className="font-sans">⌘</kbd>
      <kbd>K</kbd>
    </button>
  );
}

export function SoundFooter() {
  return (
    <footer className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pb-10 pt-8 text-sm text-stone-500">
      <span className="flex items-center gap-2.5">
        <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-stone-500" />
        just building.
      </span>
      <div className="flex items-center gap-2.5">
        <CommandHint />
        <SoundToggle />
      </div>
    </footer>
  );
}
