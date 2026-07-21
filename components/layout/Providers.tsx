"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { LEGACY_HASH_ROUTES } from "@/components/layout/nav-links";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();

  // Every page opens at the top: the browser's own scroll restoration is
  // disabled before the first paint settles. Kept separate from the Lenis
  // effect below, which opts out under reduced motion — this must run either
  // way.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (!hash) return;

    // Links shared while the site was a single page still carry section
    // hashes. A hash never reaches the server, so it can't be a redirect —
    // resolve it to the route that now owns that section instead of dropping
    // the visitor on the home page with no explanation.
    const legacyRoute = LEGACY_HASH_ROUTES[hash];
    if (legacyRoute) {
      router.replace(legacyRoute);
      return;
    }

    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, [router]);

  // Client-side navigation swaps the page under Lenis, which keeps its own
  // scroll position, and leaves every ScrollTrigger measured against the
  // previous document height.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Faster than the Lenis defaults (lerp 0.1, wheelMultiplier 1): each wheel
    // notch travels further and the easing settles sooner, without losing the
    // smoothing entirely.
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.14,
      wheelMultiplier: 1.35,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    function handleAnchorClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest?.("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100, duration: 0.9 });
      history.pushState(null, "", hash);
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
