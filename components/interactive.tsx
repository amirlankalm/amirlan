"use client";

import Link from "next/link";
import { useUISound } from "@/components/sound-provider";
import type { UISoundName } from "@/lib/sounds";

// Throttle hover ticks so sweeping the cursor across a list doesn't machine-gun.
let lastHover = 0;
export function useHoverTick() {
  const play = useUISound();
  return () => {
    const now = performance.now();
    if (now - lastHover > 120) {
      lastHover = now;
      play("hover");
    }
  };
}

/** Inline prose link with the faint underline + a soft click cue. */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const play = useUISound();
  const tick = useHoverTick();
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="link-inline"
      onPointerEnter={tick}
      onClick={() => play("link")}
    >
      {children}
      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
    </a>
  );
}

type SoundLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  sound?: UISoundName;
  /** External links open in a new tab and use the ↗ affordance. */
  external?: boolean;
} & Pick<React.HTMLAttributes<HTMLElement>, "style">;

/**
 * A navigable row/link with a hover tick and a click cue. Internal links use
 * Next routing + the "nav" sound; external links open in a new tab.
 */
export function SoundLink({
  href,
  children,
  className,
  sound,
  external,
  style,
}: SoundLinkProps) {
  const play = useUISound();
  const tick = useHoverTick();
  const httpExternal = external ?? href.startsWith("http");
  const isProtocol = /^(mailto:|tel:)/.test(href);
  const cue: UISoundName = sound ?? (httpExternal || isProtocol ? "select" : "nav");

  // http(s) — open in a new tab.
  if (httpExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        onPointerEnter={tick}
        onClick={() => play(cue)}
      >
        {children}
      </a>
    );
  }

  // mailto:/tel: — hand off to the OS, no new tab, no Next routing.
  if (isProtocol) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onPointerEnter={tick}
        onClick={() => play(cue)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={style}
      onPointerEnter={tick}
      onClick={() => play(cue)}
    >
      {children}
    </Link>
  );
}
