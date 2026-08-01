"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { NavItem } from "@/components/layout/NavItem";
import { NAV_LINKS, ROUTES } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

const MobileNavOverlay = dynamic(() =>
  import("@/components/layout/MobileNavOverlay").then(
    (mod) => mod.MobileNavOverlay,
  ),
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Every route opens on a dark band — the home hero or a page hero — so the
  // header starts transparent and only turns to glass once that band leaves.
  const [isOverScrim, setIsOverScrim] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (wasOpenRef.current && !isMenuOpen) {
      toggleRef.current?.focus();
    }
    wasOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // Re-runs per route: client-side navigation swaps the scrim element without
  // remounting the header, so a single mount-time observer would keep watching
  // a node that is no longer in the document.
  useEffect(() => {
    const scrim = document.querySelector("[data-header-scrim]");

    // Defensive: a page with no dark opening band sits on a light surface,
    // where transparent chrome would render the nav unreadable.
    if (!scrim) {
      const frame = requestAnimationFrame(() => setIsOverScrim(false));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverScrim(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(scrim);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        isOverScrim ? "header-transparent" : "header-glass",
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-full items-center justify-between px-4 md:h-20 md:max-w-180 md:px-6 lg:max-w-240 xl:max-w-300 xl:px-8 2xl:max-w-330">
        <NextLink
          href={ROUTES.home}
          aria-label="SK Internationals Home"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/logo.png"
            alt=""
            width={320}
            height={182}
            priority
            className="h-14 w-auto md:h-18"
          />
        </NextLink>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              isOverScrim={isOverScrim}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button href={ROUTES.requestQuote} className="rounded-full!">
              <span className="inline-flex items-center gap-2">
                Request Quote
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden",
              isOverScrim ? "text-white" : "text-navbar-text",
            )}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={22} />
            ) : (
              <Menu aria-hidden="true" size={22} />
            )}
          </button>
        </div>
      </div>

      <MobileNavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
