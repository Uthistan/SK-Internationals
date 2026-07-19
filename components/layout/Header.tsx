"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

const MobileNavOverlay = dynamic(() =>
  import("@/components/layout/MobileNavOverlay").then(
    (mod) => mod.MobileNavOverlay,
  ),
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !isMenuOpen) {
      toggleRef.current?.focus();
    }
    wasOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // The navbar stays fully transparent while any part of the hero is on screen,
  // and only becomes glass once the hero has scrolled completely out of view.
  useEffect(() => {
    const hero = document.getElementById("hero");

    // Routes without a hero (none today, but Header is rendered globally) fall
    // back to switching as soon as the page moves at all.
    if (!hero) {
      const handleScroll = () => setIsScrolled(window.scrollY > 8);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        isScrolled ? "header-glass" : "header-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-full items-center justify-between px-4 md:h-20 md:max-w-180 md:px-6 lg:max-w-240 xl:max-w-300 xl:px-8 2xl:max-w-330">
        <NextLink
          href="/"
          aria-label="SK Internationals — Home"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/logo.png"
            alt=""
            width={320}
            height={182}
            priority
            className="h-10 w-auto md:h-14"
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
              className={cn(
                "group relative text-body font-medium whitespace-nowrap transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isScrolled
                  ? "text-navbar-text/90 hover:text-navbar-text"
                  : "text-white/90 hover:text-white",
              )}
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
                Get a Consultation
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
              isScrolled ? "text-navbar-text" : "text-white",
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
