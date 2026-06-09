"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const nav = [
  { href: "/abt-me", label: "about" },
  { href: "/experience", label: "experience" },
  { href: "/products", label: "products" },
  { href: "/socials", label: "socials" },
];

export function Header() {
  const pathname = usePathname();
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
      className={`frost sticky top-0 z-40 -mx-5 mb-24 flex items-center justify-between px-5 py-4 text-sm transition-[background-color,border-color] duration-500 sm:-mx-8 sm:mb-32 sm:px-8 ${
        scrolled
          ? "border-b border-white/10 bg-[#0f0f0d]/65"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link
        href="/"
        aria-current={onHome ? "page" : undefined}
        className={`link-grow ${onHome ? "text-stone-100" : "text-stone-400"}`}
      >
        amirlan
      </Link>
      <nav className="flex gap-5 text-stone-400">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`link-grow ${active ? "text-stone-100" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
