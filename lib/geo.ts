/**
 * Equirectangular projection for the world map SVG, whose viewBox is the full
 * plate carrée frame: x spans −180°…180° and y spans 90°…−90°.
 */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 500;

/**
 * The slice of the projection actually drawn. The plate runs pole to pole, but
 * Antarctica is not in the land data and nothing in the network reaches beyond
 * ±58°, so the full frame spends a fifth of its height on empty bands.
 *
 * Cropping them is the cheapest legibility win on the map: at the same
 * container width every lane, marker, and label lands 25% larger, which is also
 * what buys the label layout enough room to stop colliding.
 */
export const MAP_VIEW = {
  x: 0,
  y: 12,
  width: MAP_WIDTH,
  height: 400,
} as const;

export const MAP_VIEW_BOX = `${MAP_VIEW.x} ${MAP_VIEW.y} ${MAP_VIEW.width} ${MAP_VIEW.height}`;

export interface Point {
  x: number;
  y: number;
}

export function project(lat: number, lon: number): Point {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((90 - lat) / 180) * MAP_HEIGHT,
  };
}

/**
 * Quadratic arc between two projected points, bowed perpendicular to the line
 * so routes read as flight paths rather than straight rules. `bow` is a share
 * of the span, so the curve stays proportional at any distance.
 */
export function arcPath(from: Point, to: Point, bow = 0.18): string {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Perpendicular offset, always lifting the arc towards the top of the map.
  const controlX = midX + dy * bow;
  const controlY = midY - Math.abs(dx) * bow;

  return `M${from.x},${from.y} Q${controlX},${controlY} ${to.x},${to.y}`;
}
