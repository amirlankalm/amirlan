import { socials } from "@/lib/content";
import { SoundLink } from "@/components/interactive";
import { Shell, delayStyle, staggerDelay } from "@/components/site";

export const metadata = {
  title: "socials",
  description: "places to find or reach amirlan kalmukhan.",
};

export default function SocialsPage() {
  return (
    <Shell>
      <section className="mb-10 sm:mb-12">
        <p className="reveal mb-3 text-[15px] text-[color:var(--color-muted)]">
          links
        </p>
        <h1
          className="reveal text-[27px] font-semibold leading-relaxed text-[color:var(--color-fg)]"
          style={delayStyle(70)}
        >
          socials
        </h1>
      </section>

      <div className="border-t border-[color:var(--color-line)]">
        {socials.map((social, i) => (
          <SoundLink
            key={social.label}
            href={social.href}
            style={staggerDelay(i, 140)}
            className="reveal group flex items-baseline justify-between gap-5 border-b border-[color:var(--color-line)] py-3.5 text-[20px] leading-relaxed transition-colors hover:text-[color:var(--color-muted)] sm:py-4"
          >
            <span className="link-grow text-[color:var(--color-fg)]">
              {social.label}
            </span>
            <span className="truncate text-right text-[18px] text-[color:var(--color-muted)]">
              {social.display}
            </span>
          </SoundLink>
        ))}
      </div>
    </Shell>
  );
}
