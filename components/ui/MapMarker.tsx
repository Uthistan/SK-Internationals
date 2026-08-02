import type { GatewayMode } from "@/content/network";

/**
 * Rank on the map. A gateway is somewhere cargo leaves from and gets the
 * layered treatment; a destination is somewhere it arrives and stays a dot.
 */
export type MapMarkerRole = "gateway" | "destination";

interface MapMarkerProps {
  role: MapMarkerRole;
  /**
   * Solid disc for a seaport, open ring for an air terminal — the one piece of
   * visual language both maps share at the marker level. Destinations are
   * always solid, so this is read for gateways only.
   */
  mode?: GatewayMode;
  /**
   * Seconds of offset on the shared pulse cycle, so a cluster of gateways never
   * breathes in unison. Gateways only.
   */
  pulseDelay?: number;
}

/**
 * Marker geometry in map units. Deliberately small: once a point carries a
 * name, the label is what identifies the place and an oversized dot only
 * crowds it. Gateways stay a step larger, which keeps origin reading as origin.
 */
const GEOMETRY: Record<MapMarkerRole, { core: number; ring: number }> = {
  gateway: { core: 3.2, ring: 6.4 },
  destination: { core: 2, ring: 4.4 },
};

/** Ring radius a leader line should start outside of. */
export const MAP_MARKER_RING = GEOMETRY.gateway.ring;

/**
 * A point on either network map, drawn at the origin — callers translate the
 * group into place and own the label beside it.
 *
 * The marker is shared and the label is not, deliberately: the shape carries
 * the same meaning on both maps, while the typography around it belongs to the
 * ground it sits on. Colours resolve through map tokens, so the same component
 * renders correctly on the light panel and on navy.
 */
export function MapMarker({ role, mode, pulseDelay = 0 }: MapMarkerProps) {
  const { core, ring } = GEOMETRY[role];
  const isGateway = role === "gateway";
  const isOpen = isGateway && mode === "air";

  return (
    <g className="map-node">
      <circle
        r={ring}
        fill="var(--color-route)"
        opacity={isGateway ? 0.12 : 0.14}
      />

      {isGateway && (
        <>
          <circle
            r={ring}
            fill="none"
            stroke="var(--color-route)"
            strokeOpacity="0.35"
            strokeWidth="0.6"
          />
          {/* The whole of a hub's motion: one ring out to 2.1x on a four-second
              cycle. A gateway should read as live at the edge of notice, which
              is as much as a logistics map should ever ask for. */}
          <circle
            r={core}
            fill="none"
            stroke="var(--color-route)"
            strokeWidth="0.9"
            className="map-hub-pulse"
            style={{ animationDelay: `${pulseDelay}s` }}
          />
        </>
      )}

      <circle
        r={core}
        fill={isOpen ? "var(--color-map-surface)" : "var(--color-route)"}
        stroke={isOpen ? "var(--color-route)" : "var(--color-map-surface)"}
        strokeWidth={isOpen ? 1.5 : 1.1}
      />
    </g>
  );
}
