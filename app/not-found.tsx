import Link from "next/link";
import { Shell, delayStyle } from "@/components/site";

export default function NotFound() {
  return (
    <Shell>
      <section className="mb-20 sm:mb-24">
        <p className="reveal mb-5 text-[15px] text-[color:var(--color-muted)]">
          404
        </p>
        <h1
          className="reveal text-4xl font-medium leading-tight text-[color:var(--color-fg)] sm:text-5xl"
          style={delayStyle(70)}
        >
          not here.
        </h1>
        <div
          className="reveal mt-8 text-xl leading-relaxed text-[color:var(--color-fg)]"
          style={delayStyle(150)}
        >
          <Link href="/" className="link-inline">
            go back home
          </Link>
        </div>
      </section>
    </Shell>
  );
}
