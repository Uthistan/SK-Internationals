"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { StatCard } from "@/components/ui/StatCard";
import { MAP_LABEL_CLASS, WorldMap } from "@/components/ui/WorldMap";
import { MapMarker } from "@/components/ui/MapMarker";
import { MapOriginField } from "@/components/ui/MapOriginField";
import { RouteTraces, type Corridor } from "@/components/sections/RouteTraces";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PlaneIcon, ShipIcon, TruckIcon } from "@/components/ui/VehicleIcons";
import { CORRIDOR_STYLE } from "@/lib/corridors";
import { arcPath, MAP_VIEW, project } from "@/lib/geo";
import {
  GATEWAY_CENTROID,
  GATEWAYS,
  gatewayFor,
  LOCATIONS,
  NETWORK_REGIONS,
  OFFICE_CITY_COUNT,
  type CorridorMode,
} from "@/content/network";
import { AFTER_HOURS_NOTE, OFFICE_HOURS } from "@/content/contacts";
import { ABOUT_STATS } from "@/content/about";
import { MAPS_DIRECTIONS_HREF, OFFICE_ADDRESS_LINES } from "@/lib/site";

interface Place {
  city: string;
  /** What the city is to us — the column that stops a branch reading as a port. */
  role: string;
  note: string;
}

/**
 * The footprint as one register. A city that holds both an office and a port
 * desk appears once, with both roles named, rather than twice in two different
 * lists — the old page's five cards made the same city look like two places.
 */
const PLACES: Place[] = (() => {
  const merged = new Map<string, Place>();

  for (const location of LOCATIONS) {
    for (const city of location.city.split(" · ")) {
      const existing = merged.get(city);
      if (existing) {
        existing.role = `${existing.role} · ${location.role}`;
      } else {
        merged.set(city, {
          city,
          role: location.role,
          note: location.note,
        });
      }
    }
  }

  return [...merged.values()];
})();

/**
 * Where the company physically is, then what that footprint has added up to.
 * Offices and tenure answer the same question — "is this real?" — so they are
 * answered once, in one section, rather than in two.
 */
export function ContactOffices() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", {
    start: "top 88%",
    stagger: 0.1,
  });
  return (
    <Section id="offices">
      <Container>
        <div ref={scopeRef}>
          <div data-reveal>
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Our Offices
            </span>
            <Heading
              as="h2"
              size="h1"
              className="mt-5 max-w-3xl text-balance text-text"
            >
              Seven Cities, One Shipment File
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="mt-5">
              Coimbatore holds the file. The desks below work it where your
              cargo is.
            </Text>
          </div>

          <div data-reveal className="mt-16 lg:mt-20">
            {PLACES.map(({ city, role, note }) => (
              <div
                key={city}
                className="grid gap-1.5 border-t border-border py-6 sm:grid-cols-[1fr_0.85fr_1.9fr] sm:items-baseline sm:gap-8 md:py-7"
              >
                <Heading as="h3" size="h3" className="text-text">
                  {city}
                </Heading>
                <p className="text-caption font-semibold tracking-widest text-text-secondary uppercase">
                  {role}
                </p>
                <p className="text-caption text-text-secondary">{note}</p>
              </div>
            ))}

            {/* The registered address closes the register rather than opening
                it: the city list is what a buyer scans, and the street address
                is what the one visitor who is actually driving here needs. */}
            <div className="grid gap-1.5 border-t border-border py-6 sm:grid-cols-[1fr_0.85fr_1.9fr] sm:items-baseline sm:gap-8 md:py-7">
              <Heading as="h3" size="h3" className="text-text">
                Registered
              </Heading>
              <p className="text-caption font-semibold tracking-widest text-text-secondary uppercase">
                Head office
              </p>
              <div>
                <address className="text-caption text-text-secondary not-italic">
                  {OFFICE_ADDRESS_LINES.join(", ")}
                </address>
                <a
                  href={MAPS_DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex items-center gap-1.5 text-caption font-medium text-text transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Get directions
                  <ArrowUpRight
                    aria-hidden="true"
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>

            <div className="grid gap-1.5 border-y border-border py-6 sm:grid-cols-[1fr_0.85fr_1.9fr] sm:items-baseline sm:gap-8 md:py-7">
              <Heading as="h3" size="h3" className="text-text">
                Hours
              </Heading>
              <p className="text-caption font-semibold tracking-widest text-text-secondary uppercase">
                Counter
              </p>
              <div>
                <p className="text-caption text-text-secondary">
                  {OFFICE_HOURS}
                </p>
                <p className="mt-1 text-caption text-text-secondary">
                  {AFTER_HOURS_NOTE}
                </p>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="mt-20 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:mt-24"
          >
            <StatCard
              value={ABOUT_STATS.years.target}
              unit={ABOUT_STATS.years.unit}
              label="Moving cargo for Indian exporters and importers since 2011"
            />
            <StatCard
              value={OFFICE_CITY_COUNT}
              suffix=""
              label="Cities with an office or a port desk of our own"
            />
            {/* Cover, not a count — the suffix carries the second half of the
                figure so the label underneath can stay a sentence. */}
            <StatCard
              value={24}
              suffix="×7"
              label="Customer service through your shipment's transit"
            />
          </div>

          <NetworkBand />
        </div>
      </Container>
    </Section>
  );
}

/**
 * The destinations this band names.
 *
 * A subset of the network map on /services, and deliberately so: this is a
 * reach statement closing a contact page, not the network map itself. Six
 * points across five continents make the global claim in the fewest marks, and
 * leaving the two overland neighbours unnamed keeps the labels off the one
 * part of the map that is already dense.
 */
const BAND_DESTINATIONS = ["USA", "Europe", "Middle East", "Africa", "South East Asia", "Australia"];

/**
 * The gateways this band names. Cargo leaves from all five — the lanes are
 * built by the same gatewayFor rule the /services map uses, so the two graphics
 * cannot disagree about where a corridor starts — but three names over the
 * subcontinent is all this band can carry at its size, and the register
 * directly above it has already named every city we hold.
 */
const BAND_GATEWAYS = ["Chennai", "Tuticorin", "Delhi"];

const BAND_REGIONS = NETWORK_REGIONS.filter((region) =>
  BAND_DESTINATIONS.includes(region.name),
);

// The overland pair, carried without labels. They are what the truck in the
// legend below refers to: drop them and the key names a mode the map never
// draws, which is the contradiction the old band shipped.
const BAND_OVERLAND = NETWORK_REGIONS.filter((region) =>
  region.modes.includes("land"),
);

const BAND_CORRIDORS: Corridor[] = [
  // Read off each region's own modes rather than assumed: the band must never
  // draw a lane the network data does not claim.
  ...BAND_REGIONS.flatMap((region) =>
    region.modes
      .filter((mode) => mode === "sea" || mode === "air")
      .map((mode) => ({ region, mode })),
  ),
  ...BAND_OVERLAND.map((region) => ({ region, mode: "land" as const })),
].map(({ region, mode }) => {
  const gateway = gatewayFor(mode, region.lon);
  return {
    name: region.name,
    mode,
    path: arcPath(
      project(gateway.lat, gateway.lon),
      project(region.lat, region.lon),
      CORRIDOR_STYLE[mode].bow,
    ),
  };
});

const BAND_MARKERS = [
  ...BAND_REGIONS.map((region) => ({ ...region, label: region.name })),
  ...BAND_OVERLAND.map((region) => ({ ...region, label: null })),
].map((region) => ({ ...region, point: project(region.lat, region.lon) }));

const BAND_GATEWAY_POINTS = GATEWAYS.map((gateway) => ({
  ...gateway,
  point: project(gateway.lat, gateway.lon),
  named: BAND_GATEWAYS.includes(gateway.label),
}));

const BAND_ORIGIN = project(GATEWAY_CENTROID.lat, GATEWAY_CENTROID.lon);

/** Seconds between hub pulses, so the gateways never breathe in unison. */
const HUB_PULSE_STAGGER_SECONDS = 0.8;

// Labels are carried for screen readers only — three silhouettes read faster
// than three captions, but a shape alone must never be the sole carrier. Each
// takes its mode's lane colour from the same table the map draws with, so the
// row reads as a key to the picture above it rather than as three ornaments.
const TRANSPORT_MODES: { mode: CorridorMode; label: string; icon: typeof ShipIcon }[] =
  [
    { mode: "sea", label: "Sea freight", icon: ShipIcon },
    { mode: "air", label: "Air freight", icon: PlaneIcon },
    { mode: "land", label: "Road freight", icon: TruckIcon },
  ];

const BAND_MAP_LABEL = `World map of the SK Internationals freight network, with sea, air, and road corridors leaving the Indian gateways for ${BAND_DESTINATIONS.join(
  ", ",
)}.`;

/**
 * The reach statement that closes the page: the corridors drawn on the earth
 * they actually cross, with the modes that serve them named beneath. It follows
 * the register deliberately — the rows above answer where we are, and this
 * answers how far that reaches.
 *
 * The map underneath is the same one /services carries: same projection, same
 * coastline, same lane table, re-pointed onto navy through map tokens. Nothing
 * here is drawn to invented coordinates, which is the whole of the difference
 * between a network and a graphic that looks like one.
 *
 * The caption sits in a bar below the map rather than in a scrim over it. On a
 * gradient the southern half of the world — Africa, Australia, the lanes into
 * both — was being read through the text sitting on top of it.
 */
function NetworkBand() {
  return (
    <div
      data-reveal
      className="map-dark mt-16 w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary"
    >
      {/* Framed to the map's own ratio at every width, exactly as the /services
          panel is. Letterboxing it into a taller box at narrow widths left a
          faint seam where the ocean gradient met the panel navy, and cropping
          to fill would cut the Americas off the left edge — which is the one
          thing a reach statement cannot afford. */}
      <div
        className="w-full"
        style={{ aspectRatio: `${MAP_VIEW.width} / ${MAP_VIEW.height}` }}
      >
        <WorldMap label={BAND_MAP_LABEL}>
          <MapOriginField at={BAND_ORIGIN} />

          <RouteTraces corridors={BAND_CORRIDORS} />

          {BAND_MARKERS.map((region) => (
            <g
              key={region.name}
              transform={`translate(${region.point.x},${region.point.y})`}
            >
              <MapMarker role="destination" />
              {region.label && (
                <text
                  x={region.dx}
                  y={region.dy}
                  textAnchor={region.anchor}
                  stroke="var(--color-map-halo)"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  className={`fill-white/80 font-semibold ${MAP_LABEL_CLASS.region}`}
                >
                  {region.label}
                </text>
              )}
            </g>
          ))}

          {BAND_GATEWAY_POINTS.map((gateway, i) => (
            <g
              key={gateway.label}
              transform={`translate(${gateway.point.x},${gateway.point.y})`}
            >
              <MapMarker
                role="gateway"
                mode={gateway.mode}
                pulseDelay={i * HUB_PULSE_STAGGER_SECONDS}
              />
              {gateway.named && (
                <text
                  x={gateway.dx}
                  y={gateway.dy}
                  textAnchor={gateway.anchor}
                  stroke="var(--color-map-halo)"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  className={`fill-white font-bold ${MAP_LABEL_CLASS.gateway}`}
                >
                  {gateway.label}
                </text>
              )}
            </g>
          ))}
        </WorldMap>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 p-6 md:p-9">
        <div>
          <p className="text-caption font-semibold tracking-widest text-accent uppercase">
            Our Network
          </p>
          <p className="mt-2 max-w-sm text-h3 font-medium text-white">
            Agents at the far end of every lane we ship.
          </p>
        </div>
        <div className="max-w-xs">
          {/* The three legs the corridors above are actually run on, drawn in
              the house set rather than pulled from an icon library, so they sit
              in the same hand as the map — and carrying each mode's own lane
              colour, so the key can be matched to the map without a caption. */}
          <ul className="flex items-center gap-4 md:justify-end">
            {TRANSPORT_MODES.map(({ label, icon: Icon, mode }, i) => (
              <li key={label} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="h-5 w-px bg-white/20" />
                )}
                <Icon
                  className="h-5 w-auto"
                  style={{ color: CORRIDOR_STYLE[mode].stroke }}
                />
                <span className="sr-only">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3.5 text-caption text-white/60 md:text-right">
            Sea, air, and road freight across the Gulf, Red Sea, Europe, the
            Americas, and South East Asia.
          </p>
        </div>
      </div>
    </div>
  );
}
