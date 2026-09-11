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

      {/* No rules, no underlines — separation is space alone. The gap has to
          stay clear of the ~32px line-height, or two titles that wrap read as
          one block. */}
      <div className="flex flex-col gap-8">
        {essays.map((essay, i) => (
          // `external` forces a plain anchor: these point at static PDFs, and
          // Next's client router would otherwise try to route to the file path.
          <SoundLink
            key={essay.file}
            href={essay.file}
            external
            style={staggerDelay(i, 140)}
            className="reveal group block py-1 text-[20px] leading-relaxed [text-wrap:balance]"
          >
            {/* Colour lives on the span, not the anchor: globals.css sets an
                unlayered `a { color: inherit }`, and unlayered CSS outranks
                @layer utilities, so a hover:text-* on the <a> silently loses. */}
            <span className="text-[color:var(--color-fg)] transition-colors duration-200 ease-out group-hover:text-[color:var(--color-muted)]">
              {essay.title}
            </span>
            <span className="sr-only"> (pdf, opens in new tab)</span>
          </SoundLink>
        ))}
      </div>
    </Shell>
  );
}
