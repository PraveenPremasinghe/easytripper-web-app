import { tours } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, CheckCircle2, XCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.name} | Easy Tripper Sri Lanka`,
    description: tour.description,
    openGraph: {
      images: [tour.image],
    },
  };
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    id: tour.id,
  }));
}

export default async function TourPage({ params }: Props) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-4 py-1">
              {tour.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
              {tour.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {tour.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {tour.groupSize}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl font-bold font-serif mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tour.description}
              </p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {tour.destinations.map((dest) => (
                  <div key={dest} className="flex items-center gap-2 text-sm font-medium bg-muted/50 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                    {dest}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold font-serif mb-8">Itinerary</h2>
              <TracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                  {tour.itinerary.map((item, index) => {
                    // Split "Day X: Title"
                    const [day, ...rest] = item.split(":");
                    const title = rest.join(":").trim();

                    return (
                      <div key={index} className="mb-10 relative">
                        <div className="absolute -left-4 md:-left-10 top-1 h-4 w-4 rounded-full border border-primary bg-background" />
                        
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {day}
                        </h3>
                        <p className="text-lg font-medium mb-4">
                          {title || item} 
                        </p>
                        <div className="text-muted-foreground prose prose-sm dark:prose-invert">
                           {/* Content placeholder - could be expanded in real app */}
                           <p>
                             Explore the wonders of {title ? title.split("(")[0] : "this location"} with our expert guide. 
                             Experience the local culture, cuisine, and breathtaking scenery.
                           </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TracingBeam>
            </div>

             {/* Highlights */}
             <div className="mb-12">
                <h2 className="text-2xl font-bold font-serif mb-6">Trip Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {tour.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                            <span>{highlight}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-3xl font-bold text-primary">{tour.price}</p>
                    </div>
                    <span className="text-sm text-muted-foreground mb-1">{tour.priceNote}</span>
                </div>
                
                <Button className="w-full text-lg py-6 mb-4" asChild>
                    <Link href="/contact">Book This Tour</Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    No payment required to inquire
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3 mb-6">
                    {tour.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="font-semibold mb-4">What's Excluded</h3>
                <ul className="space-y-3">
                    {tour.excludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
