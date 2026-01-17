import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { SITE_URL, generateHreflangTags, TARGET_COUNTRIES } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const hreflangTags = generateHreflangTags("");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Custom Sri Lanka Tours with Private Chauffeur | Easy Tripper",
    template: "%s | Easy Tripper - Sri Lanka Tour Guide",
  },
  description:
    "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides. Serving travelers from India, Switzerland, Netherlands, Germany, and Sweden. Create your perfect custom tour today. Airport pickup available.",
  keywords: [
    "custom Sri Lanka tours",
    "Sri Lanka private tour guide",
    "Sri Lanka travel itinerary",
    "Sri Lanka airport pickup",
    "luxury Sri Lanka tours",
    "Sri Lanka chauffeur service",
    "private tours Sri Lanka",
    "Sri Lanka travel guide",
    "personalized Sri Lanka tours",
    "custom tour Sri Lanka",
    "Sri Lanka tours from India",
    "Sri Lanka tours from Switzerland",
    "Sri Lanka tours from Netherlands",
    "Sri Lanka tours from Germany",
    "Sri Lanka tours from Sweden",
    "Jagath Premasinghe",
    "Easy Tripper",
    "Sri Lanka destinations",
    "Ceylon travel",
  ],
  authors: [{ name: "Jagath Premasinghe" }],
  creator: "Easy Tripper",
  publisher: "Easy Tripper",
  alternates: {
    canonical: SITE_URL,
    languages: Object.fromEntries(
      hreflangTags.map((tag) => [tag.hreflang, tag.href])
    ),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: TARGET_COUNTRIES.map((c) => c.locale),
    url: SITE_URL,
    siteName: "Easy Tripper - Custom Sri Lanka Tours",
    title: "Custom Sri Lanka Tours with Private Chauffeur",
    description:
      "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides. Serving international travelers. Create your perfect custom tour today.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom Sri Lanka Tours - Easy Tripper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sri Lanka Tours with Private Chauffeur",
    description:
      "Custom Sri Lanka tours tailored to your preferences. Personalized itineraries and expert guides.",
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: "@easytripper",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
  },
  other: {
    "geo.region": "LK",
    "geo.placename": "Sri Lanka",
    "geo.position": "7.8731;80.7718",
    "ICBM": "7.8731, 80.7718",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <GoogleTagManager />
          <GoogleAnalytics />
        </Suspense>
        <AuthSessionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
