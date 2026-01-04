"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { provinces, Place } from "@/lib/places";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  X, 
  MapPin, 
  ArrowRight, 
  Search, 
  Calendar,
  Clock,
  Route,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SaveTripDialog } from "./SaveTripDialog";
import { cn } from "@/lib/utils";

// Dynamically import the map component to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground font-medium">Loading Map...</p>
      </div>
    </div>
  ),
});

export function TripPlanner() {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [activeProvince, setActiveProvince] = useState<string>(provinces[0].id);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const currentProvince = useMemo(
    () => provinces.find((p) => p.id === activeProvince),
    [activeProvince]
  );

  const filteredPlaces = useMemo(() => {
    if (!currentProvince) return [];
    if (!searchQuery.trim()) return currentProvince.places;
    
    const query = searchQuery.toLowerCase();
    return currentProvince.places.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query)
    );
  }, [currentProvince, searchQuery]);

  const handleAddPlace = (place: Place) => {
    if (!selectedPlaces.find((p) => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const handleRemovePlace = (placeId: string) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p.id !== placeId));
  };

  const clearAll = () => {
    setSelectedPlaces([]);
  };

  const checkScrollButtons = () => {
    if (!tabsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    // Check scroll buttons after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);
    
    const scrollContainer = tabsScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        clearTimeout(timer);
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsScrollRef.current) return;
    const scrollAmount = 200;
    const currentScroll = tabsScrollRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    tabsScrollRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
                Plan Your Journey
              </h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Create your perfect Sri Lankan adventure. Select destinations, visualize your route, and save your personalized itinerary.
            </p>
          </div>
          
          {selectedPlaces.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="cursor-pointer shadow-none hover:shadow-none"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button
                size="sm"
                onClick={() => setIsSaveDialogOpen(true)}
                className="cursor-pointer shadow-none hover:shadow-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Save Trip
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {selectedPlaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Card className="border border-border/50 bg-card shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{selectedPlaces.length}</p>
                    <p className="text-xs font-medium text-muted-foreground">Destinations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
                    <Route className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{selectedPlaces.length > 1 ? selectedPlaces.length - 1 : 0}</p>
                    <p className="text-xs font-medium text-muted-foreground">Route Segments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{selectedPlaces.length * 2}</p>
                    <p className="text-xs font-medium text-muted-foreground">Est. Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Sidebar - Destination Selection */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <Card className="border border-border/80 bg-card shadow-none hover:shadow-none">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 cursor-pointer"
                  />
                </div>

                {/* Province Tabs */}
                <Tabs 
                  value={activeProvince} 
                  onValueChange={setActiveProvince} 
                  className="w-full"
                >
                  <div className="relative w-full">
                    {showLeftArrow && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm border border-border shadow-none hover:shadow-none hover:bg-muted"
                        onClick={() => scrollTabs('left')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                    {showRightArrow && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm border border-border shadow-none hover:shadow-none hover:bg-muted"
                        onClick={() => scrollTabs('right')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    <div 
                      ref={tabsScrollRef}
                      className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide pb-2 " 
                      style={{ WebkitOverflowScrolling: 'touch' }}
                      onScroll={checkScrollButtons}
                    >
                      <TabsList className="inline-flex w-max h-auto bg-muted/50 p-1.5 text-muted-foreground border border-border/50">
                        {provinces.map((province) => (
                          <TabsTrigger
                            key={province.id}
                            value={province.id}
                            className="px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white"
                          >
                            {province.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </div>

                  <TabsContent value={activeProvince} className="mt-4">
                    <ScrollArea className="h-[500px] sm:h-[600px] pr-4">
                      <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                          {filteredPlaces.length === 0 ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-12"
                            >
                              <p className="text-muted-foreground">No destinations found</p>
                            </motion.div>
                          ) : (
                            filteredPlaces.map((place) => {
                              const isSelected = selectedPlaces.some((p) => p.id === place.id);
                              return (
                                <motion.div
                                  key={place.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  layout
                                >
                                  <Card
                                    className={cn(
                                      "overflow-hidden transition-all duration-300 cursor-pointer group relative shadow-none hover:shadow-none",
                                      "border border-border/60 bg-card",
                                      isSelected
                                        ? "bg-primary/10"
                                        : "hover:border-primary/40"
                                    )}
                                    onClick={() => !isSelected && handleAddPlace(place)}
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex gap-4">
                                        <div className="relative w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0 ring-1 ring-border/50 group-hover:scale-105 transition-all duration-300 overflow-hidden">
                                          <div
                                            className="w-full h-full bg-cover bg-center rounded-xl"
                                            style={{ backgroundImage: `url(${place.image})` }}
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-2">
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                              <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
                                                {place.name}
                                              </h3>
                                              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                                                {place.province}
                                              </p>
                                            </div>
                                            <Button
                                              size="icon"
                                              variant={isSelected ? "destructive" : "default"}
                                              className={cn(
                                                "h-8 w-8 rounded-full flex-shrink-0 cursor-pointer transition-all shadow-none hover:shadow-none",
                                                isSelected
                                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                                  : "bg-primary hover:bg-primary/90 text-white"
                                              )}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                isSelected
                                                  ? handleRemovePlace(place.id)
                                                  : handleAddPlace(place);
                                              }}
                                            >
                                              {isSelected ? (
                                                <X className="h-4 w-4" />
                                              ) : (
                                                <Plus className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </div>
                                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {place.description}
                                          </p>
                                          {isSelected && (
                                            <motion.div
                                              initial={{ opacity: 0, scale: 0.8 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              className="inline-block"
                                            >
                                              <Badge
                                                variant="secondary"
                                                className="bg-primary/15 text-primary border-2 border-primary/30 font-semibold  "
                                              >
                                                ✓ Added to itinerary
                                              </Badge>
                                            </motion.div>
                                          )}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              );
                            })
                          )}
                        </AnimatePresence>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Map & Itinerary */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Map Container */}
          <Card className="border border-border/80 bg-card shadow-none hover:shadow-none overflow-hidden relative z-0">
            <CardContent className="p-0 relative h-[500px] sm:h-[600px] lg:h-[700px] z-0">
              <div className="relative z-0 h-full w-full">
                <InteractiveMap selectedPlaces={selectedPlaces} />
              </div>
            </CardContent>
          </Card>

          {/* Itinerary Panel */}
          <Card className="border border-border/80 bg-card shadow-none hover:shadow-none">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                      <Route className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Your Itinerary</h3>
                      <p className="text-xs font-medium text-muted-foreground">
                        {selectedPlaces.length} {selectedPlaces.length === 1 ? "destination" : "destinations"} selected
                      </p>
                    </div>
                  </div>
                  {selectedPlaces.length > 0 && (
                    <Button
                      size="sm"
                      onClick={() => setIsSaveDialogOpen(true)}
                      className="cursor-pointer shadow-none hover:shadow-none"
                    >
                      Save Trip
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>

                {selectedPlaces.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 border border-dashed border-border/60 rounded-xl bg-muted/30"
                  >
                    <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-sm font-semibold text-foreground mb-1">
                      No destinations selected yet
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start adding places from the list to build your itinerary
                    </p>
                  </motion.div>
                ) : (
                  <ScrollArea className="h-[200px] sm:h-[250px]">
                    <div className="space-y-2 pr-4">
                      <AnimatePresence mode="popLayout">
                        {selectedPlaces.map((place, index) => (
                          <motion.div
                            key={place.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            layout
                            className="group"
                          >
                            <Card className="border border-border/60 bg-card shadow-none hover:shadow-none hover:border-primary/40 transition-all cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm    ring-2 ring-primary/20">
                                      {index + 1}
                                    </div>
                                    {index < selectedPlaces.length - 1 && (
                                      <div className="w-px h-8 bg-border/60" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-foreground truncate">
                                      {place.name}
                                    </h4>
                                    <p className="text-xs font-medium text-muted-foreground truncate">
                                      {place.province}
                                    </p>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive border border-transparent hover:border-destructive/20 cursor-pointer flex-shrink-0 transition-all shadow-none hover:shadow-none"
                                    onClick={() => handleRemovePlace(place.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SaveTripDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        selectedPlaces={selectedPlaces}
      />
    </div>
  );
}
