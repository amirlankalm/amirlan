"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Almaty"; // Astana — UTC+5

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * A small, alive line in the hero — local Astana time ticking each second,
 * the way ryo.lu keeps a pulse on the page. Renders nothing until mounted to
 * avoid a server/client time mismatch.
 */
export function LiveStatus() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p
      className="reveal mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-stone-500"
      style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
    >
      <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-stone-400" />
      <span className="uppercase tracking-[0.14em]">astana</span>
      <span aria-hidden className="text-stone-700">
        /
      </span>
      <span
        className="tabular-nums text-stone-400"
        suppressHydrationWarning
        aria-label="current local time in astana"
      >
        {time ?? "--:--:--"}
      </span>
      <span aria-hidden className="text-stone-700">
        /
      </span>
      <span>currently building extensy</span>
    </p>
  );
}
