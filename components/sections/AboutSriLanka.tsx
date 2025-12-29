"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

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

export function AboutSriLanka() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            About Sri Lanka
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A tropical paradise rich in culture, history, and natural beauty
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                Sri Lanka, known as the &quot;Pearl of the Indian Ocean,&quot; is a stunning island
                nation located off the southern coast of India. With over 2,500 years of
                recorded history, it boasts ancient cities, sacred temples, pristine
                beaches, lush tea plantations, and incredible wildlife.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                From the misty highlands of the central mountains to the golden beaches
                of the coast, Sri Lanka offers diverse landscapes and experiences that
                captivate every traveler. The country is home to eight UNESCO World
                Heritage Sites and is renowned for its warm hospitality, delicious
                cuisine, and rich cultural traditions.
              </p>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Climate", value: "Tropical, warm year-round" },
                      { label: "Best Months", value: "December to April (West/South)" },
                      { label: "Visas", value: "ETA available online" },
                      { label: "Currency", value: "Sri Lankan Rupee (LKR)" },
                      { label: "Languages", value: "Sinhala, Tamil, English" },
                    ].map((fact) => (
                      <div
                        key={fact.label}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <span className="font-medium text-foreground">
                            {fact.label}:
                          </span>{" "}
                          <span className="text-muted-foreground">{fact.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop"
                  alt="Sri Lanka temple"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop"
                  alt="Sri Lanka tea plantation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop"
                  alt="Sri Lanka beach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

