"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSoundControls, useUISound } from "@/components/sound-provider";

type Action = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  hint?: string;
  glyph: React.ReactNode;
  run: () => void;
};

const EMAIL = "amirlan@extensy.dev";

function Glyph({ d, stroke = true }: { d: string; stroke?: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : "none"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const ARROW = "M5 12h14M13 6l6 6-6 6";
const EXTERNAL = "M7 17 17 7M9 7h8v8";
const TERMINAL = "M5 7l4 4-4 4M12 17h7";
const MAIL = "M3 6h18v12H3zM3 7l9 6 9-6";
const SOUND_ON = "M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6";
const SOUND_OFF = "M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6";
const DOT = "M12 6v12M6 12h12";

export function CommandPalette() {
  const router = useRouter();
  const play = useUISound();
  const { enabled, toggle } = useSoundControls();

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setClosing(true);
    play("close");
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setQuery("");
      restoreFocus.current?.focus?.();
    }, 150);
  }, [play]);

  const openPalette = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setClosing(false);
    setQuery("");
    setActive(0);
    setOpen(true);
    play("open");
  }, [play]);

  const actions = useMemo<Action[]>(() => {
    const go = (href: string) => () => router.push(href);
    const out = (href: string) => () =>
      window.open(href, "_blank", "noopener,noreferrer");

    return [
      { id: "home", label: "home", group: "go to", keywords: "index start", glyph: <Glyph d={ARROW} />, run: go("/") },
      { id: "work", label: "work", group: "go to", keywords: "experience background cv resume jobs", glyph: <Glyph d={ARROW} />, run: go("/work") },
      { id: "about", label: "about", group: "go to", keywords: "abt me bio story", glyph: <Glyph d={ARROW} />, run: go("/abt-me") },
      { id: "socials", label: "socials", group: "go to", keywords: "links contact reach", glyph: <Glyph d={ARROW} />, run: go("/socials") },

      {
        id: "terminal",
        label: "open terminal",
        group: "do",
        keywords: "amirsh shell console cli",
        hint: ">_",
        glyph: <Glyph d={TERMINAL} />,
        run: () => window.dispatchEvent(new CustomEvent("amirlan:terminal")),
      },
      {
        id: "email",
        label: copied ? "copied to clipboard" : "copy email",
        group: "do",
        keywords: "mail contact address",
        hint: copied ? undefined : EMAIL,
        glyph: <Glyph d={MAIL} />,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      {
        id: "sound",
        label: enabled ? "mute sound" : "unmute sound",
        group: "do",
        keywords: "audio mute volume toggle",
        glyph: <Glyph d={enabled ? SOUND_OFF : SOUND_ON} />,
        run: toggle,
      },

      { id: "x", label: "x / twitter", group: "elsewhere", keywords: "twitter social", hint: "@amirlankalm", glyph: <Glyph d={EXTERNAL} />, run: out("https://x.com/amirlankalm") },
      { id: "github", label: "github", group: "elsewhere", keywords: "code repo source", hint: "amirlankalm", glyph: <Glyph d={EXTERNAL} />, run: out("https://github.com/amirlankalm") },
      { id: "linkedin", label: "linkedin", group: "elsewhere", keywords: "work professional", glyph: <Glyph d={EXTERNAL} />, run: out("https://www.linkedin.com/in/amirlan-kalmukhan-a02ab4366/") },
    ];
  }, [router, enabled, toggle, copied]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // Keep the active index in range as the result set shrinks.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(results.length - 1, 0)));
  }, [results.length]);

  // Global shortcut: ⌘K / Ctrl+K toggles. Also opens from the footer hint.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          close();
        } else {
          openPalette();
        }
      }
    }
    function onOpenEvent() {
      if (!open) openPalette();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("amirlan:command", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("amirlan:command", onOpenEvent);
    };
  }, [open, close, openPalette]);

  useEffect(() => {
    if (open && !closing) {
      // Focus after the panel paints so the entrance isn't interrupted.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, closing]);

  const runAction = useCallback(
    (action: Action) => {
      play("select");
      action.run();
      // Clipboard/sound toggles stay open for feedback; the rest dismiss.
      if (action.id !== "email" && action.id !== "sound") {
        close();
      }
    },
    [play, close],
  );

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const action = results[active];
      if (action) runAction(action);
      return;
    }
    if (event.key === "Tab") {
      // Trap focus — the palette is the whole world while open.
      event.preventDefault();
      inputRef.current?.focus();
    }
  }

  // Scroll the active row into view on keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  let lastGroup = "";

  return (
    <div
      className={`cmd-root fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[18vh] ${
        closing ? "cmd-closing" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="command palette"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="close command palette"
        tabIndex={-1}
        className="cmd-backdrop frost absolute inset-0 cursor-default bg-black/45"
        onClick={close}
      />

      <div className="cmd-panel relative w-full max-w-[560px] overflow-hidden rounded-xl border border-white/12 bg-[#15140f]/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.4),0_16px_40px_rgba(0,0,0,0.5),0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <Glyph d={DOT} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="type a command or search…"
            aria-label="command palette search"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent py-4 text-[15px] text-stone-100 placeholder:text-stone-600 outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-stone-500 sm:block">
            esc
          </kbd>
        </div>

        <div
          ref={listRef}
          role="listbox"
          aria-label="commands"
          className="max-h-[46vh] overflow-y-auto overscroll-contain p-1.5"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-stone-600">
              nothing matches “{query}”.
            </p>
          ) : (
            results.map((action, index) => {
              const showGroup = action.group !== lastGroup;
              lastGroup = action.group;
              const isActive = index === active;

              return (
                <div key={action.id}>
                  {showGroup ? (
                    <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-600">
                      {action.group}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    data-index={index}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => runAction(action)}
                    onPointerMove={() => setActive(index)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[15px] transition-[background-color,transform] duration-150 active:scale-[0.985] ${
                      isActive ? "bg-white/[0.07] text-stone-100" : "text-stone-400"
                    }`}
                  >
                    <span
                      className={
                        isActive ? "text-stone-200" : "text-stone-600"
                      }
                    >
                      {action.glyph}
                    </span>
                    <span className="flex-1">{action.label}</span>
                    {action.hint ? (
                      <span className="font-mono text-xs text-stone-600">
                        {action.hint}
                      </span>
                    ) : null}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
