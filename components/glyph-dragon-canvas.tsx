"use client";

import { useEffect } from "react";

export function GlyphDragonInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof (window as unknown as { initGlyphDragon?: () => void }).initGlyphDragon === "function") {
        (window as unknown as { initGlyphDragon: () => void }).initGlyphDragon();
      }
    }
  }, []);

  return null;
}
