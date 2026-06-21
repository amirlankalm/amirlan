import { socials } from "@/lib/content";
import { IconGithub, IconInstagram, IconLinkedin, IconMail, IconX } from "@/components/icons";
import { PageTitle, Shell, staggerDelay } from "@/components/site";
import { SoundLink } from "@/components/interactive";

export const metadata = {
  title: "socials",
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
          {socials.map((social, i) => {
            const Icon = iconMap[social.icon];
            const external = social.href.startsWith("http");

            return (
              <SoundLink
                key={social.label}
                href={social.href}
                style={staggerDelay(i)}
                className="reveal group flex items-center gap-4 bg-[#0f0f0d] px-6 py-5 transition-colors hover:bg-white/[0.035]"
              >
                <span className="text-stone-500 transition-colors group-hover:text-stone-300">
                  <Icon size={18} />
                </span>
                <span className="w-20 font-mono text-xs uppercase tracking-[0.14em] text-stone-400">
                  {social.label}
                </span>
                <span className="text-stone-400 transition-colors group-hover:text-stone-200">
                  {social.display}
                </span>
                {external ? (
                  <span className="sr-only"> (opens in new tab)</span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="ml-auto text-stone-600 opacity-60 transition-[color,opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:text-stone-300 group-hover:opacity-100"
                >
                  {external ? "↗" : "→"}
                </span>
              </SoundLink>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}
