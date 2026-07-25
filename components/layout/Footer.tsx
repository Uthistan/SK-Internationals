import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { ROUTES } from "@/components/layout/nav-links";
import { SERVICES } from "@/content/services";
import {
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { ORGANIZATION } from "@/lib/site";

// Every service resolves to the same page until per-service routes exist —
// listing them individually still tells a scanner what we actually do.
const SERVICE_LINKS = SERVICES.map((service) => ({
  label: service.title,
  href: ROUTES.services,
}));

// Rail moves as an integrated mode within our freight and cross border work
// rather than a standalone service, so it is added here by hand and placed
// beside the other transport modes a logistics buyer scans the footer for.
const railInsertAt =
  SERVICE_LINKS.findIndex((l) => l.label === "Cross Border Road Solutions") + 1;
SERVICE_LINKS.splice(railInsertAt, 0, {
  label: "Rail Cargo",
  href: ROUTES.services,
});

const COMPANY_LINKS = [
  { label: "About", href: ROUTES.about },
  { label: "Industries", href: ROUTES.industries },
  { label: "Contact", href: ROUTES.contact },
  { label: "Request a Quote", href: ROUTES.contact },
];

// Two of the three open a conversation rather than a profile, so each carries
// its own aria-label: the icon alone doesn't say who is being contacted.
const SOCIAL_LINKS = [
  {
    label: "SK Internationals on LinkedIn",
    href: ORGANIZATION.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: `Email SK Internationals at ${ORGANIZATION.email}`,
    href: `mailto:${ORGANIZATION.email}`,
    icon: MailIcon,
    external: false,
  },
  {
    label: "Message SK Internationals on WhatsApp",
    href: `https://wa.me/${ORGANIZATION.whatsapp}`,
    icon: WhatsAppIcon,
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dot-pattern relative overflow-hidden bg-secondary">
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div className="flex flex-col items-start gap-6">
            <Image
              src="/logo.png"
              alt="SK Internationals"
              width={256}
              height={146}
              className="h-20 w-auto"
            />

            <Heading as="h4" size="h3" className="max-w-sm text-white">
              Powering Businesses Through Reliable Logistics
            </Heading>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>

            <Text as="p" size="caption" className="text-white/40!">
              © {year} SK Internationals. All rights reserved.
            </Text>
          </div>

          <nav aria-label="Services">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent! uppercase"
            >
              Our Services
            </Text>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70! hover:text-accent!">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent! uppercase"
            >
              Quick Links
            </Text>
            <ul className="mt-4 flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70! hover:text-accent!">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
