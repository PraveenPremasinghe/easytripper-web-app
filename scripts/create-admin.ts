/**
 * Script to create an admin user in Firebase Firestore
 * 
 * Usage:
 * 1. Make sure Firebase is configured in .env.local
 * 2. Run: npx tsx scripts/create-admin.ts
 * 
 * Or with custom values:
 * npx tsx scripts/create-admin.ts admin admin@example.com mypassword "Admin Name"
 */

import { createAdminUser, getAdminByUsername } from "../lib/firebase/admin";

async function main() {
  // Get command line arguments or use defaults
  const args = process.argv.slice(2);
  const username = args[0] || "admin";
  const email = args[1] || "admin@easytripper.com";
  const password = args[2] || "admin123";
  const name = args[3] || "Admin User";

  console.log("Creating admin user...");
  console.log(`Username: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);
  console.log("");

  // Check if user already exists
  const existing = await getAdminByUsername(username);
  if (existing) {
    console.error(`❌ Admin user with username "${username}" already exists!`);
    console.log(`   User ID: ${existing.id}`);
    console.log(`   Email: ${existing.email}`);
    process.exit(1);
  }

  // Create the admin user
  // Note: In production, password should be hashed with bcrypt
  // For now, we're storing it as plain text (you should update this)
  const adminId = await createAdminUser(username, email, password, name);

  if (adminId) {
    console.log("✅ Admin user created successfully!");
    console.log(`   Admin ID: ${adminId}`);
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log("");
    console.log("⚠️  Security Note:");
    console.log("   Password is stored as plain text. For production,");
    console.log("   implement bcrypt hashing in lib/firebase/admin.ts");
  } else {
    console.error("❌ Failed to create admin user");
    console.error("   Please check:");
    console.error("   1. Firebase configuration in .env.local");
    console.error("   2. Firestore is enabled in Firebase Console");
    console.error("   3. Firestore security rules allow writes");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

