import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

// Admin user interface
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In production, use bcrypt or similar
  name: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  isActive: boolean;
}

// Collection name
const ADMIN_COLLECTION = "adminUsers";

/**
 * Get admin user by username
 */
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return null;
  }

  try {
    console.log(`[getAdminByUsername] Querying Firestore for username: "${username}"`);
    console.log(`[getAdminByUsername] Collection: "${ADMIN_COLLECTION}"`);
    const adminRef = collection(db, ADMIN_COLLECTION);
    const q = query(adminRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    console.log(`[getAdminByUsername] Query returned ${querySnapshot.size} document(s)`);

    if (querySnapshot.empty) {
      console.log(`[getAdminByUsername] No documents found with username: "${username}"`);
      console.log("   Please check:");
      console.log("   1. Admin user exists in Firestore collection 'adminUsers'");
      console.log("   2. The 'username' field matches exactly (case-sensitive)");
      console.log("   3. Firestore rules allow read access");
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    console.log(`[getAdminByUsername] Found document:`, {
      id: doc.id,
      username: data.username,
      email: data.email,
      isActive: data.isActive,
    });
    
    return {
      id: doc.id,
      ...data,
    } as AdminUser;
  } catch (error: any) {
    console.error("Error getting admin by username:", error);
    
    // Provide helpful error messages
    if (error?.code === "not-found" || error?.message?.includes("NOT_FOUND")) {
      console.error("\n❌ Firestore Connection Error!");
      console.error("   The Firestore database cannot be reached.");
      console.error("   Please check:");
      console.error("   1. Firestore is enabled in Firebase Console");
      console.error("   2. Your PROJECT_ID in .env.local is correct");
      console.error("   3. Your internet connection is working");
    } else if (error?.code === "permission-denied") {
      console.error("\n❌ Firestore Permission Error!");
      console.error("   Firestore security rules are blocking access.");
      console.error("\n   🔧 Quick Fix:");
      console.error("   1. Go to Firebase Console → Firestore Database → Rules");
      console.error("   2. Replace the rules with (for development):");
      console.error("      rules_version = '2';");
      console.error("      service cloud.firestore {");
      console.error("        match /databases/{database}/documents {");
      console.error("          match /{document=**} {");
      console.error("            allow read, write: if true;");
      console.error("          }");
      console.error("        }");
      console.error("      }");
      console.error("   3. Click 'Publish'");
      console.error("   4. Wait a few seconds and try again");
      console.error("\n   ⚠️  Note: These rules allow full access. Only use for development!");
    }
    
    return null;
  }
}

/**
 * Get admin user by ID
 */
export async function getAdminById(id: string): Promise<AdminUser | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return null;
  }

  try {
    const adminRef = doc(db, ADMIN_COLLECTION, id);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      return null;
    }

    return {
      id: adminSnap.id,
      ...adminSnap.data(),
    } as AdminUser;
  } catch (error) {
    console.error("Error getting admin by ID:", error);
    return null;
  }
}

/**
 * Create a new admin user
 */
export async function createAdminUser(
  username: string,
  email: string,
  passwordHash: string,
  name: string
): Promise<string | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return null;
  }

  try {
    // Check if username already exists
    const existingAdmin = await getAdminByUsername(username);
    if (existingAdmin) {
      throw new Error("Username already exists");
    }

    const adminRef = doc(collection(db, ADMIN_COLLECTION));
    const newAdmin: Omit<AdminUser, "id"> = {
      username,
      email,
      passwordHash,
      name,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
      isActive: true,
    };

    await setDoc(adminRef, newAdmin);
    return adminRef.id;
  } catch (error) {
    console.error("Error creating admin user:", error);
    return null;
  }
}

/**
 * Update admin user
 */
export async function updateAdminUser(
  id: string,
  updates: Partial<Omit<AdminUser, "id" | "createdAt">>
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return false;
  }

  try {
    const adminRef = doc(db, ADMIN_COLLECTION, id);
    await updateDoc(adminRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating admin user:", error);
    return false;
  }
}

/**
 * Verify admin password
 * Note: In production, use bcrypt.compare() for password verification
 */
export async function verifyAdminPassword(
  username: string,
  password: string
): Promise<AdminUser | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return null;
  }

  try {
    console.log(`[verifyAdminPassword] Looking for username: "${username}"`);
    const admin = await getAdminByUsername(username);
    
    if (!admin) {
      console.log(`[verifyAdminPassword] No admin found with username: "${username}"`);
      console.log("   Possible reasons:");
      console.log("   1. Admin user doesn't exist in Firestore");
      console.log("   2. Collection name is wrong (should be 'adminUsers')");
      console.log("   3. Username field doesn't match exactly");
      return null;
    }
    
    console.log(`[verifyAdminPassword] Admin found:`, {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      isActive: admin.isActive,
      hasPasswordHash: !!admin.passwordHash,
    });
    
    if (!admin.isActive) {
      console.log(`[verifyAdminPassword] Admin user is not active`);
      return null;
    }

    // Simple password comparison (for now)
    // TODO: In production, use bcrypt.compare(password, admin.passwordHash)
    console.log(`[verifyAdminPassword] Comparing passwords...`);
    console.log(`   Input password length: ${password.length}`);
    console.log(`   Stored passwordHash length: ${admin.passwordHash?.length || 0}`);
    console.log(`   Passwords match: ${admin.passwordHash === password}`);
    
    if (admin.passwordHash === password) {
      console.log(`[verifyAdminPassword] ✅ Password match! Authentication successful`);
      return admin;
    }

    console.log(`[verifyAdminPassword] ❌ Password mismatch`);
    return null;
  } catch (error: any) {
    console.error("Error verifying admin password:", error);
    
    // Provide helpful error messages
    if (error?.code === "not-found" || error?.message?.includes("NOT_FOUND")) {
      console.error("\n❌ Firestore Error: Database not found!");
      console.error("   Possible causes:");
      console.error("   1. Firestore database hasn't been created in Firebase Console");
      console.error("   2. Wrong PROJECT_ID in .env.local");
      console.error("   3. Firestore isn't enabled for your project");
      console.error("\n   Solution:");
      console.error("   1. Go to Firebase Console → Firestore Database");
      console.error("   2. Click 'Create database' if you haven't already");
      console.error("   3. Verify your PROJECT_ID matches in .env.local");
    } else if (error?.code === "permission-denied") {
      console.error("\n❌ Firestore Permission Error!");
      console.error("   Firestore security rules are blocking access.");
      console.error("\n   🔧 Quick Fix:");
      console.error("   1. Go to Firebase Console → Firestore Database → Rules");
      console.error("   2. Replace the rules with (for development):");
      console.error("      rules_version = '2';");
      console.error("      service cloud.firestore {");
      console.error("        match /databases/{database}/documents {");
      console.error("          match /{document=**} {");
      console.error("            allow read, write: if true;");
      console.error("          }");
      console.error("        }");
      console.error("      }");
      console.error("   3. Click 'Publish'");
      console.error("   4. Wait a few seconds and try again");
    }
    
    return null;
  }
}

/**
 * Get all admin users (for admin management)
 */
export async function getAllAdminUsers(): Promise<AdminUser[]> {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured");
    return [];
  }

  try {
    const adminRef = collection(db, ADMIN_COLLECTION);
    const querySnapshot = await getDocs(adminRef);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AdminUser[];
  } catch (error) {
    console.error("Error getting all admin users:", error);
    return [];
  }
}

