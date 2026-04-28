export type Product = {
  slug: string;
  name: string;
  status: string;
  line: string;
  description: string;
  stage: string;
  tech: string[];
  github?: string;
  website?: string;
  notes: string[];
};

export const products: Product[] = [
  {
    slug: "extensy",
    name: "extensy",
    status: "live",
    line: "idea to chrome extension to verified workflow.",
    description:
      "a product system for turning rough ideas into chrome extensions and useful browser workflows.",
    stage: "chrome extension / saas",
    tech: ["next.js", "chrome mv3", "supabase", "polar", "ai sdk"],
    website: "https://extensy.dev",
    notes: [
      "extension-first interface",
      "idea to generated product flow",
      "verification as part of the loop",
    ],
  },
  {
    slug: "archer-mcp",
    name: "archer mcp",
    status: "building",
    line: "event-driven infrastructure for agents that need to act.",
    description:
      "an mcp layer for agent systems that respond to events, route context, and execute tools.",
    stage: "agent infrastructure",
    tech: ["typescript", "mcp sdk", "supabase", "zod"],
    github: "https://github.com/amirlan-labs/archer-mcp",
    notes: [
      "event triggered execution",
      "tooling for autonomous workflows",
      "built around context and action",
    ],
  },
  {
    slug: "amir-ai",
    name: "amir ai",
    status: "experiment",
    line: "search, context, and reasoning as a private system.",
    description:
      "a personal reasoning system for retrieving context and turning it into clear next actions.",
    stage: "search and reasoning",
    tech: ["retrieval", "reasoning", "local memory"],
    github: "https://github.com/amirlankalm/amir-ai",
    notes: [
      "private context search",
      "reasoning over saved material",
      "answers grounded in local memory",
    ],
  },
  {
    slug: "sidekick",
    name: "sidekick",
    status: "building",
    line: "agentic build engine for executing product work through tools.",
    description:
      "a build system for agent workflows that can inspect context, use browsers, run tools, and carry work across execution loops.",
    stage: "agentic build engine",
    tech: ["langgraph", "langchain", "express", "playwright", "supabase"],
    github: "https://github.com/amirlankalm/sidekick",
    notes: [
      "agent workflows connected to real tools",
      "browser execution and verification loops",
      "built for shipping product changes, not chat-only output",
    ],
  },
];

export const socials = [
  { label: "email", href: "mailto:amirlan@extensy.dev" },
  { label: "github", href: "https://github.com/amirlankalm" },
  { label: "x", href: "https://x.com/amirlankalm" },
  { label: "instagram", href: "https://instagram.com/amirlankalm" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
