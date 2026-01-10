"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/loader";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { PageLoader } from "@/components/ui/loader";
import { DragDropImageUpload } from "@/components/ui/drag-drop-image-upload";
import { DatePicker } from "@/components/ui/date-picker";
import { generateId, generateSlug } from "@/lib/utils-admin";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    publishedAt: new Date().toISOString().split("T")[0],
    category: "Travel Guide",
    tags: [],
    readTime: 5,
    seoKeywords: [],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/firebase/blog");
      const { success, data } = await res.json();
      if (success) {
        setPosts(data || []);
      } else {
        console.error("Failed to fetch blog posts");
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = "/api/firebase/blog";
      const method = editingPost ? "PUT" : "POST";
      
      const dataToSubmit = editingPost 
        ? { slug: editingPost.slug, ...formData }
        : { 
            ...formData, 
            id: generateId('blog'),
            slug: generateSlug(formData.title || 'blog-post')
          };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const { success } = await res.json();
      if (success) {
        await fetchPosts();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error("Failed to save blog post");
      }
    } catch (error) {
      console.error("Failed to save blog post:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      const res = await fetch(`/api/firebase/blog?slug=${slug}`, { method: "DELETE" });
      const { success } = await res.json();
      if (success) {
        await fetchPosts();
      } else {
        console.error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      publishedAt: new Date().toISOString().split("T")[0],
      category: "Travel Guide",
      tags: [],
      readTime: 5,
      seoKeywords: [],
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
            <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
            <p className="text-muted-foreground">Create and manage blog content</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Blog Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-2xl">{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
                <DialogDescription>
                  {editingPost ? "Update blog post details below" : "Fill in the details to create a new blog post"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {editingPost && (
                  <div className="p-3 bg-muted rounded-lg space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <strong>ID:</strong> {editingPost.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Slug:</strong> {editingPost.slug}
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
                    <Label>Author</Label>
                    <Input
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Published Date</Label>
                    <DatePicker
                      value={formData.publishedAt}
                      onChange={(value) => setFormData({ ...formData, publishedAt: value })}
                      placeholder="Select publish date"
                      required
                    />
                  </div>
                  <div>
                    <Label>Read Time (minutes)</Label>
                    <Input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as BlogPost["category"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Travel Guide">Travel Guide</SelectItem>
                        <SelectItem value="Destination">Destination</SelectItem>
                        <SelectItem value="Culture">Culture</SelectItem>
                        <SelectItem value="Wildlife">Wildlife</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Tips">Tips</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <DragDropImageUpload
                    value={formData.image || ""}
                    onChange={(value) => setFormData({ ...formData, image: value })}
                    label="Image"
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
                  <Label>Content</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={10}
                  />
                </div>
                <div>
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={formData.tags?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  />
                </div>
                <div>
                  <Label>SEO Keywords (comma-separated)</Label>
                  <Input
                    value={formData.seoKeywords?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  />
                </div>
                </div>
                <DialogFooter>
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
                        <Spinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingPost ? "Update Blog Post" : "Create Blog Post"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{post.category} - {post.readTime} min read</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.slug)}
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

