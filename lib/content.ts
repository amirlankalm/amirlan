import { profile } from "@/lib/profile";

export type Experience = {
  org: string;
  orgDetail?: string;
  href?: string;
  role: string;
  period: string;
};

export const experiences: Experience[] = [
  {
    org: "speko",
    orgDetail: "yc s26",
    href: "https://speko.ai",
    role: "founding engineer",
    period: "previously",
  },
  {
    org: "white hill capital",
    href: "https://whitehillcapital.io",
    role: "swe intern",
    period: "previously",
  },
];

export const projects = [
  {
    name: "euphemia",
    href: "https://github.com/amirlankalm/euphemia",
    year: "recent",
    detail:
      "an rl environment for the decision a voice agent actually makes: whether to speak, when, and what.",
  },
  {
    name: "resonance",
    href: "https://github.com/amirlankalm/resonance-public",
    year: "recent",
    detail:
      "an active experimentation and rl environment for scientific physics reasoning.",
  },
  {
    name: "ai research foundations",
    href: "https://github.com/amirlankalm/ai-research-foundations",
    year: "recent",
    detail:
      "a visual, intuition-first path from basic python to ai research: pytorch, nanogpt, dpo, grpo.",
  },
];

export type Essay = {
  /** The only thing /essays shows. */
  title: string;
  /** Lives in public/, so the browser renders it inline rather than downloading. */
  file: string;
};

// Newest first.
export const essays: Essay[] = [
  {
    title:
      "probability behind jujutsu kaisen: kinji hakari's idle death gamble",
    file: "/essays/idle-death-gamble.pdf",
  },
  {
    title: "topology behind jujutsu kaisen: ryomen sukuna's cuts",
    file: "/essays/sukunas-cuts.pdf",
  },
  {
    title:
      "vector fields behind jujutsu kaisen: gojo satoru's blue, red and purple",
    file: "/essays/blue-red-purple.pdf",
  },
  {
    title:
      "information theory behind jujutsu kaisen: gojo satoru's unlimited void",
    file: "/essays/infinite-void.pdf",
  },
];

export const socials = [
  {
    label: "x",
    href: "https://x.com/amirlankalm",
    display: "@amirlankalm",
    icon: "x" as const,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/amirlank",
    display: "amirlank",
    icon: "linkedin" as const,
  },
  {
    label: "github",
    href: "https://github.com/amirlankalm",
    display: "amirlankalm",
    icon: "github" as const,
  },
  {
    label: "cal",
    href: "https://cal.com/amirlan",
    display: "cal.com/amirlan",
    icon: "cal" as const,
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/amirlannk/",
    display: "@amirlannk",
    icon: "instagram" as const,
  },
  {
    label: "email",
    href: `mailto:${profile.email}`,
    display: profile.email,
    icon: "mail" as const,
  },
];
