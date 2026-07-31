"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { isRouteActive, type NavLink } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

interface NavItemProps {
  link: NavLink;
  /** Header sits over a dark opening band and inverts its own colours. */
  isOverScrim: boolean;
  pathname: string;
}

// The pointer crosses a gap between the trigger and the panel below it. Closing
// on the first pointerleave drops the menu mid-travel.
const CLOSE_DELAY_MS = 140;

// Past this many entries a single column runs off the bottom of the viewport,
// so the panel becomes a directory laid out in columns instead.
const COLUMNS_ABOVE = 6;

function labelClasses(isOverScrim: boolean, isActive: boolean) {
  return cn(
    "group relative text-body font-medium whitespace-nowrap transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    isOverScrim
      ? "text-white/90 hover:text-white"
      : "text-navbar-text/90 hover:text-navbar-text",
    isActive && (isOverScrim ? "text-white" : "text-navbar-text"),
  );
}

/**
 * A single primary-nav entry. Items with `children` render a disclosure panel
 * alongside the parent link, which stays a real destination of its own — the
 * submenu is a shortcut into the section, not a replacement for it.
 *
 * Hover opens it for mouse users, but never alone: an adjacent toggle button
 * carries the same panel for keyboard and touch, per the no-hover-only rule in
 * UX_GUIDELINES.
 */
export function NavItem({ link, isOverScrim, pathname }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [renderedFor, setRenderedFor] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isActive = isRouteActive(pathname, link.href);
  const panelId = `nav-submenu-${link.label.toLowerCase().replace(/\s+/g, "-")}`;

  // A finished navigation must not leave a panel hanging over the new page.
  // Adjusted during render rather than in an effect, so the panel is never
  // painted open on a route it no longer belongs to.
  if (renderedFor !== pathname) {
    setRenderedFor(pathname);
    setIsOpen(false);
  }

  const cancelClose = useCallback(() => {
    if (closeTimer.current === null) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const open = useCallback(() => {
    cancelClose();
    setIsOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const underline = (
    /* The underline is permanent on the current route and grows on hover
       elsewhere — one affordance doing both jobs. */
    <span
      className={cn(
        "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200",
        isActive ? "w-full" : "w-0 group-hover:w-full",
      )}
    />
  );

  if (!link.children?.length) {
    return (
      <NextLink
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={labelClasses(isOverScrim, isActive)}
      >
        {link.label}
        {underline}
      </NextLink>
    );
  }

  const isDirectory = link.children.length > COLUMNS_ABOVE;

  return (
    <div
      className="relative"
      // Touch fires pointerenter on tap, which would open the panel on the way
      // to following the link. Hover is a mouse affordance; the toggle button
      // below serves every other input.
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") open();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onFocus={open}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !isOpen) return;
        setIsOpen(false);
        toggleRef.current?.focus();
      }}
    >
      <div className="flex items-center gap-1">
        <NextLink
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className={labelClasses(isOverScrim, isActive)}
        >
          {link.label}
          {underline}
        </NextLink>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${isOpen ? "Hide" : "Show"} ${link.label} submenu`}
          onClick={() => setIsOpen((wasOpen) => !wasOpen)}
          className={cn(
            "inline-flex h-6 w-5 items-center justify-center rounded transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            isOverScrim
              ? "text-white/70 hover:text-white"
              : "text-navbar-text/70 hover:text-navbar-text",
          )}
        >
          <ChevronDown
            aria-hidden="true"
            size={14}
            strokeWidth={2.25}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Kept mounted so the panel can transition. `invisible` also takes its
          links out of the tab order, and `inert` blocks the pointer and the
          accessibility tree with it. */}
      <div
        id={panelId}
        inert={!isOpen}
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out",
          // Capped against the viewport so the directory can never push the
          // page sideways on a narrow laptop.
          isDirectory ? "w-[min(92vw,32rem)]" : "w-max min-w-48",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="nav-panel-glass overflow-hidden rounded-xl">
          <ul
            className={cn(
              "p-1.5",
              isDirectory ? "grid grid-cols-2" : "flex flex-col",
            )}
          >
            {link.children.map((child) => {
              const isChildActive = pathname === child.href;

              return (
                <li key={child.href}>
                  <NextLink
                    href={child.href}
                    aria-current={isChildActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-caption leading-snug font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                      isChildActive
                        ? "bg-white/12 font-semibold text-accent"
                        : "text-white/85 hover:bg-white/12 hover:text-white",
                    )}
                  >
                    {child.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>

          {/* Touch opens this panel from the chevron, never from the parent
              link, so without this row the section index would be unreachable
              on a tablet. */}
          {isDirectory && (
            <NextLink
              href={link.href}
              className="flex items-center justify-between gap-3 border-t border-white/15 bg-white/8 px-4 py-3 text-caption font-semibold text-white transition-colors hover:bg-white/14 hover:text-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              All {link.label}
              <ArrowRight aria-hidden="true" size={14} />
            </NextLink>
          )}
        </div>
      </div>
    </div>
  );
}
