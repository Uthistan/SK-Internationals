import type { ReactNode } from "react";

import { MAP_VIEW, MAP_VIEW_BOX, project } from "@/lib/geo";
import { WORLD_LAND_PATH } from "@/components/ui/world-land-path";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  /**
   * What the map as a whole says to a screen reader. Required rather than
   * defaulted: the silhouette is generic, the network drawn on it is not, and
   * a stale description of someone else's routes is worse than none.
   */
  label: string;
  /** Routes and markers, drawn in the same projected coordinate space. */
  children?: ReactNode;
  className?: string;
}

/**
 * Type ramps for names placed on the map, shared by every caller so the two
 * maps label at one scale.
 *
 * Sized as cartography, not as UI copy. A name on a world map is an annotation
 * on a drawing: at UI body sizes "Bengaluru" is 84 map units wide — wider than
 * the entire gateway cluster it belongs to — and five of them bury the
 * subcontinent the map is built around. Every one of these names is also in the
 * copy beside the map, so the map's job is to place them, not to publish them.
 *
 * Labels are sized in CSS pixels inside a 1000-unit viewBox, so their footprint
 * in map space moves inversely with the panel's width — at `md` a name takes
 * half again as much room as it does at `2xl`, which is why one hand-tuned
 * layout used to collide at every width but the one it was tuned at. The ladder
 * tracks the container so a name stays ~15 map units tall throughout, and the
 * offsets in content/network.ts hold everywhere.
 *
 * Below `md` the map is barely 130px tall and a legible label is 55 map units —
 * no layout survives that. The markers stand alone there, and every name is
 * already carried by the copy around the map.
 */
export const MAP_LABEL_CLASS = {
  gateway:
    "hidden md:block md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px]",
  region:
    "hidden md:block md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]",
} as const;

/** Degrees between graticule lines. 30 gives 11 meridians and 5 parallels. */
const GRATICULE_STEP = 30;

const MERIDIANS = Array.from(
  { length: 360 / GRATICULE_STEP - 1 },
  (_, i) => -180 + (i + 1) * GRATICULE_STEP,
);

const PARALLELS = Array.from(
  { length: 180 / GRATICULE_STEP - 1 },
  (_, i) => 90 - (i + 1) * GRATICULE_STEP,
);

/**
 * Real-geography world map on an equirectangular projection. Server-rendered:
 * the silhouette ships as markup, never as client JavaScript.
 *
 * Built in four passes over one coastline path, referenced by `<use>` so the
 * 33KB of path data is sent once and rasterised from a single definition:
 *
 *   1. a graticule under everything, because a grid is what tells the eye it is
 *      looking at a map rather than at a shape;
 *   2. a soft white shelf around every coast, which separates land from water
 *      before any colour difference has to;
 *   3. the landmass itself — near-white, outlined in a navy hairline. The
 *      outline is doing the real work: a continent is recognised by its edge,
 *      and the previous fill-only treatment left the eye reading texture where
 *      it should have been reading geography;
 *   4. the halftone, dropped to a whisper and demoted to what it always should
 *      have been — surface on top of a shape, not the shape itself.
 *
 * The ocean is a gradient rather than a flat tint so the frame has a top and a
 * bottom. It is held under 8% saturation throughout: a map that announces its
 * own background has taken attention that belongs to the routes.
 */
export function WorldMap({ label, children, className }: WorldMapProps) {
  return (
    <svg
      viewBox={MAP_VIEW_BOX}
      role="img"
      aria-label={label}
      className={cn("world-map h-full w-full", className)}
    >
      <defs>
        <linearGradient id="map-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-map-ocean)" />
          <stop offset="1" stopColor="var(--color-map-ocean-deep)" />
        </linearGradient>

        <pattern
          id="map-land-dots"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          {/* Tinted with the brand navy rather than a neutral grey, so the
              landmass still belongs to the palette at this low contrast — and
              inverted to white where the map is drawn on navy. */}
          <circle cx="2.5" cy="2.5" r="0.9" fill="var(--color-map-texture)" />
        </pattern>

        <path id="map-land" d={WORLD_LAND_PATH} />
      </defs>

      <rect
        x={MAP_VIEW.x}
        y={MAP_VIEW.y}
        width={MAP_VIEW.width}
        height={MAP_VIEW.height}
        fill="url(#map-ocean)"
      />

      {/* Drawn beneath the land, so the grid reads as the frame the continents
          sit in rather than as lines ruled across them. */}
      <g
        stroke="var(--color-map-coast)"
        strokeOpacity="0.07"
        strokeWidth="0.4"
        aria-hidden="true"
      >
        {MERIDIANS.map((lon) => {
          const { x } = project(0, lon);
          return (
            <line
              key={`meridian-${lon}`}
              x1={x}
              y1={MAP_VIEW.y}
              x2={x}
              y2={MAP_VIEW.y + MAP_VIEW.height}
            />
          );
        })}
        {PARALLELS.map((lat) => {
          const { y } = project(lat, 0);
          return (
            <line
              key={`parallel-${lat}`}
              x1={MAP_VIEW.x}
              y1={y}
              x2={MAP_VIEW.x + MAP_VIEW.width}
              y2={y}
            />
          );
        })}
      </g>

      <use
        href="#map-land"
        fill="none"
        stroke="var(--color-map-halo)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <use
        href="#map-land"
        fill="var(--color-map-land)"
        stroke="var(--color-map-coast)"
        strokeOpacity="0.4"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <use href="#map-land" fill="url(#map-land-dots)" />

      {children}
    </svg>
  );
}
