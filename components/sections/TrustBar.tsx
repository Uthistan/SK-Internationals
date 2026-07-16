"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TRUST_ITEMS = [
  "Since 2011",
  "Sea • Air • Surface",
  "India → Gulf → Red Sea → Indian Sub-Continent",
];

export function TrustBar() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { y: 10, start: "top 95%" });

  return (
    <section aria-label="Track record" className="bg-primary py-6 md:py-8">
      <Container>
        <div
          ref={scopeRef}
          className="flex flex-col flex-wrap items-center justify-center gap-2 divide-y divide-white/10 text-center md:flex-row md:gap-0 md:divide-x md:divide-y-0"
        >
          {TRUST_ITEMS.map((item) => (
            <p
              key={item}
              data-reveal
              className="px-6 py-2 text-caption font-semibold tracking-wide text-white/80 uppercase first:pt-0 md:py-0"
            >
              {item}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
