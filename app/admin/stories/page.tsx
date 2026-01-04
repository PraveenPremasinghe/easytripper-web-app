"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Story } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { PageLoader } from "@/components/ui/loader";
import { DragDropImageUpload } from "@/components/ui/drag-drop-image-upload";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { DatePicker } from "@/components/ui/date-picker";
import { generateId } from "@/lib/utils-admin";

export default function StoriesAdminPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState<Partial<Story>>({
    title: "",
    cover: "",
    gallery: [],
    tags: [],
    excerpt: "",
    date: "",
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSubmit = editingStory 
        ? formData 
        : { ...formData, id: generateId('story') };
      
      const url = editingStory ? `/api/stories/${editingStory.id}` : "/api/stories";
      const method = editingStory ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        await fetchStories();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save story:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    try {
      const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchStories();
      }
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData(story);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingStory(null);
    setFormData({
      title: "",
      cover: "",
      gallery: [],
      tags: [],
      excerpt: "",
      date: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/admin">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Manage Travel Stories</h1>
            <p className="text-muted-foreground">Create and manage travel stories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-2xl">{editingStory ? "Edit Story" : "Create New Story"}</DialogTitle>
                <DialogDescription>
                  {editingStory ? "Update story details below" : "Fill in the details to create a new travel story"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {editingStory && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>ID:</strong> {editingStory.id}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <DatePicker
                      value={formData.date}
                      onChange={(value) => setFormData({ ...formData, date: value })}
                      placeholder="Select date"
                    />
                  </div>
                </div>
                <div>
                  <DragDropImageUpload
                    value={formData.cover || ""}
                    onChange={(value) => setFormData({ ...formData, cover: value })}
                    label="Cover Image"
                    required
                  />
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <MultiImageUpload
                    value={formData.gallery || []}
                    onChange={(value) => setFormData({ ...formData, gallery: value })}
                    label="Gallery Images"
                    maxImages={10}
                  />
                </div>
                <div>
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={formData.tags?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  />
                </div>
                <DialogFooter className="border-t pt-4 mt-6 sticky bottom-0 bg-white dark:bg-gray-900">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingStory ? "Update Story" : "Create Story"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{story.date || "No date"}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(story)}
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(story.id)}
                    className="flex-1 bg-red-600 text-white hover:bg-red-700 border-0"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

