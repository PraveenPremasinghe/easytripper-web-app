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
import { Vehicle } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { PageLoader } from "@/components/ui/loader";
import { DragDropImageUpload } from "@/components/ui/drag-drop-image-upload";
import { generateId } from "@/lib/utils-admin";

export default function VehiclesAdminPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    type: "Car",
    passengers: 4,
    image: "",
    features: [],
    idealFor: [],
    airConditioned: true,
    description: "",
    priceRange: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/firebase/vehicles");
      const { success, data } = await res.json();
      if (success) {
        setVehicles(data || []);
      } else {
        console.error("Failed to fetch vehicles");
        setVehicles([]);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = "/api/firebase/vehicles";
      const method = editingVehicle ? "PUT" : "POST";
      
      const dataToSubmit = editingVehicle 
        ? { id: editingVehicle.id, ...formData }
        : formData;
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const { success } = await res.json();
      if (success) {
        await fetchVehicles();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error("Failed to save vehicle");
      }
    } catch (error) {
      console.error("Failed to save vehicle:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    
    try {
      const res = await fetch(`/api/firebase/vehicles?id=${id}`, { method: "DELETE" });
      const { success } = await res.json();
      if (success) {
        await fetchVehicles();
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingVehicle(null);
    setFormData({
      name: "",
      type: "Car",
      passengers: 4,
      image: "",
      features: [],
      idealFor: [],
      airConditioned: true,
      description: "",
      priceRange: "",
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
            <h1 className="text-4xl font-bold">Manage Vehicles</h1>
            <p className="text-muted-foreground">Create and manage vehicles & transport</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-2xl">{editingVehicle ? "Edit Vehicle" : "Create New Vehicle"}</DialogTitle>
                <DialogDescription>
                  {editingVehicle ? "Update vehicle details below" : "Fill in the details to create a new vehicle"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {editingVehicle && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>ID:</strong> {editingVehicle.id}
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
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as Vehicle["type"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Car">Car</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="4x4">4x4</SelectItem>
                        <SelectItem value="Bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Passengers</Label>
                    <Input
                      type="number"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Price Range</Label>
                    <Input
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      id="airConditioned"
                      checked={formData.airConditioned}
                      onChange={(e) => setFormData({ ...formData, airConditioned: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="airConditioned">Air Conditioned</Label>
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
                  <Label>Features (one per line)</Label>
                  <Textarea
                    value={formData.features?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Ideal For (one per line)</Label>
                  <Textarea
                    value={formData.idealFor?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, idealFor: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
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
                      editingVehicle ? "Update Vehicle" : "Create Vehicle"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader>
                <CardTitle>{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{vehicle.type} - {vehicle.passengers} passengers</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
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

