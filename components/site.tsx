import Link from "next/link";
import { Amirsh } from "@/components/amirsh";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-dvh max-w-[760px] px-5 py-6 sm:px-8 sm:py-10">
      <Header />
      {children}
      <footer className="border-t border-white/10 pb-10 pt-8 text-sm text-stone-600">
        just building.
      </footer>
      <Amirsh />
    </main>
  );
}

export function Header() {
  return (
    <header className="mb-24 flex items-center justify-between text-sm text-stone-500 sm:mb-32">
      <Link href="/" className="text-stone-200 hover:text-stone-100 transition-colors">
        amirlan
      </Link>
      <nav className="flex gap-5">
        <Link href="/abt-me" className="hover:text-stone-300 transition-colors">about</Link>
        <Link href="/experience" className="hover:text-stone-300 transition-colors">experience</Link>
        <Link href="/products" className="hover:text-stone-300 transition-colors">products</Link>
        <Link href="/socials" className="hover:text-stone-300 transition-colors">socials</Link>
      </nav>
    </header>
  );
}

export function PageTitle({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-20 sm:mb-24">
      {label ? (
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
          {label}
        </p>
      ) : null}
      <h1 className="max-w-[14ch] text-5xl font-medium leading-[0.96] tracking-[-0.03em] text-stone-100 sm:text-7xl">
        {title}
      </h1>
      {children ? (
        <div className="mt-8 max-w-[600px] text-xl leading-[1.5] text-stone-300 sm:text-2xl">
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 py-12 sm:py-14">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="underline decoration-white/20 underline-offset-4 transition hover:text-stone-100 hover:decoration-white/50"
    >
      {children}
    </a>
  );
}
