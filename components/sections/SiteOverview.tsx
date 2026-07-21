import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";
import { ROUTES } from "@/components/layout/nav-links";
import { OVERVIEW_ENTRIES } from "@/content/overview";

/**
 * The home page's route index. Deliberately an editorial list rather than a
 * card grid: three rows of real, countable substance let a visitor self-select
 * a path in one scan instead of reading three near-identical tiles.
 */
export function SiteOverview() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Where to Start
            </span>
            <Heading as="h2" size="h1" className="mt-5 text-text">
              Three Ways Into the Business
            </Heading>
          </div>
          <Text as="p" color="secondary" className="max-w-sm md:pb-2">
            Whatever brought you here — a lane to quote, a sector to serve, or a
            partner to vet — the answer is two clicks away.
          </Text>
        </div>

        <ul className="mt-14 border-t border-border md:mt-20">
          {OVERVIEW_ENTRIES.map((entry) => (
            <li key={entry.num} className="border-b border-border">
              <NextLink
                href={entry.href}
                aria-label={entry.cue}
                className="group flex items-start gap-5 py-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:items-center md:gap-10 md:py-10"
              >
                <span className="mt-1.5 text-caption font-semibold text-accent tabular-nums md:mt-0">
                  {entry.num}
                </span>

                <div className="min-w-0 flex-1">
                  <Heading
                    as="h3"
                    size="h2"
                    className="text-text transition-colors duration-300 group-hover:text-primary"
                  >
                    {entry.title}
                  </Heading>
                  <Text as="p" color="secondary" className="mt-2.5 max-w-xl">
                    {entry.desc}
                  </Text>
                  <span className="mt-3 block text-caption font-semibold tracking-wide text-text-secondary uppercase">
                    {entry.meta}
                  </span>
                </div>

                {/* Photography stays out of the resting state so the list reads
                    as an index; it arrives only on intent. */}
                <div
                  aria-hidden="true"
                  className="hidden h-24 w-40 shrink-0 translate-x-4 overflow-hidden rounded-xl opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                >
                  <Image
                    src={entry.image}
                    alt=""
                    width={320}
                    height={192}
                    sizes="160px"
                    className="h-full w-full object-cover"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white md:mt-0"
                >
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </NextLink>
            </li>
          ))}
        </ul>

        <Text as="p" color="secondary" className="mt-8">
          Already know what you need?{" "}
          <Link href={ROUTES.contact} className="font-medium">
            Tell us about your shipment
          </Link>
          .
        </Text>
      </Container>
    </Section>
  );
}
