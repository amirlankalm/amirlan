import Link from "next/link";
import { PageTitle, Section, Shell, TextLink } from "@/components/site";

const pages = [
  { href: "/experience", label: "experience" },
  { href: "/products", label: "products" },
  { href: "/abt-me", label: "about" },
  { href: "/socials", label: "socials" },
];

export function LabPage() {
  return (
    <Shell>
      <PageTitle label="astana, kazakhstan" title="yo, i'm amirlan">
        <p>
          15 y/o founder from kazakhstan, cto @ agent4 labs, building agentic
          ai infra.
        </p>
      </PageTitle>

      <Section title="what i'm doing" delay={240}>
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            running agent4 labs — we build{" "}
            <TextLink href="/products/extensy">extensy</TextLink> and{" "}
            <TextLink href="/products/nex">nex</TextLink>. turned down a safe
            from a plug and play affiliated accelerator.
          </p>
          <p>
            also a software engineer at{" "}
            <TextLink href="https://speko.ai">speko</TextLink> (yc s26) —
            real-time voice ai and speech models for kazakh and uzbek — and ai
            engineering at white hill capital (~$50m aum vc), building agentic
            pipelines for due diligence.
          </p>
        </div>
      </Section>

      <Section title="pages" delay={320}>
        <div className="grid gap-3 text-xl text-stone-300">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="link-grow w-fit text-stone-300 hover:text-stone-100"
            >
              {page.label}
            </Link>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
