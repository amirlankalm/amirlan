import type { SoundPatch } from "@web-kits/audio";

/**
 * The site's sound language — soft, low, tactile "vibrations", reverse-engineered
 * from arlan.me's interaction sound.
 *
 * The recipe is deliberately minimal: a low sine tone run through an aggressive
 * ~350 Hz lowpass, with a ~5 ms attack and a fast (~50–110 ms) decay, dry (no
 * reverb). The low pitch + heavy lowpass strips out any brightness or click,
 * leaving a deep, felt "bump" rather than a musical note — closer to a haptic
 * buzz than a chime.
 *
 * Each action gets its own low pitch (≈104–220 Hz) so interactions stay
 * distinguishable while sharing one cohesive, relaxing timbre.
 *
 * Emil discipline holds: hover is barely-there + throttled; keyboard-repeated
 * actions (typing, arrow-nav) stay silent.
 */
const LP = 350; // the signature lowpass cutoff — keeps every tone soft + low

export const UI_PATCH = {
  name: "amirlan-ui",
  description: "soft low tactile vibrations, in the spirit of arlan.me",
  sounds: {
    // Barely-there press tick — highest + quietest of the family.
    hover: {
      source: { type: "sine", frequency: 220 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.004, decay: 0.045, sustain: 0 },
      gain: 0.03,
    },
    // Navigation — a clean mid-low vibration (G3).
    nav: {
      source: { type: "sine", frequency: 196 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.06, sustain: 0 },
      gain: 0.05,
    },
    // The workhorse click — arlan.me's exact 184 Hz vibration.
    select: {
      source: { type: "sine", frequency: 184 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.06, sustain: 0 },
      gain: 0.055,
    },
    // Inline link — a touch lower + softer than select.
    link: {
      source: { type: "sine", frequency: 174 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.05, sustain: 0 },
      gain: 0.045,
    },
    // Surfaces open — deeper + a little longer, so it reads as a "bloom".
    open: {
      source: { type: "sine", frequency: 160 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.006, decay: 0.11, sustain: 0 },
      gain: 0.055,
    },
    // Surfaces close — the lower, settling mirror of open.
    close: {
      source: { type: "sine", frequency: 132 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.006, decay: 0.1, sustain: 0 },
      gain: 0.05,
    },
    // Sound on — slightly higher (brighter feel, still low).
    toggleOn: {
      source: { type: "sine", frequency: 208 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.08, sustain: 0 },
      gain: 0.05,
    },
    // Sound off — lower, the last soft pulse.
    toggleOff: {
      source: { type: "sine", frequency: 156 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.08, sustain: 0 },
      gain: 0.045,
    },
    // Terminal command — same family as select.
    submit: {
      source: { type: "sine", frequency: 184 },
      filter: { type: "lowpass", frequency: LP },
      envelope: { attack: 0.005, decay: 0.055, sustain: 0 },
      gain: 0.05,
    },
    // Access granted — a soft low two-tap (E3 → A3).
    grant: {
      layers: [
        {
          source: { type: "sine", frequency: 164 },
          filter: { type: "lowpass", frequency: LP },
          envelope: { attack: 0.005, decay: 0.09, sustain: 0 },
          gain: 0.05,
        },
        {
          source: { type: "sine", frequency: 220 },
          filter: { type: "lowpass", frequency: LP },
          envelope: { attack: 0.005, decay: 0.11, sustain: 0 },
          gain: 0.045,
          delay: 0.085,
        },
      ],
    },
    // Access denied — a very low, slow thud.
    deny: {
      source: { type: "sine", frequency: 104 },
      filter: { type: "lowpass", frequency: 300 },
      envelope: { attack: 0.006, decay: 0.13, sustain: 0 },
      gain: 0.05,
    },
  },
} satisfies SoundPatch;

export type UISoundName = keyof typeof UI_PATCH.sounds;
