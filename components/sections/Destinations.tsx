"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { destinations } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Destinations() {
  return (
    <section className="py-24 bg-muted/10">
       <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-serif mb-4">
            Discover Sri Lanka
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore our curated selection of breathtaking destinations, from ancient ruins to tropical paradises.
          </p>
        </div>
        
      <BentoGrid className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {destinations.slice(0, 7).map((item, i) => (
          <BentoGridItem
            key={i}
            title={
                <Link href={`/destinations/${item.slug}`} className="flex items-center gap-2 group-hover/bento:text-primary transition-colors">
                    {item.name} <ArrowRight className="h-4 w-4 opacity-0 group-hover/bento:opacity-100 transition-opacity" />
                </Link>
            }
            description={item.excerpt}
            header={
                <div className="relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.region}
                    </div>
                </div>
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
      
      <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center text-lg font-medium text-primary hover:underline underline-offset-4"
          >
            View all destinations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
      </div>
    </section>
  );
}
