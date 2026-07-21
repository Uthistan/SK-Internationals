"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowCarouselProps {
  /** Names the scroll region for screen readers, e.g. "Industries we serve". */
  label: string;
  /** Rendered as the carousel's cards — each child becomes one snap stop. */
  children: React.ReactNode;
  /** Section heading block, laid out on the same row as the arrows. */
  header?: React.ReactNode;
  className?: string;
}

// Width of the fade at an edge that has more content behind it. Fixed px, not
// a percentage: the hint should be the same size on a phone and a 4K display.
const FADE = "2.5rem";

/**
 * Fades only the edges that are actually hiding something. A permanent fade
 * dims the first card while it is fully in view, which costs legibility to
 * signal a scroll that isn't available in that direction.
 */
function edgeMask(fadeStart: boolean, fadeEnd: boolean): string {
  const from = fadeStart ? `transparent 0, black ${FADE}` : "black 0";
  const to = fadeEnd
    ? `black calc(100% - ${FADE}), transparent 100%`
    : "black 100%";

  return `linear-gradient(90deg, ${from}, ${to})`;
}

/**
 * Horizontal, manually-driven card scroller: arrows step one card at a time,
 * and the track stays natively scrollable by wheel, touch, and keyboard.
 */
export function ArrowCarousel({
  label,
  children,
  header,
  className,
}: ArrowCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollBack(track.scrollLeft > 1);
    setCanScrollForward(track.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;

    // One card plus the flex gap, so a step always lands on the next snap point.
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  const mask = edgeMask(canScrollBack, canScrollForward);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        {header}
        <div className="flex shrink-0 gap-3">
          <CarouselButton
            direction="back"
            disabled={!canScrollBack}
            onClick={() => step(-1)}
          />
          <CarouselButton
            direction="forward"
            disabled={!canScrollForward}
            onClick={() => step(1)}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={syncArrows}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4.5 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {children}
      </div>
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "back" | "forward";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "back" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "back" ? "Previous" : "Next"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35"
    >
      <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
    </button>
  );
}
