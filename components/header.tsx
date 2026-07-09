"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUISound } from "@/components/sound-provider";
import { useHoverTick } from "@/components/interactive";

const nav = [
  { href: "/socials", label: "socials" },
];

export function Header() {
  const pathname = usePathname();
  const play = useUISound();
  const tick = useHoverTick();
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      // Only flip on a real threshold crossing — avoids per-frame state churn
      // and the twitchy flicker of a too-eager trigger near the top.
      const next = window.scrollY > 24;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onHome = pathname === "/";

  return (
    <header
      className={`frost sticky top-0 z-40 -mx-6 mb-14 flex items-center justify-between px-6 py-4 text-[18px] transition-[background-color,border-color] duration-500 sm:-mx-8 sm:mb-20 sm:px-8 ${
        scrolled
          ? "border-b border-[color:var(--color-line)] bg-[color:var(--color-bg)]/78"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link
        href="/"
        aria-current={onHome ? "page" : undefined}
        onPointerEnter={tick}
        onClick={() => play("nav")}
        className={`link-grow ${onHome ? "text-[color:var(--color-fg)]" : "text-[color:var(--color-muted)]"}`}
      >
        amirlan
      </Link>
      <nav className="flex gap-4 text-[color:var(--color-muted)]">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onPointerEnter={tick}
              onClick={() => play("nav")}
              className={`link-grow ${active ? "text-[color:var(--color-fg)]" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
