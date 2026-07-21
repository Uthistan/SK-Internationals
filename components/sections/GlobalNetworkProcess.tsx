import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowCarousel } from "@/components/ui/ArrowCarousel";
import { WorldMap } from "@/components/ui/WorldMap";
import { RouteTraces } from "@/components/sections/RouteTraces";
import { arcPath, MAP_HEIGHT, MAP_WIDTH, project } from "@/lib/geo";
import { NETWORK_REGIONS, PROCESS_STEPS } from "@/content/process";

// Real coordinates — the map reads as geography, not decoration. The two ports
// are barely 13 units apart in map space, so each label is pushed to its own
// side of the pair; centred beneath both, they overlap outright.
const HUBS = [
  {
    label: "Chennai",
    lat: 13.08,
    lon: 80.27,
    dx: 13,
    dy: -8,
    anchor: "start",
  },
  {
    label: "Tuticorin",
    lat: 8.76,
    lon: 78.13,
    dx: -13,
    dy: 14,
    anchor: "end",
  },
] as const;

// Every corridor is drawn from the primary port of loading, so the map reads
// as "out of Chennai" rather than as an undirected web.
const ORIGIN = project(HUBS[0].lat, HUBS[0].lon);

const CORRIDORS = NETWORK_REGIONS.map((region) => {
  const point = project(region.lat, region.lon);
  return { ...region, point, path: arcPath(ORIGIN, point) };
});

export function GlobalNetworkProcess() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Global Network
          </span>
          <Heading as="h2" size="h2" className="mt-5 text-text">
            A Network That Moves With You
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-5">
            Trusted partnerships across key trade lanes help us move cargo
            reliably between domestic and international markets.
          </Text>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="aspect-2/1 w-full">
            <WorldMap>
              <defs>
                {/* One soft blur merged under the source. Applied to the route
                    group as a whole rather than per path, so the glow costs a
                    single offscreen pass instead of nine. */}
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

              {/* One marker per active region. Names are carried by the chips
                  below rather than repeated on the map, which keeps nine
                  labels from colliding across Europe and the Gulf. */}
              {CORRIDORS.map((region, i) => (
                <g key={region.name}>
                  {/* Each marker breathes on its own offset clock, so the set
                      reads as nine live locations rather than one blinking
                      grid. */}
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="4.5"
                    fill="var(--color-route)"
                    className="animate-route-ping"
                    style={{ animationDelay: `${i * 0.31}s` }}
                  />
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="9"
                    fill="var(--color-route)"
                    opacity="0.15"
                  />
                  <circle
                    cx={region.point.x}
                    cy={region.point.y}
                    r="4.5"
                    fill="var(--color-route)"
                    stroke="var(--color-surface)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}

              {/* Ports of loading: the same marker language as a region, one
                  step larger and named, so origin still reads as origin. */}
              {HUBS.map((hub, i) => {
                const point = project(hub.lat, hub.lon);
                return (
                  <g key={hub.label}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="var(--color-route)"
                      className="animate-route-ping"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="11"
                      fill="var(--color-route)"
                      opacity="0.15"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="var(--color-route)"
                      stroke="var(--color-surface)"
                      strokeWidth="2"
                    />
                    {/* Knocked out of the dot field with a surface-coloured
                        outline drawn under the glyphs, so the name stays
                        legible wherever it falls on the land texture. */}
                    <text
                      x={point.x + hub.dx}
                      y={point.y + hub.dy}
                      textAnchor={hub.anchor}
                      stroke="var(--color-surface)"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className="fill-text text-[19px] font-bold md:text-[14px]"
                    >
                      {hub.label}
                    </text>
                  </g>
                );
              })}
            </WorldMap>
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
