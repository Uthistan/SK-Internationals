"use client";

import { useRef } from "react";
import { Anchor, ArrowRight, Building2, Compass, Globe } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LANES = [
  {
    icon: Building2,
    title: "Chennai & Tuticorin, India",
    description: "Home ports and operational bases — every shipment starts here.",
  },
  {
    icon: Anchor,
    title: "Persian & Arabian Gulf",
    description:
      "FCL/LCL sea freight and air cargo into the UAE, Saudi Arabia, and wider Gulf markets.",
  },
  {
    icon: Compass,
    title: "Red Sea",
    description:
      "Multimodal routing supporting Red Sea corridor trade, coordinated end-to-end.",
  },
  {
    icon: Globe,
    title: "Indian Sub-Continent",
    description:
      "Nationwide warehousing, distribution, and inland surface transport across India.",
  },
];

export function TradeLanes() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 80%" });

  return (
    <Section id="trade-lanes" className="bg-surface">
      <Container>
        <div className="flex flex-col items-start gap-3">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Trade Lanes
          </span>
          <Heading as="h2" size="h1" className="max-w-xl text-primary">
            Where we move your cargo.
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="max-w-xl">
            Operated out of Chennai and Tuticorin, India — deep specialization
            across three interconnected lanes, not a diluted worldwide
            promise.
          </Text>
        </div>

        <div
          ref={scopeRef}
          className="mt-12 flex flex-col items-stretch gap-4 md:mt-16 md:flex-row md:items-center"
        >
          {LANES.map((lane, index) => (
            <div
              key={lane.title}
              className="flex flex-1 flex-col items-center gap-4 md:flex-row"
            >
              <Card
                data-reveal
                interactive
                className="flex w-full flex-col items-start gap-3"
              >
                <lane.icon
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.5}
                  className="text-accent"
                />
                <Heading as="h3" size="h3" className="text-primary">
                  {lane.title}
                </Heading>
                <Text as="p" size="caption" color="secondary">
                  {lane.description}
                </Text>
              </Card>

              {index < LANES.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  size={20}
                  className="hidden shrink-0 text-border md:block"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
