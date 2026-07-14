import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";

import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SK Internationals — Global B2B Freight & Logistics",
    template: "%s — SK Internationals",
  },
  description:
    "SK Internationals delivers reliable, transparent freight forwarding and logistics across the Gulf, Red Sea, and Indian Sub-Continent.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
