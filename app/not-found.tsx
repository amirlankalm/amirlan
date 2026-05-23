import Link from "next/link";
import { Shell } from "@/components/site";

export default function NotFound() {
  return (
    <Shell>
      <section className="mb-20 sm:mb-24">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
          404
        </p>
        <h1 className="text-5xl font-medium leading-[0.96] tracking-[-0.03em] text-stone-100 sm:text-7xl">
          not here.
        </h1>
        <div className="mt-8 text-xl leading-relaxed text-stone-300">
          <Link
            href="/"
            className="underline decoration-white/20 underline-offset-4 hover:text-stone-100 hover:decoration-white/50 transition"
          >
            go back home
          </Link>
        </div>
      </section>
    </Shell>
  );
}
