import Link from "next/link";
import { Shell, delayStyle } from "@/components/site";

export default function NotFound() {
  return (
    <Shell>
      <section className="mb-20 sm:mb-24">
        <p className="reveal mb-6 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
          404
        </p>
        <h1
          className="reveal text-5xl font-medium leading-[0.96] tracking-[-0.03em] text-stone-100 sm:text-7xl"
          style={delayStyle(70)}
        >
          not here.
        </h1>
        <div
          className="reveal mt-8 text-xl leading-relaxed text-stone-300"
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
