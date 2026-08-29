import type { SoundDefinition, SoundPatch } from "@web-kits/audio";

/**
 * Soft, warm interaction tones designed for a quiet text-first site.
 */
const LP = 340;

const SOFT_TAIL = [
  { type: "reverb" as const, decay: 0.16, damping: 0.86, roomSize: 0.45, mix: 0.08 },
  {
    type: "delay" as const,
    time: 0.035,
    feedback: 0.08,
    feedbackFilter: { type: "lowpass" as const, frequency: 420 },
    mix: 0.035,
  },
];

function softTone(frequency: number, decay: number, gain: number) {
  return {
    source: { type: "triangle" as const, frequency },
    filter: { type: "lowpass" as const, frequency: LP, resonance: 0.55 },
    envelope: { attack: 0.014, decay, sustain: 0, release: 0.018 },
    gain,
    effects: SOFT_TAIL,
  };
}

// A tiny C-major dyad: felt-like rather than clicky, short enough that it
// doesn't compete with reading, and deliberately free of the retro preset's
// sharp square-wave edge.
const calmHover = {
  layers: [
    {
      source: { type: "sine" as const, frequency: 392 },
      filter: { type: "lowpass" as const, frequency: 920, resonance: 0.4 },
      envelope: { attack: 0.012, decay: 0.075, sustain: 0, release: 0.04 },
      effects: SOFT_TAIL,
      gain: 0.036,
    },
    {
      source: { type: "sine" as const, frequency: 523.25 },
      filter: { type: "lowpass" as const, frequency: 1150, resonance: 0.35 },
      envelope: { attack: 0.014, decay: 0.06, sustain: 0, release: 0.035 },
      delay: 0.018,
      effects: SOFT_TAIL,
      gain: 0.021,
    },
  ],
} satisfies SoundDefinition;

export const UI_PATCH = {
  name: "amirlan-ui",
  description: "soft, warm tactile interaction tones",
  sounds: {
    hover: calmHover,
    nav: softTone(174, 0.095, 0.07),
    select: softTone(164, 0.1, 0.074),
    link: softTone(156, 0.095, 0.066),
    open: softTone(147, 0.14, 0.076),
    close: softTone(123, 0.13, 0.064),
    toggleOn: softTone(185, 0.11, 0.072),
    toggleOff: softTone(138, 0.11, 0.062),
  },
} satisfies SoundPatch;

export type UISoundName = keyof typeof UI_PATCH.sounds;
