"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { StatCard } from "@/components/ui/StatCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaneIcon, ShipIcon, TruckIcon } from "@/components/ui/VehicleIcons";
import { LOCATIONS, OFFICE_CITY_COUNT } from "@/content/network";
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
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 88%", stagger: 0.1 });
  const prefersReducedMotion = useReducedMotion();

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

          <NetworkBand prefersReducedMotion={prefersReducedMotion} />
        </div>
      </Container>
    </Section>
  );
}

interface NetworkBandProps {
  prefersReducedMotion: boolean;
}

// Network canvas is authored wide (1200×440) and rendered in a matching
// wide band so the full route geometry stays visible rather than cropping.
// Two origins, not one: every arc used to leave Chennai — a seaport — which
// made even this decorative band argue that we are a sea-only forwarder.
const SEA_ORIGIN = { x: 772, y: 250 };
const AIR_ORIGIN = { x: 742, y: 122 };

const TRADE_ROUTES = [
  { id: "usa", label: "USA", mode: "air", x: 196, y: 168, bow: -120 },
  { id: "europe", label: "Europe", mode: "air", x: 536, y: 116, bow: -78 },
  { id: "middle-east", label: "Middle East", mode: "sea", x: 656, y: 196, bow: -34 },
  { id: "sea", label: "Southeast Asia", mode: "sea", x: 918, y: 296, bow: 38 },
] as const;

// Sea gateways read as filled discs, the air gateway as an open ring — the same
// solid/open distinction the network map on /services uses.
const INDIA_HUBS = [
  { x: SEA_ORIGIN.x, y: SEA_ORIGIN.y, label: "Chennai", mode: "sea" },
  { x: 752, y: 286, label: "Tuticorin", mode: "sea" },
  { x: AIR_ORIGIN.x, y: AIR_ORIGIN.y, label: "Delhi", mode: "air" },
] as const;

// Labels are carried for screen readers only — three silhouettes read faster
// than three captions, but a shape alone must never be the sole carrier.
const TRANSPORT_MODES = [
  { label: "Sea freight", icon: ShipIcon },
  { label: "Air freight", icon: PlaneIcon },
  { label: "Road freight", icon: TruckIcon },
];

/** Quadratic arc from the gateway of the given mode out to a destination. */
function routePath(x: number, y: number, bow: number, mode: "sea" | "air") {
  const origin = mode === "air" ? AIR_ORIGIN : SEA_ORIGIN;
  const mx = (origin.x + x) / 2;
  const my = (origin.y + y) / 2 + bow;
  return `M${origin.x},${origin.y} Q${mx},${my} ${x},${y}`;
}

/**
 * The reach statement that closes the page: four corridors drawn out of the
 * ports of loading, with the modes that serve them named beneath. It follows
 * the register deliberately — the rows above answer where we are, and this
 * answers how far that reaches.
 */
function NetworkBand({ prefersReducedMotion }: NetworkBandProps) {
  return (
    <div
      data-reveal
      className="relative mt-16 aspect-4/3 w-full overflow-hidden rounded-2xl bg-secondary sm:aspect-2/1 lg:aspect-1200/440"
    >
      <div
        aria-hidden="true"
        className="animate-grid-drift absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.10]"
      />

      <svg
        viewBox="0 0 1200 440"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="contact-origin-glow">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity="0.45"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0"
            />
          </radialGradient>
          <linearGradient id="contact-route-fade" x1="0" x2="1">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity="0.15"
            />
            <stop
              offset="55%"
              stopColor="var(--color-accent)"
              stopOpacity="0.85"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0.35"
            />
          </linearGradient>
        </defs>

        <circle
          cx={SEA_ORIGIN.x}
          cy={SEA_ORIGIN.y}
          r="190"
          fill="url(#contact-origin-glow)"
        />

        {TRADE_ROUTES.map((route) => (
          <path
            key={route.id}
            d={routePath(route.x, route.y, route.bow, route.mode)}
            fill="none"
            stroke="url(#contact-route-fade)"
            strokeWidth="1.75"
            strokeDasharray="5 8"
            strokeLinecap="round"
          />
        ))}

        {!prefersReducedMotion &&
          TRADE_ROUTES.map((route, i) => (
            <circle key={route.id} r="4" fill="var(--color-accent)">
              <animateMotion
                dur={`${4.5 + i * 0.7}s`}
                repeatCount="indefinite"
                path={routePath(route.x, route.y, route.bow, route.mode)}
              />
            </circle>
          ))}

        {TRADE_ROUTES.map((route) => (
          <g key={route.id}>
            <circle
              cx={route.x}
              cy={route.y}
              r="4"
              fill="rgba(255,255,255,.9)"
            />
            <circle
              cx={route.x}
              cy={route.y}
              r="10"
              fill="none"
              stroke="rgba(255,255,255,.28)"
            />
            <text
              x={route.x}
              y={route.y - 22}
              textAnchor="middle"
              className="fill-white/75 text-[13px] font-semibold"
            >
              {route.label}
            </text>
          </g>
        ))}

        {INDIA_HUBS.map((hub) => (
          <g key={hub.label}>
            {!prefersReducedMotion && (
              <circle
                cx={hub.x}
                cy={hub.y}
                r="6"
                fill="var(--color-accent)"
                className="animate-route-ping"
              />
            )}
            {/* Filled for a seaport, open for an air gateway — the same
                distinction the /services map makes, so the two graphics teach
                one visual language rather than two. */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r="6"
              fill={
                hub.mode === "sea" ? "var(--color-accent)" : "var(--color-secondary)"
              }
              stroke="var(--color-accent)"
              strokeWidth={hub.mode === "sea" ? 0 : 2.5}
            />
            <text
              x={hub.x}
              y={hub.y + 26}
              textAnchor="middle"
              className="fill-white text-[13px] font-bold"
            >
              {hub.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-linear-to-t from-secondary via-secondary/70 to-transparent p-6 md:p-9">
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
              in the same hand as the map. */}
          <ul className="flex items-center gap-4 md:justify-end">
            {TRANSPORT_MODES.map(({ label, icon: Icon }, i) => (
              <li key={label} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="h-5 w-px bg-white/20" />
                )}
                <Icon className="h-5 w-auto text-white/75" />
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
