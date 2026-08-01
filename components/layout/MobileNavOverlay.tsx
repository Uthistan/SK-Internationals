"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { isRouteActive, NAV_LINKS, ROUTES } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// The section you are already inside opens itself, so the menu answers "where
// am I" before it answers "where else can I go".
function sectionFor(pathname: string): string | null {
  const current = NAV_LINKS.find(
    (link) => link.children?.length && isRouteActive(pathname, link.href),
  );
  return current?.label ?? null;
}

export function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [expandedLabel, setExpandedLabel] = useState(() => sectionFor(pathname));
  const [renderedFor, setRenderedFor] = useState(pathname);
  useFocusTrap(containerRef, isOpen);

  // Re-derived during render rather than in an effect, so a menu opened right
  // after a navigation never flashes the previous section's disclosure state.
  if (renderedFor !== pathname) {
    setRenderedFor(pathname);
    setExpandedLabel(sectionFor(pathname));
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mobile-nav-glass fixed inset-0 z-40 flex flex-col md:hidden"
        >
          {/* Mirrors the header bar it covers — same height, same gutter, same
              logo size — so nothing shifts under the finger that opened the
              menu. The overlay paints over the real header, which is why the
              mark has to be repeated here rather than left showing through. */}
          <div className="flex h-16 items-center justify-between px-4">
            <NextLink
              href={ROUTES.home}
              onClick={onClose}
              aria-label="SK Internationals Home"
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Image
                src="/logo.png"
                alt=""
                width={320}
                height={182}
                className="h-14 w-auto"
              />
            </NextLink>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X aria-hidden="true" size={24} />
            </button>
          </div>

          {/* Scrolls rather than centres once a section is expanded — fourteen
              service links do not fit a phone screen alongside the five primary
              items. `m-auto` still centres the short, collapsed state without
              clipping the tall one the way justify-center would. */}
          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
          >
            <div className="m-auto flex w-full flex-col items-center gap-8">
              {NAV_LINKS.map((link) => {
                const children = link.children ?? [];
                const isExpanded = expandedLabel === link.label;
                const panelId = `mobile-submenu-${link.label.toLowerCase()}`;

                return (
                  <div
                    key={link.href}
                    className="flex w-full flex-col items-center gap-5"
                  >
                    <div className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                        variant="inverse"
                        className={cn(
                          "text-h3",
                          isRouteActive(pathname, link.href) && "text-accent!",
                        )}
                      >
                        {link.label}
                      </Link>

                      {/* Collapsed by default: expanded, the services list would
                          bury the four primary items under it. The parent link
                          beside this still reaches the section index in one tap,
                          so nothing is hidden behind the disclosure. */}
                      {children.length > 0 && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={panelId}
                          aria-label={`${isExpanded ? "Hide" : "Show"} ${link.label} submenu`}
                          onClick={() =>
                            setExpandedLabel(isExpanded ? null : link.label)
                          }
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            size={20}
                            className={cn(
                              "transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {children.length > 0 && isExpanded && (
                      <ul
                        id={panelId}
                        className="flex w-full flex-col items-center gap-3.5 border-t border-white/10 pt-5"
                      >
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              aria-current={
                                pathname === child.href ? "page" : undefined
                              }
                              variant="inverse"
                              className={cn(
                                "text-body",
                                pathname === child.href && "text-accent!",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              {/* Mirrors the desktop header's single call to action, so the
                  same button leads to the same place at every width. */}
              <Button
                href={ROUTES.requestQuote}
                onClick={onClose}
                className="mt-4"
              >
                Request a Quote
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
