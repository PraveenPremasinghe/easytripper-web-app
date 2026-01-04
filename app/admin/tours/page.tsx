"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Tour } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { PageLoader } from "@/components/ui/loader";
import { DragDropImageUpload } from "@/components/ui/drag-drop-image-upload";
import { generateId } from "@/lib/utils-admin";

export default function ToursAdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>({
    name: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    highlights: [],
    itinerary: [],
    includes: [],
    excludes: [],
    destinations: [],
    category: "Classic",
    difficulty: "Easy",
    groupSize: "",
    bestTime: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      setTours(data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Auto-generate ID if creating new tour
      const dataToSubmit = editingTour 
        ? formData 
        : { ...formData, id: generateId('tour') };
      
      const url = editingTour ? `/api/tours/${editingTour.id}` : "/api/tours";
      const method = editingTour ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        await fetchTours();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save tour:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchTours();
      }
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTour(null);
    setFormData({
      name: "",
      duration: "",
      price: "",
      image: "",
      description: "",
      highlights: [],
      itinerary: [],
      includes: [],
      excludes: [],
      destinations: [],
      category: "Classic",
      difficulty: "Easy",
      groupSize: "",
      bestTime: "",
    });
  };

  const updateArrayField = (field: keyof Tour, value: string) => {
    const current = (formData[field] as string[]) || [];
    setFormData({ ...formData, [field]: [...current, value] });
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
            <h1 className="text-4xl font-bold">Manage Tours</h1>
            <p className="text-muted-foreground">Create and manage tour packages</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-2xl">{editingTour ? "Edit Tour" : "Create New Tour"}</DialogTitle>
                <DialogDescription>
                  {editingTour ? "Update tour details below" : "Fill in the details to create a new tour package"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {editingTour && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>ID:</strong> {editingTour.id}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as Tour["category"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Classic">Classic</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Wildlife">Wildlife</SelectItem>
                        <SelectItem value="Beach">Beach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value as Tour["difficulty"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Group Size</Label>
                    <Input
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Best Time</Label>
                    <Input
                      value={formData.bestTime}
                      onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                    />
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
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Highlights (one per line)</Label>
                  <Textarea
                    value={formData.highlights?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Itinerary (one per line)</Label>
                  <Textarea
                    value={formData.itinerary?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, itinerary: e.target.value.split("\n").filter(Boolean) })}
                    rows={6}
                  />
                </div>
                <div>
                  <Label>Includes (one per line)</Label>
                  <Textarea
                    value={formData.includes?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, includes: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Excludes (one per line)</Label>
                  <Textarea
                    value={formData.excludes?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, excludes: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Destinations (comma-separated)</Label>
                  <Input
                    value={formData.destinations?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, destinations: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
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
                      editingTour ? "Update Tour" : "Create Tour"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card key={tour.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{tour.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{tour.duration} - {tour.price}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(tour)}
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
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

