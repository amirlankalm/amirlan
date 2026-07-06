import { Shell, delayStyle } from "@/components/site";

export default function BlogPage() {
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
          blog
        </h1>
      </section>

      <section className="reveal border-t border-[color:var(--color-line)] pt-10" style={delayStyle(240)}>
        <p className="text-xl leading-relaxed text-[color:var(--color-muted)]">
          nothing here yet.
        </p>
      </section>
    </Shell>
  );
}
