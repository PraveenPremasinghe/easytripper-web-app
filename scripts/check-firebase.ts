/**
 * Script to check Firebase configuration and connection
 * 
 * Usage: npx tsx scripts/check-firebase.ts
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { db, isFirebaseConfigured, app } from "../lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

async function checkFirebase() {
  console.log("🔍 Checking Firebase Configuration...\n");

  // Check environment variables
  console.log("1. Environment Variables:");
  const requiredVars = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];

  let allVarsSet = true;
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: ${value.substring(0, 20)}...`);
    } else {
      console.log(`   ❌ ${varName}: NOT SET`);
      allVarsSet = false;
    }
  }

  if (!allVarsSet) {
    console.log("\n❌ Some environment variables are missing!");
    console.log("   Please add them to your .env.local file.");
    process.exit(1);
  }

  // Check Firebase initialization
  console.log("\n2. Firebase Initialization:");
  if (!isFirebaseConfigured) {
    console.log("   ❌ Firebase is not configured");
    process.exit(1);
  }
  console.log("   ✅ Firebase is configured");

  if (!app) {
    console.log("   ❌ Firebase app is not initialized");
    process.exit(1);
  }
  console.log("   ✅ Firebase app initialized");

  if (!db) {
    console.log("   ❌ Firestore is not initialized");
    process.exit(1);
  }
  console.log("   ✅ Firestore initialized");

  // Test Firestore connection
  console.log("\n3. Testing Firestore Connection:");
  try {
    const testRef = collection(db, "adminUsers");
    const snapshot = await getDocs(testRef);
    console.log("   ✅ Successfully connected to Firestore!");
    console.log(`   📊 Found ${snapshot.size} admin user(s) in database`);
    
    if (snapshot.size === 0) {
      console.log("\n   ⚠️  No admin users found!");
      console.log("   Run: npx tsx scripts/create-admin.ts");
    }
  } catch (error: any) {
    console.log("   ❌ Failed to connect to Firestore!");
    console.error(`   Error: ${error.message}`);
    
    if (error.code === "not-found" || error.message?.includes("NOT_FOUND")) {
      console.log("\n   🔧 Troubleshooting:");
      console.log("   1. Go to Firebase Console: https://console.firebase.google.com/");
      console.log("   2. Select your project");
      console.log("   3. Click 'Firestore Database' in the sidebar");
      console.log("   4. If you see 'Create database', click it and create the database");
      console.log("   5. Make sure you selected 'Start in test mode'");
      console.log("   6. Verify your PROJECT_ID matches in .env.local");
    } else if (error.code === "permission-denied") {
      console.log("\n   🔧 Troubleshooting:");
      console.log("   1. Check your Firestore security rules");
      console.log("   2. For development, you can use test mode rules");
    }
    
    process.exit(1);
  }

  console.log("\n✅ All checks passed! Firebase is ready to use.");
}

checkFirebase().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});

