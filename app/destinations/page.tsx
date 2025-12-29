import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore all destinations in Sri Lanka - from ancient cities to pristine beaches",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            All Destinations
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover the diverse beauty of Sri Lanka across all regions
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Card
              key={destination.slug}
              className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Link href={`/destinations/${destination.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute right-4 top-4">
                    {destination.region}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {destination.name}
                  </h3>
                  <p className="mb-4 text-muted-foreground line-clamp-2">
                    {destination.excerpt}
                  </p>
                  <div className="flex items-center text-primary group-hover:underline">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

