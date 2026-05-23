import { socials } from "@/lib/content";
import { IconGithub, IconInstagram, IconLinkedin, IconMail, IconX } from "@/components/icons";
import { PageTitle, Shell } from "@/components/site";

export const metadata = {
  title: "socials | amirlan kalmukhan",
  description: "places to find or reach amirlan kalmukhan.",
};

const iconMap = {
  mail: IconMail,
  github: IconGithub,
  x: IconX,
  linkedin: IconLinkedin,
  instagram: IconInstagram,
};

export default function SocialsPage() {
  return (
    <Shell>
      <PageTitle label="links" title="socials">
        <p>places to find or reach me.</p>
      </PageTitle>

      <section className="border-t border-white/10 pt-10">
        <div className="grid gap-px border border-white/10 bg-white/10">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 bg-[#0f0f0d] px-6 py-5 transition hover:bg-white/[0.03]"
              >
                <span className="text-stone-600 group-hover:text-stone-400 transition-colors">
                  <Icon size={18} />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 w-20">
                  {social.label}
                </span>
                <span className="text-stone-400 group-hover:text-stone-200 transition-colors">
                  {social.display}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}
