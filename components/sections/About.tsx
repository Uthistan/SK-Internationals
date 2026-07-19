import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { StatCard } from "@/components/ui/StatCard";
import { ABOUT_HIGHLIGHTS, ABOUT_PARAGRAPHS, ABOUT_STATS } from "@/content/about";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Who We Are
            </span>
            <Heading as="h2" size="h1" className="mt-5 max-w-md text-text">
              More Than Logistics. Your Partner in Growth.
            </Heading>
          </div>

          <div>
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <Text
                key={paragraph.slice(0, 24)}
                as="p"
                size={i === 0 ? "body-lg" : "body"}
                color={i === 0 ? "primary" : "secondary"}
                className={cn("max-w-2xl", i > 0 && "mt-5")}
              >
                {paragraph}
              </Text>
            ))}

            <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              <StatCard
                value={ABOUT_STATS.years.target}
                label={ABOUT_STATS.years.label}
              />
              <StatCard
                value={ABOUT_STATS.experience.target}
                label={ABOUT_STATS.experience.label}
              />
              <StatCard
                value={ABOUT_STATS.businesses.target}
                label={ABOUT_STATS.businesses.label}
              />
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {ABOUT_HIGHLIGHTS.map((highlight) => (
                <div key={highlight.title}>
                  <Heading as="h3" size="h3" className="text-text">
                    {highlight.title}
                  </Heading>
                  <Text as="p" color="secondary" className="mt-2.5">
                    {highlight.desc}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
