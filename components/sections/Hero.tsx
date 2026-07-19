"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Globe, Shield, Zap } from "lucide-react";

import { gsap } from "@/lib/gsap-config";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { HeroScene } from "@/components/sections/HeroScene";
import { PRELOADER_HOLD_MS } from "@/components/layout/Preloader";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_FEATURES = [
  { label: "Customer Focused", icon: Shield },
  { label: "Reliable Operations", icon: Zap },
  { label: "End-to-End Logistics", icon: Globe },
];

export function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) videoRef.current?.pause();
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Entrance beats start as the preloader begins fading out.
      gsap
        .timeline({
          delay: PRELOADER_HOLD_MS / 1000 - 0.1,
          defaults: { ease: "power2.out" },
        })
        .from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.5 }, 0)
        .from(
          headlineRef.current,
          { y: 24, opacity: 0, duration: 0.6 },
          0.3,
        )
        .from(subheadRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(featuresRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(scrollCueRef.current, { opacity: 0, duration: 0.4 }, "-=0.1");

      // Cinematic exit: content drifts up and fades as the visitor scrolls
      // past the hero, giving the marquee band a clean handoff.
      const section = scopeRef.current?.closest("section");
      if (section) {
        gsap.to(scopeRef.current, {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "75% top",
            scrub: true,
          },
        });
      }
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <Section
      id="hero"
      className="relative flex min-h-[90dvh] flex-col justify-end overflow-hidden bg-secondary py-16"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-port.jpg"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-port.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-secondary/95 via-secondary/70 to-secondary/40"
      />

      <HeroScene />

      <Container>
        <div
          ref={scopeRef}
          className="relative z-10 flex flex-col items-start gap-6"
        >
          <div ref={eyebrowRef}>
            <span className="text-caption font-semibold tracking-widest text-white/70 uppercase">
              SK Internationals · Est. 2011
            </span>
          </div>

          <div ref={headlineRef}>
            <Heading as="h1" size="display" className="max-w-3xl text-white">
              Powering Businesses Through <br /> Reliable Logistics
            </Heading>
          </div>

          <div ref={subheadRef}>
            <Text as="p" size="body-lg" className="max-w-xl text-white/80!">
              From domestic transportation to international export
              solutions, SK Internationals delivers seamless logistics with
              reliability, transparency, and a commitment to long-term
              partnerships.
            </Text>
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button href="#contact">Get a Free Consultation</Button>
            <Button
              href="#services"
              variant="secondary"
              className="border-white/50! text-white! hover:border-accent! hover:text-accent!"
            >
              Explore Our Services
            </Button>
          </div>

          <div
            ref={featuresRef}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/16 pt-6"
          >
            {HERO_FEATURES.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.75}
                  className="shrink-0 text-accent"
                />
                <p className="text-body font-medium text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div
        ref={scrollCueRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/70 lg:block"
      >
        <ChevronDown size={24} />
      </div>
    </Section>
  );
}
