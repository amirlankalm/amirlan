import { PageTitle, Section, Shell, TextLink } from "@/components/site";
import { SoundLink } from "@/components/interactive";

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
    "the longer story — research and robotics, then founding agent4 labs, speko (yc s26), and white hill capital.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageTitle label="abt me" title="the longer story">
        <p>
          how a 15 y/o from astana ended up cto of a startup, a swe at a yc
          company, and an ai engineer at a vc — all at once.
        </p>
      </PageTitle>

      <Section title="the arc" delay={240}>
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            i&apos;ve been building things since i was a kid in astana. before
            any of this, i did research at nazarbayev university on ai +
            nanomaterials, and led the engineering team at xcellence robotics —
            we won robot performance and modular design at first robotics
            central asia.
          </p>
          <p>
            then i started agent4 labs, where i&apos;m cto &amp; co-founder. we
            build <TextLink href="https://extensy.dev">extensy</TextLink> —
            describe an idea, get a working chrome extension, ship it — and{" "}
            <TextLink href="https://nex.extensy.dev">nex</TextLink>, a search +
            execution api for ai agents. we were offered a safe from a plug and
            play affiliated accelerator and turned it down.
          </p>
          <p>
            alongside agent4 i&apos;m a software engineer at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26) — a
            voice-ai gateway that routes stt, llm, and tts through one api to
            the proven-best provider per call — and an ai engineer at white hill
            capital (~$50m aum vc), building internal agentic pipelines for due
            diligence.
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
