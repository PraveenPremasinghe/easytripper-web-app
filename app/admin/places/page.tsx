"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ArrowLeft, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { Province, Place } from "@/lib/places";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLoader } from "@/components/ui/loader";
import { DragDropImageUpload } from "@/components/ui/drag-drop-image-upload";
import { generateId } from "@/lib/utils-admin";

export default function PlacesAdminPage() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isProvinceDialogOpen, setIsProvinceDialogOpen] = useState(false);
  const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [editingProvince, setEditingProvince] = useState<Province | null>(null);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [provinceFormData, setProvinceFormData] = useState<Partial<Province>>({
    name: "",
    places: [],
  });
  const [placeFormData, setPlaceFormData] = useState<Partial<Place>>({
    name: "",
    province: "",
    lat: 0,
    lng: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const res = await fetch("/api/firebase/places");
      const { success, data } = await res.json();
      if (success) {
        setProvinces(data || []);
      } else {
        console.error("Failed to fetch provinces");
        setProvinces([]);
      }
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
      setProvinces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = "/api/firebase/places";
      const method = editingProvince ? "PUT" : "POST";
      
      const dataToSubmit = editingProvince 
        ? { action: "updateProvince", id: editingProvince.id, ...provinceFormData }
        : { action: "createProvince", ...provinceFormData };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const { success } = await res.json();
      if (success) {
        await fetchProvinces();
        setIsProvinceDialogOpen(false);
        resetProvinceForm();
      } else {
        console.error("Failed to save province");
      }
    } catch (error) {
      console.error("Failed to save province:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePlaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvince) return;
    setSaving(true);

    try {
      const url = "/api/firebase/places";
      const method = editingPlace ? "PUT" : "POST";
      
      const dataToSubmit = editingPlace 
        ? {
            action: "updatePlace",
            provinceId: selectedProvince,
            placeId: editingPlace.id,
            place: { ...placeFormData, id: editingPlace.id },
          }
        : {
            action: "addPlace",
            provinceId: selectedProvince,
            place: { ...placeFormData, id: generateId('place') },
          };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const { success } = await res.json();
      if (success) {
        await fetchProvinces();
        setIsPlaceDialogOpen(false);
        resetPlaceForm();
      } else {
        console.error("Failed to save place");
      }
    } catch (error) {
      console.error("Failed to save place:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProvince = async (id: string) => {
    if (!confirm("Are you sure you want to delete this province?")) return;
    
    try {
      const res = await fetch(`/api/firebase/places?action=deleteProvince&id=${id}`, { method: "DELETE" });
      const { success } = await res.json();
      if (success) {
        await fetchProvinces();
      } else {
        console.error("Failed to delete province");
      }
    } catch (error) {
      console.error("Failed to delete province:", error);
    }
  };

  const handleDeletePlace = async (provinceId: string, placeId: string) => {
    if (!confirm("Are you sure you want to delete this place?")) return;
    
    try {
      const res = await fetch(`/api/firebase/places?action=deletePlace&provinceId=${provinceId}&placeId=${placeId}`, { method: "DELETE" });
      const { success } = await res.json();
      if (success) {
        await fetchProvinces();
      } else {
        console.error("Failed to delete place");
      }
    } catch (error) {
      console.error("Failed to delete place:", error);
    }
  };

  const handleEditProvince = (province: Province) => {
    setEditingProvince(province);
    setProvinceFormData(province);
    setIsProvinceDialogOpen(true);
  };

  const handleEditPlace = (provinceId: string, place: Place) => {
    setSelectedProvince(provinceId);
    setEditingPlace(place);
    setPlaceFormData(place);
    setIsPlaceDialogOpen(true);
  };

  const resetProvinceForm = () => {
    setEditingProvince(null);
    setProvinceFormData({
      name: "",
      places: [],
    });
  };

  const resetPlaceForm = () => {
    setEditingPlace(null);
    setPlaceFormData({
      name: "",
      province: "",
      lat: 0,
      lng: 0,
      description: "",
      image: "",
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
            <h1 className="text-4xl font-bold">Manage Places & Provinces</h1>
            <p className="text-muted-foreground">Create and manage province-wise places</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isProvinceDialogOpen} onOpenChange={setIsProvinceDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetProvinceForm} className="bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Province
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col">
                <DialogHeader className="pb-4 border-b">
                  <DialogTitle className="text-2xl">{editingProvince ? "Edit Province" : "Create New Province"}</DialogTitle>
                  <DialogDescription>
                    {editingProvince ? "Update province details below" : "Fill in the details to create a new province"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleProvinceSubmit} className="flex flex-col flex-1 min-h-0">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                  {editingProvince && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>ID:</strong> {editingProvince.id}
                      </p>
                    </div>
                  )}
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={provinceFormData.name}
                      onChange={(e) => setProvinceFormData({ ...provinceFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsProvinceDialogOpen(false)}
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
                        editingProvince ? "Update Province" : "Create Province"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue={provinces[0]?.id || ""} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {provinces.map((province) => (
              <TabsTrigger key={province.id} value={province.id}>
                {province.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {provinces.map((province) => (
            <TabsContent key={province.id} value={province.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{province.name}</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProvince(province)}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Province
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProvince(province.id)}
                    className="bg-red-600 text-white hover:bg-red-700 border-0"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Province
                  </Button>
                  <Dialog open={isPlaceDialogOpen} onOpenChange={setIsPlaceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedProvince(province.id);
                          resetPlaceForm();
                        }}
                        className="bg-primary text-white hover:bg-primary/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Place
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                      <DialogHeader className="pb-4 border-b">
                        <DialogTitle className="text-2xl">{editingPlace ? "Edit Place" : "Create New Place"}</DialogTitle>
                        <DialogDescription>
                          {editingPlace ? "Update place details below" : "Fill in the details to create a new place"}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePlaceSubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                        {editingPlace && (
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              <strong>ID:</strong> {editingPlace.id}
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={placeFormData.name}
                              onChange={(e) => setPlaceFormData({ ...placeFormData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label>Latitude</Label>
                            <Input
                              type="number"
                              step="any"
                              value={placeFormData.lat}
                              onChange={(e) => setPlaceFormData({ ...placeFormData, lat: parseFloat(e.target.value) })}
                              required
                            />
                          </div>
                          <div>
                            <Label>Longitude</Label>
                            <Input
                              type="number"
                              step="any"
                              value={placeFormData.lng}
                              onChange={(e) => setPlaceFormData({ ...placeFormData, lng: parseFloat(e.target.value) })}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Province Name</Label>
                          <Input
                            value={placeFormData.province || province.name}
                            onChange={(e) => setPlaceFormData({ ...placeFormData, province: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <DragDropImageUpload
                            value={placeFormData.image || ""}
                            onChange={(value) => setPlaceFormData({ ...placeFormData, image: value })}
                            label="Image"
                            required
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={placeFormData.description}
                            onChange={(e) => setPlaceFormData({ ...placeFormData, description: e.target.value })}
                            required
                            rows={4}
                          />
                        </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsPlaceDialogOpen(false)}
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
                              editingPlace ? "Update Place" : "Create Place"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {province.places.map((place) => (
                  <Card key={place.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {place.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{place.description}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPlace(province.id, place)}
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePlace(province.id, place.id)}
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

