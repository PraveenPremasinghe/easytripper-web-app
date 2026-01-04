"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  MapPin, 
  Car, 
  BookOpen, 
  Camera, 
  Map,
  Plus,
  Edit,
  Trash2,
  Database
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);

  const handleMigrate = async () => {
    if (!confirm("This will migrate existing data from lib/data.ts to JSON files. Continue?")) return;
    
    setMigrating(true);
    setMigrationStatus(null);
    
    try {
      const res = await fetch("/api/migrate", { method: "POST" });
      const data = await res.json();
      
      if (data.success) {
        setMigrationStatus("✅ Migration successful! Data files created in /data directory.");
      } else {
        setMigrationStatus("❌ Migration failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setMigrationStatus("❌ Migration failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setMigrating(false);
    }
  };
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your tours, destinations, vehicles, blog posts, stories, and places
              </p>
            </div>
            <Button
              onClick={handleMigrate}
              disabled={migrating}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              {migrating ? "Migrating..." : "Migrate Data"}
            </Button>
          </div>
          {migrationStatus && (
            <div className={`p-4 rounded-lg ${migrationStatus.includes("✅") ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"}`}>
              {migrationStatus}
            </div>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Tours & Packages
                  </CardTitle>
                  <CardDescription>Manage tour packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/tours">
                    <Button className="w-full">Manage Tours</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Destinations
                  </CardTitle>
                  <CardDescription>Manage destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/destinations">
                    <Button className="w-full">Manage Destinations</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicles
                  </CardTitle>
                  <CardDescription>Manage vehicles & transport</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/vehicles">
                    <Button className="w-full">Manage Vehicles</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Blog Posts
                  </CardTitle>
                  <CardDescription>Manage blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/blog">
                    <Button className="w-full">Manage Blog</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Travel Stories
                  </CardTitle>
                  <CardDescription>Manage travel stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/stories">
                    <Button className="w-full">Manage Stories</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Places & Provinces
                  </CardTitle>
                  <CardDescription>Manage province-wise places</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/places">
                    <Button className="w-full">Manage Places</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

