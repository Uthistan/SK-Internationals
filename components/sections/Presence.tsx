import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { LOCATIONS, OFFICE_CITY_COUNT } from "@/content/network";

/**
 * The India footprint, as a register rather than a map. A second world map on
 * the site would repeat what the services page already shows; what this page
 * owes a visitor is the plain fact of where the people are — city, role, and
 * what that city actually handles.
 */
export function Presence() {
  return (
    <Section id="presence" className="bg-surface-alt">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Pan India Presence
            </span>
            <Heading as="h2" size="h1" className="mt-5 max-w-sm text-text">
              Local Teams Where Your Cargo Is
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="mt-5 max-w-sm">
              {OFFICE_CITY_COUNT} city offices, plus teams at the ports and in
              Delhi. A shipment out of Tirupur is handled by people in Tirupur,
              not by a call centre reading a file.
            </Text>
          </div>

          <ul className="border-t border-border">
            {LOCATIONS.map((location) => (
              <li
                key={location.city}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1.5 border-b border-border py-5"
              >
                <Heading as="h3" size="h3" className="text-text">
                  {location.city}
                </Heading>
                {/* Role sits on the baseline of the city name at every width;
                    the note drops beneath both, spanning the full row. */}
                <span className="text-caption font-semibold tracking-widest text-accent uppercase">
                  {location.role}
                </span>
                <Text as="p" color="secondary" className="col-span-2">
                  {location.note}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
