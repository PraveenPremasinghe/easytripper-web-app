"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { stories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

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

export function TravelStories() {
  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Travel Stories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Real adventures from our travelers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.div key={story.id} variants={itemVariants}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={story.cover}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {story.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                          {story.title}
                        </h3>
                        <p className="mb-4 text-slate-600 line-clamp-2">
                          {story.excerpt}
                        </p>
                        {story.date && (
                          <p className="text-sm text-slate-500">{story.date}</p>
                        )}
                      </CardContent>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">{story.title}</h3>
                      <p className="text-slate-600">{story.excerpt}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {story.gallery.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-video overflow-hidden rounded-lg"
                          >
                            <Image
                              src={image}
                              alt={`${story.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
            href="/stories"
            className="inline-flex items-center text-lg font-medium text-primary hover:underline"
          >
            View all stories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

