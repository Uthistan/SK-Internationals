"use client";

import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTABand() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", {
    start: "top 85%",
    stagger: 0.08,
  });

  return (
    <Section className="bg-secondary">
      <Container>
        <div
          ref={scopeRef}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          <div data-reveal className="max-w-lg">
            <Heading as="h2" size="h1" className="text-white">
              Let&rsquo;s Move Your Business Forward
            </Heading>
            <Text as="p" size="body-lg" className="mt-3 text-white/90!">
              Partner with SK Internationals and experience logistics backed by
              expertise, transparency, and long-term commitment.
            </Text>
          </div>

          <div data-reveal className="flex flex-wrap gap-3.5">
            <Button
              href="#contact"
              variant="secondary"
              className="bg-accent! text-white!"
            >
              Schedule a Consultation
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              className="border-white/50! text-white! hover:border-accent! hover:text-accent!"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
