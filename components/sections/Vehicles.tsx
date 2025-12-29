import Image from "next/image";
import Link from "next/link";
import { vehicles } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, ArrowRight } from "lucide-react";

export function Vehicles() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-serif">
              Vehicles for Every Kind of Trip
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              International travelers love Sri Lanka when transport is easy. Choose the right vehicle for
              your group size, luggage, and route—then we’ll build the itinerary around it.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">
              Ask for vehicle + itinerary
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <Card key={v.id} className="overflow-hidden border-border/60 bg-card/70 backdrop-blur">
              <div className="relative aspect-[16/10]">
                <Image
                  src={v.image}
                  alt={`${v.name} for Sri Lanka tours`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-white">{v.name}</div>
                    <div className="text-sm text-white/85">{v.category}</div>
                  </div>
                  <Badge className="shrink-0 bg-white/15 text-white hover:bg-white/20 border-white/25">
                    Best fit
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{v.passengers}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{v.luggage}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-foreground">Ideal for</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {v.idealFor.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-foreground">Included</div>
                  <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
                    {v.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

