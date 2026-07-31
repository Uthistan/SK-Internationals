"use client";

import { useEffect, useRef, useState } from "react";

import { CORRIDOR_STYLE } from "@/lib/corridors";
import { cn } from "@/lib/utils";

import type { CorridorMode } from "@/content/network";

export interface Corridor {
  name: string;
  /** Arc from the gateway to the region, in map user space. */
  path: string;
  /**
   * Which network the corridor belongs to. Colour, weight, and the direction
   * of the bow are what tell the four modes apart — a dash pattern is
   * unavailable because `.route-line` already spends stroke-dasharray on the
   * draw-on animation. See CORRIDOR_STYLE for the treatment per mode.
   */
  mode: CorridorMode;
}

interface RouteTracesProps {
  corridors: Corridor[];
}

// Offsets each route within the shared 4.5s cycle so they draw in sequence
// rather than sweeping the map in unison. Kept small enough that the last
// corridor still starts inside one cycle at the current corridor count.
const STAGGER_SECONDS = 0.2;

/**
 * Route overlay for the network map, drawn on when the map first comes into
 * view rather than on page load — the map sits well below the fold, so a
 * load-time animation would be over before anyone saw it.
 *
 * Deliberately the only client component in this map: keeping it separate from
 * `WorldMap` leaves the 33KB land silhouette server-rendered instead of
 * shipping it in the bundle.
 */
export function RouteTraces({ corridors }: RouteTracesProps) {
  const groupRef = useRef<SVGGElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Observe the <svg>, not the group: a group of fully-retracted paths can
    // measure as an empty box and never report an intersection.
    const target = group.ownerSVGElement ?? group;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <g ref={groupRef} filter="url(#route-glow)">
      {corridors.map((corridor, index) => {
        const delay = `${index * STAGGER_SECONDS}s`;
        const style = CORRIDOR_STYLE[corridor.mode];

        return (
          <g key={`${corridor.mode}-${corridor.name}`}>
            <path
              d={corridor.path}
              pathLength={1}
              fill="none"
              stroke={style.stroke}
              strokeWidth={style.width}
              strokeOpacity={style.opacity}
              strokeLinecap="round"
              className={cn("route-line", hasEntered && "route-line--drawing")}
              style={hasEntered ? { animationDelay: delay } : undefined}
            />

            {/* Mounted only once drawing starts, so the light never sits
                parked at the origin waiting for its cue. Carries its own
                corridor's colour, so a light on a land lane is never mistaken
                for one on the sea lane crossing beneath it. */}
            {hasEntered && (
              <circle
                r={style.pulseRadius}
                fill="var(--color-surface)"
                stroke={style.stroke}
                strokeWidth="1"
                className="route-pulse"
                style={{
                  offsetPath: `path("${corridor.path}")`,
                  animationDelay: delay,
                }}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
