/**
 * Script to check if admin user exists in Firestore
 * 
 * Usage: npx tsx scripts/check-admin-user.ts
 */

// IMPORTANT: Load environment variables FIRST, before importing Firebase modules
import { config } from "dotenv";
import { resolve } from "path";
const envResult = config({ path: resolve(process.cwd(), ".env.local") });

// Verify env vars are loaded
console.log("Environment variables loaded:", {
  hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

// Now import Firebase modules (they will use the loaded env vars)
import { getAdminByUsername, getAllAdminUsers } from "../lib/firebase/admin";

async function main() {
  console.log("🔍 Checking Admin Users in Firestore...\n");

  try {
    // Check for specific admin user
    console.log("1. Checking for username 'admin':");
    const admin = await getAdminByUsername("admin");
    
    if (admin) {
      console.log("   ✅ Admin user found!");
      console.log(`   ID: ${admin.id}`);
      console.log(`   Username: ${admin.username}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Is Active: ${admin.isActive}`);
      console.log(`   Has Password Hash: ${!!admin.passwordHash}`);
      console.log(`   Password Hash Value: ${admin.passwordHash}`);
    } else {
      console.log("   ❌ Admin user NOT found!");
      console.log("\n   To create the admin user:");
      console.log("   1. Go to Firebase Console → Firestore Database → Data");
      console.log("   2. Create collection 'adminUsers' if it doesn't exist");
      console.log("   3. Add a document with:");
      console.log("      - username: 'admin' (string)");
      console.log("      - email: 'admin@easytripper.com' (string)");
      console.log("      - passwordHash: 'admin123' (string)");
      console.log("      - name: 'Admin User' (string)");
      console.log("      - isActive: true (boolean)");
      console.log("      - createdAt: (timestamp)");
      console.log("      - updatedAt: (timestamp)");
    }

    console.log("\n2. All admin users in database:");
    const allAdmins = await getAllAdminUsers();
    if (allAdmins.length === 0) {
      console.log("   ⚠️  No admin users found in Firestore");
    } else {
      console.log(`   Found ${allAdmins.length} admin user(s):`);
      allAdmins.forEach((admin, index) => {
        console.log(`   ${index + 1}. ${admin.username} (${admin.email}) - Active: ${admin.isActive}`);
      });
    }

  } catch (error: any) {
    console.error("\n❌ Error checking admin users:", error.message);
    if (error.code === "permission-denied") {
      console.error("\n   Firestore permission error!");
      console.error("   Your Firestore rules might be blocking access.");
      console.error("   Check Firebase Console → Firestore Database → Rules");
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});

