/**
 * How each corridor mode is drawn on the network map.
 *
 * One table rather than per-component constants: the arcs, the travelling
 * lights, and the legend swatches all read from here, so a mode can never be
 * shown one way on the map and another way in the key beneath it.
 */

import type { CorridorMode } from "@/content/network";

export interface CorridorStyle {
  /** Stroke colour — a design token reference, never a literal. */
  stroke: string;
  width: number;
  opacity: number;
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
  /** Radius of the light that rides the head of the line as it draws. */
  pulseRadius: number;
}

/**
 * Two colour families, because four lanes cannot be told apart by weight alone.
 * The long-haul networks carry the route orange; the overland modes are drawn
 * in muted navy — the colour of the land itself, and a rank below the sea and
 * air lanes that carry most of the volume.
 *
 * Within each family the bow does the separating, and it is literal rather than
 * decorative: a flight climbs, a sea lane follows the surface, and a truck hugs
 * the ground — road is the flattest lane on the map.
 *
 * Rail is the exception, and deliberately so. It runs to the same two countries
 * as road, over spans of 20-40 map units, where a proportional bow is worth
 * almost nothing: at gentle values the two lanes landed ~2 units apart and the
 * route glow merged them into a single thick line. Rail is therefore pulled
 * hard the opposite way, which separates the pair by 5-10 units and reads as
 * two lanes at every viewport.
 */
export const CORRIDOR_STYLE: Record<CorridorMode, CorridorStyle> = {
  sea: {
    stroke: "var(--color-route)",
    width: 1.1,
    opacity: 1,
    bow: 0.12,
    pulseRadius: 1.6,
  },
  air: {
    stroke: "var(--color-route)",
    width: 0.75,
    opacity: 0.75,
    bow: 0.34,
    pulseRadius: 1.3,
  },
  land: {
    stroke: "var(--color-text-secondary)",
    width: 1,
    opacity: 0.9,
    bow: 0.02,
    pulseRadius: 1.4,
  },
  rail: {
    stroke: "var(--color-text-secondary)",
    width: 0.6,
    opacity: 0.8,
    bow: -0.55,
    pulseRadius: 1.1,
  },
};
