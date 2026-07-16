"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Plane, Ship, Truck } from "lucide-react";

import { gsap } from "@/lib/gsap-config";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_SERVICES = [
  { icon: Ship, title: "Sea Freight", subtitle: "FCL • LCL" },
  { icon: Plane, title: "Air Freight", subtitle: "Fast & Reliable" },
  { icon: Truck, title: "Surface Logistics", subtitle: "Across Borders" },
];

export function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const servicesCardRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(mediaRef.current, { opacity: 0, duration: 1.1 }, 0)
        .from(sinceRef.current, { y: 12, opacity: 0, duration: 0.4 }, 0.1)
        .from(
          headlineRef.current,
          { y: 24, opacity: 0, duration: 0.6 },
          "-=0.15",
        )
        .from(subheadRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          servicesCardRef.current,
          { y: 16, opacity: 0, duration: 0.5 },
          "-=0.2",
        )
        .from(scrollCueRef.current, { opacity: 0, duration: 0.4 }, "-=0.1");
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <Section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden py-24"
    >
      <div ref={mediaRef} className="absolute inset-0">
        {prefersReducedMotion ? (
          <Image
            src="/hero-port.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <video
            aria-hidden="true"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-port.jpg"
          >
            <source src="/hero-port.mp4" type="video/mp4" />
          </video>
        )}

        {/* dark navy tint for text contrast, brand cohesion over the raw footage */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      <Container>
        <div
          ref={scopeRef}
          className="relative z-10 flex flex-col items-start gap-6 pt-20 md:pt-28"
        >
          {/* <div ref={sinceRef} className="flex items-center gap-3">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Since 2011
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
          </div> */}

          <div ref={headlineRef}>
            <Heading as="h1" size="display" className="max-w-3xl text-white">
              Global freight, <br /> always in motion.
            </Heading>
          </div>

          <div ref={subheadRef}>
            <Text as="p" size="body-lg" className="max-w-xl !text-white/80">
              Reliable sea, air, and surface logistics across the Gulf, Red Sea,
              and Indian Sub-Continent.
            </Text>
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
            <Button href="#contact">Request a Quote</Button>
            <Link href="#contact" variant="accent">
              Partner With Us
            </Link>
          </div>

          <div
            ref={servicesCardRef}
            className="flex flex-wrap items-center divide-x divide-white/20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
          >
            {HERO_SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex items-center gap-3 px-6 py-4"
              >
                <service.icon
                  aria-hidden="true"
                  size={22}
                  className="shrink-0 text-white"
                />
                <div>
                  <p className="text-body font-semibold text-white">
                    {service.title}
                  </p>
                  <p className="text-caption text-white/60">
                    {service.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div
        ref={scrollCueRef}
        aria-hidden="true"
        className="animate-bounce absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={24} />
      </div>
    </Section>
  );
}
