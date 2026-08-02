/**
 * How each corridor mode is drawn on the network map.
 *
 * One table rather than per-component constants: the arcs, the travelling
 * lights, and the legend swatches all read from here, so a mode can never be
 * shown one way on the map and another way in the key beneath it.
 */

import type { CorridorMode } from "@/content/network";

export interface CorridorHalo {
  /** Width of the soft stroke laid under the lane, in map units. */
  width: number;
  opacity: number;
}

export interface CorridorStyle {
  /** Stroke colour — a design token reference, never a literal. */
  stroke: string;
  width: number;
  opacity: number;
  /** SVG dash pattern in map units. Omitted for a solid lane. */
  dash?: string;
  /**
   * A wider, near-transparent stroke of the same colour drawn beneath the lane.
   * Reads as a glow at a fraction of the cost of a blur filter, which has to
   * re-render an offscreen pass the size of the map on every frame of the draw.
   */
  halo?: CorridorHalo;
  /**
   * Share of the span the arc is bowed by. Sign matters: a negative bow curves
   * the lane the other way, which is the only thing separating road from rail
   * where both run between the same two points.
   *
   * Because the share is proportional, the same number buys far less lift on a
   * short hop than on an ocean crossing — which is why the overland values
   * below look extreme next to the sea and air ones and are not comparable to
   * them.
   */
  bow: number;
  /**
   * The network the section is built around. Exactly one mode holds this, and
   * it is what the whole hierarchy hangs off: the primary lane draws itself on
   * entry, carries the halo and the travelling light, and paints above the
   * other three. Everything else resolves quietly underneath it.
   */
  primary: boolean;
}

/**
 * One warm lane and three cool ones. Sea carries the brand orange because it is
 * the volume the business runs on and the first thing a visitor should see;
 * air, road, and rail are drawn down the navy scale in that order, so the map
 * ranks its own networks before a single word of the legend is read.
 *
 * The palette is deliberately not widened to do this. DESIGN_SYSTEM.md fixes it
 * at orange, white, and navy, so "air blue" is the navy-tinted #3D5878 and the
 * two overland lanes take a lighter and a deeper value off the same scale.
 * Hue alone was never going to carry four modes anyway — each one is separated
 * on three axes at once:
 *
 *   sea   solid, heaviest, glowing, animated
 *   air   dashed, mid weight, static
 *   land  solid, light value, almost flat — a truck hugs the ground
 *   rail  solid, thinnest, deepest value, bowed the opposite way
 *
 * Rail's bow is the one extreme value. It runs to the same two countries as
 * road over spans of 20-40 map units, where a proportional bow is worth almost
 * nothing: at gentle values the two lanes landed ~2 units apart and read as a
 * single thick line. Pulled hard the other way, the pair separates by 5-10
 * units and reads as two lanes at every viewport.
 */
export const CORRIDOR_STYLE: Record<CorridorMode, CorridorStyle> = {
  sea: {
    stroke: "var(--color-route)",
    width: 1.9,
    opacity: 1,
    halo: { width: 5.5, opacity: 0.16 },
    bow: 0.14,
    primary: true,
  },
  air: {
    stroke: "var(--color-route-air)",
    width: 1,
    opacity: 0.9,
    dash: "4 3.5",
    bow: 0.3,
    primary: false,
  },
  land: {
    stroke: "var(--color-route-land)",
    width: 1.1,
    opacity: 1,
    bow: 0.04,
    primary: false,
  },
  rail: {
    stroke: "var(--color-route-rail)",
    width: 0.7,
    opacity: 0.75,
    bow: -0.5,
    primary: false,
  },
};
