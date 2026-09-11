import { essays } from "@/lib/content";
import { SoundLink } from "@/components/interactive";
import { Shell, delayStyle, staggerDelay } from "@/components/site";

export const metadata = {
  title: "Essays",
  description: "Essays by Amirlan Kalmukhan, published as PDFs.",
  alternates: {
    canonical: "/essays",
  },
};

export default function EssaysPage() {
  return (
    <Shell>
      <section className="mb-10 sm:mb-12">
        <p className="reveal mb-3 text-[15px] text-[color:var(--color-muted)]">
          writing
        </p>
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
            className="reveal link-row block border-b border-[color:var(--color-line)] py-4 text-[20px] leading-relaxed [text-wrap:balance] sm:py-5"
          >
            <span className="link-grow text-[color:var(--color-fg)]">
              {essay.title}
            </span>
            <span className="sr-only"> (pdf, opens in new tab)</span>
          </SoundLink>
        ))}
      </div>
    </Shell>
  );
}
