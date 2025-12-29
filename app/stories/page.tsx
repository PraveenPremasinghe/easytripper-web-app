import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { stories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Stories",
  description: "Real adventures and experiences from our travelers in Sri Lanka",
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Travel Stories
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Real adventures from our travelers exploring Sri Lanka
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
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
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        {story.title}
                      </h3>
                      <p className="mb-4 text-muted-foreground line-clamp-2">
                        {story.excerpt}
                      </p>
                      {story.date && (
                        <p className="text-sm text-muted-foreground">{story.date}</p>
                      )}
                    </CardContent>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">{story.title}</h3>
                    <p className="text-muted-foreground">{story.excerpt}</p>
                    {story.date && (
                      <p className="text-sm text-muted-foreground">{story.date}</p>
                    )}
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
          ))}
        </div>
      </div>
    </div>
  );
}

