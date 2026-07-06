import type { SoundPatch } from "@web-kits/audio";

/**
 * Soft, relaxing interface taps inspired by arlan.me's muted interaction audio.
 *
 * The feel is closer to a felt key press than a click: low triangle tones,
 * gentle attack, short decay, lowpass filtering, and a tiny damped room tail.
 * Nothing is bright, percussive, or musical enough to distract from reading.
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

export const UI_PATCH = {
  name: "amirlan-ui",
  description: "soft low tactile vibrations, in the spirit of arlan.me",
  sounds: {
    hover: softTone(196, 0.07, 0.052),
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
