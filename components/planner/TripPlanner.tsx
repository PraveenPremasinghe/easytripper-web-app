"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { provinces, Place, Province } from "@/lib/places";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SaveTripDialog } from "./SaveTripDialog";

// Dynamically import the map component to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg animate-pulse">
      <p className="text-muted-foreground">Loading Map...</p>
    </div>
  ),
});

export function TripPlanner() {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [activeProvince, setActiveProvince] = useState<string>(provinces[0].id);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const currentProvince = useMemo(
    () => provinces.find((p) => p.id === activeProvince),
    [activeProvince]
  );

  const handleAddPlace = (place: Place) => {
    if (!selectedPlaces.find((p) => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const handleRemovePlace = (placeId: string) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p.id !== placeId));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 h-[calc(100vh-140px)] min-h-[600px]">
      {/* Left Sidebar - Selection */}
      <div className="lg:col-span-4 flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold font-serif text-primary">Plan Your Journey</h2>
          <p className="text-muted-foreground text-sm">
            Select places to build your custom itinerary. We&apos;ll map the route for you.
          </p>
        </div>

        <Tabs defaultValue={provinces[0].id} onValueChange={setActiveProvince} className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <TabsList className="w-max justify-start bg-transparent p-0 gap-2">
              {provinces.map((province) => (
                <TabsTrigger
                  key={province.id}
                  value={province.id}
                  className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {province.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <div className="flex-1 min-h-0 mt-4 relative">
            <ScrollArea className="h-full pr-4">
              <div className="grid gap-3 pb-4">
                <AnimatePresence mode="popLayout">
                  {currentProvince?.places.map((place) => {
                    const isSelected = selectedPlaces.some((p) => p.id === place.id);
                    return (
                      <motion.div
                        key={place.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        layout
                      >
                        <Card className={`overflow-hidden transition-all hover:shadow-md ${isSelected ? 'border-primary ring-1 ring-primary bg-primary/5' : ''}`}>
                          <CardContent className="p-3 flex items-start gap-3">
                            <div 
                              className="w-20 h-20 rounded-md bg-cover bg-center flex-shrink-0"
                              style={{ backgroundImage: `url(${place.image})` }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-foreground truncate">{place.name}</h3>
                                <Button
                                  size="icon"
                                  variant={isSelected ? "destructive" : "secondary"}
                                  className="h-6 w-6 rounded-full"
                                  onClick={() => isSelected ? handleRemovePlace(place.id) : handleAddPlace(place)}
                                >
                                  {isSelected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {place.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </div>

      {/* Right Content - Map & Itinerary */}
      <div className="lg:col-span-8 flex flex-col gap-4 h-full">
        {/* Map Container */}
        <Card className="flex-1 overflow-hidden border-0 shadow-lg relative z-0">
          <InteractiveMap selectedPlaces={selectedPlaces} />
          
          {/* Floating Itinerary Summary */}
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-xl z-[1000] max-h-[30%] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Your Itinerary ({selectedPlaces.length} stops)
              </h3>
              {selectedPlaces.length > 0 && (
                 <Button 
                   size="sm" 
                   className="h-7 text-xs rounded-full"
                   onClick={() => setIsSaveDialogOpen(true)}
                 >
                   Save Trip <ArrowRight className="ml-1 h-3 w-3" />
                 </Button>
              )}
            </div>
            
            {selectedPlaces.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">
                Start adding places from the list to see your route!
              </p>
            ) : (
              <ScrollArea className="flex-1">
                <div className="flex items-center gap-2 py-1 px-1">
                  {selectedPlaces.map((place, index) => (
                    <div key={place.id} className="flex items-center flex-shrink-0">
                      <Badge variant="secondary" className="rounded-full pl-2 pr-3 py-1 gap-1 hover:bg-muted">
                        <span className="bg-primary text-primary-foreground w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                          {index + 1}
                        </span>
                        {place.name}
                        <button 
                          onClick={() => handleRemovePlace(place.id)}
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                      {index < selectedPlaces.length - 1 && (
                        <div className="w-4 h-[1px] bg-border mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </Card>
      </div>

      <SaveTripDialog 
        isOpen={isSaveDialogOpen} 
        onClose={() => setIsSaveDialogOpen(false)} 
        selectedPlaces={selectedPlaces} 
      />
    </div>
  );
}
