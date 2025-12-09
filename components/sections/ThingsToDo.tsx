"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { thingsToDo } from "@/lib/data";
import { MapPin } from "lucide-react";

const categories = ["Culture", "Nature", "Beaches", "Wildlife", "Food"] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const
    }
  }
};

export function ThingsToDo() {
  const [activeTab, setActiveTab] = useState<string>("Culture");

  return (
    <section id="things-to-do" className="py-20 bg-[#FAF8F3]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#1C1917] sm:text-4xl md:text-5xl">
            Things to Do in Sri Lanka
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#57534E]">
            Discover incredible experiences across the island
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryItems = thingsToDo.filter(
              (item) => item.category === category
            );

            return (
              <TabsContent key={category} value={category} className="relative">
                <AnimatePresence mode="wait">
                  {activeTab === category && (
                    <motion.div
                      key={activeTab}
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {categoryItems.map((item) => (
                          <motion.div key={item.id} variants={itemVariants}>
                            <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
                              <div className="relative aspect-video overflow-hidden bg-primary/5">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <CardContent className="p-6">
                                <Badge variant="secondary" className="mb-2 transition-all duration-200 group-hover:scale-105">
                                  {item.category}
                                </Badge>
                                <h3 className="mb-2 text-xl font-semibold text-[#1C1917] group-hover:text-primary transition-colors duration-200">
                                  {item.title}
                                </h3>
                                <p className="mb-4 text-[#57534E] line-clamp-3">
                                  {item.description}
                                </p>
                                {item.location && (
                                  <div className="flex items-center gap-2 text-sm text-[#57534E]">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>{item.location}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

