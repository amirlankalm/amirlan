export type Experience = {
  org: string;
  orgDetail?: string;
  href?: string;
  role: string;
  period: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    org: "agent4 labs",
    role: "cto & co-founder",
    period: "2026 — present",
    points: [
      "building extensy (idea to chrome extension, shipped) and nex (search + execution api for ai agents)",
      "turned down a safe from a plug and play affiliated accelerator",
      "full technical ownership: architecture, infra, ai pipelines, and shipping",
    ],
  },
  {
    org: "speko",
    orgDetail: "yc s26",
    href: "https://speko.ai",
    role: "software engineer",
    period: "may 2026 — present",
    points: [
      "speko is a voice-ai gateway — stt, llm, and tts through one api, auto-routed to the proven-best provider for every call",
      "built the sub-millisecond retrieval layer that feeds context to live voice agents, where latency isn't a metric you read, it's a pause the caller hears",
      "worked across the voice pipeline — benchmarking and routing stt/llm/tts providers for ~340ms median turns",
      "designed and shipped the landing page end to end",
    ],
  },
  {
    org: "white hill capital",
    orgDetail: "~$50m aum vc",
    href: "https://whitehillcapital.io",
    role: "ai engineer",
    period: "2026 — present",
    points: [
      "building internal agentic pipelines for venture due diligence automation",
      "multi-agent workflows that analyze deal flow, synthesize company data, and surface investment signals",
    ],
  },
  {
    org: "xcellence robotics lab",
    role: "lead engineer",
    period: "2025 — 2026",
    points: [
      "led engineering team for FIRST Robotics Central Asia",
      "won robot performance and modular design awards",
    ],
  },
  {
    org: "nazarbayev university",
    role: "researcher",
    period: "2025",
    points: [
      "research at the intersection of ai and nanomaterials (nac carbon dots)",
      "applied ml to materials characterization data to identify structural patterns",
    ],
  },
];

export const socials = [
  {
    label: "email",
    href: "mailto:amirlan@extensy.dev",
    display: "amirlan@extensy.dev",
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
