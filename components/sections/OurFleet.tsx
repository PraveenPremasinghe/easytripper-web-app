import { vehicles } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Wifi, Wind } from "lucide-react";
import Image from "next/image";

export function OurFleet() {
  return (
    <section className="py-16 md:py-24 bg-background" id="fleet">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 font-serif">
            Travel in Comfort & Style
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our modern fleet of vehicles ensures your journey through Sri Lanka is safe, comfortable, and reliable.
            From luxury sedans to spacious vans, we have the perfect ride for you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="mb-2 bg-primary/5 border-primary/20 text-primary">
                    {vehicle.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-serif">{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5" title="Passengers">
                    <Users className="h-4 w-4" />
                    <span>{vehicle.capacity.passengers} Pax</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Luggage">
                    <Briefcase className="h-4 w-4" />
                    <span>{vehicle.capacity.luggage} Bags</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {vehicle.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {vehicle.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                  {vehicle.features.length > 2 && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      +{vehicle.features.length - 2} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
