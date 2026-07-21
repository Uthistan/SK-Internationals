import type { ReactNode } from "react";

import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/geo";
import { WORLD_LAND_PATH } from "@/components/ui/world-land-path";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  /** Routes and markers, drawn in the same projected coordinate space. */
  children?: ReactNode;
  className?: string;
}

/**
 * Real-geography world map on an equirectangular projection. Server-rendered:
 * the silhouette ships as markup, never as client JavaScript.
 *
 * Landmasses are drawn as a halftone dot field — a single tiled pattern clipped
 * by the coastline path, so the texture costs one `<circle>` rather than the
 * ~20,000 it would take to place the grid by hand.
 */
export function WorldMap({ children, className }: WorldMapProps) {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="img"
      aria-label="World map marking the regions SK Internationals ships to, alongside its Chennai and Tuticorin hubs"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <pattern
          id="world-land-dots"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          {/* Tinted with the brand navy rather than a neutral grey, so the
              landmass still belongs to the palette at this low contrast. */}
          <circle cx="2.5" cy="2.5" r="1.05" fill="rgba(11,37,69,.24)" />
        </pattern>
      </defs>

      <path d={WORLD_LAND_PATH} fill="url(#world-land-dots)" />
      {children}
    </svg>
  );
}
