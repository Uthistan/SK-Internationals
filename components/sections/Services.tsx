"use client";

import { useRef } from "react";
import {
  Boxes,
  FileCheck,
  Plane,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PRIMARY_SERVICES = [
  {
    icon: Ship,
    title: "Sea Freight",
    description:
      "FCL, LCL, and break-bulk shipments — door-to-door or terminal-to-terminal, backed by in-house NVOCC operations.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Time-definite air cargo, airport-to-airport or door-to-door, for shipments that can't wait.",
  },
];

const SUPPORTING_SERVICES = [
  {
    icon: Truck,
    title: "Surface Logistics",
    description:
      "Cross-border surface transport and groupage services connecting inland origins to port.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Nationwide warehousing and distribution across India, including cross-dock programs.",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "In-house customs brokerage so shipments clear without delay.",
  },
  {
    icon: Boxes,
    title: "Project Cargo",
    description:
      "Over-dimensional and project cargo, managed end-to-end with full accountability.",
  },
];

export function Services() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]");

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col items-start gap-3">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Services
          </span>
          <Heading as="h2" size="h1" className="max-w-xl text-primary">
            One operator, every mode.
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="max-w-xl">
            Sea, air, and surface freight, plus warehousing and customs —
            coordinated by a single team, not handed between vendors.
          </Text>
        </div>

        <div ref={scopeRef} className="mt-12 flex flex-col gap-6 md:mt-16">
          <div className="grid gap-6 md:grid-cols-2">
            {PRIMARY_SERVICES.map((service) => (
              <Card
                key={service.title}
                data-reveal
                interactive
                className="flex flex-col gap-4 transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.03]"
              >
                <service.icon
                  aria-hidden="true"
                  size={36}
                  strokeWidth={1.5}
                  className="text-accent"
                />
                <Heading as="h3" size="h3" className="text-primary">
                  {service.title}
                </Heading>
                <Text as="p" color="secondary">
                  {service.description}
                </Text>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORTING_SERVICES.map((service) => (
              <Card
                key={service.title}
                data-reveal
                interactive
                className="flex flex-col gap-3 transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.03]"
              >
                <service.icon
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.5}
                  className="text-accent"
                />
                <Heading as="h3" size="h3" className="text-primary">
                  {service.title}
                </Heading>
                <Text as="p" size="caption" color="secondary">
                  {service.description}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
