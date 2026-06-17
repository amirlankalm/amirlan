"use client";

import { SoundProvider } from "@/components/sound-provider";
import { CommandPalette } from "@/components/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      {children}
      <CommandPalette />
    </SoundProvider>
  );
}
