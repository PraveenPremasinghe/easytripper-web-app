"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { stories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StoryModal } from "@/components/stories/StoryModal";
import type { Story } from "@/lib/types";

export function TravelStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Display first 6 stories on home page
  const displayedStories = stories.slice(0, 6);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStory(null), 300);
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real adventures from our travelers exploring Sri Lanka
          </p>
        </motion.div>

        {displayedStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No travel stories available yet.</p>
            <Link 
              href="/stories" 
              className="text-primary hover:underline mt-4 inline-block"
            >
              View all stories
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedStories.map((story, index) => {
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    onClick={() => handleStoryClick(story)}
                  >
                    <div className="block">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={story.cover}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {story.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {story.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                          {story.excerpt}
                        </p>
                        {story.date && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4" />
                            <span>{story.date}</span>
                          </div>
                        )}
                        <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                          <span>Read story</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {stories.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-12"
              >
                <Button asChild size="lg">
                  <Link href="/stories">
                    View All Stories
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>

      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
