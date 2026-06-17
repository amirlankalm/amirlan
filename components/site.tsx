import { CSSProperties } from "react";
import { Amirsh } from "@/components/amirsh";
import { Header } from "@/components/header";
import { SoundFooter } from "@/components/sound-footer";

// One cadence for the whole site. Lists start at STAGGER_BASE and step by
// STAGGER_STEP, capped so the last row never trickles in late.
const STAGGER_BASE = 200;
const STAGGER_STEP = 55;
const STAGGER_CAP = 6;

export function delayStyle(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

export function staggerDelay(index: number, base = STAGGER_BASE): CSSProperties {
  return delayStyle(base + Math.min(index, STAGGER_CAP) * STAGGER_STEP);
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-dvh max-w-[760px] px-5 py-6 sm:px-8 sm:py-10">
      <Header />
      {children}
      <SoundFooter />
      <Amirsh />
    </main>
  );
}

export { Header };
export { TextLink } from "@/components/interactive";

export function PageTitle({
  label,
  title,
  children,
}: {
  label?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-20 sm:mb-24">
      {label ? (
        <p className="reveal mb-6 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
          {label}
        </p>
      ) : null}
      <h1
        className="reveal max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-stone-100 sm:text-7xl"
        style={delayStyle(70)}
      >
        {title}
      </h1>
      {children ? (
        <div
          className="reveal mt-8 max-w-[600px] text-xl leading-[1.5] text-stone-300 sm:text-2xl"
          style={delayStyle(150)}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function Section({
  title,
  children,
  delay = 240,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section
      className="reveal border-t border-white/10 py-12 sm:py-14"
      style={delayStyle(delay)}
    >
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
        {title}
      </h2>
      {children}
    </section>
  );
}
