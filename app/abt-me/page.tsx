import { PageTitle, Section, Shell, TextLink } from "@/components/site";
import { DrawLink, SoundLink } from "@/components/interactive";

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
  description:
    "the longer story — research and robotics in astana, agent4 labs, and engineering at speko (yc s26) and white hill capital.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageTitle label="abt me" title="the longer story">
        <p>
          how i got from a research lab in astana to building ai products at 15.
        </p>
      </PageTitle>

      <Section title="the arc" delay={240}>
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            i got into research at 14. by the summer of 2025 i was interning at{" "}
            <DrawLink href="https://nu.edu.kz" drawDelay={950}>
              nazarbayev university
            </DrawLink>
            , the best research university in kazakhstan, working on ai and
            nanomaterials, specifically nac carbon dots.
          </p>
          <p>
            i liked the research but got tired of the manual side of it; a lot
            of it was just washing labware. around the same time i got into
            robotics and started competing in FIRST. our team made it to the
            central asian championship and won two awards.
          </p>
          <p>
            after that i started coding and building my own products. the first
            was agent4. now i&apos;m cto and co-founder of agent4 labs, where we
            build <TextLink href="https://extensy.dev">extensy</TextLink> and{" "}
            <TextLink href="https://nex.extensy.dev">nex</TextLink>. early on an
            accelerator affiliated with plug and play offered us a safe, and we
            turned it down because the terms were bad.
          </p>
          <p>
            then i picked up internships as a software engineer at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26) and white
            hill capital. at speko i built a custom retrieval layer that cut our
            agents&apos; latency by 100x. i also built an mcp server that lets
            you use a voice agent from inside claude code; you can type something
            like &apos;claude, book me a table at 5pm here&apos; and it makes the
            call.
          </p>
          <p>building more soon.</p>
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
            <SoundLink
              key={link.label}
              href={link.href}
              className="link-grow text-stone-300 hover:text-stone-100"
            >
              {link.label}
            </SoundLink>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
