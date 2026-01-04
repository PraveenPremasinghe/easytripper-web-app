"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoryModal } from "@/components/stories/StoryModal";
import { Calendar } from "lucide-react";
import type { Story } from "@/lib/types";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/firebase/stories");
      const { success, data } = await res.json();
      if (success) {
        setStories(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStory(null), 300);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              Travel Stories
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Real adventures from our travelers exploring Sri Lanka
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No travel stories available yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
              <Card
                key={story.id}
                className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => handleStoryClick(story)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={story.cover}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
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
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground line-clamp-2">
                    {story.excerpt}
                  </p>
                  {story.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{story.date}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
