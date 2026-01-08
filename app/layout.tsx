import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { Toaster } from "@/components/ui/toaster";

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
    default: "Custom Sri Lanka Tours with Private Chauffeur | Easy Tripper",
    template: "%s | Easy Tripper - Sri Lanka Tour Guide",
  },
  description:
    "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides. Create your perfect custom tour today. Airport pickup available.",
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
    "Jagath Premasinghe",
    "Easy Tripper",
    "Sri Lanka destinations",
    "Ceylon travel",
  ],
  authors: [{ name: "Jagath Premasinghe" }],
  creator: "Easy Tripper",
  publisher: "Easy Tripper",
  alternates: {
    canonical: "https://easytripper.lk",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easytripper.lk",
    siteName: "Easy Tripper - Custom Sri Lanka Tours",
    title: "Custom Sri Lanka Tours with Private Chauffeur",
    description:
      "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides. Create your perfect custom tour today.",
    images: [
      {
        url: "/images/og-image.jpg",
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
    images: ["/images/og-image.jpg"],
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <AuthSessionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
