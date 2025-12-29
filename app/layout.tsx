import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/header/TopBar";
import { MainNav } from "@/components/header/MainNav";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Explore Sri Lanka with Jagath Premasinghe | Easy Tripper",
    template: "%s | Easy Tripper",
  },
  description: siteConfig.description,
  keywords: [
    "Sri Lanka travel",
    "Sri Lanka tours",
    "Sri Lanka private tour",
    "Sri Lanka driver guide",
    "travel guide Sri Lanka",
    "Jagath Premasinghe",
    "Sri Lanka destinations",
    "Ceylon travel",
  ],
  authors: [{ name: "Jagath Premasinghe" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Easy Tripper - Sri Lanka Travel Guide",
    title: "Explore Sri Lanka with Jagath Premasinghe",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Easy Tripper - Private Sri Lanka Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Sri Lanka with Jagath Premasinghe",
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <TopBar />
        <MainNav />
        <main className="pt-[141px]">{children}</main>
        <Footer />
        <JsonLd id="ld-org" data={organizationJsonLd()} />
        <JsonLd id="ld-website" data={websiteJsonLd()} />
      </body>
    </html>
  );
}
