import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicles } from "@/components/sections/Vehicles";
import { vehicles } from "@/lib/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, vehiclesItemListJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Choose the right vehicle for your Sri Lanka trip — sedan, van, 4x4, mini bus, or coach. Comfortable, safe transport for international travelers.",
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <JsonLd
        id="ld-breadcrumb-vehicles"
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Vehicles", url: absoluteUrl("/vehicles") },
        ])}
      />
      <JsonLd id="ld-vehicles-itemlist" data={vehiclesItemListJsonLd(vehicles)} />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            Vehicles & Transport in Sri Lanka
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We tour only inside Sri Lanka. The right vehicle makes your trip smoother—especially for
            airport transfers, hill country roads, and multi-day routes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/plan-your-trip">
                Plan my trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/contact">Ask availability</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-foreground">Best for</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full">
                  Couples
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Families
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Groups
                </Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                We match vehicle size to your group + luggage so you travel comfortably and avoid long
                transfers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-foreground">Comfort & safety</div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  A/C and comfortable seating
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  Experienced driver/guide
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  Flexible stops on request
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-foreground">Airport transfers</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Flying into Colombo (CMB)? We can pick you up, handle luggage, and start your itinerary
                immediately.
              </p>
              <div className="mt-5">
                <Button asChild variant="secondary" className="rounded-full">
                  <Link href="/contact">Request pickup</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Vehicles />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground font-serif">
                Not sure what to choose?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tell us your dates, group size, luggage, and must-see places. We’ll recommend the best
                vehicle and design a route that fits your pace.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full">
                  <Link href="/contact">
                    Get a recommendation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/tours">Browse tours</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

