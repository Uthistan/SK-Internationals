import { Check } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { WHY_CHOOSE_US } from "@/content/why-choose-us";
import Image from "next/image";

export function WhyChooseSK() {
  return (
    <Section id="why-us" className="bg-background">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Why SK Internationals
            </span>
            <Heading as="h2" size="h1" className="mt-5 max-w-lg text-text">
              Why Businesses Choose SK Internationals
            </Heading>

            <ul className="mt-12 border-t border-border">
              {WHY_CHOOSE_US.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-border py-4.5"
                >
                  <Check
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.5}
                    className="shrink-0 translate-y-0.5 text-accent"
                  />
                  <span className="text-body-lg text-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/forklift.png"
              alt=""
              width={640}
              height={364}
              className="h-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
