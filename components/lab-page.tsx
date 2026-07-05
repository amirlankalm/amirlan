import { Shell, TextLink, delayStyle } from "@/components/site";

export function LabPage() {
  return (
    <Shell>
      <section className="max-w-[650px] font-sans text-[20px] leading-[1.6] tracking-[-0.015em] text-[color:var(--color-fg)] sm:text-[22px]">
        <h1
          className="reveal mb-8 text-[20px] font-normal leading-[1.6] tracking-[-0.015em] sm:text-[22px]"
          style={delayStyle(70)}
        >
          hey, i&apos;m amirlan.
        </h1>

        <div className="reveal space-y-6" style={delayStyle(140)}>
          <p>
            i&apos;m a founding engineer at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26), where
            we build voice agents that test and heal themselves. i&apos;m focused
            on latency, retrieval and making agentic conversations feel instant
            and natural.
          </p>
          <p>
            i&apos;m 15. i started coding and building things at 14. before that,
            i did research and robotics.
          </p>
        </div>

        <nav
          className="reveal mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[18px] leading-relaxed"
          style={delayStyle(320)}
          aria-label="primary pages"
        >
          <TextLink href="/blog">blog</TextLink>
          <TextLink href="/socials">socials</TextLink>
        </nav>

        <div
          className="reveal mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[18px] leading-relaxed"
          style={delayStyle(390)}
        >
          <TextLink href="https://x.com/amirlankalm">x.com</TextLink>
          <TextLink href="https://github.com/amirlankalm">github</TextLink>
          <TextLink href="https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/">
            linkedin
          </TextLink>
          <TextLink href="mailto:amirlan@speko.ai">amirlan@speko.ai</TextLink>
        </div>
      </section>
    </Shell>
  );
}
