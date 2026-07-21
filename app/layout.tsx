import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";

import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ROUTES } from "@/components/layout/nav-links";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SK Internationals — Global B2B Freight & Logistics",
    template: "%s — SK Internationals",
  },
  description:
    "SK Internationals delivers reliable, transparent freight forwarding and logistics across the Gulf, Red Sea, and Indian Sub-Continent.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
