import { socials } from "@/lib/content";
import { PageTitle, Shell, TextLink } from "@/components/site";

export default function SocialsPage() {
  return (
    <Shell>
      <PageTitle label="links" title="socials">
        <p>places to find or reach amirlan kalmukhan.</p>
      </PageTitle>

      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-10 text-stone-300">
        {socials.map((social) => (
          <TextLink key={social.label} href={social.href}>
            {social.label}
          </TextLink>
        ))}
      </div>
    </Shell>
  );
}
