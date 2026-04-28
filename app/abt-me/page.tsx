import { PageTitle, Section, Shell } from "@/components/site";

const stack = [
  "next.js",
  "typescript",
  "postgresql",
  "aws",
  "c++",
  "node.js",
  "python",
];

export default function AboutPage() {
  return (
    <Shell>
      <PageTitle label="abt me" title="yo, i'm amirlan">
        <p>
          i am a 15 y/o founder from kazakhstan, cto & co-founder @ extensy,
          building in the agentic ai space.
        </p>
      </PageTitle>

      <Section title="short version">
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            rn i am building extensy: describe what you want, get a fully
            working browser extension, and get it published.
          </p>
          <p>
            before this i did research at nu. now most of my work is around
            agentic ai, browser automation, and infra for agents that can
            actually execute work on the web.
          </p>
          <p>
            amirlan labs is the product lab around that work: extensy,
            sidekick, archer mcp, amir ai, and experiments around autonomous
            web systems.
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
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100"
          >
            x
          </a>
          <a
            href="https://instagram.com/amirlankalm"
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100"
          >
            instagram
          </a>
        </div>
      </Section>

      <Section title="try extensy">
        <p className="text-xl leading-relaxed text-stone-300">
          pls try extensy out. if u dm me on insta or x i can give u credits.
        </p>
      </Section>
    </Shell>
  );
}
