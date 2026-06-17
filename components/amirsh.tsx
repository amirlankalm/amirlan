"use client";

import {
  FormEvent,
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { animeGirls } from "@/lib/animegirls";
import { useUISound } from "@/components/sound-provider";

type Line = {
  id: number;
  kind: "input" | "output";
  text: string;
};

const accessCodeHash =
  "679a46aa41d83bfbeb7585ae3203e3f246f02d1d70039471926bdd6d1805e4d5";

const intro: Line[] = [
  { id: 1, kind: "output", text: "amirsh 0.1.0" },
  { id: 2, kind: "output", text: "access code required." },
];

const unlockedIntro: Line[] = [
  { id: 1, kind: "output", text: "amirsh 0.1.0" },
  { id: 2, kind: "output", text: "type help to see commands." },
];

const prompt = "amir@labs:~$";
const lockedPrompt = "access:";

async function sha256Hex(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function runCommand(raw: string) {
  const input = raw.trim().toLowerCase();

  if (!input) {
    return [""];
  }

  if (input === "help") {
    return [
      "commands:",
      "help                 show commands",
      "animegirl <number>   numbers out of 1-5",
      "clear                clear terminal",
      "exit                 close terminal",
    ];
  }

  if (input === "clear") {
    return ["__clear__"];
  }

  if (input === "exit") {
    return ["__exit__"];
  }

  if (input.startsWith("animegirl")) {
    const [, value] = input.split(/\s+/);

    if (!value) {
      return ["usage: animegirl <number>", "available: 1, 2, 3, 4, 5"];
    }

    const index = Number(value);

    if (!Number.isInteger(index) || index < 1 || index > animeGirls.length) {
      return [`not found: ${value}`, "choose a number from 1 to 5."];
    }

    return [animeGirls[index - 1]];
  }

  return [`command not found: ${raw.trim()}`, "try `help`."];
}

export function Amirsh() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>(intro);
  const [position, setPosition] = useState({ x: 28, y: 96 });
  const [size, setSize] = useState({ width: 920, height: 560 });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const resizeRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    width: 920,
    height: 560,
  });
  const nextId = useRef(3);
  const play = useUISound();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // The command palette can summon the terminal.
  useEffect(() => {
    function openFromCommand() {
      setOpen(true);
      play("open");
    }
    window.addEventListener("amirlan:terminal", openFromCommand);
    return () =>
      window.removeEventListener("amirlan:terminal", openFromCommand);
  }, [play]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: reduce ? "auto" : "smooth",
      });
    });
  }, [lines]);

  useEffect(() => {
    function onResize() {
      setPosition((current) => ({
        x: Math.min(current.x, Math.max(window.innerWidth - 360, 16)),
        y: Math.min(current.y, Math.max(window.innerHeight - 260, 16)),
      }));
      setSize((current) => ({
        width: Math.min(current.width, Math.max(window.innerWidth - 24, 360)),
        height: Math.min(current.height, Math.max(window.innerHeight - 24, 260)),
      }));
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active) {
      return;
    }

    setPosition({
      x: Math.min(
        Math.max(event.clientX - dragRef.current.offsetX, 12),
        Math.max(window.innerWidth - size.width - 12, 12),
      ),
      y: Math.min(
        Math.max(event.clientY - dragRef.current.offsetY, 12),
        Math.max(window.innerHeight - size.height - 12, 12),
      ),
    });
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current.active = false;
  }

  function startResize(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      width: size.width,
      height: size.height,
    };
  }

  function moveResize(event: PointerEvent<HTMLDivElement>) {
    if (!resizeRef.current.active) {
      return;
    }

    setSize({
      width: Math.min(
        Math.max(resizeRef.current.width + event.clientX - resizeRef.current.startX, 420),
        Math.max(window.innerWidth - position.x - 12, 420),
      ),
      height: Math.min(
        Math.max(resizeRef.current.height + event.clientY - resizeRef.current.startY, 300),
        Math.max(window.innerHeight - position.y - 12, 300),
      ),
    });
  }

  function endResize(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    resizeRef.current.active = false;
  }

  function append(kind: Line["kind"], text: string) {
    setLines((current) => [
      ...current,
      {
        id: nextId.current++,
        kind,
        text,
      },
    ]);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value;
    setValue("");
    setHistoryIndex(null);

    if (!unlocked) {
      append("input", `${lockedPrompt} ${command ? "********" : ""}`);

      if (!command.trim()) {
        append("output", "access code required.");
        play("deny");
        return;
      }

      const submittedHash = await sha256Hex(command);

      if (submittedHash !== accessCodeHash) {
        append("output", "access denied.");
        play("deny");
        return;
      }

      setUnlocked(true);
      append("output", "access granted.");
      append("output", "type help to see commands.");
      play("grant");
      return;
    }

    append("input", `${prompt} ${command}`);

    if (command.trim()) {
      setHistory((current) => [...current, command]);
      play("submit");
    }

    const output = runCommand(command);

    if (output.includes("__clear__")) {
      setLines(unlockedIntro);
      return;
    }

    if (output.includes("__exit__")) {
      play("close");
      setOpen(false);
      return;
    }

    output.forEach((text) => append("output", text));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (history.length === 0) {
          return null;
        }

        const next = current === null ? history.length - 1 : Math.max(current - 1, 0);
        setValue(history[next] ?? "");
        return next;
      });
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (current === null) {
          return null;
        }

        const next = current + 1;

        if (next >= history.length) {
          setValue("");
          return null;
        }

        setValue(history[next] ?? "");
        return next;
      });
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="open amirsh terminal"
        onClick={() => {
          const next = !open;
          play(next ? "open" : "close");
          setOpen(next);
        }}
        className="press fixed bottom-5 right-5 z-20 border border-white/5 bg-transparent px-2 py-1 font-mono text-[11px] text-stone-500 opacity-60 transition hover:border-white/10 hover:bg-black/40 hover:text-stone-300 hover:opacity-100"
      >
        &gt;_
      </button>

      {open ? (
        <div
          className="term-window fixed z-30 flex flex-col overflow-hidden border border-stone-800 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.86)]"
          style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
        >
          <div
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="flex h-9 cursor-move select-none items-center justify-between border-b border-stone-800 bg-[#111] px-3 font-mono text-xs text-stone-500"
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7a2f27]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#766325]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2f5f3c]" />
            </div>
            <span className="text-stone-400">amirsh - zsh - 120x40</span>
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                play("close");
                setOpen(false);
              }}
              className="cursor-pointer text-stone-600 hover:text-stone-200"
            >
              close
            </button>
          </div>

          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="flex-1 overflow-auto bg-black px-3 py-3 font-mono text-[10px] leading-[1.15] text-[#d7d0c4] [tab-size:2] sm:text-[11px]"
          >
            {lines.map((line) => (
              <pre
                key={line.id}
                className={`whitespace-pre font-mono ${
                  line.kind === "input" ? "text-[#f1eadf]" : ""
                }`}
              >
                {line.text}
              </pre>
            ))}

            <form onSubmit={onSubmit} className="flex min-w-max items-center gap-2">
              <label htmlFor="amirsh-input" className="font-mono text-[#f1eadf]">
                {unlocked ? prompt : lockedPrompt}
              </label>
              <input
                id="amirsh-input"
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={onKeyDown}
                type={unlocked ? "text" : "password"}
                className="w-[36ch] bg-transparent font-mono text-[#f1eadf] caret-[#f1eadf] outline-none"
                autoComplete="off"
                spellCheck={false}
                aria-label={unlocked ? "amirsh command" : "amirsh access code"}
              />
            </form>
          </div>

          <div
            onPointerDown={startResize}
            onPointerMove={moveResize}
            onPointerUp={endResize}
            onPointerCancel={endResize}
            className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
            aria-hidden="true"
          >
            <div className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-stone-600" />
          </div>
        </div>
      ) : null}
    </>
  );
}
