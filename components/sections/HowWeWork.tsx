"use client";

import { useRef } from "react";
import { CheckCircle2, ClipboardCheck, MessageSquare, Truck } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Request & Quote",
    description:
      "Share your shipment details; we respond within one business day with a clear, itemized quote.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Booking & Documentation",
    description:
      "Your named account contact handles booking, documentation, and customs prep — no fragmented handoffs.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Transit & Visibility",
    description:
      "Track your shipment from origin to destination through our internet-accessible visibility system.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Delivery & Support",
    description:
      "Door-to-door or terminal delivery, confirmed and supported until the shipment is closed.",
  },
];

export function HowWeWork() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 80%" });

  return (
    <Section id="how-we-work">
      <Container>
        <div className="flex flex-col items-start gap-3">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            How We Work
          </span>
          <Heading as="h2" size="h1" className="max-w-xl text-primary">
            No black box, just process.
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="max-w-xl">
            Four steps, one point of contact, full visibility from quote to
            delivery.
          </Text>
        </div>

        <div
          ref={scopeRef}
          className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              data-reveal
              className="relative border-l-2 border-border pl-6 lg:border-l-0 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none block text-h1 font-bold text-primary/10 select-none"
              >
                {step.number}
              </span>
              <step.icon
                aria-hidden="true"
                size={24}
                strokeWidth={1.5}
                className="-mt-8 text-accent lg:-mt-9"
              />
              <Heading as="h3" size="h3" className="mt-3 text-primary">
                {step.title}
              </Heading>
              <Text as="p" size="caption" color="secondary" className="mt-2">
                {step.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
