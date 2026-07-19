"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseScrollRevealOptions {
  y?: number;
  stagger?: number;
  start?: string;
}

export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  selector: string,
  { y = 20, stagger = 0.12, start = "top 85%" }: UseScrollRevealOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !scopeRef.current) return;

      const targets = scopeRef.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.6,
        stagger,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scopeRef.current, start, once: true },
      });
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion] },
  );
}
