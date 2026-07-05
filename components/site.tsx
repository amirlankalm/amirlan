import { CSSProperties } from "react";
import { Header } from "@/components/header";
import { SoundLink } from "@/components/interactive";
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
    <main className="mx-auto min-h-dvh max-w-[760px] px-6 py-8 sm:px-8 sm:py-16 lg:py-24">
      <Header />
      {children}
      <SoundFooter />
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
    <section className="mb-14 sm:mb-20">
      {label ? (
        <p className="reveal mb-5 text-[15px] text-[color:var(--color-muted)]">
          {label}
        </p>
      ) : null}
      <h1
        className="reveal max-w-[14ch] text-4xl font-medium leading-[1.02] tracking-normal text-[color:var(--color-fg)] sm:text-5xl"
        style={delayStyle(70)}
      >
        {title}
      </h1>
      {children ? (
        <div
          className="reveal mt-7 max-w-[720px] text-xl leading-[1.55] text-[color:var(--color-fg)] sm:text-2xl"
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
      className="reveal border-t border-[color:var(--color-line)] py-10 sm:py-12"
      style={delayStyle(delay)}
    >
      <h2 className="mb-4 text-[15px] text-[color:var(--color-muted)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function RowList({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-[color:var(--color-line)]">{children}</div>;
}

export function Row({
  href,
  title,
  meta,
  detail,
  delay,
}: {
  href?: string;
  title: string;
  meta?: string;
  detail?: string;
  delay?: CSSProperties;
}) {
  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-[22px] leading-snug text-[color:var(--color-fg)] sm:text-[26px]">
          {title}
        </span>
        {detail ? (
          <span className="mt-1 block text-[15px] text-[color:var(--color-muted)] sm:text-base">
            {detail}
          </span>
        ) : null}
      </span>
      {meta ? (
        <span className="shrink-0 text-[22px] leading-snug text-[color:var(--color-muted)] sm:text-[26px]">
          {meta}
        </span>
      ) : null}
    </>
  );

  const className =
    "reveal group flex items-start justify-between gap-5 border-b border-[color:var(--color-line)] py-5 transition-[background-color,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-2 hover:bg-white/22 sm:py-6";

  if (href) {
    return (
      <SoundLink href={href} className={className} style={delay}>
        {content}
      </SoundLink>
    );
  }

  return (
    <div className={className} style={delay}>
      {content}
    </div>
  );
}
