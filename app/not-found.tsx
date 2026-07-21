import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Link } from "@/components/ui/Link";
import { NAV_LINKS, ROUTES } from "@/components/layout/nav-links";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    // Carries the header scrim so the fixed nav stays readable here too.
    <section
      data-header-scrim
      className="bg-dot-pattern flex flex-1 flex-col justify-center bg-secondary pt-32 pb-24 md:pt-44 md:pb-32"
    >
      <Container>
        <span className="text-caption font-semibold tracking-widest text-accent uppercase">
          Error 404
        </span>
        <Heading as="h1" size="h1" className="mt-5 max-w-2xl text-white">
          This Route Doesn&rsquo;t Exist
        </Heading>
        <Text as="p" size="body-lg" className="mt-5 max-w-lg text-white/75!">
          The page you were looking for has moved or never shipped. Everything
          else is still where you left it.
        </Text>

        <ButtonGroup className="mt-10">
          <Button href={ROUTES.home}>Back to Home</Button>
          <Button
            href={ROUTES.contact}
            variant="secondary"
            className="border-white/50! text-white! hover:border-accent! hover:text-accent!"
          >
            Contact Us
          </Button>
        </ButtonGroup>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/16 pt-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} variant="inverse">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
