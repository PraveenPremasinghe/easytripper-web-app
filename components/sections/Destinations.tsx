"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gradient-to-br from-primary/5 via-[#FAF8F3] to-primary/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#1C1917] sm:text-4xl md:text-5xl">
            Explore Sri Lanka&apos;s Top Destinations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#57534E]">
            From ancient cities to pristine beaches, discover the best of the Pearl of the Indian Ocean
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.slice(0, 9).map((destination) => (
            <motion.div key={destination.slug} variants={itemVariants}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
                <Link href={`/destinations/${destination.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute right-4 top-4">
                      {destination.region}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-[#1C1917] group-hover:text-primary transition-colors duration-200">
                      {destination.name}
                    </h3>
                    <p className="mb-4 text-[#57534E] line-clamp-2">
                      {destination.excerpt}
                    </p>
                    <div className="flex items-center text-primary group-hover:underline transition-all duration-200">
                      <span className="text-sm font-semibold">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-2" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center text-lg font-medium text-primary hover:underline"
          >
            View all destinations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

