import type { Point } from "@/lib/geo";

interface MapOriginFieldProps {
  /** Centre of the gateway cluster, in map user space. */
  at: Point;
  /** Radius in map units. */
  radius?: number;
}

/**
 * A warm bloom under the gateway cluster.
 *
 * It does the job five overlapping marker halos were failing at: Chennai and
 * Bengaluru sit seven map units apart, so a halo big enough to make a hub feel
 * like a hub swallowed its neighbour. One field says "the network starts here"
 * and leaves the markers free to be small and precise — and it is the first
 * thing the eye lands on, which is how the map answers "where do you ship
 * from?" before a single lane has been followed.
 */
export function MapOriginField({ at, radius = 72 }: MapOriginFieldProps) {
  return (
    <>
      <defs>
        {/* Held low and pulled in tight. A field wide or warm enough to be
            noticed on its own washes out the coastline underneath it, and the
            one coastline this map cannot afford to lose is the one the whole
            network leaves from. */}
        <radialGradient id="map-origin-field">
          <stop offset="0" stopColor="var(--color-route)" stopOpacity="0.17" />
          <stop
            offset="0.5"
            stopColor="var(--color-route)"
            stopOpacity="0.05"
          />
          <stop offset="1" stopColor="var(--color-route)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={at.x} cy={at.y} r={radius} fill="url(#map-origin-field)" />
    </>
  );
}
