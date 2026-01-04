/**
 * Migration script to import sample data from JSON files to Firebase Firestore
 * 
 * Usage: npx tsx scripts/import-sample-data.ts
 * 
 * This script reads JSON files from the sample-data/ directory and imports them
 * into Firebase Firestore collections.
 */

// IMPORTANT: Load environment variables FIRST, before any Firebase imports
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

// Load environment variables synchronously before any other imports
config({ path: resolve(process.cwd(), ".env.local") });

// Import types (these don't depend on Firebase)
import { Tour, Destination, Vehicle, BlogPost, Story } from "../lib/types";
import { Province } from "../lib/places";

const SAMPLE_DATA_DIR = resolve(process.cwd(), "sample-data");

// Helper to read JSON file
function readJSONFile<T>(filename: string): T {
  const filePath = resolve(SAMPLE_DATA_DIR, filename);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

// Dynamically import Firebase functions after env vars are loaded
async function getFirebaseFunctions() {
  const {
    createTour,
    createDestination,
    createVehicle,
    createBlogPost,
    createStory,
    createProvince,
    getTours,
    getDestinations,
    getVehicles,
    getBlogPosts,
    getStories,
    getProvinces,
  } = await import("../lib/firebase/db");
  
  return {
    createTour,
    createDestination,
    createVehicle,
    createBlogPost,
    createStory,
    createProvince,
    getTours,
    getDestinations,
    getVehicles,
    getBlogPosts,
    getStories,
    getProvinces,
  };
}

async function importTours(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n📦 Importing Tours...");
  try {
    const existingTours = await fb.getTours();
    if (existingTours.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingTours.length} tours. Skipping.`);
      console.log("   💡 Use --force flag to overwrite (not implemented)");
      return;
    }

    const tours: Tour[] = readJSONFile<Tour[]>("tours.json");
    console.log(`   Found ${tours.length} tours in sample data`);

    let imported = 0;
    for (const tour of tours) {
      const { id, ...tourData } = tour;
      await fb.createTour(tourData);
      imported++;
      console.log(`   ✓ Imported: ${tour.name}`);
    }
    console.log(`   ✅ Successfully imported ${imported} tours`);
  } catch (error: any) {
    console.error("   ❌ Error importing tours:", error.message);
    throw error;
  }
}

async function importDestinations(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n📍 Importing Destinations...");
  try {
    const existingDestinations = await fb.getDestinations();
    if (existingDestinations.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingDestinations.length} destinations. Skipping.`);
      return;
    }

    const destinations: Destination[] = readJSONFile<Destination[]>("destinations.json");
    console.log(`   Found ${destinations.length} destinations in sample data`);

    let imported = 0;
    for (const destination of destinations) {
      await fb.createDestination(destination);
      imported++;
      console.log(`   ✓ Imported: ${destination.name}`);
    }
    console.log(`   ✅ Successfully imported ${imported} destinations`);
  } catch (error: any) {
    console.error("   ❌ Error importing destinations:", error.message);
    throw error;
  }
}

async function importVehicles(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n🚗 Importing Vehicles...");
  try {
    const existingVehicles = await fb.getVehicles();
    if (existingVehicles.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingVehicles.length} vehicles. Skipping.`);
      return;
    }

    const vehicles: Vehicle[] = readJSONFile<Vehicle[]>("vehicles.json");
    console.log(`   Found ${vehicles.length} vehicles in sample data`);

    let imported = 0;
    for (const vehicle of vehicles) {
      const { id, ...vehicleData } = vehicle;
      await fb.createVehicle(vehicleData);
      imported++;
      console.log(`   ✓ Imported: ${vehicle.name}`);
    }
    console.log(`   ✅ Successfully imported ${imported} vehicles`);
  } catch (error: any) {
    console.error("   ❌ Error importing vehicles:", error.message);
    throw error;
  }
}

async function importBlogPosts(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n📝 Importing Blog Posts...");
  try {
    const existingPosts = await fb.getBlogPosts();
    if (existingPosts.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingPosts.length} blog posts. Skipping.`);
      return;
    }

    const posts: BlogPost[] = readJSONFile<BlogPost[]>("blog-posts.json");
    console.log(`   Found ${posts.length} blog posts in sample data`);

    let imported = 0;
    for (const post of posts) {
      // Blog posts use slug as document ID, so we keep the full post object
      await fb.createBlogPost(post);
      imported++;
      console.log(`   ✓ Imported: ${post.title}`);
    }
    console.log(`   ✅ Successfully imported ${imported} blog posts`);
  } catch (error: any) {
    console.error("   ❌ Error importing blog posts:", error.message);
    throw error;
  }
}

async function importStories(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n📖 Importing Travel Stories...");
  try {
    const existingStories = await fb.getStories();
    if (existingStories.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingStories.length} stories. Skipping.`);
      return;
    }

    const stories: Story[] = readJSONFile<Story[]>("stories.json");
    console.log(`   Found ${stories.length} stories in sample data`);

    let imported = 0;
    for (const story of stories) {
      const { id, ...storyData } = story;
      await fb.createStory(storyData);
      imported++;
      console.log(`   ✓ Imported: ${story.title}`);
    }
    console.log(`   ✅ Successfully imported ${imported} stories`);
  } catch (error: any) {
    console.error("   ❌ Error importing stories:", error.message);
    throw error;
  }
}

async function importProvinces(fb: Awaited<ReturnType<typeof getFirebaseFunctions>>) {
  console.log("\n🗺️  Importing Provinces & Places...");
  try {
    const existingProvinces = await fb.getProvinces();
    if (existingProvinces.length > 0) {
      console.log(`   ⚠️  Firebase already has ${existingProvinces.length} provinces. Skipping.`);
      return;
    }

    const provinces: Province[] = readJSONFile<Province[]>("provinces-places.json");
    console.log(`   Found ${provinces.length} provinces in sample data`);

    let imported = 0;
    let totalPlaces = 0;
    for (const province of provinces) {
      const { id, ...provinceData } = province;
      await fb.createProvince(provinceData);
      imported++;
      totalPlaces += province.places.length;
      console.log(`   ✓ Imported: ${province.name} (${province.places.length} places)`);
    }
    console.log(`   ✅ Successfully imported ${imported} provinces with ${totalPlaces} total places`);
  } catch (error: any) {
    console.error("   ❌ Error importing provinces:", error.message);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting Sample Data Import to Firebase...\n");
  console.log("This will import sample data from sample-data/ directory to Firebase Firestore\n");

  try {
    // Check if sample-data directory exists
    try {
      readFileSync(resolve(SAMPLE_DATA_DIR, "tours.json"), "utf-8");
    } catch {
      console.error("❌ Error: sample-data directory not found or files are missing!");
      console.error("   Please ensure sample-data/ directory exists with all JSON files.");
      process.exit(1);
    }

    // Load Firebase functions after env vars are loaded
    const fb = await getFirebaseFunctions();

    await importTours(fb);
    await importDestinations(fb);
    await importVehicles(fb);
    await importBlogPosts(fb);
    await importStories(fb);
    await importProvinces(fb);

    console.log("\n" + "=".repeat(50));
    console.log("✅ Sample Data Import Completed Successfully!");
    console.log("=".repeat(50));
    console.log("\nNext steps:");
    console.log("1. Verify data in Firebase Console");
    console.log("2. Check your website - data should now appear");
    console.log("3. Use admin dashboard to add/edit/delete items");
    console.log("\n💡 Note: If collections already had data, they were skipped.");
    console.log("   Delete existing data in Firebase Console if you want to re-import.\n");
  } catch (error: any) {
    console.error("\n❌ Import failed:", error.message);
    if (error.stack) {
      console.error("\nStack trace:", error.stack);
    }
    process.exit(1);
  }
}

// Run the import
main();

