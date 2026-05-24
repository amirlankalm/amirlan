import { PageTitle, Section, Shell } from "@/components/site";

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

export const metadata = {
  title: "abt me | amirlan kalmukhan",
  description: "15 y.o founder from kazakhstan, cto @ agent4 labs.",
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

      <Section title="short version">
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            rn i'm running agent4 labs — our products are extensy (idea to
            chrome extension, shipped) and nex (search + execution api for ai
            agents). we got offered a SAFE from a plug and play affiliated
            accelerator and turned it down.
          </p>
          <p>
            before this i did research at nazarbayev university on ai +
            nanomaterials, and led the engineering team at xcellence robotics
            where we won robot performance and modular design at first robotics
            central asia.
          </p>
          <p>
            i also do ai engineering at white hill capital (~$50m aum vc),
            building internal agentic pipelines for due diligence.
          </p>
        </div>
      </Section>

      <Section title="stack">
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-stone-300">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </Section>

      <Section title="find me">
        <div className="flex gap-5 text-stone-300">
          <a
            href="https://x.com/amirlankalm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 transition"
          >
            x
          </a>
          <a
            href="https://github.com/amirlankalm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 transition"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 transition"
          >
            linkedin
          </a>
        </div>
      </Section>
    </Shell>
  );
}
