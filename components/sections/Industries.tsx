import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { INDUSTRIES, type Industry } from "@/content/industries";

function IndustryCard({ industry, hidden }: { industry: Industry; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="group w-72 shrink-0"
    >
      <div className="relative h-60 w-full overflow-hidden rounded-2xl">
        <Image
          src={industry.image}
          alt=""
          fill
          sizes="288px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <Heading as="h3" size="h3" className="text-text">
          {industry.name}
        </Heading>
        <p className="mt-2 text-body text-text-secondary">{industry.desc}</p>
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <Section id="industries" className="bg-surface-alt">
      <Container>
        <div className="max-w-xl">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Industries We Serve
          </span>
          <Heading as="h2" size="h1" className="mt-5 text-text">
            Trusted Across Diverse Industries
          </Heading>
        </div>
      </Container>

      <div
        className="marquee mt-16 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="marquee__track flex w-max gap-4.5"
          style={{ animationDuration: "50s" }}
        >
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={`${industry.name}-dup`} industry={industry} hidden />
          ))}
        </div>
      </div>
    </Section>
  );
}
