import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyAdminPassword } from "./firebase/admin";

// Fallback credentials (if Firebase is not configured)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || process.env.AUTH_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.AUTH_PASSWORD || "admin123";

// Check if Firebase is configured
const isFirebaseConfigured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          // Use Firebase if configured, otherwise fall back to environment variables
          if (isFirebaseConfigured) {
            console.log("Using Firebase authentication");
            const admin = await verifyAdminPassword(
              credentials.username.trim(),
              credentials.password.trim()
            );

            if (admin) {
              console.log("Firebase authorization successful");
              return {
                id: admin.id,
                name: admin.name,
                email: admin.email,
              };
            }
            console.log("Firebase authorization failed");
            return null;
          } else {
            // Fallback to environment variables
            console.log("Using environment variable authentication (Firebase not configured)");
            if (
              credentials.username.trim() === ADMIN_USERNAME &&
              credentials.password.trim() === ADMIN_PASSWORD
            ) {
              console.log("Authorization successful");
              return {
                id: "1",
                name: "Admin",
                email: "admin@easytripper.com",
              };
            }
            console.log("Authorization failed - credentials mismatch");
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "your-secret-key-change-in-production-easytripper-2024",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

