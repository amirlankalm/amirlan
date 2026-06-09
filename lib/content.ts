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

export type Experience = {
  org: string;
  orgDetail?: string;
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
    role: "software engineer",
    period: "may 2026 — present",
    points: [
      "built a retrieval layer that returns context in sub-millisecond time — tuned for voice agents, where latency isn't a metric you read, it's a pause the caller hears",
      "trained custom asr/stt and tts models from the ground up for kazakh and uzbek — two low-resource languages most speech stacks quietly skip",
      "designed and shipped the landing page end to end",
    ],
  },
  {
    org: "white hill capital",
    orgDetail: "~$50m aum vc",
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

export const products: Product[] = [
  {
    slug: "extensy",
    name: "extensy",
    status: "live",
    line: "describe it, get a chrome extension, ship it.",
    description:
      "extensy turns a rough idea into a fully working, verifiable chrome extension. it handles the build pipeline, chrome mv3 compliance, and the publishing flow — so you go from prompt to shipped product without touching extension boilerplate.",
    stage: "chrome extension / saas",
    tech: ["next.js 16", "chrome mv3", "supabase", "polar", "vercel ai sdk", "typescript"],
    website: "https://extensy.dev",
    notes: [
      "extension-first interface built around the chrome mv3 spec",
      "ai-generated extension code with live preview and verification loop",
      "full publishing pipeline: manifest, permissions, packaging, and submission ready",
      "supabase-backed user auth, project history, and credit system",
      "polar for monetization — subscription and one-time purchase flows",
    ],
  },
  {
    slug: "nex",
    name: "nex",
    status: "building",
    line: "search and execution api for ai agents.",
    description:
      "nex is a unified api layer that gives ai agents the ability to search, browse, and act on the web. instead of stitching together search apis, headless browsers, and extraction logic, agents call nex and get structured, actionable results back.",
    stage: "api / agent infrastructure",
    tech: ["typescript", "node.js", "playwright", "web search", "vercel"],
    github: "https://github.com/amirlankalm/nex",
    website: "https://nex.extensy.dev",
    notes: [
      "agent-native design: every response is structured for programmatic consumption",
      "unified interface for search, page rendering, and content extraction",
      "handles javascript-heavy sites through headless execution",
      "returns clean structured output — no html parsing in agent code",
      "powers web tooling across extensy and sidekick internally",
    ],
  },
  {
    slug: "sidekick",
    name: "sidekick",
    status: "building",
    line: "agentic build engine for executing product work end-to-end.",
    description:
      "sidekick is a build engine for agent workflows. it connects planning, browser execution, tool use, and verification into a single loop — so agents can ship real product changes, not just produce text output. built to run continuously, not just respond to prompts.",
    stage: "agentic build engine",
    tech: ["langgraph", "langchain", "express", "playwright", "supabase", "typescript"],
    github: "https://github.com/amirlankalm/sidekick",
    notes: [
      "stateful graph architecture via langgraph — agents maintain context across steps",
      "native browser execution: agents can navigate, click, fill, and verify in real browsers",
      "tool-connected: extensy, nex, and custom tools plug in as graph nodes",
      "verification loops built in — agents check their own output before moving forward",
      "designed for continuous execution, not single-turn prompts",
    ],
  },
  {
    slug: "archer-mcp",
    name: "archer mcp",
    status: "building",
    line: "event-driven infrastructure for agents that need to act.",
    description:
      "archer is an mcp layer for agent systems that respond to events rather than just requests. it handles routing, context injection, and tool dispatch — giving agents the infrastructure to react, decide, and execute without a human in the loop.",
    stage: "agent infrastructure / mcp server",
    tech: ["typescript", "mcp sdk", "supabase", "zod", "node.js"],
    github: "https://github.com/amirlan-labs/archer-mcp",
    notes: [
      "event-triggered execution: agents activate on signals, not just user messages",
      "mcp-compliant tool registration with zod-validated input schemas",
      "context routing layer — delivers the right memory and state to the right agent",
      "built for autonomous workflows that run without a human initiating each step",
      "composable with langgraph, sidekick, and other agent runtimes",
    ],
  },
  {
    slug: "aztek",
    name: "aztek",
    status: "building",
    line: "visual dashboard for multi-agent swarm coordination.",
    description:
      "aztek is a visual interface for designing and monitoring multi-agent workflows. agents are nodes in a reactive graph — you can see their state, connections, and execution in real time. built to make swarm-level ai behavior observable and controllable.",
    stage: "agent tooling / dashboard",
    tech: ["next.js 16", "supabase", "groq", "openai", "reactflow", "i18next", "typescript"],
    github: "https://github.com/amirlankalm/aztek",
    notes: [
      "visual graph editor built on reactflow for defining agent topology",
      "real-time execution monitoring: watch agents run, fail, and retry live",
      "per-node model selection — mix groq and openai models within one workflow",
      "supabase for persistent agent memory, session history, and state checkpointing",
      "multilingual interface via i18next — built for global teams",
    ],
  },
  {
    slug: "archaiq",
    name: "archaiq",
    status: "experiment",
    line: "offline voice ai for the kazakh language.",
    description:
      "archaiq is an end-to-end voice ai pipeline built specifically for kazakh. it handles speech recognition, understanding, and synthesis entirely on-device — no api calls, no cloud dependency. built to make conversational ai accessible in an underrepresented language.",
    stage: "voice ai / nlp",
    tech: ["python", "whisper", "faster-whisper", "piper tts", "chromadb"],
    github: "https://github.com/amirlankalm/archaiq",
    notes: [
      "full voice loop: mic input → transcription → reasoning → speech output",
      "kazakh-first: transcription and tts models adapted for kazakh phonology and vocabulary",
      "fully offline: all inference runs locally, no external api calls required",
      "chromadb vector memory for contextual recall across conversation turns",
      "piper tts for natural-sounding kazakh speech synthesis on-device",
    ],
  },
  {
    slug: "amir-ai",
    name: "amir ai",
    status: "experiment",
    line: "personal reasoning system built on private context.",
    description:
      "amir ai is a private retrieval and reasoning system. it indexes personal notes, documents, and saved material — then reasons over that context to produce clear, grounded answers and next actions. designed as a second brain that actually knows what you know.",
    stage: "search and reasoning",
    tech: ["typescript", "retrieval", "vector search", "local memory"],
    github: "https://github.com/amirlankalm/amir-ai",
    notes: [
      "private knowledge base: indexes and embeds personal documents locally",
      "retrieval-augmented reasoning — answers are grounded in your actual material",
      "designed to surface next actions, not just information",
      "no data leaves the local environment — fully private by design",
      "early experiment in personal ai that operates on owned context",
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

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
