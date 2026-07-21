"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { NAV_LINKS, ROUTES } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useFocusTrap(containerRef, isOpen);

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
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X aria-hidden="true" size={24} />
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col items-center justify-center gap-8 px-6"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  variant="inverse"
                  className={cn("text-h3", isActive && "text-accent!")}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href={ROUTES.contact} onClick={onClose} className="mt-4">
              Get a Consultation
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
