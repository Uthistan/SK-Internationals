"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FAQS } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FAQ() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Frequently Asked Questions
            </span>
            <Heading as="h2" size="h1" className="mt-5 max-w-sm text-text">
              Answers Before You Ask
            </Heading>
          </div>

          <div className="border-t border-border">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-trigger-${i}`;

              return (
                <div key={faq.q} className="border-b border-border">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-8 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        className={cn(
                          "text-h3 font-medium transition-colors duration-200",
                          isOpen
                            ? "text-text"
                            : "text-text-secondary group-hover:text-text",
                        )}
                      >
                        {faq.q}
                      </span>
                      <Plus
                        aria-hidden="true"
                        size={20}
                        strokeWidth={1.5}
                        className={cn(
                          "mt-1 shrink-0 text-accent transition-transform duration-300 ease-out",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.3,
                          ease: [0.16, 0.8, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 text-body-lg text-text-secondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
