"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const DIFFERENTIATORS = [
  {
    title: "Since 2011",
    description:
      "Over a decade operating as both freight forwarder and NVOCC — not a broker reselling someone else's capacity.",
  },
  {
    title: "End-to-end logistics",
    description:
      "Sea, air, surface, warehousing, and customs handled under one roof, one point of contact.",
  },
  {
    title: "Multi-modal transportation",
    description:
      "Multimodal routing across sea, air, and surface, coordinated as a single door-to-door movement.",
  },
  {
    title: "Global reach, local execution",
    description:
      "Deep specialization across the Gulf, Red Sea, and Indian Sub-Continent — not a diluted ‘ship anywhere’ promise.",
  },
  {
    title: "Reliable execution",
    description:
      "Core capabilities managed in-house, not subcontracted — accountability stays with one operator, start to finish.",
  },
];

export function WhyChooseSK() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 80%" });

  return (
    <Section id="why-us" className="bg-surface">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-start gap-3">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Why SK Internationals
            </span>
            <Heading as="h2" size="h1" className="max-w-md text-primary">
              A partner, not a broker.
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="max-w-md">
              Core capabilities managed in-house, not subcontracted — so
              accountability never gets lost between vendors.
            </Text>
          </div>

          <div ref={scopeRef} className="flex flex-col">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="flex gap-4 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-accent"
                />
                <div>
                  <Heading as="h3" size="h3" className="text-primary">
                    {item.title}
                  </Heading>
                  <Text as="p" size="caption" color="secondary" className="mt-1">
                    {item.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
