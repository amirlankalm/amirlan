import Link from "next/link";
import { PageTitle, Section, Shell } from "@/components/site";

export function LabPage() {
  return (
    <Shell>
      <PageTitle label="astana, kazakhstan" title="yo, i'm amirlan">
        <p>
          15 y/o founder from kazakhstan, cto @ agent4 labs, building agentic
          ai infra.
        </p>
      </PageTitle>

      <Section title="what i'm doing">
        <div className="space-y-5 text-xl leading-relaxed text-stone-300">
          <p>
            running agent4 labs — we build{" "}
            <Link href="/products/extensy" className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 hover:decoration-white/50 transition">
              extensy
            </Link>{" "}
            and{" "}
            <Link href="/products/nex" className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 hover:decoration-white/50 transition">
              nex
            </Link>
            . turned down a safe from a plug and play affiliated accelerator.
          </p>
          <p>
            also doing ai engineering at white hill capital (~$50m aum vc),
            building agentic pipelines for due diligence. and a few experiments
            on the side.
          </p>
        </div>
      </Section>

      <Section title="pages">
        <div className="grid gap-3 text-xl text-stone-300">
          <Link href="/experience" className="hover:text-stone-100 transition-colors">experience</Link>
          <Link href="/products" className="hover:text-stone-100 transition-colors">products</Link>
          <Link href="/abt-me" className="hover:text-stone-100 transition-colors">about</Link>
          <Link href="/socials" className="hover:text-stone-100 transition-colors">socials</Link>
        </div>
      </Section>
    </Shell>
  );
}
