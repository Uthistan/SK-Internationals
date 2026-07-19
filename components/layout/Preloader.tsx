"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

// Hero entrance timing is synced to this — see components/sections/Hero.tsx.
export const PRELOADER_HOLD_MS = 1400;
const FADE_MS = 500;

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"visible" | "leaving" | "done">("visible");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const hold = setTimeout(() => setPhase("leaving"), PRELOADER_HOLD_MS);
    const done = setTimeout(() => setPhase("done"), PRELOADER_HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(hold);
      clearTimeout(done);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-70 flex flex-col items-center justify-center gap-7 bg-secondary transition-opacity duration-500",
        phase === "leaving" && "pointer-events-none opacity-0",
      )}
    >
      <Image
        src="/logo.png"
        alt=""
        width={256}
        height={146}
        priority
        className="animate-logo-pulse h-20 w-auto"
      />
      <div className="h-0.5 w-45 overflow-hidden rounded-full bg-white/15">
        <div className="animate-load-bar h-full w-full bg-accent" />
      </div>
      <p className="text-caption font-semibold tracking-[0.28em] text-white/55 uppercase">
        Global Trade · Logistics
      </p>
    </div>
  );
}
