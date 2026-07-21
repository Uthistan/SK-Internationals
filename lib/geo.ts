/**
 * Equirectangular projection for the world map SVG, whose viewBox is the full
 * plate carrée frame: x spans −180°…180° and y spans 90°…−90°.
 */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 500;

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
