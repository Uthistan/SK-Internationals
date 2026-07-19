"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/content/services";
import { cn } from "@/lib/utils";

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];

  return (
    <Section id="services" className="bg-surface-alt">
      <Container>
        <div className="max-w-2xl">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            What We Do
          </span>
          <Heading as="h2" size="h1" className="mt-4 text-text">
            Integrated Logistics &amp; Trade Solutions
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-4">
            From transportation and freight forwarding to customs clearance
            and export guidance, our services are built to ensure efficiency,
            reliability, and peace of mind at every stage of your journey.
          </Text>
        </div>

        <div className="mt-16 md:mt-20">
          <div
            id="service-detail-panel"
            role="tabpanel"
            className="relative h-120 overflow-hidden rounded-2xl sm:h-110 sm:rounded-3xl md:h-140"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-secondary/95 via-secondary/35 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.title}-copy`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  <p className="text-caption font-bold tracking-widest text-accent uppercase">
                    {active.num} — {active.tag}
                  </p>
                  <Heading as="h3" size="h1" className="mt-3 max-w-2xl text-white">
                    {active.desc}
                  </Heading>
                  <Text
                    as="p"
                    size="body-lg"
                    className="mt-3 line-clamp-4 max-w-xl text-white/80! sm:line-clamp-none"
                  >
                    {active.body}
                  </Text>
                  <Button href="#contact" className="mt-6">
                    Explore All Services
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Services"
            className="mt-7 flex flex-wrap justify-center gap-2.5"
          >
            {SERVICES.map((service, i) => (
              <button
                key={service.title}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-controls="service-detail-panel"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-caption font-semibold tracking-wide transition-all duration-300",
                  i === activeIndex
                    ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(234,88,12,0.5)]"
                    : "border border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-text",
                )}
              >
                {service.title}
              </button>
            ))}
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="wait">
              {active.items.slice(0, 4).map((item, i) => (
                <motion.div
                  key={`${active.title}-${item}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-border pt-4"
                >
                  <CircleCheck
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.75}
                    className="text-accent"
                  />
                  <p className="mt-3 text-body font-medium text-text">{item}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-3xl bg-secondary p-9 md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <Heading as="h3" size="h2" className="text-white">
              Need a Logistics Solution Tailored to Your Business?
            </Heading>
            <Text as="p" className="mt-2.5 text-white/70!">
              Every business has unique supply chain requirements. Speak with
              our team to discuss your logistics challenges, and we&rsquo;ll
              help you identify the most efficient solution for your
              operations.
            </Text>
          </div>
          <Button href="#contact" className="shrink-0">
            Schedule a Consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
