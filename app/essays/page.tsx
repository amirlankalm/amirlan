import type { Metadata } from "next";
import { essays } from "@/lib/content";
import { SoundLink } from "@/components/interactive";
import { Shell, delayStyle, staggerDelay } from "@/components/site";

// opengraph-image.png / twitter-image.png in this folder supply the share card
// (Next picks them up by filename). The root layout sets a small "summary"
// card, so widen it here or the banner renders as a thumbnail.
export const metadata: Metadata = {
  title: "Essays",
  description: "Essays by Amirlan Kalmukhan, published as PDFs.",
  alternates: {
    canonical: "/essays",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function EssaysPage() {
  return (
    <Shell>
      <section className="mb-10 sm:mb-12">
        <h1
          className="reveal text-[27px] font-semibold leading-relaxed text-[color:var(--color-fg)]"
          style={delayStyle(70)}
        >
          essays
        </h1>
      </section>

      <div className="border-t border-[color:var(--color-line)]">
        {essays.map((essay, i) => (
          // `external` forces a plain anchor: these point at static PDFs, and
          // Next's client router would otherwise try to route to the file path.
          <SoundLink
            key={essay.file}
            href={essay.file}
            external
            style={staggerDelay(i, 140)}
            className="reveal group block border-b border-[color:var(--color-line)] py-4 text-[20px] leading-relaxed [text-wrap:balance] sm:py-5"
          >
            {/* A real underline rather than the site's growing one: sweeping a
                background across a title this wide repaints the full line every
                frame. Only the decoration colour moves now. */}
            <span className="text-[color:var(--color-fg)] underline decoration-[color:var(--color-muted)] underline-offset-[4px] transition-[text-decoration-color] duration-200 ease-out [text-decoration-thickness:1.5px] group-hover:decoration-[color:var(--color-fg)]">
              {essay.title}
            </span>
            <span className="sr-only"> (pdf, opens in new tab)</span>
          </SoundLink>
        ))}
      </div>
    </Shell>
  );
}
