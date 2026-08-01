import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ROUTES } from "@/components/layout/nav-links";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SK Internationals | Global B2B Freight & Logistics",
    template: "%s | SK Internationals",
  },
  description:
    "SK Internationals delivers reliable, transparent freight forwarding and logistics across the Gulf, Red Sea, and Indian Subcontinent.",
  alternates: { canonical: ROUTES.home },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: ROUTES.home,
    images: ["/hero-port.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

// Organization details only — nothing here is claimed that the contact section
// doesn't already state on the page.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORGANIZATION.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: ORGANIZATION.foundingDate,
  address: {
    "@type": "PostalAddress",
    addressLocality: ORGANIZATION.addressLocality,
    postalCode: ORGANIZATION.postalCode,
    addressRegion: ORGANIZATION.addressRegion,
    addressCountry: ORGANIZATION.addressCountry,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: ORGANIZATION.telephone,
    email: ORGANIZATION.email,
    areaServed: "Worldwide",
  },
  // Ties the site to the company's verified profile, so search engines resolve
  // both to one entity rather than two.
  sameAs: [ORGANIZATION.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // No fixed height on the root element. Lenis watches the document element
    // with a ResizeObserver to recompute how far the page can scroll, and
    // `h-full` pinned that box to the viewport — so the observer never fired as
    // content grew and Lenis kept serving a stale scroll limit, which reads as
    // the page jamming partway down. `min-h-dvh` on the body preserves the
    // sticky-footer layout this was doing without freezing the measurement.
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Preloader />
          <ScrollProgressBar />
          <SkipLink />
          <Header />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
