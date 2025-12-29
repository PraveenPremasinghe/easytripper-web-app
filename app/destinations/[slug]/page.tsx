import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Thermometer } from "lucide-react";
import { destinations, thingsToDo } from "@/lib/data";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400; // ISR: Revalidate every 24 hours

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: destination.name,
    description: destination.excerpt,
    openGraph: {
      title: destination.name,
      description: destination.excerpt,
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        id="ld-breadcrumb-destination"
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Destinations", url: absoluteUrl("/destinations") },
          { name: destination.name, url: absoluteUrl(`/destinations/${destination.slug}`) },
        ])}
      />
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
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                {destination.description || destination.excerpt}
              </p>

              {destination.highlights && destination.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">
                    Highlights
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {destination.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-700"
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
                          <p className="font-semibold text-slate-900">Best Time</p>
                          <p className="text-slate-600">{destination.bestTime}</p>
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
                          <p className="font-semibold text-slate-900">Duration</p>
                          <p className="text-slate-600">{destination.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Things to Do in this Destination */}
              {(() => {
                const destinationActivities = thingsToDo.filter(
                  (activity) => activity.location?.toLowerCase() === destination.name.toLowerCase()
                );
                
                if (destinationActivities.length > 0) {
                  return (
                    <div className="mt-8">
                      <h2 className="mb-4 text-2xl font-bold text-slate-900">
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
                              <h3 className="mb-2 font-semibold text-slate-900">
                                {activity.title}
                              </h3>
                              <p className="text-sm text-slate-600">{activity.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Travel Tips for this Destination */}
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Travel Tips
                </h2>
                <Card className="bg-slate-50">
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-slate-700">
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
                
                if (relatedDestinations.length > 0) {
                  return (
                    <div className="mt-8">
                      <h2 className="mb-4 text-2xl font-bold text-slate-900">
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
                                <h3 className="font-semibold text-slate-900 group-hover:text-primary">
                                  {related.name}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                                  {related.excerpt}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
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

