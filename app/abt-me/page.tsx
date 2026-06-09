import { PageTitle, Section, Shell, TextLink } from "@/components/site";

const stack = [
  "typescript",
  "python",
  "next.js",
  "langgraph",
  "supabase",
  "playwright",
  "mcp sdk",
  "postgresql",
  "node.js",
  "c++",
];

const links = [
  { label: "x", href: "https://x.com/amirlankalm" },
  { label: "github", href: "https://github.com/amirlankalm" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/",
  },
];

export const metadata = {
  title: "abt me",
  description: "15 y/o founder from kazakhstan, cto @ agent4 labs.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageTitle label="abt me" title="yo, i'm amirlan">
        <p>
          i'm a 15 y/o founder from kazakhstan, cto @ agent4 labs, building
          agentic ai infra.
        </p>
      </PageTitle>

      <Section title="short version" delay={240}>
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            rn i'm running agent4 labs — our products are extensy (idea to
            chrome extension, shipped) and nex (search + execution api for ai
            agents). we got offered a safe from a plug and play affiliated
            accelerator and turned it down.
          </p>
          <p>
            before this i did research at nazarbayev university on ai +
            nanomaterials, and led the engineering team at xcellence robotics
            where we won robot performance and modular design at first robotics
            central asia.
          </p>
          <p>
            i also work as a software engineer at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26) —
            building sub-millisecond retrieval for voice agents and training
            speech models for kazakh and uzbek — and do ai engineering at white
            hill capital (~$50m aum vc), building internal agentic pipelines for
            due diligence.
          </p>
        </div>
      </Section>

      <Section title="stack" delay={320}>
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-stone-400">
          {stack.map((item) => (
            <span
              key={item}
              className="cursor-default transition-colors hover:text-stone-100"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section title="find me" delay={400}>
        <div className="flex gap-6 text-stone-300">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-grow text-stone-300 hover:text-stone-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
