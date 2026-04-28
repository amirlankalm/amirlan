import Link from "next/link";
import { socials } from "@/lib/content";
import { PageTitle, Shell, TextLink } from "@/components/site";

export function LabPage() {
  return (
    <Shell>
      <PageTitle label="astana/sf" title="amirlan labs">
        <p>
          amirlan labs, a product lab of amirlan kalmukhan building agentic ai
          and agentic infra for autonomous web.
        </p>
      </PageTitle>

      <div className="grid gap-3 border-t border-white/10 py-10 text-xl text-stone-300">
        <Link href="/products" className="hover:text-stone-100">
          products
        </Link>
        <Link href="/blog" className="hover:text-stone-100">
          blog
        </Link>
        <Link href="/socials" className="hover:text-stone-100">
          socials
        </Link>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 py-10 text-stone-400">
        {socials.map((social) => (
          <TextLink key={social.label} href={social.href}>
            {social.label}
          </TextLink>
        ))}
      </div>
    </Shell>
  );
}
