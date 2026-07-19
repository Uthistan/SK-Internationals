import type { SVGProps } from "react";

type VehicleIconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PlaneIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M4 34 L96 34 L112 27 L96 20 L70 20 L48 4 L38 4 L50 20 L26 20 L16 10 L8 10 L14 22 L4 25 Z" />
        <path d="M46 34 L40 46 L48 46 L54 34" />
        <path d="M64 34 L60 44 L68 44 L72 34" />
      </g>
    </svg>
  );
}

export function ShipIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M6 40 L114 40 L104 52 L16 52 Z" />
        <path d="M20 40 V26 H36 V40" />
        <path d="M40 40 V22 H56 V40" />
        <path d="M60 40 V26 H76 V40" />
        <rect x="82" y="16" width="16" height="24" />
        <path d="M90 16 V6" />
      </g>
    </svg>
  );
}

export function TruckIcon(props: VehicleIconProps) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <rect x="6" y="14" width="70" height="26" />
        <path d="M76 22 H98 L112 34 V40 H76 Z" />
        <circle cx="28" cy="46" r="7" />
        <circle cx="96" cy="46" r="7" />
        <path d="M6 40 H14 M108 40 H112" />
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
