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

          {/* Portrait crop so the photograph holds its own against the seven
              claims beside it, rather than floating as a spot illustration. */}
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl lg:aspect-3/4">
            <Image
              src="/images/services/warehousing.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/20 to-transparent"
            />

            <div className="absolute inset-x-5 bottom-5 border-t border-white/20 pt-4 md:inset-x-7 md:bottom-7">
              <p className="text-caption font-semibold tracking-widest text-accent uppercase">
                Operational Bases
              </p>
              <p className="mt-1.5 text-body font-medium text-white">
                Chennai · Tuticorin
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
