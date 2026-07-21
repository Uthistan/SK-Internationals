import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { INDUSTRIES, type Industry } from "@/content/industries";

function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="group">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
        <Image
          src={industry.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <Heading as="h2" size="h3" className="text-text">
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
        {/* A grid rather than the carousel this used to be: on a page of its
            own, every sector should be visible without a scroll gesture. */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
