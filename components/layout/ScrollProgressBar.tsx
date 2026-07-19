"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// Plain scroll listener rather than GSAP/ScrollTrigger — this is page chrome,
// not Hero/Timeline/CTA, and a single scaleX transform read is cheap enough
// without it (see MOTION_GUIDELINES.md on keeping GSAP scoped).
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      const progress = Math.min(1, window.scrollY / max);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-60 h-0.75">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-accent"
      />
    </div>
  );
}
