"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseCountUpOptions {
  duration?: number;
}

// IntersectionObserver + rAF rather than GSAP/ScrollTrigger — this only runs
// once per card and never during scroll itself, so it stays off the
// ScrollTrigger budget (see MOTION_GUIDELINES.md).
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  target: number,
  { duration = 1000 }: UseCountUpOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.textContent = String(target);
      return;
    }

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          node.textContent = String(Math.round(target * eased));
          if (progress < 1) rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [ref, target, duration, prefersReducedMotion]);
}
