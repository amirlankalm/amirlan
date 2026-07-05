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
    period: "2026",
  },
];

export const projects = [
  {
    name: "speko",
    href: "https://speko.ai",
    year: "now",
    detail: "voice-ai infra",
  },
];

export const socials = [
  {
    label: "email",
    href: "mailto:amirlan@speko.ai",
    display: "amirlan@speko.ai",
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
