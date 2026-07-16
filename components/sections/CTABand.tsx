"use client";

import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTABand() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 85%", stagger: 0.08 });

  return (
    <Section className="bg-primary">
      <Container>
        <div
          ref={scopeRef}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          <div data-reveal>
            <Heading as="h2" size="h1" className="text-white">
              Let&rsquo;s move your next shipment.
            </Heading>
          </div>

          <Text as="p" size="body-lg" data-reveal className="!text-white/80">
            Get a clear, itemized quote — or talk to us about becoming a
            partner.
          </Text>

          <div
            data-reveal
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Button href="#contact">Request a Quote</Button>
            <Link href="#contact" variant="accent">
              Partner With Us
            </Link>
          </div>

          <Text as="p" size="caption" data-reveal className="!text-white/50">
            We typically respond within one business day.
          </Text>
        </div>
      </Container>
    </Section>
  );
}
