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
    org: "geko",
    href: "https://geko.sh",
    role: "co-founder",
    period: "now",
  },
  {
    org: "speko",
    orgDetail: "yc s26",
    href: "https://speko.ai",
    role: "founding engineer",
    period: "previously",
  },
];

export const projects = [
  {
    name: "geko",
    href: "https://geko.sh",
    year: "now",
    detail: "voice training data + rl envs",
  },
  {
    name: "speko",
    href: "https://speko.ai",
    year: "previously",
    detail: "self-healing voice agents",
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
    label: "email",
    href: `mailto:${profile.email}`,
    display: profile.email,
    icon: "mail" as const,
  },
  {
    label: "github",
    href: "https://github.com/amirlankalm",
    display: "amirlankalm",
    icon: "github" as const,
  },
  {
    label: "x",
    href: "https://x.com/amirlankalm",
    display: "@amirlankalm",
    icon: "x" as const,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/",
    display: "amirlan kalmukhan",
    icon: "linkedin" as const,
  },
  {
    label: "instagram",
    href: "https://instagram.com/amirlannk",
    display: "@amirlannk",
    icon: "instagram" as const,
  },
];
