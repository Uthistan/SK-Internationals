"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const MobileNavOverlay = dynamic(() =>
  import("@/components/layout/MobileNavOverlay").then(
    (mod) => mod.MobileNavOverlay,
  ),
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !isMenuOpen) {
      toggleRef.current?.focus();
    }
    wasOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-6">
      <div
        className={cn(
          "header-glass relative mx-auto flex h-20 max-w-6xl items-center justify-between rounded-full px-4 md:px-6",
          scrolled && "header-glass--scrolled",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-linear-to-b from-white/20 via-white/[0.03] to-transparent"
        />

        <NextLink
          href="/"
          aria-label="SK Internationals — Home"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/logo-sk.png"
            alt=""
            width={320}
            height={182}
            priority
            className="h-22 w-auto"
          />
        </NextLink>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className="group relative text-body font-medium whitespace-nowrap text-navbar-text/90 transition-colors hover:text-navbar-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            </NextLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button href="#contact" className="rounded-full!">
              <span className="inline-flex items-center gap-2">
                Request a Quote
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navbar-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
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
