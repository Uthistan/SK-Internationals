import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowCarousel } from "@/components/ui/ArrowCarousel";
import { MAP_LABEL_CLASS, WorldMap } from "@/components/ui/WorldMap";
import { MapMarker, MAP_MARKER_RING } from "@/components/ui/MapMarker";
import { MapOriginField } from "@/components/ui/MapOriginField";
import { RouteTraces, type Corridor } from "@/components/sections/RouteTraces";
import {
  PlaneIcon,
  ShipIcon,
  TrainIcon,
  TruckIcon,
} from "@/components/ui/VehicleIcons";
import { CORRIDOR_STYLE } from "@/lib/corridors";
import { arcPath, MAP_VIEW, project } from "@/lib/geo";
import { PROCESS_STEPS } from "@/content/process";
import {
  GATEWAY_CENTROID,
  GATEWAYS,
  gatewayFor,
  NETWORK_REGIONS,
  OVERLAND_GATEWAY,
  type CorridorMode,
} from "@/content/network";

// Every lane leaves the gateway that actually works it — see gatewayFor. The
// map reads as five fans out of one country rather than as two starbursts with
// three decorative dots beside them.
const CORRIDORS: Corridor[] = NETWORK_REGIONS.flatMap((region) => {
  const destination = project(region.lat, region.lon);
  return region.modes.map((mode) => {
    const gateway = gatewayFor(mode, region.lon);
    return {
      name: region.name,
      mode,
      path: arcPath(
        project(gateway.lat, gateway.lon),
        destination,
        CORRIDOR_STYLE[mode].bow,
      ),
    };
  });
});

// One marker per destination, positioned once however many corridors land.
const REGION_POINTS = NETWORK_REGIONS.map((region) => ({
  ...region,
  point: project(region.lat, region.lon),
}));

const GATEWAY_POINTS = GATEWAYS.map((gateway) => ({
  ...gateway,
  point: project(gateway.lat, gateway.lon),
}));

/**
 * A warm bloom under the gateway cluster, centred on the gateways themselves so
 * it cannot drift from them.
 *
 * It does the job five overlapping marker halos were failing at: Chennai and
 * Bengaluru sit seven map units apart, so a halo big enough to make a hub feel
 * like a hub swallowed its neighbour. One field says "the network starts here"
 * and leaves the markers free to be small and precise.
 */
const ORIGIN_FIELD = project(GATEWAY_CENTROID.lat, GATEWAY_CENTROID.lon);

/** Clearance left at both ends of a leader line. */
const LEADER_CLEARANCE = 1.2;

/** Roughly half a cap height, so a leader points at a name and not under it. */
const LABEL_MIDLINE = 4.5;

/** Seconds between hub pulses, so the five never breathe in unison. */
const HUB_PULSE_STAGGER_SECONDS = 0.8;

/**
 * Hairline from a hub marker to its name, relative to the marker. Chennai and
 * Bengaluru are seven map units apart, so an offset label alone does not say
 * which dot owns which name — the leader does.
 */
function leaderTo(dx: number, dy: number) {
  const distance = Math.hypot(dx, dy);
  const ux = dx / distance;
  const uy = dy / distance;

  return {
    x1: ux * (MAP_MARKER_RING + LEADER_CLEARANCE),
    y1: uy * (MAP_MARKER_RING + LEADER_CLEARANCE),
    x2: dx - ux * LEADER_CLEARANCE,
    y2: dy - uy * LEADER_CLEARANCE - LABEL_MIDLINE,
  };
}

const MODE_LEGEND: { mode: CorridorMode; label: string; icon: typeof ShipIcon }[] =
  [
    { mode: "sea", label: "Sea corridors", icon: ShipIcon },
    { mode: "air", label: "Air corridors", icon: PlaneIcon },
    { mode: "land", label: "Land corridors", icon: TruckIcon },
    { mode: "rail", label: "Rail corridors", icon: TrainIcon },
  ];

/** Drawn at map weights: one unit of the swatch is one unit of the map. */
const SWATCH = { width: 44, height: 8 } as const;

const list = (items: string[]) =>
  new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
    items,
  );

const gatewayNames = (mode: "sea" | "air") =>
  list(GATEWAYS.filter((g) => g.mode === mode).map((g) => g.label));

// Composed from the same lists the map draws from, so the description a screen
// reader gets cannot fall out of step with the picture.
const MAP_LABEL = `World map of the SK Internationals shipping network. Sea corridors leave the ${gatewayNames(
  "sea",
)} ports, air corridors the ${gatewayNames(
  "air",
)} freight terminals, and road and rail corridors cross the land borders from ${
  OVERLAND_GATEWAY.label
}, reaching ${list(NETWORK_REGIONS.map((region) => region.name))}.`;

export function GlobalNetworkProcess() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Global Network
          </span>
          <Heading as="h2" size="h2" className="mt-5 text-text">
            Four Corridors, One Shipment File
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-5">
            Sea lanes out of Chennai and Tuticorin. Air corridors out of Delhi,
            Bengaluru, and Mumbai. Road and rail across the land borders into
            Nepal and Bangladesh. Agents we have worked with for years sit at the
            far end, and operations run 24x7 on this side, because cargo clears
            at hours no office keeps.
          </Text>
        </div>

        {/* The panel carries the dark scope, not the SVG: the legend below the
            map takes its swatch colours from the same lane tokens, and the two
            have to resolve on the same ground. */}
        <div className="map-dark mt-12 overflow-hidden rounded-3xl border border-white/10 bg-secondary">
          <div
            className="w-full"
            style={{
              aspectRatio: `${MAP_VIEW.width} / ${MAP_VIEW.height}`,
            }}
          >
            <WorldMap label={MAP_LABEL}>
              <MapOriginField at={ORIGIN_FIELD} />

              <RouteTraces corridors={CORRIDORS} />

              {/* One marker per destination, however many corridors land, and
                  static: fifteen points all pinging at once ranked every place
                  on the map the same. Arrival is told by the lights coming down
                  the sea lanes instead. */}
              {REGION_POINTS.map((region) => (
                <g
                  key={region.name}
                  transform={`translate(${region.point.x},${region.point.y})`}
                >
                  <MapMarker role="destination" />
                  {/* Same knockout treatment as the gateway names, one weight
                      down — destinations must not out-shout the origins. */}
                  <text
                    x={region.dx}
                    y={region.dy}
                    textAnchor={region.anchor}
                    stroke="var(--color-map-halo)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    className={`fill-white/80 font-semibold ${MAP_LABEL_CLASS.region}`}
                  >
                    {region.name}
                  </text>
                </g>
              ))}

              {/* Gateways: the same marker language as a destination, one step
                  larger, named, and breathing. Sea reads as a solid disc —
                  anchored, on the coast. Air reads as a ring with an open
                  centre — lighter, and unmistakably the other network at a
                  glance. Sized so the origin still outranks a destination while
                  the Indian coastline stays visible underneath five of them. */}
              {GATEWAY_POINTS.map((gateway, i) => {
                const leader =
                  gateway.anchor === "middle"
                    ? null
                    : leaderTo(gateway.dx, gateway.dy);

                return (
                  <g
                    key={gateway.label}
                    transform={`translate(${gateway.point.x},${gateway.point.y})`}
                  >
                    <MapMarker
                      role="gateway"
                      mode={gateway.mode}
                      pulseDelay={i * HUB_PULSE_STAGGER_SECONDS}
                    />

                    {leader && (
                      <line
                        {...leader}
                        stroke="var(--color-map-coast)"
                        strokeOpacity="0.3"
                        strokeWidth="0.5"
                        className="hidden md:block"
                      />
                    )}

                    {/* Knocked out of the map with a soft plate drawn under the
                        glyphs, so the name stays legible wherever it falls —
                        over land, over water, or over a lane. */}
                    <text
                      x={gateway.dx}
                      y={gateway.dy}
                      textAnchor={gateway.anchor}
                      stroke="var(--color-map-halo)"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className={`fill-white font-bold ${MAP_LABEL_CLASS.gateway}`}
                    >
                      {gateway.label}
                    </text>
                  </g>
                );
              })}
            </WorldMap>
          </div>

          {/* The lanes are drawn by a client component that waits for the map to
              scroll into view. Without JavaScript that cue never arrives, so the
              routes are handed over already drawn rather than not at all. */}
          <noscript>
            <style>{`.map-lane--draws{stroke-dashoffset:0}.map-lane--fades{opacity:1}`}</style>
          </noscript>

          {/* The legend is what turns four lane treatments into information
              rather than decoration, and it is the one place on the page where
              all four modes are stated as equals in the same breath. Each
              swatch is a line drawn from the same table the map draws from, at
              the same weight and the same dash, so the key cannot drift from
              the lanes it explains — and the icon carries the mode's colour, so
              the row can be matched to the map without reading a word. */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 px-6 py-4 md:px-9">
            {MODE_LEGEND.map(({ mode, label, icon: Icon }) => {
              const style = CORRIDOR_STYLE[mode];
              return (
                <div key={mode} className="flex items-center gap-2.5">
                  <Icon
                    className="h-4 w-auto"
                    style={{ color: style.stroke }}
                  />
                  <span className="text-caption font-medium text-white/70">
                    {label}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox={`0 0 ${SWATCH.width} ${SWATCH.height}`}
                    className="h-2 w-11"
                  >
                    <line
                      x1="1"
                      y1={SWATCH.height / 2}
                      x2={SWATCH.width - 1}
                      y2={SWATCH.height / 2}
                      stroke={style.stroke}
                      strokeWidth={style.width}
                      strokeOpacity={style.opacity}
                      strokeDasharray={style.dash}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/10 px-6 py-6 md:px-9">
            <p className="text-caption font-semibold tracking-widest text-accent uppercase">
              Active Corridors
            </p>
            {/* The one row that names every destination in full, at any
                viewport — which is what lets the map itself drop its labels on
                a phone rather than stacking fifteen names over South Asia. */}
            <div className="mt-3 flex flex-wrap gap-2">
              {NETWORK_REGIONS.map((region) => (
                <span
                  key={region.name}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-caption font-medium text-white/70"
                >
                  {region.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ArrowCarousel
          label="Our process"
          className="mt-24"
          header={
            <div className="max-w-xl">
              <span className="text-caption font-semibold tracking-widest text-accent uppercase">
                Our Process
              </span>
              <Heading as="h2" size="h2" className="mt-5 text-text">
                A Structured, Reliable Partnership
              </Heading>
            </div>
          }
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="w-72 shrink-0 snap-start border-t border-border pt-5"
            >
              <span className="text-caption font-semibold text-accent tabular-nums">
                {step.num}
              </span>
              <Heading as="h3" size="h3" className="mt-3 text-text">
                {step.title}
              </Heading>
              <Text as="p" color="secondary" className="mt-2">
                {step.desc}
              </Text>
            </div>
          ))}
        </ArrowCarousel>
      </Container>
    </Section>
  );
}
