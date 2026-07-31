import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowCarousel } from "@/components/ui/ArrowCarousel";
import { WorldMap } from "@/components/ui/WorldMap";
import { RouteTraces, type Corridor } from "@/components/sections/RouteTraces";
import {
  PlaneIcon,
  ShipIcon,
  TrainIcon,
  TruckIcon,
} from "@/components/ui/VehicleIcons";
import { CORRIDOR_STYLE } from "@/lib/corridors";
import { arcPath, MAP_HEIGHT, MAP_WIDTH, project, type Point } from "@/lib/geo";
import { PROCESS_STEPS } from "@/content/process";
import {
  AIR_GATEWAYS,
  GATEWAYS,
  NETWORK_REGIONS,
  OVERLAND_GATEWAY,
  SEA_GATEWAYS,
  type CorridorMode,
} from "@/content/network";

// Every mode leaves from its own origin, so the map reads as four networks out
// of one country rather than as an undirected web — and no mode looks like an
// afterthought on another's origin. Sea leaves from the primary port of
// loading, air from the primary freight terminal, road and rail from the branch
// that works the land borders.
const OVERLAND_ORIGIN = project(OVERLAND_GATEWAY.lat, OVERLAND_GATEWAY.lon);

const ORIGIN: Record<CorridorMode, Point> = {
  sea: project(SEA_GATEWAYS[0].lat, SEA_GATEWAYS[0].lon),
  air: project(AIR_GATEWAYS[0].lat, AIR_GATEWAYS[0].lon),
  land: OVERLAND_ORIGIN,
  rail: OVERLAND_ORIGIN,
};

const CORRIDORS: Corridor[] = NETWORK_REGIONS.flatMap((region) => {
  const point = project(region.lat, region.lon);
  return region.modes.map((mode) => ({
    name: region.name,
    mode,
    path: arcPath(ORIGIN[mode], point, CORRIDOR_STYLE[mode].bow),
  }));
});

// One marker per destination, positioned once however many corridors land.
const REGION_POINTS = NETWORK_REGIONS.map((region) => ({
  ...region,
  point: project(region.lat, region.lon),
}));

const MODE_LEGEND: { mode: CorridorMode; label: string; icon: typeof ShipIcon }[] =
  [
    { mode: "sea", label: "Sea corridors", icon: ShipIcon },
    { mode: "air", label: "Air corridors", icon: PlaneIcon },
    { mode: "land", label: "Land corridors", icon: TruckIcon },
    { mode: "rail", label: "Rail corridors", icon: TrainIcon },
  ];

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

        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="aspect-2/1 w-full">
            <WorldMap>
              <defs>
                {/* One soft blur merged under the source. Applied to the route
                    group as a whole rather than per path, so the glow costs a
                    single offscreen pass instead of one per corridor. */}
                <filter
                  id="route-glow"
                  filterUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={MAP_WIDTH}
                  height={MAP_HEIGHT}
                >
                  <feGaussianBlur stdDeviation="1.8" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <RouteTraces corridors={CORRIDORS} />

              {/* One marker per destination, however many corridors land.
                  Dots are deliberately small: once each carries a name, the
                  label is what identifies the place and an oversized dot only
                  crowds it. Gateways stay a step larger, which keeps origin
                  reading as origin. */}
              {REGION_POINTS.map((region, i) => (
                <g key={region.name}>
                  {/* Each marker breathes on its own offset clock, so the set
                      reads as live locations rather than one blinking grid. */}
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="2"
                    fill="var(--color-route)"
                    className="animate-route-ping"
                    style={{ animationDelay: `${i * 0.31}s` }}
                  />
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="4.5"
                    fill="var(--color-route)"
                    opacity="0.15"
                  />
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="2"
                    fill="var(--color-route)"
                    stroke="var(--color-surface)"
                    strokeWidth="0.9"
                  />
                  {/* Same knockout treatment as the gateway names, one weight
                      down — destinations must not out-shout the origins. */}
                  <text
                    x={region.point.x + region.dx}
                    y={region.point.y + region.dy}
                    textAnchor={region.anchor}
                    stroke="var(--color-surface)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    className="fill-text-secondary text-[15px] font-semibold md:text-[11px]"
                  >
                    {region.name}
                  </text>
                </g>
              ))}

              {/* Gateways: the same marker language as a region, one step
                  larger and named. Sea reads as a solid disc — anchored,
                  on the coast. Air reads as a ring with an open centre —
                  lighter, and unmistakably the other network at a glance.
                  Sized so the origin still outranks a destination while the
                  Indian coastline stays visible underneath five of them. */}
              {GATEWAYS.map((gateway, i) => {
                const point = project(gateway.lat, gateway.lon);
                const isSea = gateway.mode === "sea";
                return (
                  <g key={gateway.label}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3.6"
                      fill="var(--color-route)"
                      className="animate-route-ping"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="7"
                      fill="var(--color-route)"
                      opacity="0.15"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3.6"
                      fill={isSea ? "var(--color-route)" : "var(--color-surface)"}
                      stroke={isSea ? "var(--color-surface)" : "var(--color-route)"}
                      strokeWidth={isSea ? 1.3 : 1.6}
                    />
                    {/* Knocked out of the dot field with a surface-coloured
                        outline drawn under the glyphs, so the name stays
                        legible wherever it falls on the land texture. */}
                    <text
                      x={point.x + gateway.dx}
                      y={point.y + gateway.dy}
                      textAnchor={gateway.anchor}
                      stroke="var(--color-surface)"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className="fill-text text-[19px] font-bold md:text-[14px]"
                    >
                      {gateway.label}
                    </text>
                  </g>
                );
              })}
            </WorldMap>
          </div>

          {/* The legend is what turns four arc treatments into information
              rather than decoration, and it is the one place on the page where
              all four modes are stated as equals in the same breath. Swatches
              take their colour and weight from the same table the map draws
              from, so the key cannot drift from the lanes it explains. */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border px-6 py-4 md:px-9">
            {MODE_LEGEND.map(({ mode, label, icon: Icon }) => (
              <div key={mode} className="flex items-center gap-2.5">
                <Icon className="h-4 w-auto text-text-secondary" />
                <span className="text-caption font-medium text-text-secondary">
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-10"
                  style={{
                    backgroundColor: CORRIDOR_STYLE[mode].stroke,
                    opacity: CORRIDOR_STYLE[mode].opacity,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="border-t border-border px-6 py-6 md:px-9">
            <p className="text-caption font-semibold tracking-widest text-accent uppercase">
              Active Corridors
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {NETWORK_REGIONS.map((region) => (
                <span
                  key={region.name}
                  className="rounded-full border border-border px-3.5 py-1.5 text-caption font-medium text-text-secondary"
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
