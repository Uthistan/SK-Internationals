import { Fragment } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ROUTES, type InternalHref } from "@/components/layout/nav-links";
import { SITE_URL } from "@/lib/site";

interface Crumb {
  label: string;
  href: InternalHref;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  /** Short label for the breadcrumb — the full title is usually too long. */
  breadcrumb: string;
  route: InternalHref;
  /**
   * Intermediate crumb for a page nested under a section, so the trail reads
   * Home › Services › This Page rather than skipping the section it lives in.
   */
  parent?: Crumb;
  /**
   * Short assurances shown beneath the lead — the answer to "what happens after
   * I write to you", which on a contact page is the question that decides
   * whether anyone writes at all. Facts only: each one must be verifiable.
   */
  assurances?: string[];
}

/**
 * Opening band for every route other than the home page. It carries the single
 * `h1` each page needs, keeps the fixed header clear of the content, and — via
 * `data-header-scrim` — tells the header it may stay transparent on arrival.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumb,
  route,
  parent,
  assurances,
}: PageHeroProps) {
  // Everything ahead of the current page. The current page closes the trail as
  // plain text, so it is appended separately rather than carried here.
  const ancestors: Crumb[] = [
    { label: "Home", href: ROUTES.home },
    ...(parent ? [parent] : []),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...ancestors.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === ROUTES.home ? "" : crumb.href}`,
      })),
      {
        "@type": "ListItem",
        position: ancestors.length + 1,
        name: breadcrumb,
        item: `${SITE_URL}${route}`,
      },
    ],
  };

  return (
    <section
      data-header-scrim
      className="relative isolate flex min-h-[58svh] flex-col justify-end overflow-hidden bg-scrim pt-28 pb-14 md:min-h-[64svh] md:pt-40 md:pb-20"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-secondary/95 via-secondary/75 to-secondary/45"
      />

      <Container className="relative z-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            {ancestors.map((crumb) => (
              <Fragment key={crumb.href}>
                <li>
                  <NextLink
                    href={crumb.href}
                    className="text-caption font-medium text-white/60 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {crumb.label}
                  </NextLink>
                </li>
                <li
                  aria-hidden="true"
                  className="flex items-center text-white/35"
                >
                  <ChevronRight size={14} strokeWidth={2} />
                </li>
              </Fragment>
            ))}
            <li>
              <span
                aria-current="page"
                className="text-caption font-medium text-white/85"
              >
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        <span className="mt-8 block text-caption font-semibold tracking-widest text-accent uppercase">
          {eyebrow}
        </span>
        <Heading as="h1" size="h1" className="mt-4 max-w-3xl text-white">
          {title}
        </Heading>
        <Text as="p" size="body-lg" className="mt-5 max-w-xl text-white/80!">
          {lead}
        </Text>

        {/* Hairline pills rather than filled chips: on the hero these sit over
            photography, and a filled badge there reads as a banner ad. The tick
            is decorative — the sentence beside it carries the meaning. */}
        {assurances && assurances.length > 0 && (
          <ul className="mt-7 flex flex-wrap items-center gap-2.5">
            {assurances.map((assurance) => (
              <li
                key={assurance}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/8 py-2 pr-4 pl-3 text-caption font-medium text-white/85 backdrop-blur-sm"
              >
                <Check
                  aria-hidden="true"
                  size={15}
                  strokeWidth={2.5}
                  className="shrink-0 text-accent"
                />
                {assurance}
              </li>
            ))}
          </ul>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </section>
  );
}
