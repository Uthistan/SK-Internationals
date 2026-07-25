"use client";

import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { ROUTES } from "@/components/layout/nav-links";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CTABandProps {
  /**
   * Whether the section directly above the CTA shares its background. When it
   * does (the default across the site), the CTA drops its own top padding so
   * the two don't double the vertical gap between them. Set to false when the
   * preceding section uses a different background — e.g. the Industries grid on
   * bg-surface-alt — so the CTA keeps its top padding and its heading isn't
   * pinned against the colour seam.
   */
  flushWithPrevious?: boolean;
}

export function CTABand({ flushWithPrevious = true }: CTABandProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", {
    start: "top 85%",
    stagger: 0.08,
  });

  return (
    // Terminal band: when it continues the previous section's background, the
    // gap above it is already supplied there, so it drops its own top padding
    // to avoid doubling the rhythm. Across a background seam it keeps that
    // padding so each colour band carries its own breathing room.
    <Section
      spacing={flushWithPrevious ? "flush-top" : "default"}
      className="bg-background"
    >
      <Container>
        <div
          ref={scopeRef}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          <div data-reveal className="max-w-lg">
            <Heading as="h2" size="h1" className="text-secondary">
              Let&rsquo;s Move Your Business Forward
            </Heading>
            <Text as="p" size="body-lg" className="mt-3 text-secondary/90!">
              Partner with SK Internationals and experience logistics backed by
              expertise, transparency, and commitment that lasts.
            </Text>
          </div>

          <ButtonGroup data-reveal className="w-full md:w-auto">
            <Button
              href={ROUTES.contact}
              variant="secondary"
              className="bg-accent! text-white! border-accent! hover:bg-accent/90! hover:text-white!"
            >
              Schedule a Consultation
            </Button>
            <Button
              href={ROUTES.contact}
              variant="secondary"
              className="border-accent! text-accent! hover:border-accent! hover:text-accent!"
            >
              Request a Quote
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </Section>
  );
}
