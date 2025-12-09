import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/header/TopBar";
import { MainNav } from "@/components/header/MainNav";
import { Footer } from "@/components/sections/Footer";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk"),
  title: {
    default: "Explore Sri Lanka with Jagath Premasinghe | Easy Tripper",
    template: "%s | Easy Tripper",
  },
  description:
    "Discover the beauty of Sri Lanka with expert local guide Jagath Premasinghe. Customized tours, cultural experiences, wildlife safaris, and unforgettable adventures across the Pearl of the Indian Ocean.",
  keywords: [
    "Sri Lanka travel",
    "Sri Lanka tours",
    "travel guide Sri Lanka",
    "Jagath Premasinghe",
    "Sri Lanka destinations",
    "Ceylon travel",
  ],
  authors: [{ name: "Jagath Premasinghe" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easytripper.lk",
    siteName: "Easy Tripper - Sri Lanka Travel Guide",
    title: "Explore Sri Lanka with Jagath Premasinghe",
    description:
      "Discover the beauty of Sri Lanka with expert local guide Jagath Premasinghe. Customized tours, cultural experiences, wildlife safaris, and unforgettable adventures.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Lanka Travel Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Sri Lanka with Jagath Premasinghe",
    description:
      "Discover the beauty of Sri Lanka with expert local guide Jagath Premasinghe.",
    images: ["/images/og-image.jpg"],
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
      </body>
    </html>
  );
}
