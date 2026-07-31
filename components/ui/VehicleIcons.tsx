import type { SVGProps } from "react";

type VehicleIconProps = SVGProps<SVGSVGElement>;

/**
 * Stroke weight is set against the 60-unit viewBox these are drawn on, not
 * against a 24-unit one. Every caller renders them at `h-4` — a 0.27 scale —
 * so a weight tuned for a 24-grid arrives at roughly a third of a pixel and
 * the glyph disappears entirely.
 *
 * 4.4 is the weight that matches the Lucide icons sitting beside these in the
 * hero feature row and the contact panel (1.75 on a 24-grid is the same 0.073
 * share of the height). Rounded up to 4.5, which holds up better over video.
 *
 * The same constraint governs the drawings: at 16px tall, a shape narrower
 * than about 12 units closes up into a blob, so each glyph carries the fewest
 * parts that still name the vehicle — a container ship is a hull, two boxes,
 * and a mast, and nothing is drawn that a visitor could not resolve.
 */
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PlaneIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        {/* Side-view jet, nose right: fuselage with the tail fin at the rear,
            and the near wing as its own shape below the body. The engine
            nacelles the earlier drawing carried are gone — at 16px they sat
            inside two pixels and only muddied the silhouette. */}
        <path d="M10 40 H100 L114 33 L100 26 H34 L20 8 H12 L18 26 Z" />
        <path d="M56 40 L46 54 H62 L72 40" />
      </g>
    </svg>
  );
}

export function ShipIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        {/* Hull, two stacked containers, one mast. The third container and the
            bridge box are dropped: five deck shapes across 100 units cannot be
            told apart once the icon is 32px wide. */}
        <path d="M8 36 H112 L100 52 H20 Z" />
        <path d="M28 36 V22 H52 V36" />
        <path d="M62 36 V14 H86 V36" />
        <path d="M74 14 V6" />
      </g>
    </svg>
  );
}

export function TruckIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M8 14 H70 V40 H8 Z" />
        <path d="M70 22 H94 L110 36 V40 H70" />
        <circle cx="30" cy="46" r="7" />
        <circle cx="94" cy="46" r="7" />
      </g>
    </svg>
  );
}

export function TrainIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        {/* A locomotive and one wagon. The track running under both is what
            stops it reading as a bus at legend size; wheels are left off for
            the same reason the ship lost its third container. */}
        <path d="M10 12 H60 L76 28 V44 H10 Z" />
        <path d="M24 20 H44 V32 H24 Z" />
        <path d="M88 14 H114 V44 H88 Z" />
        <path d="M4 52 H116" />
      </g>
    </svg>
  );
}

export function ForkliftIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 80 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <rect x="18" y="26" width="30" height="16" />
        <path d="M48 26 L60 26 L60 42 L48 42" />
        <path d="M8 10 V48 M8 48 H26 M8 20 H24" />
        <circle cx="24" cy="48" r="6" />
        <circle cx="52" cy="48" r="6" />
        <path d="M18 30 H2" />
      </g>
    </svg>
  );
}
