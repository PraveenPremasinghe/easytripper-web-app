/**
 * Script to update or create an admin user in Firebase Firestore
 * 
 * Usage:
 * npx tsx scripts/update-admin.ts
 */

import { createAdminUser, getAdminByUsername, updateAdminUser } from "../lib/firebase/admin";

async function main() {
  const username = "easytrippertours@gmail.com";
  const email = "easytrippertours@gmail.com";
  const password = "Jaga@1969";
  const name = "Admin User";

  console.log("Updating/Creating admin user...");
  console.log(`Username: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);
  console.log("");

  // Check if user already exists
  const existing = await getAdminByUsername(username);
  
  if (existing) {
    console.log(`✅ Admin user found with username "${username}"`);
    console.log(`   User ID: ${existing.id}`);
    console.log(`   Current Email: ${existing.email}`);
    console.log("");
    console.log("Updating admin user...");
    
    const updated = await updateAdminUser(existing.id, {
      email,
      passwordHash: password, // Note: In production, hash this with bcrypt
      name,
      isActive: true,
    });

    if (updated) {
      console.log("✅ Admin user updated successfully!");
      console.log(`   Username: ${username}`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
    } else {
      console.error("❌ Failed to update admin user");
      process.exit(1);
    }
  } else {
    console.log("No existing admin user found. Creating new admin user...");
    
    const adminId = await createAdminUser(username, email, password, name);

    if (adminId) {
      console.log("✅ Admin user created successfully!");
      console.log(`   Admin ID: ${adminId}`);
      console.log(`   Username: ${username}`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
    } else {
      console.error("❌ Failed to create admin user");
      console.error("   Please check:");
      console.error("   1. Firebase configuration in .env.local");
      console.error("   2. Firestore is enabled in Firebase Console");
      console.error("   3. Firestore security rules allow writes");
      process.exit(1);
    }
  }

  console.log("");
  console.log("⚠️  Security Note:");
  console.log("   Password is stored as plain text. For production,");
  console.log("   implement bcrypt hashing in lib/firebase/admin.ts");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
