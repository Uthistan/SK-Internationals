"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface Corridor {
  name: string;
  /** Arc from the port of loading to the region, in map user space. */
  path: string;
}

interface RouteTracesProps {
  corridors: Corridor[];
}

// Offsets each route within the shared 4.5s cycle, so the nine draw in
// sequence instead of sweeping the map in unison.
const STAGGER_SECONDS = 0.25;

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

        return (
          <g key={corridor.name}>
            <path
              d={corridor.path}
              pathLength={1}
              fill="none"
              stroke="var(--color-route)"
              strokeWidth="1"
              strokeLinecap="round"
              className={cn("route-line", hasEntered && "route-line--drawing")}
              style={hasEntered ? { animationDelay: delay } : undefined}
            />

            {/* Mounted only once drawing starts, so the light never sits
                parked at the origin waiting for its cue. */}
            {hasEntered && (
              <circle
                r="2.2"
                fill="var(--color-surface)"
                stroke="var(--color-route)"
                strokeWidth="1.2"
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
