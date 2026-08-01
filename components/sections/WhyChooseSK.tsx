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
        {/* Each claim now carries a line of proof, so the column is roughly twice
            the height it was. The photograph sticks rather than centring against
            it — centred, it floated in dead space beside the middle two rows. */}
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
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
                  key={item.title}
                  className="flex items-start gap-4 border-b border-border py-5"
                >
                  <Check
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.5}
                    className="mt-1.5 shrink-0 text-accent"
                  />
                  <div>
                    <p className="text-body-lg font-medium text-text">
                      {item.title}
                    </p>
                    <p className="mt-1 text-body text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait crop so the photograph holds its own against the seven
              claims beside it, rather than floating as a spot illustration. */}
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl lg:sticky lg:top-32 lg:aspect-3/4">
            <Image
              src="/images/sections/why-choose-us.jpg"
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
                Operating Hours
              </p>
              <p className="mt-1.5 text-body font-medium text-white">
                24x7, because cargo doesn&rsquo;t wait
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
