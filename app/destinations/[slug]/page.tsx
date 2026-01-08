import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Thermometer } from "lucide-react";
import { InquiryForm } from "@/components/sections/InquiryForm";
import type { Destination } from "@/lib/types";
import { SITE_URL, generatePageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400; // ISR: Revalidate every 24 hours

async function getDestinations(): Promise<Destination[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/firebase/destinations`, { next: { revalidate: 3600 } });
    const { success, data } = await res.json();
    return success ? (data || []) : [];
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destinations = await getDestinations();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Easy Tripper",
    };
  }

  const title = `${destination.name} - Sri Lanka Travel Guide | Easy Tripper`;
  const description = destination.excerpt || `Visit ${destination.name} in Sri Lanka. ${destination.region} region. Plan your trip with Easy Tripper's expert guides. Perfect for travelers from India, Switzerland, Netherlands, Germany, and Sweden.`;

  return {
    ...generatePageMetadata({
      title: `${destination.name} - Sri Lanka Travel Guide`,
      description,
      keywords: [
        destination.name,
        `${destination.name} Sri Lanka`,
        `visit ${destination.name}`,
        `${destination.region} Sri Lanka`,
        "Sri Lanka destinations",
        "Sri Lanka travel",
        `${destination.name} tour`,
        `${destination.name} travel guide`,
      ],
      path: `/destinations/${slug}`,
      image: destination.image,
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/destinations/${slug}`,
      siteName: "Easy Tripper",
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: `${destination.name} - Sri Lanka`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destinations = await getDestinations();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Things to do is now empty, so we'll skip that section
  const destinationActivities: Array<{ id: string; title: string; description: string; image: string; category: string; location?: string }> = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/destinations"
              className="mb-4 inline-flex items-center text-white/80 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Link>
            <h1 className="mb-2 text-4xl font-bold sm:text-5xl md:text-6xl">
              {destination.name}
            </h1>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {destination.region}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="mb-6 text-lg leading-relaxed text-foreground">
                {destination.description || destination.excerpt}
              </p>

              {destination.highlights && destination.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Highlights
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {destination.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {destination.bestTime && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Best Time</p>
                          <p className="text-muted-foreground">{destination.bestTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {destination.duration && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Duration</p>
                          <p className="text-muted-foreground">{destination.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Things to Do in this Destination */}
              {destinationActivities.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Things to Do in {destination.name}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {destinationActivities.map((activity) => (
                      <Card key={activity.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <Badge variant="secondary">{activity.category}</Badge>
                          </div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Tips for this Destination */}
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Travel Tips
                </h2>
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>
                          <strong>Getting There:</strong> Most destinations are accessible by private vehicle, 
                          train (for hill country), or domestic flights. Your guide can arrange transportation.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Thermometer className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>
                          <strong>Weather:</strong> {destination.bestTime || "Year-round"} offers the best weather. 
                          Pack accordingly - light clothing for most areas, warmer layers for hill country.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>
                          <strong>Planning:</strong> Allow {destination.duration || "2-3 days"} to fully experience 
                          {destination.name}. Book accommodations in advance during peak season.
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Related Destinations */}
              {(() => {
                const relatedDestinations = destinations
                  .filter((d) => d.slug !== destination.slug && d.region === destination.region)
                  .slice(0, 3);
                
                return relatedDestinations.length > 0 ? (
                  <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      Explore More in {destination.region}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {relatedDestinations.map((related) => (
                        <Link key={related.slug} href={`/destinations/${related.slug}`}>
                          <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={related.image}
                                alt={related.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {related.name}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {related.excerpt}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

