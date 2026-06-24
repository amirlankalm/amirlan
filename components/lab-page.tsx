import { Section, Shell, TextLink, delayStyle } from "@/components/site";
import { SoundLink } from "@/components/interactive";
import { LiveStatus } from "@/components/live-status";

const pages = [
  { href: "/work", label: "work" },
  { href: "/abt-me", label: "about" },
  { href: "/socials", label: "socials" },
];

export function LabPage() {
  return (
    <Shell>
      <section className="mb-20 sm:mb-24">
        <p className="reveal mb-6 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
          astana, kazakhstan
        </p>
        <h1
          className="reveal text-6xl font-semibold leading-[0.95] tracking-[-0.035em] text-stone-100 sm:text-[5.25rem]"
          style={delayStyle(70)}
        >
          yo, i&apos;m amirlan
        </h1>
        <div
          className="reveal mt-8 max-w-[600px] text-xl leading-[1.5] text-stone-300 sm:text-2xl"
          style={delayStyle(150)}
        >
          <p>
            15 y/o. cto &amp; co-founder @{" "}
            <span className="draw text-stone-100">agent4 labs</span>, and swe @
            speko (yc s26).
          </p>
        </div>
        <LiveStatus />
      </section>

      <Section title="what i'm doing" delay={320}>
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            running agent4 labs as cto &amp; co-founder — we build{" "}
            <TextLink href="https://extensy.dev">extensy</TextLink> and{" "}
            <TextLink href="https://nex.extensy.dev">nex</TextLink>. on the
            side: voice ai at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26), and
            agentic due-diligence pipelines at{" "}
            <TextLink href="https://whitehillcapital.io">
              white hill capital
            </TextLink>{" "}
            (~$50m aum vc).
          </p>
        </div>
      </Section>

      <Section title="pages" delay={400}>
        <div className="grid gap-3 text-xl text-stone-300">
          {pages.map((page) => (
            <SoundLink
              key={page.href}
              href={page.href}
              className="link-grow w-fit text-stone-300 hover:text-stone-100"
            >
              {page.label}
            </SoundLink>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
