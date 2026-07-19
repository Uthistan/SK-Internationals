"use client";

import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NETWORK_REGIONS, PROCESS_STEPS } from "@/content/process";
import { cn } from "@/lib/utils";

// Wireframe globe geometry — sphere centred at (210,150) with radius 110.
// Latitude rings are foreshortened ellipses whose horizontal radius follows
// sqrt(r² - h²), so they sit correctly on the sphere rather than being guessed.
const LATITUDES = [
  { cy: 80, rx: 84.9 },
  { cy: 115, rx: 104.3 },
  { cy: 150, rx: 110 },
  { cy: 185, rx: 104.3 },
  { cy: 220, rx: 84.9 },
];

const MERIDIAN_RX = [82, 50, 18];

// Ellipse expressed as a path so a node can travel it via animateMotion.
const ORBIT_PATH =
  "M58,150 a152,46 0 1,0 304,0 a152,46 0 1,0 -304,0";

const NETWORK_NODES = [
  { x: 140, y: 112 },
  { x: 286, y: 122 },
  { x: 162, y: 196 },
  { x: 272, y: 188 },
  { x: 216, y: 92 },
];

export function GlobalNetworkProcess() {
  const stepsRef = useRef<HTMLDivElement>(null);
  useScrollReveal(stepsRef, "[data-reveal-step]", { start: "top 85%", stagger: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Global Network
            </span>
            <Heading as="h2" size="h2" className="mt-5 text-text">
              A Network That Moves With You
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="mt-5 max-w-md">
              Trusted partnerships across key trade lanes help us move cargo
              reliably between domestic and international markets.
            </Text>

            <div className="relative mt-10 h-96 overflow-hidden rounded-3xl bg-secondary">
              <svg
                viewBox="0 0 420 320"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <defs>
                  <radialGradient id="globe-glow">
                    <stop
                      offset="0%"
                      stopColor="var(--color-accent)"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-accent)"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>

                <circle cx="210" cy="150" r="165" fill="url(#globe-glow)" />

                {/* Sphere wireframe: latitudes are foreshortened ellipses,
                    meridians are ellipses of decreasing horizontal radius. */}
                <g
                  fill="none"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1"
                >
                  <circle
                    cx="210"
                    cy="150"
                    r="110"
                    stroke="rgba(255,255,255,.38)"
                  />
                  {LATITUDES.map(({ cy, rx }) => (
                    <ellipse key={cy} cx="210" cy={cy} rx={rx} ry={rx * 0.26} />
                  ))}
                  {MERIDIAN_RX.map((rx) => (
                    <ellipse key={rx} cx="210" cy="150" rx={rx} ry="110" />
                  ))}
                  <line x1="210" y1="40" x2="210" y2="260" />
                </g>

                {/* Tilted orbit with a travelling cargo node. */}
                <g transform="rotate(-18 210 150)">
                  <path
                    id="network-orbit"
                    d={ORBIT_PATH}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeDasharray="4 9"
                    opacity="0.75"
                  />
                  {!prefersReducedMotion && (
                    <circle r="4.5" fill="var(--color-accent)">
                      <animateMotion
                        dur="9s"
                        repeatCount="indefinite"
                        path={ORBIT_PATH}
                      />
                    </circle>
                  )}
                </g>

                {NETWORK_NODES.map((node) => (
                  <g key={`${node.x}-${node.y}`}>
                    {!prefersReducedMotion && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill="var(--color-accent)"
                        className="animate-route-ping"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      fill="var(--color-accent)"
                    />
                  </g>
                ))}
              </svg>

              <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-secondary via-secondary/80 to-transparent px-6 pt-16 pb-6">
                <p className="text-caption font-semibold tracking-widest text-accent uppercase">
                  Active Corridors
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NETWORK_REGIONS.map((region) => (
                    <span
                      key={region}
                      className="rounded-full border border-white/20 px-3.5 py-1.5 text-caption font-medium text-white/85"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div data-reveal>
              <span className="text-caption font-semibold tracking-widest text-accent uppercase">
                Our Process
              </span>
              <Heading as="h2" size="h2" className="mt-5 text-text">
                A Structured, Reliable Partnership
              </Heading>
            </div>

            <div ref={stepsRef} className="mt-10 flex flex-col">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  data-reveal-step
                  className={cn(
                    "flex gap-6 border-t border-border py-6",
                    i === PROCESS_STEPS.length - 1 && "border-b",
                  )}
                >
                  <span className="shrink-0 text-caption font-semibold text-accent tabular-nums">
                    {step.num}
                  </span>
                  <div>
                    <Heading as="h3" size="h3" className="text-text">
                      {step.title}
                    </Heading>
                    <Text as="p" color="secondary" className="mt-2">
                      {step.desc}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
