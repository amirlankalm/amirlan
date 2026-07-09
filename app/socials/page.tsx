import { socials } from "@/lib/content";
import { SoundLink } from "@/components/interactive";
import { Shell, delayStyle, staggerDelay } from "@/components/site";

export const metadata = {
  title: "Socials",
  description:
    "Official social profiles, contact links, and current publishing channels for Amirlan Kalmukhan.",
  alternates: {
    canonical: "/socials",
  },
};

export default function SocialsPage() {
  return (
    <Shell>
      <section className="mb-10 sm:mb-12">
        <p className="reveal mb-3 text-[15px] text-[color:var(--color-muted)]">
          links / writing
        </p>
        <h1
          className="reveal text-[27px] font-semibold leading-relaxed text-[color:var(--color-fg)]"
          style={delayStyle(70)}
        >
          socials
        </h1>
        <p
          className="reveal mt-3 max-w-[560px] text-[18px] leading-relaxed text-[color:var(--color-muted)]"
          style={delayStyle(140)}
        >
          places where i write, ship, and reply.
        </p>
      </section>

      <div className="border-t border-[color:var(--color-line)]">
        {socials.map((social, i) => (
          <SoundLink
            key={social.label}
            href={social.href}
            style={staggerDelay(i, 220)}
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
