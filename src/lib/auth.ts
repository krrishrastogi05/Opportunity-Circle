import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "./mongodb-client";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Store the Google refresh token for future calendar integration.
      // Match by the adapter's user id (string id of the users doc), not
      // providerAccountId (which is the Google sub, not an email).
      if (account?.provider === "google" && account.refresh_token && user?.id) {
        try {
          const client = await clientPromise;
          const db = client.db();
          const { ObjectId } = await import("mongodb");
          await db.collection("users").updateOne(
            { _id: new ObjectId(user.id) },
            { $set: { googleRefreshToken: account.refresh_token } }
          );
        } catch {
          // non-fatal — don't block sign-in if token storage fails
        }
      }
      return true;
    },
    async session({ session, user }) {
      // With the MongoDB adapter (database strategy), `user` is the full
      // users-collection document, so custom fields are already present.
      if (session.user) {
        const typedUser = session.user as {
          id?: string;
          profileCompleted?: boolean;
          branch?: string;
          graduationYear?: number;
        };
        const dbUser = user as unknown as {
          profileCompleted?: boolean;
          branch?: string;
          graduationYear?: number;
        };
        typedUser.id = user.id;
        typedUser.profileCompleted = dbUser.profileCompleted ?? false;
        typedUser.branch = dbUser.branch;
        typedUser.graduationYear = dbUser.graduationYear;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
